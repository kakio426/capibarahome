import { expect, test } from "@playwright/test";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { ensureScreenshotDir, expectNoHorizontalOverflow, openFresh, seedSave, setOrange, skipTutorial } from "./helpers";

const viewports = [
  { name: "360x740", width: 360, height: 740 },
  { name: "390x844", width: 390, height: 844 },
  { name: "430x932", width: 430, height: 932 },
  { name: "desktop-1280x900", width: 1280, height: 900 },
];

test.beforeAll(() => {
  ensureScreenshotDir();
});

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

    await page.getByRole("button", { name: "업그레이드" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-upgrades.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "앨범" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-collection.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
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

    await page.getByRole("button", { name: "상점" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-shop.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "설정" }).click();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-settings.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);

    await page.getByRole("button", { name: "세이브 Export/Import" }).click();
    await expect(page.getByRole("dialog", { name: "저장 내보내기/가져오기" })).toBeVisible();
    await page.screenshot({ path: `qa-screenshots/${viewport.name}-save-modal.png`, fullPage: true });
    await expectNoHorizontalOverflow(page);
  });
}
