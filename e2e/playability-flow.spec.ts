import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectToastDoesNotBlockActions, openFresh, seedSave, setOrange, skipTutorial } from "./helpers";

test.describe.configure({ timeout: 120_000 });

test("home tap gives immediate currency and floating feedback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openFresh(page);
  await skipTutorial(page);

  await expect(page.getByLabel("Device QA diagnostics")).toHaveCount(0);
  await expect(page.locator(".next-action-panel")).toContainText("귤 주기 리듬 만들기");

  const orangeValue = page.locator(".currency-display").first().locator("strong");
  await expect(orangeValue).toHaveText("0");
  const tapButton = page.getByRole("button", { name: /귤 주기/ });
  await tapButton.click();
  await expect(page.locator(".floating-text")).toContainText("+1 귤");
  await expect(orangeValue).not.toHaveText("0");

  for (let index = 0; index < 4; index += 1) {
    await tapButton.click();
  }
  await expect(page.locator(".next-action-panel")).toContainText("앨범 보상 수령");
});

test("upgrade buy and quick-buy max show purchase result clearly", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await seedSave(page, (state) => {
    setOrange(state, "100000");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.getByRole("button", { name: "최대", exact: true }).click();

  const firstCard = page.locator(".upgrade-card").first();
  await expect(firstCard.locator(".upgrade-buy-delta")).toContainText(/레벨 0 →/);
  await expect(firstCard.locator(".upgrade-buy-delta")).toContainText(/터치/);
  await firstCard.getByRole("button", { name: /최대 \d+회/ }).click();
  await expect(firstCard.locator(".upgrade-purchase-feedback")).toBeVisible();
  await expect(firstCard.locator(".upgrade-purchase-feedback")).toContainText(/레벨 0 →/);
});

test("claimable quest reward gives visible reward feedback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seedSave(page, (state) => {
    state.lifetime.totalTaps = 1;
    state.lifetime.totalOrangesEarned = BigNumberLite.from("1");
  });

  await page.getByRole("button", { name: "앨범" }).click();
  const claimButton = page.locator(".quest-card", { hasText: "첫 귤 건네기" }).getByRole("button", { name: /보상/ });
  await expect(claimButton).toBeEnabled();
  await claimButton.click();
  await expect(page.locator(".album-reveal-banner")).toBeVisible();
  await expect(page.locator(".album-reveal-banner")).toContainText("새 기록");
});

test("daily reward modal and tab switching remain clickable around toast", async ({ page }) => {
  const hour = 60 * 60 * 1000;
  await page.setViewportSize({ width: 390, height: 844 });
  await seedSave(page, (state, nowMs) => {
    state.retention.firstPlayedAt = nowMs - 21 * hour;
    state.retention.lastDailyClaimAt = null;
  });

  await page.getByRole("button", { name: "복귀 보상 받기" }).click();
  const rewardDialog = page.getByRole("dialog", { name: "복귀 보상 도장" });
  await expect(rewardDialog).toBeVisible();
  await expect(rewardDialog).toContainText("오늘 받은 보상");
  await rewardDialog.getByRole("button", { name: "정원으로 돌아가기" }).click();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("checkbox", { name: "이펙트 켜기" }).click();
  await expectToastDoesNotBlockActions(page);
  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.getByRole("button", { name: /귤 주기/ })).toBeVisible();
});

test("disabled upgrade action is visibly disabled and does not mutate state", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await seedSave(page, (state) => {
    setOrange(state, "0");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  const firstCard = page.locator(".upgrade-card").first();
  const disabledBuy = firstCard.getByRole("button", { name: "대기" });
  await expect(disabledBuy).toBeDisabled();
  await expect(firstCard.locator(".cost-plaque")).toContainText("귤 부족");
  await expect(firstCard.locator(".upgrade-purchase-feedback")).toHaveCount(0);
});

test("device QA overlay is debug-only and records tap targets", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openFresh(page);
  await skipTutorial(page);
  await expect(page.getByLabel("Device QA diagnostics")).toHaveCount(0);

  await openFresh(page, "/?deviceQa=1");
  await skipTutorial(page);
  await page.getByRole("button", { name: /귤 주기/ }).click();
  const overlay = page.getByLabel("Device QA diagnostics");
  await expect(overlay).toBeVisible();
  await expect(overlay).toContainText("Recent taps");
  await expect(overlay).toContainText("button");
});
