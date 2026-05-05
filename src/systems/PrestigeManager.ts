import { BigNumberLite } from "../core/BigNumberLite";
import { calculatePrestigeGain, getPrestigeMultiplier } from "../core/gameMath";
import { GameConfig } from "../config/GameConfig";
import { GameState } from "../game/GameTypes";
import { getCompanionBonuses } from "./CompanionBonusManager";

export function getPrestigeStatus(state: GameState) {
  const gain = calculatePrestigeGain(state.lifetime.totalOrangesEarned, getCompanionBonuses(state).prestigeGainMultiplier);
  const requirement = BigNumberLite.from(GameConfig.prestige.requirement);
  const progress = Math.min(1, state.lifetime.totalOrangesEarned.divide(requirement).toNumberSafe());
  return {
    canPrestige: gain.gte(1),
    gain,
    requirement,
    progress,
    currentMultiplier: getPrestigeMultiplier(state.currencies.goldenLeaf),
    nextMultiplier: getPrestigeMultiplier(state.currencies.goldenLeaf.add(gain)),
  };
}

export function performPrestige(state: GameState, nowMs = Date.now()) {
  const status = getPrestigeStatus(state);
  if (!status.canPrestige) {
    return { ok: false as const, state, gain: status.gain };
  }

  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    currencies: {
      orange: BigNumberLite.zero(),
      goldenLeaf: state.currencies.goldenLeaf.add(status.gain),
    },
    lifetime: {
      ...state.lifetime,
      totalPrestiges: state.lifetime.totalPrestiges + 1,
    },
    upgrades: {},
    generators: {},
    monetization: {
      ...state.monetization,
      adBoostUntil: null,
    },
    offlineReward: null,
    epsAtLastSave: BigNumberLite.zero(),
    lastToast: `환생 완료: 황금 나뭇잎 ${status.gain.format()}개 획득`,
    lastAction: {
      kind: "prestige",
      message: `황금 나뭇잎 +${status.gain.format()}`,
      createdAt: nowMs,
    },
  };

  return { ok: true as const, state: nextState, gain: status.gain };
}
