import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { ensureScreenshotDir, expectNoHorizontalOverflow, openFresh, seedSave, setOrange, skipTutorial } from "./helpers";

const viewports = [
  { name: "360x740", width: 360, height: 740 },
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "desktop-1280x900", width: 1280, height: 900 },
];

const hour = 60 * 60 * 1000;
const day = 24 * hour;

test.beforeAll(() => {
  ensureScreenshotDir();
});

test.describe.configure({ timeout: 120_000 });

for (const viewport of viewports) {
  test(`layout screenshot set ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openFresh(page);
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home-tutorial.png`, fullPage: true });
    await skipTutorial(page);
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home.png`, fullPage: true });
    await page.locator(".content-shell").evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home-progression.png`, fullPage: true });
    await page.locator(".content-shell").evaluate((element) => {
      element.scrollTop = 0;
    });

    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 21 * hour;
      state.retention.lastDailyClaimAt = null;
    });
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home-daily-available.png`, fullPage: true });
    await page.getByRole("button", { name: "복귀 보상 받기" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-daily-reward-claim.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
    await page.getByRole("dialog", { name: "복귀 보상 도장" }).getByRole("button", { name: "정원으로 돌아가기" }).click();

    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 2 * hour;
      state.retention.lastDailyClaimAt = nowMs - 1 * hour;
      state.retention.dailyStreak = 1;
    });
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home-daily-cooldown.png`, fullPage: true });

    await seedSave(page, (state) => {
      state.lifetime.totalPrestiges = 1;
      state.currencies.goldenLeaf = BigNumberLite.from("2");
      state.retention.postPrestigeGoalStep = 0;
    });
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-home-post-prestige-goal.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "업그레이드" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-upgrades.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await seedSave(page, (state) => {
      setOrange(state, "100000");
    });
    await page.getByRole("button", { name: "업그레이드" }).click();
    await page.getByRole("button", { name: "최대" }).click();
    await page.locator(".upgrade-card").first().evaluate((element) => {
      const shell = document.querySelector(".content-shell");
      if (!(shell instanceof HTMLElement) || !(element instanceof HTMLElement)) return;
      const shellRect = shell.getBoundingClientRect();
      const cardRect = element.getBoundingClientRect();
      shell.scrollTop = Math.max(0, shell.scrollTop + cardRect.top - shellRect.top - 156);
    });
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-upgrades-quick-buy.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "앨범" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await seedSave(page, (state, nowMs) => {
      state.retention.firstPlayedAt = nowMs - 8 * day;
      state.retention.lastDailyClaimAt = nowMs - 21 * hour;
      state.retention.dailyStreak = 6;
    });
    await page.getByRole("button", { name: "앨범" }).click();
    await page.locator(".retention-milestone-board").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection-milestones.png`, fullPage: true });
    await page.locator(".retention-milestone-card", { hasText: "황금 숲 단골" }).getByRole("button", { name: "배지 받기" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-milestone-claim.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
    await page.getByRole("dialog", { name: "복귀 배지 도장" }).getByRole("button", { name: "앨범으로 돌아가기" }).click();

    await page.locator(".companion-board").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection-companions.png`, fullPage: true });
    await page.locator(".badge-board").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection-rewards.png`, fullPage: true });
    await page.locator(".content-shell").evaluate((element) => {
      element.scrollTop = 0;
    });

    await seedSave(page, (state) => {
      setOrange(state, "25000000");
      state.companions.friendshipById = {
        momo: 60,
        podo: 60,
        narin: 60,
        dami: 60,
        soda: 60,
        biro: 60,
        ruru: 60,
        hanul: 60,
      };
      state.achievements.unlockedIds = ["first_orange", "soft_paw_1", "basket_1", "storehouse_5k"];
      state.achievements.claimedRewardIds = ["first_orange", "soft_paw_1"];
    });
    await page.waitForTimeout(2500);
    await page.getByRole("button", { name: "앨범" }).click();
    await page.locator(".companion-board").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection-abilities.png`, fullPage: true });
    await page.locator(".badge-board").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection-claim-ready.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await seedSave(page, (state) => {
      setOrange(state, "100000000");
      state.generators.orange_basket = 5;
      state.epsAtLastSave = BigNumberLite.from("1");
    });
    await page.waitForTimeout(2500);
    await page.getByRole("button", { name: "환생" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-prestige.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
    await page.getByRole("button", { name: "환생하기" }).click();
    await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-prestige-result.png`, fullPage: true });
    await page.getByRole("dialog", { name: "새 계절 시작" }).getByRole("button", { name: "정원으로 돌아가기" }).click();

    await page.getByRole("button", { name: "상점" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-shop.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await seedSave(page, (state, nowMs) => {
      state.generators.orange_basket = 10;
      state.epsAtLastSave = BigNumberLite.from("2");
      state.lastSavedAt = nowMs - 2 * 60 * 60 * 1000;
    });
    await expect(page.getByRole("dialog", { name: "오프라인 보상" })).toBeVisible();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-offline-reward.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
    await page.getByRole("button", { name: "보상 받기", exact: true }).click();

    await page.getByRole("button", { name: "설정" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-settings.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "세이브 Export/Import" }).click();
    await expect(page.getByRole("dialog", { name: "저장 내보내기/가져오기" })).toBeVisible();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-save-modal.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
  });
}
