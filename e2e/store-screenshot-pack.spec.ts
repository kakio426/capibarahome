import { expect, test } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectNoHorizontalOverflow, seedSave, setOrange } from "./helpers";

test.describe.configure({ timeout: 180_000 });

const devices = [
  { name: "iphone", width: 1290, height: 2796, scale: 1.58, top: 620, shellHeight: 980 },
  { name: "android", width: 1080, height: 1920, scale: 1.22, top: 370, shellHeight: 900 },
];

const shots = [
  {
    id: "01-home",
    tab: "홈",
    title: "귤 정원이 바로 살아나요",
    subtitle: "터치할 때마다 수확과 자동 생산이 쌓이는 카피바라 방치형 정원",
  },
  {
    id: "02-upgrade",
    tab: "업그레이드",
    title: "도구 선반을 빠르게 채우세요",
    subtitle: "1개, 10개, 최대 구매로 성장 리듬을 원하는 속도로 조절합니다",
  },
  {
    id: "03-milestone",
    tab: "앨범",
    title: "돌아올 때마다 찍히는 배지",
    subtitle: "D1, D3, D7 복귀 기록이 정원 장부에 남습니다",
    modal: "milestone",
  },
  {
    id: "04-prestige",
    tab: "환생",
    title: "황금 나뭇잎 의식",
    subtitle: "새 계절 보상, 배율 상승, 다음 목표를 한 번에 확인합니다",
    modal: "prestige-result",
  },
  {
    id: "05-reward",
    tab: "홈",
    title: "오늘의 보상이 기다려요",
    subtitle: "오프라인 수확과 복귀 보상으로 다시 켜는 순간이 즐거워집니다",
    modal: "daily",
  },
];

const storeKeyVisualDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "src/assets/raster/release/store-key-visual.png")).toString("base64")}`;

test.beforeAll(() => {
  mkdirSync("store-screenshots", { recursive: true });
});

async function seedShowcaseSave(page: Parameters<typeof seedSave>[0]) {
  await seedSave(page, (state, nowMs) => {
    setOrange(state, "12850000");
    state.currencies.goldenLeaf = BigNumberLite.from("7");
    state.generators.orange_basket = 42;
    state.generators.storehouse = 18;
    state.generators.onsen_snack_counter = 7;
    state.upgrades.soft_paw = 36;
    state.upgrades.butler_gloves = 22;
    state.upgrades.leaf_polish = 8;
    state.lifetime.totalTaps = 2480;
    state.lifetime.totalPrestiges = 2;
    state.lifetime.totalOrangesEarned = BigNumberLite.from("42000000");
    state.epsAtLastSave = BigNumberLite.from("9300");
    state.lastSavedAt = nowMs;
    state.progression.unlockedTierIds = ["yard", "storehouse", "onsen", "bamboo_garden", "golden_forest"];
    state.achievements.unlockedIds = ["first_orange", "soft_paw_1", "basket_1", "storehouse_5k", "first_leaf"];
    state.achievements.claimedRewardIds = ["first_orange", "soft_paw_1", "basket_1"];
    state.quests.claimedIds = ["welcome_first_orange", "welcome_steady_ten", "yard_first_100"];
    state.companions.friendshipById = {
      momo: 72,
      narin: 66,
      dami: 58,
      biro: 54,
      podo: 49,
      soda: 46,
      ruru: 43,
      hanul: 40,
    };
    state.decorations.unlockedIds = ["orange_basket_corner", "tiny_watering_path", "yard_parasol"];
    state.decorations.equippedBySlot.storage = "orange_basket_corner";
    state.decorations.equippedBySlot.path = "tiny_watering_path";
    state.decorations.equippedBySlot.shade = "yard_parasol";
    state.monetization.adBoostUntil = nowMs + 1000 * 60 * 22;
    state.retention.firstPlayedAt = nowMs - 8 * 24 * 60 * 60 * 1000;
    state.retention.lastDailyClaimAt = nowMs - 21 * 60 * 60 * 1000;
    state.retention.dailyStreak = 6;
  });
}

async function dismissBlockingModal(page: Parameters<typeof seedSave>[0]) {
  const modal = page.locator(".modal-backdrop");
  if (!(await modal.isVisible().catch(() => false))) return;
  const rewardButton = page.getByRole("button", { name: "보상 받기", exact: true });
  if (await rewardButton.isVisible().catch(() => false)) {
    await rewardButton.click();
    return;
  }
  const closeButton = page.getByRole("button", { name: "닫기" });
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
  }
}

async function applyStoreComposition(
  page: Parameters<typeof seedSave>[0],
  device: (typeof devices)[number],
  title: string,
  subtitle: string,
) {
  await page.evaluate(
    ({ shotTitle, shotSubtitle, keyVisualSrc }) => {
      document.querySelector(".store-shot-copy")?.remove();
      document.querySelector(".store-key-visual")?.remove();
      const copy = document.createElement("div");
      copy.className = "store-shot-copy";
      const heading = document.createElement("strong");
      heading.textContent = shotTitle;
      const sub = document.createElement("span");
      sub.textContent = shotSubtitle;
      copy.append(heading, sub);
      const keyVisual = document.createElement("img");
      keyVisual.className = "store-key-visual";
      keyVisual.alt = "";
      keyVisual.src = keyVisualSrc;
      document.body.prepend(copy);
      document.body.prepend(keyVisual);
    },
    { shotTitle: title, shotSubtitle: subtitle, keyVisualSrc: storeKeyVisualDataUrl },
  );
  await page.addStyleTag({
    content: `
      html, body, #root { width: 100%; min-height: 100%; }
      body {
        margin: 0;
        overflow: hidden;
        background: #172b21;
      }
      body::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(12, 25, 19, 0.24), rgba(12, 25, 19, 0.1) 34%, rgba(255, 214, 129, 0.16) 100%),
          radial-gradient(circle at 18% 20%, rgba(255, 245, 199, 0.8), transparent 24%),
          linear-gradient(90deg, rgba(255, 253, 242, 0.9), rgba(255, 253, 242, 0.12) 44%, rgba(255, 253, 242, 0));
      }
      .store-shot-copy {
        position: fixed;
        top: ${device.name === "iphone" ? 92 : 56}px;
        left: ${device.name === "iphone" ? 96 : 58}px;
        right: ${device.name === "iphone" ? 96 : 58}px;
        z-index: 4;
        display: grid;
        gap: ${device.name === "iphone" ? 26 : 16}px;
        color: #28322d;
        text-align: left;
        letter-spacing: 0;
        text-shadow: 0 3px 18px rgba(255, 253, 242, 0.82);
        word-break: keep-all;
        overflow-wrap: normal;
      }
      .store-key-visual {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        object-fit: cover;
        object-position: ${device.name === "iphone" ? "center 40%" : "center 44%"};
        opacity: 1;
      }
      .store-shot-copy strong {
        max-width: ${device.name === "iphone" ? 930 : 760}px;
        font-size: ${device.name === "iphone" ? 72 : 54}px;
        line-height: 1.06;
        font-weight: 950;
        word-break: keep-all;
        overflow-wrap: normal;
      }
      .store-shot-copy span {
        max-width: ${device.name === "iphone" ? 780 : 620}px;
        color: #6b4a30;
        font-size: ${device.name === "iphone" ? 38 : 27}px;
        line-height: 1.34;
        font-weight: 800;
        word-break: keep-all;
        overflow-wrap: normal;
      }
      .app-frame {
        min-height: 100vh !important;
        padding: ${device.top + (device.name === "iphone" ? 300 : 142)}px 0 0 !important;
        align-items: start !important;
        justify-items: center !important;
        background: transparent !important;
      }
      .game-shell {
        position: relative !important;
        z-index: 3 !important;
        width: 430px !important;
        height: ${device.shellHeight}px !important;
        min-height: ${device.shellHeight}px !important;
        max-height: ${device.shellHeight}px !important;
        border-radius: 38px !important;
        transform: scale(${device.scale * (device.name === "iphone" ? 0.98 : 0.96)});
        transform-origin: top center;
        box-shadow: 0 46px 112px rgba(40, 50, 45, 0.32), 0 0 0 1px rgba(40, 50, 45, 0.08);
      }
      .content-shell { scrollbar-width: none; }
      .content-shell::-webkit-scrollbar { display: none; }
      .debug-panel { display: none !important; }
      .toast { display: none !important; }
    `,
  });
}

for (const device of devices) {
  test(`store screenshot pack ${device.name}`, async ({ page }) => {
    await page.setViewportSize({ width: device.width, height: device.height });

    for (const shot of shots) {
      await seedShowcaseSave(page);
      await dismissBlockingModal(page);
      if (shot.tab !== "홈") {
        await page.getByRole("button", { name: shot.tab }).click();
      }
      if (shot.id === "02-upgrade") {
        await page.getByRole("button", { name: "최대" }).click();
      }
      if (shot.modal === "milestone") {
        await page.locator(".retention-milestone-board").evaluate((element) => {
          const shell = document.querySelector(".content-shell");
          if (!(shell instanceof HTMLElement) || !(element instanceof HTMLElement)) return;
          shell.scrollTop = Math.max(0, element.offsetTop - 90);
        });
        await page.locator(".retention-milestone-card", { hasText: "황금 숲 단골" }).getByRole("button", { name: "배지 받기" }).click();
      }
      if (shot.modal === "prestige-result") {
        await page.getByRole("button", { name: "환생하기" }).click();
        await page.getByRole("dialog", { name: "환생 확인" }).getByRole("button", { name: "황금 나뭇잎 받기" }).click();
        await expect(page.getByRole("dialog", { name: "새 계절 시작" })).toBeVisible();
      }
      if (shot.modal === "daily") {
        await page.getByRole("button", { name: "복귀 보상 받기" }).click();
        await expect(page.getByRole("dialog", { name: "복귀 보상 도장" })).toBeVisible();
      }
      await applyStoreComposition(page, device, shot.title, shot.subtitle);
      await expectNoHorizontalOverflow(page);
      await page.waitForTimeout(180);
      await page.screenshot({
        path: `store-screenshots/${device.name}-${shot.id}.png`,
        fullPage: false,
      });
    }
  });
}
