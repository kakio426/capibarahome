import { expect, test } from "@playwright/test";
import { seedSave, setOrange } from "./helpers";

test("upgrade purchase states match available oranges", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "120");
    state.lifetime.totalTaps = 120;
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByRole("button").click();
  await page.locator(".upgrade-card", { hasText: "귤 바구니" }).getByRole("button").click();

  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "귤 바구니" }).getByText("Lv.1")).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "따뜻한 온천" }).getByRole("button")).toBeDisabled();
  await expect(page.getByText(/귤 부족/).first()).toBeVisible();
});

test("quick-buy 10 and max modes work without debug shortcuts", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "100000");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.getByRole("button", { name: "1개" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "10개" }).click();
  await expect(page.getByRole("button", { name: "10개" })).toHaveAttribute("aria-pressed", "true");
  const softPaw = page.locator(".upgrade-card", { hasText: "말랑 앞발" });
  await expect(softPaw.getByRole("button", { name: /10회 구매/ })).toBeEnabled();
  await softPaw.getByRole("button", { name: /10회 구매/ }).click();
  await expect(softPaw.getByText("Lv.10")).toBeVisible();

  await page.getByRole("button", { name: "최대", exact: true }).click();
  await expect(page.getByRole("button", { name: "최대", exact: true })).toHaveAttribute("aria-pressed", "true");
  const basket = page.locator(".upgrade-card", { hasText: "귤 바구니" });
  await expect(basket.getByRole("button", { name: /최대 \d+회/ })).toBeEnabled();
  await basket.getByRole("button", { name: /최대 \d+회/ }).click();
  await expect(basket.getByText(/Lv\.[1-9]\d*/)).toBeVisible();
  await expect(page.locator(".debug-panel")).toHaveCount(0);
});
