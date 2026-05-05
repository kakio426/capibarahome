import { expect, test } from "@playwright/test";
import { seedSave, setOrange } from "./helpers";

test("prestige flow preserves permanent currency and resets regular progress", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "100000000");
    state.upgrades.soft_paw = 3;
    state.generators.orange_basket = 5;
  });

  await page.getByRole("button", { name: "환생" }).click();
  await expect(page.locator(".prestige-badge", { hasText: "환생 가능" })).toBeVisible();
  await page.getByRole("button", { name: "환생하기" }).click();
  await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
  await expect(page.locator(".toast", { hasText: "환생 완료" })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.0")).toBeVisible();
});
