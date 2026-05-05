import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { openFresh, seedSave, skipTutorial, tapCapybara } from "./helpers";

test("collection reward and achievement claim work without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await tapCapybara(page, 1);

  await page.getByRole("button", { name: "앨범" }).click();
  const firstOrangeBadge = page.locator(".collection-badge", { hasText: "첫 귤 인사" });
  await expect(firstOrangeBadge).toContainText("보상:");
  await firstOrangeBadge.getByRole("button", { name: "보상 받기" }).click();
  await expect(firstOrangeBadge.getByRole("button", { name: "보상 받음" })).toBeVisible();
  await expect(page.getByText(/업적 보상/)).toBeVisible();
  await expect(page.locator(".companion-card", { hasText: "모모" })).toContainText("첫 귤 감각");
});

test("capybara passive ability is visible and reflected in player-facing income", async ({ page }) => {
  await seedSave(page, (state) => {
    state.companions.friendshipById.momo = 30;
    state.lifetime.totalOrangesEarned = BigNumberLite.from("1000");
  });

  await expect(page.locator(".metric-tile", { hasText: "터치당" })).toContainText("1.12");
  await page.getByRole("button", { name: "앨범" }).click();
  await expect(page.locator(".companion-card", { hasText: "모모" })).toContainText("현재 +12%");
});

test("sound mute setting is connected to the app state", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await expect(page.locator(".game-shell")).toHaveAttribute("data-sound-muted", "false");

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByText("효과음 음소거").click();
  await expect(page.locator(".game-shell")).toHaveAttribute("data-sound-muted", "true");
});

test("home screen always shows the long-term goal before and after prestige", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await expect(page.getByText("장기 목표")).toBeVisible();
  await expect(page.getByText("첫 환생 준비")).toBeVisible();

  await seedSave(page, (state) => {
    state.lifetime.totalPrestiges = 1;
    state.currencies.goldenLeaf = BigNumberLite.from("2");
    state.lifetime.totalOrangesEarned = BigNumberLite.from("1200000");
  });
  await expect(page.getByText("장기 목표")).toBeVisible();
  await expect(page.getByText("환생 이후 정원 재건")).toBeVisible();
});
