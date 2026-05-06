import { expect, test } from "@playwright/test";
import { openFresh } from "./helpers";

test("settings and tutorial controls work without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await expect(page.getByText("귤 모으기")).toBeVisible();
  await page.getByRole("button", { name: "다음" }).click();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "업그레이드" })).toBeVisible();
  await page.getByRole("button", { name: "이전" }).click();
  await expect(page.getByText("귤 모으기")).toBeVisible();
  await page.getByRole("button", { name: "건너뛰기" }).click();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByText("이펙트 켜기").click();
  await expect(page.locator(".game-shell")).toHaveAttribute("data-effects-enabled", "false");
  await page.getByText("효과음 음소거").click();
  await page.getByText("배경음 음소거").click();
  await page.getByRole("button", { name: "과학적" }).click();
  await page.getByRole("button", { name: "튜토리얼 다시 보기" }).click();
  await expect(page.getByText("귤 모으기")).toBeVisible();
});
