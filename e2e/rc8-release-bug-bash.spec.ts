import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectNoHorizontalOverflow, seedSave, setOrange } from "./helpers";

const hour = 60 * 60 * 1000;
const day = 24 * hour;

test("D1 daily reward and offline reward resolve in one normal return session", async ({ page }) => {
  await seedSave(page, (state, nowMs) => {
    state.retention.firstPlayedAt = nowMs - day;
    state.retention.lastDailyClaimAt = null;
    state.generators.orange_basket = 10;
    state.epsAtLastSave = BigNumberLite.from("2");
    state.lastSavedAt = nowMs - 2 * hour;
  });

  await expect(page.locator(".debug-panel")).toHaveCount(0);
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toBeVisible();
  await page.getByRole("button", { name: "보상 받기", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toHaveCount(0);
  await expect(page.locator(".retention-panel")).toContainText("수령 가능");
  await page.getByRole("button", { name: "복귀 보상 받기" }).click();
  await expect(page.locator(".toast", { hasText: "복귀 보상 수령" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("button", { name: "복귀 보상 받기" })).toBeDisabled();
  await expect(page.locator(".retention-panel")).toContainText("남음");
});

test("first prestige goal claim survives reload without debug shortcuts", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "100000000");
    state.upgrades.soft_paw = 4;
    state.generators.orange_basket = 8;
  });

  await page.getByRole("button", { name: "환생" }).click();
  await page.getByRole("button", { name: "환생하기" }).click();
  await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
  await page.getByRole("dialog", { name: "새 계절 시작" }).getByRole("button", { name: "정원으로 돌아가기" }).click();
  await page.getByRole("button", { name: "홈" }).click();
  await page.getByRole("button", { name: "목표 보상 받기" }).click();
  await expect(page.locator(".toast", { hasText: "첫 계절을 넘기기" })).toBeVisible();

  await page.reload();
  await expect(page.locator(".retention-goal-card")).toContainText("황금 나뭇잎 2개 보유");
  await expect(page.locator(".debug-panel")).toHaveCount(0);
});

test("quick-buy max purchase remains stable after save and reload", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "1000000");
  });

  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.getByRole("button", { name: "최대", exact: true }).click();
  const basket = page.locator(".upgrade-card", { hasText: "귤 바구니" });
  await basket.getByRole("button", { name: /최대 \d+회/ }).click();
  const levelText = await basket.locator(".upgrade-meta").textContent();
  expect(levelText).toContain("Lv.");

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "강제 저장" }).click();
  await page.reload();
  await page.getByRole("button", { name: "업그레이드" }).click();
  await expect(page.locator(".upgrade-card", { hasText: "귤 바구니" }).locator(".upgrade-meta")).toContainText(/Lv\.[1-9]/);
});

test("settings toggles keep touch, purchase, and modal flows usable at 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await seedSave(page, (state) => {
    setOrange(state, "1000");
  });

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByText("이펙트 켜기").click();
  await page.getByText("효과음 음소거").click();
  await page.getByText("진동 켜기").click();
  await expect(page.locator(".game-shell")).toHaveAttribute("data-effects-enabled", "false");

  await page.getByRole("button", { name: "홈" }).click();
  await page.getByRole("button", { name: /귤 주기/ }).click();
  await page.getByRole("button", { name: "업그레이드" }).click();
  await page.locator(".upgrade-card", { hasText: "말랑 앞발" }).getByRole("button").click();
  await expect(page.locator(".toast")).toBeVisible();

  await page.getByRole("button", { name: "설정" }).click();
  await page.getByRole("button", { name: "세이브 Export/Import" }).click();
  await expect(page.getByRole("dialog", { name: "저장 내보내기/가져오기" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  const modalBox = await page.locator(".modal").boundingBox();
  expect(modalBox?.y ?? 0).toBeGreaterThanOrEqual(0);
  expect((modalBox?.height ?? 0) + (modalBox?.y ?? 0)).toBeLessThanOrEqual(740);
});

test("repeated tab switching does not expose debug helpers or block clicks", async ({ page }) => {
  await seedSave(page, (state) => {
    setOrange(state, "50000");
  });
  const tabs = ["홈", "업그레이드", "앨범", "환생", "상점", "설정"];
  for (let index = 0; index < 24; index += 1) {
    await page.getByRole("button", { name: tabs[index % tabs.length] }).click();
  }
  await expect(page.locator(".debug-panel")).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  await page.getByRole("button", { name: "홈" }).click();
  await expect(page.getByRole("button", { name: /귤 주기/ })).toBeVisible();
});
