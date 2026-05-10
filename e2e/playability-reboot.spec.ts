import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectClearOfBottomDock, expectToastDoesNotBlockActions, openFresh, seedSave, setOrange, skipTutorial } from "./helpers";

test.describe.configure({ timeout: 120_000 });

const hour = 60 * 60 * 1000;

test("RC20 first screen has one clear tap action and immediate reward feedback", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await openFresh(page);
  await skipTutorial(page);

  const tapButton = page.getByRole("button", { name: /귤 주기/ });
  await expect(tapButton).toBeVisible();
  await expect(tapButton).toBeEnabled();
  await expectClearOfBottomDock(page, tapButton);
  await expect(page.locator(".next-action-panel")).toContainText("귤 주기 리듬 만들기");
  await expect(page.getByLabel("Device QA diagnostics")).toHaveCount(0);

  const orangeValue = page.locator(".currency-display").first().locator("strong");
  await expect(orangeValue).toHaveText("0");
  for (let index = 0; index < 10; index += 1) {
    await tapButton.click();
  }
  await expect(orangeValue).not.toHaveText("0");
  await expect(page.locator(".floating-text", { hasText: "귤" }).first()).toBeVisible();
  await expect(page.locator(".next-action-panel")).toContainText("앨범 보상 수령");
});

test("RC20 growth screen makes purchase result and quick-buy max clear", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await seedSave(page, (state) => {
    setOrange(state, "100000");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.getByRole("button", { name: "최대", exact: true }).click();
  const firstCard = page.locator(".upgrade-card").first();
  await expect(firstCard).toContainText("레벨 0");
  await expect(firstCard.locator(".upgrade-buy-delta")).toContainText(/→/);
  await expect(firstCard.locator(".cost-plaque")).toContainText("귤");
  const buyButton = firstCard.getByRole("button", { name: /최대 \d+회/ });
  await expect(buyButton).toBeEnabled();
  await expectClearOfBottomDock(page, buyButton);
  await buyButton.click();
  await expect(firstCard.locator(".upgrade-purchase-feedback")).toContainText("성장");
});

test("RC20 reward sheet shows what was gained and what comes next", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedSave(page, (state, nowMs) => {
    state.retention.firstPlayedAt = nowMs - 21 * hour;
    state.retention.lastDailyClaimAt = null;
  });

  await page.locator(".home-daily-badge").click();
  const rewardDialog = page.getByRole("dialog", { name: "복귀 보상 도장" });
  await expect(rewardDialog).toBeVisible();
  await expect(rewardDialog).toContainText("오늘 받은 보상");
  await expect(rewardDialog).toContainText("다음 보상");
  await expect(rewardDialog.getByRole("button", { name: "정원으로 돌아가기" })).toBeEnabled();
});

test("RC20 first 10 minute guidance prefers growth loop over shop prompts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedSave(page, (state) => {
    state.lifetime.totalTaps = 6;
    state.lifetime.totalOrangesEarned = BigNumberLite.from("100");
    setOrange(state, "100");
  });

  await expect(page.locator(".next-action-panel")).toContainText(/말랑 앞발|앨범 보상|귤 바구니|준비/);
  await expect(page.locator(".next-action-panel")).not.toContainText(/상점|광고|상품/);
  await page.locator("[data-qa='next-action-cta']").click();
  await expect(page.locator(".upgrade-card").first().or(page.locator(".quest-card").first()).or(page.getByRole("button", { name: /귤 주기/ }))).toBeVisible();
});

test("RC20 touch layers, toast, modal, and bottom nav do not block main actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedSave(page, (state) => {
    setOrange(state, "0");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  const disabledBuy = page.locator(".upgrade-card").first().getByRole("button", { name: "대기" });
  await expect(disabledBuy).toBeDisabled();
  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("checkbox", { name: "이펙트 켜기" }).click();
  await expectToastDoesNotBlockActions(page);
  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.getByRole("button", { name: /귤 주기/ })).toBeEnabled();

  await openFresh(page, "/?deviceQa=1");
  await skipTutorial(page);
  await page.getByRole("button", { name: /귤 주기/ }).click();
  await expect(page.getByLabel("Device QA diagnostics")).toBeVisible();
});
