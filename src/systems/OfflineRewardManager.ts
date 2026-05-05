import { calculateOfflineReward } from "../core/gameMath";
import { GameState, OfflineRewardState } from "../game/GameTypes";
import { getCompanionBonuses } from "./CompanionBonusManager";

export function createOfflineReward(state: GameState, nowMs = Date.now()): OfflineRewardState | null {
  const reward = calculateOfflineReward({
    epsAtLastSave: state.epsAtLastSave,
    lastSavedAt: state.lastSavedAt,
    nowMs,
    bonusMultiplier: getCompanionBonuses(state).offlineMultiplier,
  });
  if (reward.seconds <= 0 || reward.reward.isZero()) {
    return null;
  }
  return {
    pending: true,
    claimed: false,
    seconds: reward.seconds,
    oranges: reward.reward,
  };
}

export function claimOfflineReward(state: GameState, nowMs = Date.now()): GameState {
  const pending = state.offlineReward;
  if (!pending?.pending || pending.oranges.isZero()) {
    return { ...state, offlineReward: null, updatedAt: nowMs };
  }
  if (pending.claimed) {
    return { ...state, offlineReward: null, updatedAt: nowMs };
  }
  return {
    ...state,
    updatedAt: nowMs,
    lastSavedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.add(pending.oranges),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(pending.oranges),
    },
    offlineReward: null,
    lastToast: `오프라인 보상 ${pending.oranges.format()} 귤을 받았어요.`,
    lastAction: {
      kind: "save",
      message: `오프라인 보상 +${pending.oranges.format()}`,
      createdAt: nowMs,
    },
  };
}
