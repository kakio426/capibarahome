import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { BigNumberLite } from "../src/core/BigNumberLite";
import { expectNoHorizontalOverflow, seedSave, setOrange } from "./helpers";

test.describe.configure({ timeout: 90_000 });

const devices = [
  { name: "iphone", width: 1290, height: 2796, scale: 1.58, top: 620, shellHeight: 980 },
  { name: "android", width: 1080, height: 1920, scale: 1.22, top: 370, shellHeight: 900 },
];

const shots = [
  {
    id: "01-home",
    tab: "홈",
    title: "카피바라 귤 정원 키우기",
    subtitle: "터치 수확과 자동 생산이 한 화면에서 바로 느껴지는 방치형 클리커",
  },
  {
    id: "02-album",
    tab: "앨범",
    title: "8마리 친구와 정원 앨범",
    subtitle: "카피바라별 능력과 보상으로 장기 목표를 이어갑니다",
  },
  {
    id: "03-prestige",
    tab: "환생",
    title: "황금 나뭇잎으로 다음 회차 성장",
    subtitle: "환생 보상과 영구 배율을 미리 보고 결정할 수 있습니다",
  },
  {
    id: "04-shop",
    tab: "상점",
    title: "샌드박스 보상 상점",
    subtitle: "광고와 IAP는 mock provider로 분리되어 출시 연동 전에도 검증됩니다",
  },
  {
    id: "05-save",
    tab: "설정",
    title: "저장, 복구, 오프라인 보상까지",
    subtitle: "export/import와 설정 토글을 모바일에서 관리합니다",
    modal: "save",
  },
];

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
  });
}

async function dismissBlockingModal(page: Parameters<typeof seedSave>[0]) {
  const modal = page.locator(".modal-backdrop");
  if (!(await modal.isVisible().catch(() => false))) return;
  const rewardButton = page.getByRole("button", { name: "보상 받기" });
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
    ({ shotTitle, shotSubtitle }) => {
      document.querySelector(".store-shot-copy")?.remove();
      const copy = document.createElement("div");
      copy.className = "store-shot-copy";
      const heading = document.createElement("strong");
      heading.textContent = shotTitle;
      const sub = document.createElement("span");
      sub.textContent = shotSubtitle;
      copy.append(heading, sub);
      document.body.prepend(copy);
    },
    { shotTitle: title, shotSubtitle: subtitle },
  );
  await page.addStyleTag({
    content: `
      html, body, #root { width: 100%; min-height: 100%; }
      body {
        margin: 0;
        overflow: hidden;
        background:
          radial-gradient(circle at 82% 10%, rgba(255, 209, 102, 0.66), transparent 18%),
          radial-gradient(circle at 18% 84%, rgba(60, 143, 114, 0.22), transparent 25%),
          linear-gradient(180deg, #fffaf0 0%, #d9efe6 54%, #ffe0a6 100%);
      }
      .store-shot-copy {
        position: fixed;
        top: ${device.name === "iphone" ? 92 : 56}px;
        left: ${device.name === "iphone" ? 96 : 58}px;
        right: ${device.name === "iphone" ? 96 : 58}px;
        z-index: 999;
        display: grid;
        gap: ${device.name === "iphone" ? 26 : 16}px;
        color: #28322d;
        text-align: left;
        letter-spacing: 0;
      }
      .store-shot-copy strong {
        max-width: ${device.name === "iphone" ? 1080 : 900}px;
        font-size: ${device.name === "iphone" ? 72 : 54}px;
        line-height: 1.06;
        font-weight: 950;
      }
      .store-shot-copy span {
        max-width: 880px;
        color: #6b4a30;
        font-size: ${device.name === "iphone" ? 38 : 27}px;
        line-height: 1.34;
        font-weight: 800;
      }
      .app-frame {
        min-height: 100vh !important;
        padding: ${device.top}px 0 0 !important;
        align-items: start !important;
        justify-items: center !important;
        background: transparent !important;
      }
      .game-shell {
        width: 430px !important;
        height: ${device.shellHeight}px !important;
        min-height: ${device.shellHeight}px !important;
        max-height: ${device.shellHeight}px !important;
        border-radius: 38px !important;
        transform: scale(${device.scale});
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
      if (shot.id === "02-album") {
        await page.locator(".companion-board").evaluate((element) => {
          const shell = document.querySelector(".content-shell");
          if (!(shell instanceof HTMLElement) || !(element instanceof HTMLElement)) return;
          shell.scrollTop = Math.max(0, element.offsetTop - 90);
        });
      }
      if (shot.modal === "save") {
        await page.getByRole("button", { name: "세이브 Export/Import" }).click();
        await expect(page.getByRole("dialog", { name: "저장 내보내기/가져오기" })).toBeVisible();
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
