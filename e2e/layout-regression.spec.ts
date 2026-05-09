import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import {
  expectClearOfBottomDock,
  expectModalActionUsable,
  expectNoCriticalTextClipping,
  expectNoDataCriticalTextClipping,
  expectNoHorizontalOverflow,
  expectToastDoesNotBlockActions,
  expectVisibleWithinViewport,
  seedSave,
  setOrange,
} from "./helpers";

test.describe.configure({ timeout: 120_000 });

const hour = 60 * 60 * 1000;
const day = 24 * hour;

const viewports = [
  { name: "320x740", width: 320, height: 740 },
  { name: "360x740", width: 360, height: 740 },
  { name: "android-webview-360x800", width: 360, height: 800 },
  { name: "android-webview-393x873", width: 393, height: 873 },
  { name: "android-webview-412x915", width: 412, height: 915 },
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "desktop-1280x900", width: 1280, height: 900 },
];

async function assertBaseShell(page: Parameters<typeof expectNoHorizontalOverflow>[0]) {
  await expectNoHorizontalOverflow(page);
  await expectVisibleWithinViewport(page.locator(".bottom-tabs"), 0.98);
  await expectNoCriticalTextClipping(page, [
    ".top-bar h1",
    ".save-dot",
    ".bottom-tabs strong",
  ]);
  await expectNoDataCriticalTextClipping(page);
}

async function expectAndroidTextRenderingGuards(page: Parameters<typeof expectNoHorizontalOverflow>[0]) {
  await expectNoCriticalTextClipping(page, [
    ".ui-button",
    ".btn",
    ".bottom-tabs strong",
    ".currency-display strong",
    ".home-daily-badge span",
    ".home-daily-badge strong",
    ".goal-chip",
    ".owned-chip",
    ".reward-chip",
    ".upgrade-tier-chip",
    ".upgrade-ready-chip",
    ".upgrade-meta span",
    ".cost-plaque",
    ".modal-header h2",
    ".modal-actions .btn",
  ]);

  const failures = await page.evaluate((selectors) => {
    function isVisible(element: Element) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return rect.width > 0
        && rect.height > 0
        && style.visibility !== "hidden"
        && style.display !== "none";
    }

    return selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)).map((element, index) => {
      if (!(element instanceof HTMLElement) || !isVisible(element)) return null;
      const style = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const paddingY = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
      const contentHeight = Math.max(0, element.clientHeight - paddingY);
      if (!Number.isFinite(lineHeight) || lineHeight <= 0 || contentHeight <= lineHeight * 1.65) return null;
      return {
        selector,
        index,
        text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80),
        contentHeight,
        lineHeight,
      };
    }).filter(Boolean));
  }, [
    ".bottom-tabs strong",
    ".quick-buy-mode button span",
    ".quick-buy-mode button small",
    ".upgrade-tier-chip",
    ".upgrade-ready-chip",
    ".upgrade-meta span small",
    ".currency-display strong",
  ]);

  expect(failures).toEqual([]);
}

async function scrollCardIntoSafeView(page: Parameters<typeof expectNoHorizontalOverflow>[0], cardIndex: number) {
  await page.locator(".upgrade-card").nth(cardIndex).evaluate((element) => {
    const shell = document.querySelector(".content-shell");
    if (!(shell instanceof HTMLElement) || !(element instanceof HTMLElement)) return;
    const shellRect = shell.getBoundingClientRect();
    const cardRect = element.getBoundingClientRect();
    shell.scrollTop = Math.max(0, shell.scrollTop + cardRect.top - shellRect.top - 118);
  });
}

async function expectUpgradeCardSurgeryLayout(page: Parameters<typeof expectNoHorizontalOverflow>[0], cardIndex: number) {
  const metrics = await page.locator(".upgrade-card").nth(cardIndex).evaluate((cardElement) => {
    function rectFor(selector: string) {
      const node = cardElement.querySelector(selector);
      if (!(node instanceof HTMLElement)) return null;
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        scrollWidth: node.scrollWidth,
        clientWidth: node.clientWidth,
        scrollHeight: node.scrollHeight,
        clientHeight: node.clientHeight,
      };
    }

    const card = cardElement.getBoundingClientRect();
    const body = rectFor(".upgrade-card-body");
    const tool = rectFor(".upgrade-tool-slot");
    const copy = rectFor(".upgrade-copy");
    const status = rectFor(".upgrade-status-row");
    const title = rectFor(".upgrade-title-row h3");
    const meta = rectFor(".upgrade-meta");
    const tray = rectFor(".upgrade-buy-slot");
    const cost = rectFor(".cost-plaque");
    const button = rectFor(".upgrade-buy-button");
    const description = rectFor(".upgrade-description");

    const costButtonOverlap = cost && button
      ? !(cost.right <= button.left || button.right <= cost.left || cost.bottom <= button.top || button.bottom <= cost.top)
      : true;

    return {
      card: { left: card.left, top: card.top, right: card.right, bottom: card.bottom, width: card.width, height: card.height },
      body,
      tool,
      copy,
      status,
      title,
      meta,
      tray,
      cost,
      button,
      description,
      costButtonOverlap,
    };
  });

  expect(metrics.body).not.toBeNull();
  expect(metrics.tool).not.toBeNull();
  expect(metrics.copy).not.toBeNull();
  expect(metrics.status).not.toBeNull();
  expect(metrics.title).not.toBeNull();
  expect(metrics.meta).not.toBeNull();
  expect(metrics.tray).not.toBeNull();
  expect(metrics.cost).not.toBeNull();
  expect(metrics.button).not.toBeNull();
  expect(metrics.description).not.toBeNull();
  if (!metrics.body || !metrics.tool || !metrics.copy || !metrics.status || !metrics.title || !metrics.meta || !metrics.tray || !metrics.cost || !metrics.button || !metrics.description) return;

  expect(metrics.tool.width / metrics.card.width).toBeLessThanOrEqual(0.31);
  expect(metrics.body.left).toBeGreaterThanOrEqual(metrics.card.left - 1);
  expect(metrics.body.right).toBeLessThanOrEqual(metrics.card.right + 1);
  expect(metrics.tray.left).toBeGreaterThanOrEqual(metrics.card.left - 1);
  expect(metrics.tray.right).toBeLessThanOrEqual(metrics.card.right + 1);
  expect(metrics.tray.bottom).toBeLessThanOrEqual(metrics.card.bottom + 1);
  expect(metrics.body.bottom).toBeLessThanOrEqual(metrics.tray.top - 2);
  expect(metrics.costButtonOverlap).toBe(false);
  expect(metrics.cost.height).toBeGreaterThanOrEqual(40);
  expect(metrics.button.height).toBeGreaterThanOrEqual(44);

  for (const rect of [metrics.status, metrics.title, metrics.meta, metrics.description, metrics.tray]) {
    expect(rect.width).toBeGreaterThan(8);
    expect(rect.height).toBeGreaterThan(8);
  }

  for (const rect of [metrics.title, metrics.cost, metrics.button]) {
    expect(rect.scrollWidth - rect.clientWidth).toBeLessThanOrEqual(2);
    expect(rect.scrollHeight - rect.clientHeight).toBeLessThanOrEqual(6);
  }
}

async function expectTextareasAvoidMobileZoom(page: Parameters<typeof expectNoHorizontalOverflow>[0]) {
  const sizes = await page.locator("textarea").evaluateAll((nodes) => nodes.map((node) => Number.parseFloat(window.getComputedStyle(node).fontSize)));
  expect(sizes.length).toBeGreaterThan(0);
  for (const size of sizes) {
    expect(size).toBeGreaterThanOrEqual(16);
  }
}

for (const viewport of viewports) {
  test(`critical UI layout is usable at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 21 * hour;
      state.retention.lastDailyClaimAt = null;
      state.retention.dailyStreak = 0;
      state.generators.orange_basket = 8;
      state.epsAtLastSave = BigNumberLite.from("12");
      setOrange(state, "125000");
    });
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await expectVisibleWithinViewport(page.getByRole("button", { name: /귤 주기/ }), 0.98);
    await expectVisibleWithinViewport(page.locator(".home-daily-badge"), 0.95);
    await expectClearOfBottomDock(page, page.locator(".home-daily-badge"));
    await expectNoCriticalTextClipping(page, [
      ".currency-display strong",
      ".home-ledger-panel strong",
      ".home-daily-badge span",
      ".home-daily-badge strong",
      ".metric-tile strong",
    ]);
    await page.locator(".home-daily-badge").click();
    await expectModalActionUsable(page, "복귀 보상 도장", "정원으로 돌아가기");
    await expectNoCriticalTextClipping(page, [
      ".modal-header h2",
      ".daily-reward-prize strong",
      ".daily-next-preview strong",
      ".modal-actions .btn",
    ]);
    await page.getByRole("dialog", { name: "복귀 보상 도장" }).getByRole("button", { name: "정원으로 돌아가기" }).click();

    await seedSave(page, (state) => {
      setOrange(state, "2500000");
      state.upgrades.soft_paw = 12;
      state.generators.orange_basket = 16;
      state.generators.storehouse = 5;
    });
    await page.getByRole("button", { name: "업그레이드" }).click();
    await page.getByRole("button", { name: "최대", exact: true }).click();
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await expectNoCriticalTextClipping(page, [
      ".upgrade-summary strong",
      ".quick-buy-head strong",
      ".quick-buy-mode button",
    ]);
    for (const index of [0, 1]) {
      await scrollCardIntoSafeView(page, index);
      const card = page.locator(".upgrade-card").nth(index);
      await expectVisibleWithinViewport(card.locator(".upgrade-buy-slot"), 0.98);
      await expectClearOfBottomDock(page, card.locator(".upgrade-buy-button"));
      await expectUpgradeCardSurgeryLayout(page, index);
      await expectNoCriticalTextClipping(page, [
        `.upgrade-list .upgrade-card:nth-child(${index + 1}) .upgrade-title-row h3`,
        `.upgrade-list .upgrade-card:nth-child(${index + 1}) .upgrade-meta span`,
        `.upgrade-list .upgrade-card:nth-child(${index + 1}) .cost-plaque`,
        `.upgrade-list .upgrade-card:nth-child(${index + 1}) .upgrade-buy-button`,
      ]);
    }

    await seedSave(page, (state) => {
      setOrange(state, "100000000");
      state.upgrades.soft_paw = 4;
      state.generators.orange_basket = 8;
    });
    await page.getByRole("button", { name: "환생" }).click();
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await page.getByRole("button", { name: "환생하기" }).click();
    await expectModalActionUsable(page, "환생 확인", "황금 나뭇잎 받기");
    await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
    await expectModalActionUsable(page, "새 계절 시작", "정원으로 돌아가기");
    await expectNoCriticalTextClipping(page, [
      ".prestige-result-stamp",
      ".prestige-result-grid strong",
      ".prestige-multiplier-ribbon span",
      ".prestige-next-copy",
    ]);
    await page.getByRole("dialog", { name: "새 계절 시작" }).getByRole("button", { name: "정원으로 돌아가기" }).click();

    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 8 * day;
      state.retention.lastDailyClaimAt = nowMs - 21 * hour;
      state.retention.dailyStreak = 6;
    });
    await page.getByRole("button", { name: "앨범" }).click();
    await page.locator(".retention-milestone-board").scrollIntoViewIfNeeded();
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await expectNoCriticalTextClipping(page, [
      ".retention-milestone-card h4",
      ".retention-milestone-card .btn",
      ".milestone-sticker span",
    ]);
    const d7Button = page.locator(".retention-milestone-card", { hasText: "황금 숲 단골" }).getByRole("button", { name: "배지 받기" });
    await expectVisibleWithinViewport(d7Button);
    await expectClearOfBottomDock(page, d7Button);
    await d7Button.click();
    await expectModalActionUsable(page, "복귀 배지 도장", "앨범으로 돌아가기");
    await page.getByRole("dialog", { name: "복귀 배지 도장" }).getByRole("button", { name: "앨범으로 돌아가기" }).click();

    await seedSave(page, (state) => {
      setOrange(state, "50000");
    });
    await page.getByRole("button", { name: "설정" }).click();
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await page.getByRole("checkbox", { name: "이펙트 켜기" }).click();
    await expectToastDoesNotBlockActions(page);
    await expectNoCriticalTextClipping(page, [
      ".settings-panel .toggle-label",
      ".settings-actions .btn",
      ".segmented button",
    ]);
    await page.getByRole("button", { name: "세이브 Export/Import" }).click();
    const saveDialog = page.getByRole("dialog", { name: "저장 내보내기/가져오기" });
    await expectVisibleWithinViewport(saveDialog, 0.96);
    await expectVisibleWithinViewport(saveDialog.getByRole("button", { name: "Export 코드 복사" }));
    await expectTextareasAvoidMobileZoom(page);
    await expectNoCriticalTextClipping(page, [
      ".vault-seal-row span",
      ".vault-seal-row strong",
      ".field-heading",
      ".save-ledger-actions .btn",
      ".modal-header h2",
    ]);
    await saveDialog.getByRole("button", { name: "닫기" }).click();

    await seedSave(page, (state, nowMs) => {
      state.generators.orange_basket = 12;
      state.epsAtLastSave = BigNumberLite.from("15");
      state.lastSavedAt = nowMs - 2 * hour;
    });
    await expectModalActionUsable(page, "오프라인 보상", "보상 받기");
    await expectAndroidTextRenderingGuards(page);
    await expectNoCriticalTextClipping(page, [
      ".reward-step-chip",
      ".offline-reward",
      ".modal-actions .btn",
    ]);
  });
}

for (const scale of [1.1, 1.2]) {
  test(`Android font scaling guard ${Math.round(scale * 100)}%`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 21 * hour;
      state.retention.lastDailyClaimAt = null;
      setOrange(state, "2500000");
      state.upgrades.soft_paw = 12;
      state.generators.orange_basket = 16;
    });
    await page.addStyleTag({ content: `:root { font-size: ${scale * 100}% !important; }` });
    await assertBaseShell(page);
    await expectAndroidTextRenderingGuards(page);
    await expectNoCriticalTextClipping(page, [
      ".currency-display strong",
      ".home-ledger-panel strong",
      ".home-daily-badge strong",
    ]);

    await page.getByRole("button", { name: "업그레이드" }).click();
    await page.getByRole("button", { name: "최대", exact: true }).click();
    await scrollCardIntoSafeView(page, 0);
    await expectUpgradeCardSurgeryLayout(page, 0);
    await expectAndroidTextRenderingGuards(page);
    await expectClearOfBottomDock(page, page.locator(".upgrade-card").first().locator(".upgrade-buy-button"));

    await page.getByRole("button", { name: "설정" }).click();
    await page.getByRole("button", { name: "세이브 Export/Import" }).click();
    await expectModalActionUsable(page, "저장 내보내기/가져오기", "Export 코드 복사");
    await expectTextareasAvoidMobileZoom(page);
    await expectAndroidTextRenderingGuards(page);
  });
}
