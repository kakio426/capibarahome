import { expect, test } from "@playwright/test";
import { openFresh, skipTutorial, tapCapybara } from "./helpers";

test("upgrade purchase states match available oranges", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await tapCapybara(page, 50);

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByRole("button").click();
  await page.locator(".upgrade-card", { hasText: "귤 바구니" }).getByRole("button").click();

  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "귤 바구니" }).getByText("Lv.1")).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "따뜻한 온천" }).getByRole("button")).toBeDisabled();
  await expect(page.getByText(/귤 부족/).first()).toBeVisible();
});
