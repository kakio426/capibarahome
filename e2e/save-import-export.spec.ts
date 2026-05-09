import { expect, test } from "@playwright/test";
import { openFresh, skipTutorial, tapCapybara } from "./helpers";

test("save, reload, export, reset, and import without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await tapCapybara(page, 18);
  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByRole("button").click();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "강제 저장" }).click();
  await page.reload();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "저장 코드 보관함" }).click();
  const exportCode = await page.locator("textarea[readonly]").inputValue();
  expect(exportCode.length).toBeGreaterThan(50);
  await page.getByLabel("닫기").click();

  await page.getByRole("button", { name: "저장 데이터 초기화" }).click();
  await page.getByRole("dialog", { name: "저장 초기화" }).getByRole("button", { name: "초기화" }).click();
  await expect(page.getByText("귤 모으기")).toBeVisible();
  await page.getByRole("button", { name: "건너뛰기" }).click();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "저장 코드 보관함" }).click();
  await page.locator("textarea:not([readonly])").fill(exportCode);
  await page.getByRole("button", { name: "저장 데이터 불러오기" }).click();
  await expect(page.getByText("불러오기가 완료되었습니다.")).toBeVisible();
  await page.getByLabel("닫기").click();
  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByText("Lv.1")).toBeVisible();
});
