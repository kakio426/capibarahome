import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import {
  expectClearOfBottomDock,
  expectModalActionUsable,
  expectNoCriticalTextClipping,
  expectNoHorizontalOverflow,
  expectVisibleWithinViewport,
  seedSave,
  setOrange,
} from "./helpers";

test.describe.configure({ timeout: 120_000 });

const hour = 60 * 60 * 1000;
const day = 24 * hour;

const viewports = [
  { name: "360x740", width: 360, height: 740 },
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
    await expectVisibleWithinViewport(page.locator(".home-daily-badge"), 0.95);
    await expectClearOfBottomDock(page, page.locator(".home-daily-badge"));
    await expectNoCriticalTextClipping(page, [
      ".currency-display strong",
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
    await expectNoCriticalTextClipping(page, [
      ".reward-step-chip",
      ".offline-reward",
      ".modal-actions .btn",
    ]);
  });
}
