import { BigNumberLite } from "../core/BigNumberLite";
import { GameState } from "../game/GameTypes";

export function createInitialState(nowMs = Date.now()): GameState {
  return {
    createdAt: nowMs,
    updatedAt: nowMs,
    lastSavedAt: nowMs,
    currencies: {
      orange: BigNumberLite.zero(),
      goldenLeaf: BigNumberLite.zero(),
    },
    lifetime: {
      totalOrangesEarned: BigNumberLite.zero(),
      totalTaps: 0,
      totalPrestiges: 0,
    },
    upgrades: {},
    generators: {},
    settings: {
      effectsEnabled: true,
      soundMuted: false,
      musicMuted: false,
      vibrationEnabled: true,
      numberFormat: "short",
    },
    tutorial: {
      completed: false,
      step: 0,
      visible: true,
    },
    monetization: {
      adBoostUntil: null,
      purchasedProductIds: [],
    },
    achievements: {
      unlockedIds: [],
      claimedRewardIds: [],
      lastUnlockedId: null,
    },
    quests: {
      claimedIds: [],
      lastClaimedId: null,
    },
    companions: {
      friendshipById: {},
      highlightedId: null,
    },
    decorations: {
      equippedBySlot: {
        sky: "sunny_yard",
      },
    },
    progression: {
      unlockedTierIds: ["yard"],
      lastUnlockedTierId: null,
    },
    retention: {
      firstPlayedAt: nowMs,
      lastDailyClaimAt: null,
      dailyStreak: 0,
      claimedMilestones: {},
      postPrestigeGoalStep: 0,
    },
    offlineReward: null,
    epsAtLastSave: BigNumberLite.zero(),
    lastToast: null,
    lastAction: null,
  };
}
