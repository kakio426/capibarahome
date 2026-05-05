import { GameState } from "./GameTypes";
import { selectEps } from "./GameSelectors";
import { applyAchievementUnlocks } from "../systems/AchievementManager";
import { applyProgressionUnlocks } from "../systems/ProgressionRewardManager";

export function advanceGameState(state: GameState, deltaMs: number, nowMs = Date.now()): GameState {
  if (deltaMs <= 0) return state;
  const eps = selectEps(state, nowMs);
  if (eps.isZero()) {
    return state;
  }
  const gain = eps.multiply(deltaMs / 1000);
  return applyProgressionUnlocks(applyAchievementUnlocks({
    ...state,
    updatedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.add(gain),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(gain),
    },
  }, nowMs), nowMs);
}
