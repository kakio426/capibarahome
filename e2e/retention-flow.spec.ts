import { expect, test } from "@playwright/test";
import { openFresh, seedSave, setOrange, skipTutorial } from "./helpers";

const hour = 60 * 60 * 1000;
const day = 24 * hour;

test("new user sees retention panel without debug shortcuts", async ({ page }) => {
  await openFresh(page);
  await skipTutorial(page);
  await expect(page.locator(".debug-panel")).toHaveCount(0);
  await expect(page.locator(".retention-panel")).toBeVisible();
  await expect(page.getByRole("button", { name: "복귀 보상 받기" })).toBeDisabled();
  await expect(page.getByText("환생 이후 목표")).toBeVisible();
});

test("seeded D1 daily reward can be claimed once and survives reload", async ({ page }) => {
  await seedSave(page, (state, nowMs) => {
    state.retention.firstPlayedAt = nowMs - 21 * hour;
    state.retention.lastDailyClaimAt = null;
    state.retention.dailyStreak = 0;
  });

  await expect(page.locator(".retention-panel")).toContainText("수령 가능");
  await page.getByRole("button", { name: "복귀 보상 받기" }).click();
  await expect(page.locator(".toast", { hasText: "복귀 보상 수령" })).toBeVisible();
  await expect(page.locator(".retention-reveal-banner")).toBeVisible();

  await page.reload();
  await expect(page.getByRole("button", { name: "복귀 보상 받기" })).toBeDisabled();
  await expect(page.locator(".retention-panel")).toContainText("남음");
});

test("D3 and D7 milestone badges claim without debug shortcuts", async ({ page }) => {
  await seedSave(page, (state, nowMs) => {
    state.retention.firstPlayedAt = nowMs - 8 * day;
    state.retention.lastDailyClaimAt = nowMs - 21 * hour;
    state.retention.dailyStreak = 6;
  });

  await page.getByRole("button", { name: "앨범" }).click();
  const d3 = page.locator(".retention-milestone-card", { hasText: "꾸준한 집사" });
  const d7 = page.locator(".retention-milestone-card", { hasText: "황금 숲 단골" });
  await expect(d3).toContainText("보상");
  await expect(d7).toContainText("보상");
  await d3.getByRole("button", { name: "배지 받기" }).click();
  await expect(d3.getByRole("button")).toHaveText("받음");
  await d7.getByRole("button", { name: "배지 받기" }).click();
  await expect(d7.getByRole("button")).toHaveText("받음");

  await page.reload();
  await page.getByRole("button", { name: "앨범" }).click();
  await expect(page.locator(".retention-milestone-card", { hasText: "꾸준한 집사" }).getByRole("button")).toHaveText("받음");
  await expect(page.locator(".retention-milestone-card", { hasText: "황금 숲 단골" }).getByRole("button")).toHaveText("받음");
});

test("first prestige reveals the post-prestige goal chain", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "100000000");
    state.upgrades.soft_paw = 3;
    state.generators.orange_basket = 5;
  });

  await page.getByRole("button", { name: "환생" }).click();
  await page.getByRole("button", { name: "환생하기" }).click();
  await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
  await expect(page.getByRole("dialog", { name: "새 계절 시작" })).toContainText("다음 목표");
  await expect(page.getByRole("dialog", { name: "새 계절 시작" })).toContainText("첫 계절을 넘기기");
  await page.getByRole("dialog", { name: "새 계절 시작" }).getByRole("button", { name: "정원으로 돌아가기" }).click();

  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.locator(".retention-goal-card")).toContainText("첫 계절을 넘기기");
  await page.getByRole("button", { name: "목표 보상 받기" }).click();
  await expect(page.locator(".toast", { hasText: "첫 계절을 넘기기" })).toBeVisible();

  await page.reload();
  await expect(page.locator(".retention-goal-card")).toContainText("황금 나뭇잎 2개 보유");
});
