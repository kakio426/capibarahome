import { GameState } from "./GameTypes";
import { GameConfig } from "../config/GameConfig";
import { ProgressionConfig } from "../config/ProgressionConfig";
import { calculateEps, calculatePrestigeGain, calculateTapGain, getPrestigeMultiplier } from "../core/gameMath";
import { getAchievementViewModels, getClaimedAchievementRewardMultiplier } from "../systems/AchievementManager";
import { getCompanionBonuses } from "../systems/CompanionBonusManager";
import { getCollectionSummary } from "../systems/CollectionManager";
import { getQuestBoardSummary } from "../systems/QuestManager";
import { getUpgradeViewModels } from "../systems/UpgradeManager";

export function selectTapGain(state: GameState, nowMs = Date.now()) {
  const companionBonuses = getCompanionBonuses(state);
  return calculateTapGain({
    upgrades: state.upgrades,
    goldenLeaf: state.currencies.goldenLeaf,
    adBoostUntil: state.monetization.adBoostUntil,
    nowMs,
    bonusMultiplier: companionBonuses.tapMultiplier.multiply(getClaimedAchievementRewardMultiplier(state)),
  });
}

export function selectEps(state: GameState, nowMs = Date.now()) {
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

export function selectPrestigeGain(state: GameState) {
  return calculatePrestigeGain(state.lifetime.totalOrangesEarned, getCompanionBonuses(state).prestigeGainMultiplier);
}

export function selectCanPrestige(state: GameState) {
  return selectPrestigeGain(state).gte(1);
}

export function selectPrestigeMultiplier(state: GameState) {
  return getPrestigeMultiplier(state.currencies.goldenLeaf);
}

export function selectPrestigeProgress(state: GameState) {
  const progress = state.lifetime.totalOrangesEarned.divide(GameConfig.prestige.requirement).toNumberSafe();
  return Math.max(0, Math.min(1, progress));
}

export function selectCurrentProgressionTier(state: GameState) {
  return [...ProgressionConfig.tiers]
    .filter((tier) => state.lifetime.totalOrangesEarned.gte(tier.requiredLifetimeOranges))
    .sort((a, b) => b.order - a.order)[0] ?? ProgressionConfig.tiers[0];
}

export function selectNextProgressionTier(state: GameState) {
  return [...ProgressionConfig.tiers]
    .filter((tier) => state.lifetime.totalOrangesEarned.lt(tier.requiredLifetimeOranges))
    .sort((a, b) => a.order - b.order)[0] ?? null;
}

export function selectNextUpgradeGoal(state: GameState) {
  const candidates = getUpgradeViewModels(state)
    .filter((item) => item.maxLevel === null || item.level < item.maxLevel)
    .sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      if (a.canBuy !== b.canBuy) return a.canBuy ? -1 : 1;
      return a.cost.compare(b.cost);
    });

  const target = candidates[0] ?? null;
  if (!target) return null;

  const remaining = target.cost.subtract(state.currencies.orange).max(0);
  const progress = state.currencies.orange.divide(target.cost).toNumberSafe();

  return {
    ...target,
    remaining,
    progress: Math.max(0, Math.min(1, progress)),
    actionLabel: !target.unlocked
      ? target.unlockLabel
      : target.canBuy
        ? "지금 구매 가능"
        : `목표까지 ${remaining.format(state.settings.numberFormat)} 🍊`,
  };
}

export type CollectionBadge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rewardClaimed: boolean;
  canClaimReward: boolean;
  rewardSummary: string;
  progress: number;
};

function clampProgress(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function selectCollectionBadges(state: GameState, nowMs = Date.now()): CollectionBadge[] {
  return getAchievementViewModels(state, nowMs).map((achievement) => ({
    id: achievement.id,
    title: achievement.name,
    description: achievement.collectionLine,
    icon: achievement.icon,
    unlocked: achievement.unlocked,
    rewardClaimed: achievement.rewardClaimed,
    canClaimReward: achievement.canClaimReward,
    rewardSummary: achievement.rewardSummary,
    progress: clampProgress(achievement.progress),
  }));
}

export function selectQuestBoard(state: GameState, nowMs = Date.now()) {
  return getQuestBoardSummary(state, nowMs);
}

export function selectCollectionDashboard(state: GameState) {
  return getCollectionSummary(state);
}
