import { QuestConfig, QuestConfigItem, QuestCondition } from "../config/QuestConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateEps } from "../core/gameMath";
import { GameState } from "../game/GameTypes";
import { getClaimedAchievementRewardMultiplier } from "./AchievementManager";
import { getCompanionBonuses } from "./CompanionBonusManager";

export type QuestViewModel = QuestConfigItem & {
  claimed: boolean;
  complete: boolean;
  readyToClaim: boolean;
  progress: number;
  currentText: string;
};

export type QuestClaimResult =
  | { ok: true; state: GameState; quest: QuestViewModel }
  | { ok: false; state: GameState; reason: "not_found" | "already_claimed" | "incomplete"; quest?: QuestViewModel };

function totalUpgradeLevels(state: GameState) {
  return Object.values(state.upgrades).reduce((sum, level) => sum + level, 0);
}

function totalGeneratorLevels(state: GameState) {
  return Object.values(state.generators).reduce((sum, level) => sum + level, 0);
}

function ratio(current: BigNumberLite | number, target: BigNumberLite | number) {
  if (typeof current === "number" && typeof target === "number") {
    if (target <= 0) return 1;
    return Math.max(0, Math.min(1, current / target));
  }
  const currentNumber = typeof current === "number" ? BigNumberLite.from(current) : current;
  const targetNumber = typeof target === "number" ? BigNumberLite.from(target) : target;
  if (targetNumber.isZero()) return 1;
  return Math.max(0, Math.min(1, currentNumber.divide(targetNumber).toNumberSafe()));
}

function isAchievementUnlocked(state: GameState, id: string) {
  return state.achievements.unlockedIds.includes(id);
}

function calculateStateEps(state: GameState, nowMs = Date.now()) {
  const companionBonuses = getCompanionBonuses(state);
  return calculateEps({
    generators: state.generators,
    goldenLeaf: state.currencies.goldenLeaf,
    adBoostUntil: state.monetization.adBoostUntil,
    nowMs,
    bonusMultiplier: companionBonuses.epsMultiplier
      .multiply(companionBonuses.decorationEpsMultiplier)
      .multiply(getClaimedAchievementRewardMultiplier(state)),
  });
}

export function isQuestConditionMet(condition: QuestCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") {
    return state.lifetime.totalOrangesEarned.gte(condition.value);
  }
  if (condition.type === "totalTaps") {
    return state.lifetime.totalTaps >= condition.value;
  }
  if (condition.type === "upgradeLevel") {
    return (state.upgrades[condition.id] ?? 0) >= condition.level;
  }
  if (condition.type === "generatorLevel") {
    return (state.generators[condition.id] ?? 0) >= condition.level;
  }
  if (condition.type === "totalUpgradeLevels") {
    return totalUpgradeLevels(state) >= condition.value;
  }
  if (condition.type === "totalGeneratorLevels") {
    return totalGeneratorLevels(state) >= condition.value;
  }
  if (condition.type === "eps") {
    return calculateStateEps(state, nowMs).gte(condition.value);
  }
  if (condition.type === "goldenLeaf") {
    return state.currencies.goldenLeaf.gte(condition.value);
  }
  if (condition.type === "prestiges") {
    return state.lifetime.totalPrestiges >= condition.value;
  }
  if (condition.type === "achievementUnlocked") {
    return isAchievementUnlocked(state, condition.id);
  }
  if (condition.type === "questClaimed") {
    return state.quests.claimedIds.includes(condition.id);
  }
  if (condition.type === "adBoostActive") {
    return Boolean(state.monetization.adBoostUntil && state.monetization.adBoostUntil > nowMs);
  }
  return state.monetization.purchasedProductIds.length >= condition.value;
}

export function getQuestProgress(condition: QuestCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") {
    return ratio(state.lifetime.totalOrangesEarned, BigNumberLite.from(condition.value));
  }
  if (condition.type === "totalTaps") {
    return ratio(state.lifetime.totalTaps, condition.value);
  }
  if (condition.type === "upgradeLevel") {
    return ratio(state.upgrades[condition.id] ?? 0, condition.level);
  }
  if (condition.type === "generatorLevel") {
    return ratio(state.generators[condition.id] ?? 0, condition.level);
  }
  if (condition.type === "totalUpgradeLevels") {
    return ratio(totalUpgradeLevels(state), condition.value);
  }
  if (condition.type === "totalGeneratorLevels") {
    return ratio(totalGeneratorLevels(state), condition.value);
  }
  if (condition.type === "eps") {
    return ratio(calculateStateEps(state, nowMs), BigNumberLite.from(condition.value));
  }
  if (condition.type === "goldenLeaf") {
    return ratio(state.currencies.goldenLeaf, BigNumberLite.from(condition.value));
  }
  if (condition.type === "prestiges") {
    return ratio(state.lifetime.totalPrestiges, condition.value);
  }
  if (condition.type === "purchasedProducts") {
    return ratio(state.monetization.purchasedProductIds.length, condition.value);
  }
  return isQuestConditionMet(condition, state, nowMs) ? 1 : 0;
}

export function getQuestCurrentText(condition: QuestCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") {
    return `${state.lifetime.totalOrangesEarned.format()} / ${BigNumberLite.from(condition.value).format()} 귤`;
  }
  if (condition.type === "totalTaps") {
    return `${state.lifetime.totalTaps.toLocaleString("ko-KR")} / ${condition.value.toLocaleString("ko-KR")}회`;
  }
  if (condition.type === "upgradeLevel") {
    return `Lv.${state.upgrades[condition.id] ?? 0} / Lv.${condition.level}`;
  }
  if (condition.type === "generatorLevel") {
    return `Lv.${state.generators[condition.id] ?? 0} / Lv.${condition.level}`;
  }
  if (condition.type === "totalUpgradeLevels") {
    return `${totalUpgradeLevels(state)} / ${condition.value}레벨`;
  }
  if (condition.type === "totalGeneratorLevels") {
    return `${totalGeneratorLevels(state)} / ${condition.value}레벨`;
  }
  if (condition.type === "eps") {
    const eps = calculateStateEps(state, nowMs);
    return `${eps.format()} / ${BigNumberLite.from(condition.value).format()} EPS`;
  }
  if (condition.type === "goldenLeaf") {
    return `${state.currencies.goldenLeaf.format()} / ${BigNumberLite.from(condition.value).format()} 잎`;
  }
  if (condition.type === "prestiges") {
    return `${state.lifetime.totalPrestiges} / ${condition.value}회`;
  }
  if (condition.type === "achievementUnlocked") {
    return isAchievementUnlocked(state, condition.id) ? "업적 해금" : "업적 미해금";
  }
  if (condition.type === "questClaimed") {
    return state.quests.claimedIds.includes(condition.id) ? "퀘스트 완료" : "퀘스트 진행 중";
  }
  if (condition.type === "adBoostActive") {
    return state.monetization.adBoostUntil && state.monetization.adBoostUntil > nowMs ? "축제 진행 중" : "축제 대기";
  }
  return `${state.monetization.purchasedProductIds.length} / ${condition.value}개`;
}

export function getQuestViewModels(state: GameState, nowMs = Date.now()): QuestViewModel[] {
  const claimedIds = new Set(state.quests.claimedIds);
  return [...QuestConfig.quests]
    .sort((a, b) => a.order - b.order)
    .map((quest) => {
      const complete = isQuestConditionMet(quest.condition, state, nowMs);
      const claimed = claimedIds.has(quest.id);
      return {
        ...quest,
        claimed,
        complete,
        readyToClaim: complete && !claimed,
        progress: getQuestProgress(quest.condition, state, nowMs),
        currentText: getQuestCurrentText(quest.condition, state, nowMs),
      };
    });
}

export function getQuestBoardSummary(state: GameState, nowMs = Date.now()) {
  const quests = getQuestViewModels(state, nowMs);
  const ready = quests.filter((quest) => quest.readyToClaim);
  const claimed = quests.filter((quest) => quest.claimed);
  const next = ready[0] ?? quests.find((quest) => !quest.claimed) ?? quests[quests.length - 1];
  return {
    quests,
    ready,
    claimed,
    next,
    completionRatio: quests.length > 0 ? claimed.length / quests.length : 1,
  };
}

export function claimQuestReward(state: GameState, questId: string, nowMs = Date.now()): QuestClaimResult {
  const quest = getQuestViewModels(state, nowMs).find((item) => item.id === questId);
  if (!quest) return { ok: false, state, reason: "not_found" };
  if (quest.claimed) return { ok: false, state, reason: "already_claimed", quest };
  if (!quest.complete) return { ok: false, state, reason: "incomplete", quest };

  const companionBonuses = getCompanionBonuses(state);
  const reward = BigNumberLite.from(quest.reward.oranges).multiply(companionBonuses.questOrangeMultiplier).floor();
  const friendshipReward = quest.reward.friendship + companionBonuses.questFriendshipBonus;
  const currentFriendship = state.companions.friendshipById[quest.capybaraId] ?? 0;
  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.add(reward),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(reward),
    },
    quests: {
      claimedIds: [...state.quests.claimedIds, quest.id],
      lastClaimedId: quest.id,
    },
    companions: {
      friendshipById: {
        ...state.companions.friendshipById,
        [quest.capybaraId]: currentFriendship + friendshipReward,
      },
      highlightedId: quest.capybaraId,
    },
    lastToast: `${quest.title} 완료: +${reward.format()} 귤`,
    lastAction: {
      kind: "quest",
      message: quest.completionLine,
      createdAt: nowMs,
    },
  };
  return { ok: true, state: nextState, quest };
}
