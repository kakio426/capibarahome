import { expect, test } from "@playwright/test";
import { openFresh } from "./helpers";

async function openDebug(page: import("@playwright/test").Page) {
  const debug = page.locator(".debug-panel");
  await expect(debug).toBeVisible();
  const detailsOpen = await debug.evaluate((node) => (node as HTMLDetailsElement).open);
  if (!detailsOpen) {
    await debug.locator("summary").click();
  }
}

test("debug shortcut flow is isolated behind debug query", async ({ page }) => {
  await openFresh(page, "/?debug=1");
  await openDebug(page);
  await page.getByRole("button", { name: "귤 1,000,000" }).click();
  await page.getByRole("button", { name: "환생 가능" }).click();
  await page.getByRole("button", { name: "광고 버프" }).click();
  await expect(page.locator(".toast", { hasText: "광고 버프 적용" })).toBeVisible();
});

test("debug long growth QA reaches late content without using debug in normal flows", async ({ page }) => {
  await openFresh(page, "/?debug=1");
  await openDebug(page);
  await page.getByRole("button", { name: "귤 1,000,000" }).click();
  await page.getByRole("button", { name: "황금 나뭇잎" }).click();

  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "따뜻한 온천" })).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "황금 숲길" })).toBeVisible();
  await expect(page.locator(".upgrade-card", { hasText: "계절 기억문" }).getByRole("button")).toBeDisabled();

  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.getByText("정원 컬렉션")).toBeVisible();
});

test("debug retention helpers are only available in debug mode", async ({ page }) => {
  await openFresh(page);
  await expect(page.getByRole("button", { name: "일일 보상 가능" })).toHaveCount(0);

  await openFresh(page, "/?debug=1");
  await openDebug(page);
  await page.getByRole("button", { name: "일일 보상 가능" }).click();
  await expect(page.locator(".toast", { hasText: "일일 보상 가능 상태" })).toBeVisible();
  await page.getByRole("button", { name: "리텐션 7일" }).click();
  await expect(page.locator(".toast", { hasText: "리텐션 7일차" })).toBeVisible();
  await page.getByRole("button", { name: "마일스톤 초기화" }).click();
  await expect(page.locator(".toast", { hasText: "복귀 마일스톤 초기화" })).toBeVisible();
  await page.getByRole("button", { name: "환생 목표 +1" }).click();
  await expect(page.locator(".toast", { hasText: "환생 목표 단계 이동" })).toBeVisible();
});
