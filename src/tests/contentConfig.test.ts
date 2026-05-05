import { describe, expect, it } from "vitest";
import { AchievementConfig, AchievementCondition } from "../config/AchievementConfig";
import { BalanceConfig, UnlockRequirement } from "../config/BalanceConfig";
import { ProgressionConfig } from "../config/ProgressionConfig";
import { StoryConfig } from "../config/StoryConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { isAchievementConditionMet } from "../systems/AchievementManager";
import { SaveManager } from "../systems/SaveManager";
import { purchaseUpgrade } from "../systems/UpgradeManager";
import { MemoryStorage, makeState } from "./testUtils";

function unique(values: string[]) {
  return new Set(values).size === values.length;
}

function allUpgradeItems() {
  return [...BalanceConfig.tapUpgrades, ...BalanceConfig.generators];
}

function satisfyUnlock(state: ReturnType<typeof makeState>, unlock: UnlockRequirement) {
  if (unlock.type === "lifetimeOranges") {
    state.lifetime.totalOrangesEarned = BigNumberLite.from(unlock.value);
  }
  if (unlock.type === "goldenLeaf") {
    state.currencies.goldenLeaf = BigNumberLite.from(unlock.value);
  }
  if (unlock.type === "prestiges") {
    state.lifetime.totalPrestiges = unlock.value;
  }
  if (unlock.type === "generatorLevel") {
    state.generators[unlock.id] = unlock.level;
  }
}

function satisfyAchievementCondition(state: ReturnType<typeof makeState>, condition: AchievementCondition) {
  if (condition.type === "totalOranges") {
    state.lifetime.totalOrangesEarned = BigNumberLite.from(condition.value);
  }
  if (condition.type === "totalTaps") {
    state.lifetime.totalTaps = condition.value;
  }
  if (condition.type === "upgradeLevel") {
    state.upgrades[condition.id] = condition.level;
  }
  if (condition.type === "generatorLevel") {
    state.generators[condition.id] = condition.level;
  }
  if (condition.type === "totalUpgradeLevels") {
    state.upgrades.soft_paw = condition.value;
  }
  if (condition.type === "totalGeneratorLevels") {
    state.generators.orange_basket = condition.value;
  }
  if (condition.type === "eps") {
    state.generators.season_memory_gate = 1;
    state.currencies.goldenLeaf = BigNumberLite.from("100");
  }
  if (condition.type === "goldenLeaf") {
    state.currencies.goldenLeaf = BigNumberLite.from(condition.value);
  }
  if (condition.type === "prestiges") {
    state.lifetime.totalPrestiges = condition.value;
  }
  if (condition.type === "adBoostActive") {
    state.monetization.adBoostUntil = Date.now() + 60_000;
  }
  if (condition.type === "purchasedProducts") {
    state.monetization.purchasedProductIds = Array.from({ length: condition.value }, (_, index) => `product_${index}`);
  }
}

describe("content config", () => {
  it("contains meaningful minimum content counts and unique ids", () => {
    const upgrades = allUpgradeItems();
    expect(upgrades.length).toBeGreaterThanOrEqual(30);
    expect(AchievementConfig.achievements.length).toBeGreaterThanOrEqual(40);
    expect(ProgressionConfig.tiers.length).toBeGreaterThanOrEqual(5);
    expect(StoryConfig.capybaras.length).toBeGreaterThanOrEqual(8);

    expect(unique(upgrades.map((item) => item.id))).toBe(true);
    expect(unique(upgrades.map((item) => item.name))).toBe(true);
    expect(unique(AchievementConfig.achievements.map((item) => item.id))).toBe(true);
    expect(unique(AchievementConfig.achievements.map((item) => item.name))).toBe(true);
  });

  it("defines tier, unlock, icon, and UI copy for every upgrade", () => {
    const tierIds = new Set(ProgressionConfig.tiers.map((tier) => tier.id));
    for (const item of allUpgradeItems()) {
      expect(tierIds.has(item.tier)).toBe(true);
      expect(item.icon.length).toBeGreaterThan(1);
      expect(item.unlockLabel.length).toBeGreaterThan(3);
      expect(item.uiCopy.length).toBeGreaterThan(8);
      expect(item.description).not.toBe(item.uiCopy);
      expect(item.growthRate).toBeGreaterThan(1);
      expect(BigNumberLite.from(item.baseCost).gte(1)).toBe(true);
    }
  });

  it("locks later content in a fresh save and unlocks it when requirements are met", () => {
    const fresh = makeState();
    const lockedItems = allUpgradeItems().filter((item) => item.unlock.type !== "none");
    expect(lockedItems.length).toBeGreaterThan(10);

    for (const item of lockedItems) {
      const result = purchaseUpgrade(fresh, item.id);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.reason).toBe("locked");
    }
  });

  it("allows every upgrade to be purchased when its unlock and cost are satisfied", () => {
    for (const item of allUpgradeItems()) {
      const state = makeState();
      satisfyUnlock(state, item.unlock);
      state.currencies.orange = BigNumberLite.from(item.baseCost).multiply(10);
      const result = purchaseUpgrade(state, item.id, 2_000);
      expect(result.ok, item.id).toBe(true);
    }
  });

  it("can satisfy every achievement condition with real game state fields", () => {
    for (const achievement of AchievementConfig.achievements) {
      const state = makeState();
      satisfyAchievementCondition(state, achievement.condition);
      expect(isAchievementConditionMet(achievement.condition, state, Date.now()), achievement.id).toBe(true);
    }
  });

  it("keeps achievement and expanded content state after save/load", () => {
    const storage = new MemoryStorage();
    const state = makeState();
    state.generators.orange_basket = 3;
    state.upgrades.soft_paw = 2;
    state.achievements.unlockedIds = ["first_orange", "basket_1"];
    state.achievements.lastUnlockedId = "basket_1";

    SaveManager.saveToStorage(state, storage, 10_000);
    const loaded = SaveManager.loadFromStorage(storage, 11_000);

    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(loaded.state.generators.orange_basket).toBe(3);
      expect(loaded.state.upgrades.soft_paw).toBe(2);
      expect(loaded.state.achievements.unlockedIds).toEqual(["first_orange", "basket_1"]);
      expect(loaded.state.achievements.lastUnlockedId).toBe("basket_1");
    }
  });
});
