import { expect, test } from "@playwright/test";
import { openFresh, skipTutorial } from "./helpers";

test("ad and IAP mock provider flows are available in development build without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await page.getByRole("button", { name: "상점" }).click();

  await page.getByRole("button", { name: "광고 보상 받기" }).click();
  await expect(page.locator(".toast", { hasText: "귤 수확 축제가 시작" })).toBeVisible();

  await page.locator(".product-card", { hasText: "황금 나뭇잎 팩" }).getByRole("button", { name: "샌드박스 수령" }).click();
  await expect(page.locator(".toast", { hasText: "황금 나뭇잎 팩 샌드박스 보상" })).toBeVisible();
  await expect(page.locator(".product-card", { hasText: "황금 나뭇잎 팩" }).getByText("수령 완료")).toBeVisible();
});
