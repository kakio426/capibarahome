import { describe, expect, it } from "vitest";
import { AchievementConfig } from "../config/AchievementConfig";
import { BalanceConfig } from "../config/BalanceConfig";
import { QuestConfig, QuestCondition } from "../config/QuestConfig";
import { StoryConfig } from "../config/StoryConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { selectEps } from "../game/GameSelectors";
import { claimQuestReward, getQuestBoardSummary, getQuestCurrentText, getQuestProgress, isQuestConditionMet } from "../systems/QuestManager";
import { makeState } from "./testUtils";

function ids(values: ReadonlyArray<{ id: string }>) {
  return new Set(values.map((item) => item.id));
}

function totalUpgradeItems() {
  return [...BalanceConfig.tapUpgrades, ...BalanceConfig.generators];
}

function satisfyQuestCondition(state: ReturnType<typeof makeState>, condition: QuestCondition) {
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
    state.generators.season_memory_gate = 5;
    state.generators.moon_orange_observatory = 5;
    state.currencies.goldenLeaf = BigNumberLite.from("200");
  }
  if (condition.type === "goldenLeaf") {
    state.currencies.goldenLeaf = BigNumberLite.from(condition.value);
  }
  if (condition.type === "prestiges") {
    state.lifetime.totalPrestiges = condition.value;
  }
  if (condition.type === "achievementUnlocked") {
    state.achievements.unlockedIds = [...state.achievements.unlockedIds, condition.id];
  }
  if (condition.type === "questClaimed") {
    state.quests.claimedIds = [...state.quests.claimedIds, condition.id];
  }
  if (condition.type === "adBoostActive") {
    state.monetization.adBoostUntil = Date.now() + 60_000;
  }
  if (condition.type === "purchasedProducts") {
    state.monetization.purchasedProductIds = Array.from({ length: condition.value }, (_, index) => `product_${index}`);
  }
}

describe("quest manager", () => {
  it("defines a release-scale quest set with unique ids and action copy", () => {
    const questIds = QuestConfig.quests.map((quest) => quest.id);
    expect(QuestConfig.quests.length).toBeGreaterThanOrEqual(45);
    expect(new Set(questIds).size).toBe(questIds.length);

    for (const quest of QuestConfig.quests) {
      expect(quest.title.length).toBeGreaterThan(3);
      expect(quest.instruction.length).toBeGreaterThan(8);
      expect(quest.helperLine.length).toBeGreaterThan(12);
      expect(quest.completionLine.length).toBeGreaterThan(8);
      expect(BigNumberLite.from(quest.reward.oranges).gte(1), quest.id).toBe(true);
      expect(quest.reward.friendship, quest.id).toBeGreaterThan(0);
    }
  });

  it("references only real capybaras, achievements, upgrades, generators, and quests", () => {
    const capybaraIds = ids(StoryConfig.capybaras);
    const achievementIds = ids(AchievementConfig.achievements);
    const upgradeIds = ids(totalUpgradeItems());
    const questIds = ids(QuestConfig.quests);

    for (const quest of QuestConfig.quests) {
      const condition = quest.condition as QuestCondition;
      expect(capybaraIds.has(quest.capybaraId), quest.id).toBe(true);
      if (condition.type === "achievementUnlocked") {
        expect(achievementIds.has(condition.id), quest.id).toBe(true);
      }
      if (condition.type === "questClaimed") {
        expect(questIds.has(condition.id), quest.id).toBe(true);
      }
      if (condition.type === "upgradeLevel" || condition.type === "generatorLevel") {
        expect(upgradeIds.has(condition.id), quest.id).toBe(true);
      }
    }
  });

  it("sorts the quest board by configured order and exposes the next user action", () => {
    const board = getQuestBoardSummary(makeState());
    expect(board.quests[0].id).toBe("welcome_first_orange");
    expect(board.next?.title).toBe("첫 귤 건네기");
    expect(board.completionRatio).toBe(0);
  });

  it("marks ready quests and formats progress text after the user performs the required action", () => {
    const state = makeState();
    state.lifetime.totalTaps = 1;
    const board = getQuestBoardSummary(state);
    expect(board.ready.map((quest) => quest.id)).toContain("welcome_first_orange");
    expect(board.next?.readyToClaim).toBe(true);
    expect(board.next?.currentText).toBe("1 / 1회");
  });

  it("claims a ready quest once, grants oranges, and increases the linked capybara friendship", () => {
    const state = makeState();
    state.lifetime.totalTaps = 1;
    const result = claimQuestReward(state, "welcome_first_orange", 4_000);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.quests.claimedIds).toEqual(["welcome_first_orange"]);
      expect(result.state.quests.lastClaimedId).toBe("welcome_first_orange");
      expect(result.state.currencies.orange.toNumberSafe()).toBe(12);
      expect(result.state.companions.friendshipById.momo).toBe(3);
      expect(result.state.companions.highlightedId).toBe("momo");
      const second = claimQuestReward(result.state, "welcome_first_orange", 5_000);
      expect(second.ok).toBe(false);
      if (!second.ok) expect(second.reason).toBe("already_claimed");
    }
  });

  it("rejects incomplete quest claims without mutating reward state", () => {
    const state = makeState();
    const result = claimQuestReward(state, "welcome_soft_paw", 4_000);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("incomplete");
      expect(result.state.currencies.orange.isZero()).toBe(true);
      expect(result.state.quests.claimedIds).toEqual([]);
    }
  });

  it("can satisfy every configured quest condition with real game state fields", () => {
    for (const quest of QuestConfig.quests) {
      const state = makeState();
      satisfyQuestCondition(state, quest.condition);
      expect(isQuestConditionMet(quest.condition, state, Date.now()), quest.id).toBe(true);
      expect(getQuestProgress(quest.condition, state, Date.now()), quest.id).toBeGreaterThanOrEqual(1);
      expect(getQuestCurrentText(quest.condition, state, Date.now()).length, quest.id).toBeGreaterThan(3);
    }
  });

  it("keeps EPS quests tied to the same production math shown in the UI", () => {
    const state = makeState();
    state.generators.orange_basket = 40;
    state.generators.warm_pond = 20;
    const currentEps = selectEps(state).toNumberSafe();
    const epsQuest = QuestConfig.quests.find((quest) => quest.condition.type === "eps");
    expect(epsQuest).toBeTruthy();
    if (epsQuest?.condition.type === "eps") {
      expect(getQuestProgress(epsQuest.condition, state)).toBeCloseTo(Math.min(1, currentEps / Number(epsQuest.condition.value)), 5);
    }
  });

  it("separates ad and mock purchase release checks from normal fresh-user quest progress", () => {
    const fresh = makeState();
    const festival = QuestConfig.quests.find((quest) => quest.id === "release_ad_festival");
    const gift = QuestConfig.quests.find((quest) => quest.id === "release_shop_gift");
    expect(festival?.condition.type).toBe("adBoostActive");
    expect(gift?.condition.type).toBe("purchasedProducts");
    expect(festival ? isQuestConditionMet(festival.condition, fresh) : false).toBe(false);
    expect(gift ? isQuestConditionMet(gift.condition, fresh) : false).toBe(false);
  });
});
