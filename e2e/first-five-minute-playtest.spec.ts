import { expect, Page, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectNoHorizontalOverflow, openFresh, seedSave, skipTutorial, tapCapybara } from "./helpers";

async function claimQuest(page: Page, title: string) {
  const card = page.locator(".quest-card", { hasText: title });
  await card.scrollIntoViewIfNeeded();
  const button = card.getByRole("button", { name: /보상/ });
  await expect(button).toBeEnabled();
  await button.click();
  await expect(card.getByRole("button", { name: "완료" })).toBeVisible();
  await expect(page.locator(".album-reveal-banner")).toBeVisible();
}

async function buyUpgrade(page: Page, name: string) {
  const card = page.locator(".upgrade-card", { hasText: name });
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByRole("button")).toBeEnabled();
  await card.getByRole("button").click();
}

async function claimAchievement(page: Page, title: string) {
  const badge = page.locator(".collection-badge", { hasText: title });
  await badge.scrollIntoViewIfNeeded();
  const button = badge.getByRole("button", { name: "보상 받기" });
  await expect(button).toBeEnabled();
  await button.click();
  await expect(badge.getByRole("button", { name: "보상 받음" })).toBeVisible();
  await expect(page.locator(".album-reveal-banner")).toBeVisible();
}

test("first five-minute manual playtest covers reward, save, decoration, and companion loops without debug", async ({ page }) => {
  test.setTimeout(60_000);
  await openFresh(page);
  await skipTutorial(page);
  await expect(page.locator(".debug-panel")).toHaveCount(0);
  await tapCapybara(page, 60);

  await page.getByRole("button", { name: "앨범" }).click();
  await claimQuest(page, "첫 귤 건네기");
  await claimQuest(page, "손끝 리듬 만들기");
  await claimAchievement(page, "첫 귤 인사");
  await claimAchievement(page, "손끝 예열");

  await page.getByRole("button", { name: "업그레이드" }).click();
  await buyUpgrade(page, "말랑 앞발");
  await buyUpgrade(page, "귤 바구니");

  await page.getByRole("button", { name: "앨범" }).click();
  await claimQuest(page, "말랑 앞발 마련");
  await claimQuest(page, "자동 바구니 놓기");
  await claimAchievement(page, "말랑 첫걸음");
  await claimAchievement(page, "첫 자동 바구니");

  const decoration = page.locator(".decoration-card", { hasText: "앞발 도장길" });
  await decoration.scrollIntoViewIfNeeded();
  await expect(decoration.getByRole("button", { name: "배치" })).toBeEnabled();
  await decoration.getByRole("button", { name: "배치" }).click();
  await expect(decoration.getByRole("button", { name: "배치됨" })).toBeVisible();

  const momo = page.locator(".companion-card", { hasText: "모모" });
  await momo.scrollIntoViewIfNeeded();
  await expect(momo).toContainText(/현재 \+\d+%/);

  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "visible" });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.getByRole("button", { name: "홈" }).click();
  await tapCapybara(page, 5);
  await expect(page.getByText("다음 목표")).toBeVisible();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "강제 저장" }).click();
  await page.reload();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();
  await page.getByRole("button", { name: "앨범" }).click();
  await expect(page.locator(".decoration-card", { hasText: "앞발 도장길" }).getByRole("button", { name: "배치됨" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("first five-minute return session shows offline reward once without debug", async ({ page }) => {
  await seedSave(page, (state, nowMs) => {
    state.currencies.orange = BigNumberLite.from("180000");
    state.lifetime.totalOrangesEarned = BigNumberLite.from("220000");
    state.lifetime.totalTaps = 360;
    state.upgrades.soft_paw = 8;
    state.upgrades.butler_gloves = 3;
    state.generators.orange_basket = 12;
    state.generators.nap_mat = 4;
    state.quests.claimedIds = [
      "welcome_first_orange",
      "welcome_steady_ten",
      "welcome_soft_paw",
      "welcome_first_basket",
    ];
    state.achievements.unlockedIds = ["first_orange", "ten_taps", "soft_paw_1", "basket_1"];
    state.achievements.claimedRewardIds = ["first_orange", "ten_taps", "soft_paw_1", "basket_1"];
    state.companions.friendshipById = { momo: 15, podo: 8 };
    state.decorations.equippedBySlot.ground = "soft_paw_stamp";
    state.decorations.equippedBySlot.storage = "orange_basket_corner";
    state.epsAtLastSave = BigNumberLite.from("30");
    state.lastSavedAt = nowMs - 11 * 60 * 1000;
  });

  await expect(page.locator(".debug-panel")).toHaveCount(0);
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toBeVisible();
  await page.getByRole("button", { name: "보상 받기" }).click();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
  await page.getByRole("button", { name: "앨범" }).click();
  await expect(page.locator(".companion-card", { hasText: "모모" })).toContainText(/현재 \+\d+%/);
});
