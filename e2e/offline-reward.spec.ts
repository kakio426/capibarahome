import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { seedSave } from "./helpers";

test("offline reward appears on return and does not duplicate", async ({ page }) => {
  await seedSave(page, (state, nowMs) => {
    state.generators.orange_basket = 10;
    state.epsAtLastSave = BigNumberLite.from("2");
    state.lastSavedAt = nowMs - 2 * 60 * 60 * 1000;
  });

  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toBeVisible();
  await expect(page.getByText(/동안 카피바라가 귤을 모았습니다/)).toBeVisible();
  await expect(page.locator(".reward-reveal-visual")).toBeVisible();
  await expect(page.locator(".reward-count", { hasText: /귤/ })).toBeVisible();
  await page.getByRole("button", { name: "보상 받기", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);

  await page.reload();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
});
