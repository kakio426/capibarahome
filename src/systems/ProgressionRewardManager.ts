import { ProgressionConfig, ProgressionTier } from "../config/ProgressionConfig";
import { GameState } from "../game/GameTypes";

export type ProgressionUnlockResult = {
  state: GameState;
  unlocked: readonly ProgressionTier[];
};

export function getUnlockedProgressionTiers(state: GameState) {
  const unlockedIds = new Set(state.progression.unlockedTierIds);
  return ProgressionConfig.tiers.filter((tier) => unlockedIds.has(tier.id));
}

export function getNextProgressionReward(state: GameState) {
  return ProgressionConfig.tiers
    .filter((tier) => !state.progression.unlockedTierIds.includes(tier.id))
    .sort((a, b) => a.order - b.order)[0] ?? null;
}

export function applyProgressionUnlocks(state: GameState, nowMs = Date.now()): GameState {
  const currentUnlocked = new Set(state.progression.unlockedTierIds.length > 0 ? state.progression.unlockedTierIds : ["yard"]);
  const eligible = ProgressionConfig.tiers
    .filter((tier) => state.lifetime.totalOrangesEarned.gte(tier.requiredLifetimeOranges))
    .sort((a, b) => a.order - b.order);
  const newlyUnlocked = eligible.filter((tier) => !currentUnlocked.has(tier.id));

  if (newlyUnlocked.length === 0) return state;

  const featuredTier = newlyUnlocked[newlyUnlocked.length - 1];
  const nextUnlockedIds = [
    ...ProgressionConfig.tiers
      .filter((tier) => currentUnlocked.has(tier.id) || newlyUnlocked.some((item) => item.id === tier.id))
      .sort((a, b) => a.order - b.order)
      .map((tier) => tier.id),
  ];

  return {
    ...state,
    updatedAt: nowMs,
    progression: {
      unlockedTierIds: nextUnlockedIds,
      lastUnlockedTierId: featuredTier.id,
    },
    lastToast: featuredTier.unlockMessage,
    lastAction: {
      kind: "tier",
      message: featuredTier.rewardTitle,
      createdAt: nowMs,
    },
  };
}
