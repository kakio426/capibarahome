import { GameConfig } from "../config/GameConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateOfflineReward } from "../core/gameMath";
import { selectCanPrestige, selectEps, selectTapGain } from "../game/GameSelectors";
import { GameState } from "../game/GameTypes";
import { createInitialState } from "../state/initialState";
import { getCompanionBonuses } from "./CompanionBonusManager";
import { performPrestige } from "./PrestigeManager";
import { getUpgradeViewModels, purchaseUpgrade } from "./UpgradeManager";

export type BalanceCheckpoint = {
  label: string;
  seconds: number;
  oranges: string;
  lifetimeOranges: string;
  eps: string;
  tapGain: string;
  upgradesOwned: number;
  unlockedUpgrades: number;
  canPrestige: boolean;
};

export type BalanceSimulationResult = {
  checkpoints: BalanceCheckpoint[];
  firstPrestigeCheckpoint: BalanceCheckpoint | null;
  postPrestigeThirtyMinuteCheckpoint: BalanceCheckpoint | null;
  firstPrestigeSeconds: number | null;
  firstPrestigeLabel: string;
  finalState: GameState;
  offlineEightHourReward: string;
};

export type BalanceSimulationOptions = {
  durationSeconds: number;
  tickSeconds?: number;
  tapsPerSecond?: number;
  adBoostActive?: boolean;
  startingGoldenLeaf?: string;
};

const CHECKPOINTS = [
  { label: "첫 1분", seconds: 60 },
  { label: "첫 5분", seconds: 300 },
  { label: "첫 30분", seconds: 1800 },
  { label: "첫 2시간", seconds: 7200 },
];

function ownedLevels(state: GameState) {
  const tapLevels = Object.values(state.upgrades).reduce((sum, level) => sum + Math.max(0, level), 0);
  const generatorLevels = Object.values(state.generators).reduce((sum, level) => sum + Math.max(0, level), 0);
  return tapLevels + generatorLevels;
}

function applyIncome(state: GameState, seconds: number, tapsPerSecond: number, nowMs: number): GameState {
  const tapGain = selectTapGain(state, nowMs).multiply(tapsPerSecond * seconds);
  const epsGain = selectEps(state, nowMs).multiply(seconds);
  const gain = tapGain.add(epsGain);
  return {
    ...state,
    updatedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.add(gain),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(gain),
      totalTaps: state.lifetime.totalTaps + Math.floor(tapsPerSecond * seconds),
    },
  };
}

function autoBuyAffordable(state: GameState, nowMs: number) {
  let nextState = state;
  let safety = 0;
  while (safety < 200) {
    safety += 1;
    const target = getUpgradeViewModels(nextState)
      .filter((item) => item.unlocked && item.canBuy)
      .sort((a, b) => a.cost.compare(b.cost))[0];
    if (!target) break;
    const result = purchaseUpgrade(nextState, target.id, nowMs);
    if (!result.ok) break;
    nextState = result.state;
  }
  return nextState;
}

function createCheckpoint(label: string, seconds: number, state: GameState, nowMs: number): BalanceCheckpoint {
  const upgrades = getUpgradeViewModels(state);
  return {
    label,
    seconds,
    oranges: state.currencies.orange.format(state.settings.numberFormat),
    lifetimeOranges: state.lifetime.totalOrangesEarned.format(state.settings.numberFormat),
    eps: selectEps(state, nowMs).format(state.settings.numberFormat),
    tapGain: selectTapGain(state, nowMs).format(state.settings.numberFormat),
    upgradesOwned: ownedLevels(state),
    unlockedUpgrades: upgrades.filter((item) => item.unlocked).length,
    canPrestige: selectCanPrestige(state),
  };
}

export function runBalanceSimulation(options: BalanceSimulationOptions): BalanceSimulationResult {
  const tickSeconds = options.tickSeconds ?? 5;
  const tapsPerSecond = options.tapsPerSecond ?? 1.2;
  const startMs = 1_700_000_000_000;
  let state = createInitialState(startMs);
  state.tutorial.completed = true;
  state.tutorial.visible = false;
  state.currencies.goldenLeaf = BigNumberLite.from(options.startingGoldenLeaf ?? "0");
  if (options.adBoostActive) {
    state.monetization.adBoostUntil = startMs + options.durationSeconds * 1000 + 60_000;
  }

  const checkpoints: BalanceCheckpoint[] = [];
  let firstPrestigeSeconds: number | null = null;
  let firstPrestigeCheckpoint: BalanceCheckpoint | null = null;
  let postPrestigeThirtyMinuteCheckpoint: BalanceCheckpoint | null = null;

  for (let elapsed = tickSeconds; elapsed <= options.durationSeconds; elapsed += tickSeconds) {
    const nowMs = startMs + elapsed * 1000;
    state = applyIncome(state, tickSeconds, tapsPerSecond, nowMs);
    state = autoBuyAffordable(state, nowMs);
    if (firstPrestigeSeconds === null && selectCanPrestige(state)) {
      firstPrestigeSeconds = elapsed;
      firstPrestigeCheckpoint = createCheckpoint("첫 환생 가능", elapsed, state, nowMs);
      const prestigeResult = performPrestige(state, nowMs);
      if (prestigeResult.ok) {
        let postPrestigeState = prestigeResult.state;
        for (let postElapsed = tickSeconds; postElapsed <= 1800; postElapsed += tickSeconds) {
          const postNow = nowMs + postElapsed * 1000;
          postPrestigeState = applyIncome(postPrestigeState, tickSeconds, tapsPerSecond, postNow);
          postPrestigeState = autoBuyAffordable(postPrestigeState, postNow);
        }
        postPrestigeThirtyMinuteCheckpoint = createCheckpoint(
          "환생 후 30분",
          elapsed + 1800,
          postPrestigeState,
          nowMs + 1800 * 1000,
        );
      }
    }
    const checkpoint = CHECKPOINTS.find((item) => item.seconds === elapsed);
    if (checkpoint) {
      checkpoints.push(createCheckpoint(checkpoint.label, elapsed, state, nowMs));
    }
  }

  const finalNow = startMs + options.durationSeconds * 1000;
  const offlineReward = calculateOfflineReward({
    epsAtLastSave: selectEps(state, finalNow),
    lastSavedAt: finalNow - GameConfig.offline.maxSeconds * 1000,
    nowMs: finalNow,
    bonusMultiplier: getCompanionBonuses(state).offlineMultiplier,
  });

  return {
    checkpoints,
    firstPrestigeCheckpoint,
    postPrestigeThirtyMinuteCheckpoint,
    firstPrestigeSeconds,
    firstPrestigeLabel: firstPrestigeSeconds === null
      ? "시뮬레이션 범위 내 미도달"
      : `${Math.floor(firstPrestigeSeconds / 60)}분 ${firstPrestigeSeconds % 60}초`,
    finalState: state,
    offlineEightHourReward: offlineReward.reward.format(state.settings.numberFormat),
  };
}
