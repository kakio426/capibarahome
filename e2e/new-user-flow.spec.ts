import { expect, test } from "@playwright/test";
import { openFresh, skipTutorial, tapCapybara } from "./helpers";

test("new user flow without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await expect(page.getByText("귤 모으기")).toBeVisible();
  await skipTutorial(page);
  await expect(page.getByText("다음 목표")).toBeVisible();
  await expect(page.getByText("정원 컬렉션")).toBeVisible();
  await expect(page.getByText("오늘 할 일")).toBeVisible();
  await tapCapybara(page, 16);

  await page.getByRole("button", { name: "앨범" }).click();
  await expect(page.getByRole("heading", { name: "앨범과 할 일" })).toBeVisible();
  await expect(page.locator(".quest-card", { hasText: "첫 귤 건네기" })).toBeVisible();
  await page.locator(".quest-card", { hasText: "첫 귤 건네기" }).getByRole("button", { name: /보상/ }).click();
  await expect(page.locator(".quest-card", { hasText: "첫 귤 건네기" }).getByRole("button", { name: "완료" })).toBeVisible();

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByRole("button").click();
  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();

  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.locator(".metric-tile", { hasText: "터치당" })).toBeVisible();
  await expect(page.locator(".debug-panel")).toHaveCount(0);
});
