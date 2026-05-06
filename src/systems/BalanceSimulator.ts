import { GameConfig } from "../config/GameConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateOfflineReward } from "../core/gameMath";
import { selectCanPrestige, selectEps, selectNextUpgradeGoal, selectPrestigeGain, selectTapGain } from "../game/GameSelectors";
import { GameState } from "../game/GameTypes";
import { createInitialState } from "../state/initialState";
import { applyAchievementUnlocks, claimAchievementReward, getAchievementViewModels } from "./AchievementManager";
import { getCompanionBonuses } from "./CompanionBonusManager";
import { equipDecoration, getCollectionSummary, getDecorationViewModels } from "./CollectionManager";
import { performPrestige } from "./PrestigeManager";
import { applyProgressionUnlocks, getNextProgressionReward } from "./ProgressionRewardManager";
import { claimQuestReward, getQuestBoardSummary } from "./QuestManager";
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
  buyableUpgradeNames: string[];
  readyQuestTitles: string[];
  claimedQuestCount: number;
  unlockedAchievementCount: number;
  claimableAchievementCount: number;
  claimedAchievementCount: number;
  unlockedCompanionCount: number;
  unlockedDecorationCount: number;
  equippedDecorationCount: number;
  systemsSeen: string[];
  nextQuest: string;
  nextGoal: string;
  prestigeGain: string;
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
  maxPurchasesPerTick?: number;
  adBoostActive?: boolean;
  startingGoldenLeaf?: string;
};

const CHECKPOINTS = [
  { label: "첫 10초", seconds: 10 },
  { label: "첫 1분", seconds: 60 },
  { label: "첫 5분", seconds: 300 },
  { label: "첫 15분", seconds: 900 },
  { label: "첫 30분", seconds: 1800 },
  { label: "첫 2시간", seconds: 7200 },
  { label: "1일차 복귀", seconds: 86_400 },
  { label: "3일차 목표", seconds: 259_200 },
  { label: "7일차 목표", seconds: 604_800 },
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

function autoBuyAffordable(state: GameState, nowMs: number, maxPurchases: number) {
  let nextState = state;
  let safety = 0;
  while (safety < maxPurchases) {
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

function applyUnlocks(state: GameState, nowMs: number) {
  return applyProgressionUnlocks(applyAchievementUnlocks(state, nowMs), nowMs);
}

function autoClaimReadyRewards(state: GameState, nowMs: number) {
  let nextState = applyUnlocks(state, nowMs);
  let safety = 0;
  while (safety < 80) {
    safety += 1;
    const readyQuest = getQuestBoardSummary(nextState, nowMs).ready[0];
    if (readyQuest) {
      const result = claimQuestReward(nextState, readyQuest.id, nowMs);
      if (result.ok) {
        nextState = applyUnlocks(result.state, nowMs);
        continue;
      }
    }

    const readyAchievement = getAchievementViewModels(nextState, nowMs).find((achievement) => achievement.canClaimReward);
    if (readyAchievement) {
      const result = claimAchievementReward(nextState, readyAchievement.id, nowMs);
      if (result.ok) {
        nextState = applyUnlocks(result.state, nowMs);
        continue;
      }
    }

    break;
  }
  return nextState;
}

function autoEquipUnlockedDecorations(state: GameState, nowMs: number) {
  let nextState = state;
  const occupiedSlots = new Set(Object.keys(nextState.decorations.equippedBySlot));
  for (const decoration of getDecorationViewModels(nextState)) {
    if (!decoration.unlocked || decoration.equipped || occupiedSlots.has(decoration.slot)) continue;
    const result = equipDecoration(nextState, decoration.id, nowMs);
    if (result.ok) {
      nextState = result.state;
      occupiedSlots.add(decoration.slot);
    }
  }
  return nextState;
}

function applyPlayerMaintenance(state: GameState, nowMs: number) {
  const withRewards = autoClaimReadyRewards(state, nowMs);
  const withDecorations = autoEquipUnlockedDecorations(withRewards, nowMs);
  return applyUnlocks(withDecorations, nowMs);
}

function advancePlayerDecisionCycle(state: GameState, nowMs: number, maxPurchases: number) {
  const withRewards = applyPlayerMaintenance(state, nowMs);
  const withPurchases = autoBuyAffordable(withRewards, nowMs, maxPurchases);
  return applyPlayerMaintenance(withPurchases, nowMs);
}

function checkpointNextGoal(state: GameState, nowMs: number) {
  const questBoard = getQuestBoardSummary(state, nowMs);
  const nextUpgrade = selectNextUpgradeGoal(state);
  const nextTier = getNextProgressionReward(state);
  if (questBoard.ready[0]) return `퀘스트 보상 수령: ${questBoard.ready[0].title}`;
  if (selectCanPrestige(state)) return `환생 가능: 황금 나뭇잎 ${selectPrestigeGain(state).format(state.settings.numberFormat)}개`;
  if (nextUpgrade) return `${nextUpgrade.name}: ${nextUpgrade.actionLabel}`;
  if (nextTier) return `${nextTier.name}까지 누적 ${BigNumberLite.from(nextTier.requiredLifetimeOranges).format(state.settings.numberFormat)} 귤`;
  return "앨범 보상과 장식 배치를 마무리";
}

function checkpointSystemsSeen(state: GameState, nowMs: number) {
  const achievements = getAchievementViewModels(state, nowMs);
  const collection = getCollectionSummary(state);
  const systems = [
    ownedLevels(state) > 0 ? "upgrade" : null,
    selectEps(state, nowMs).compare(0) > 0 ? "idle" : null,
    state.quests.claimedIds.length > 0 ? "quest" : null,
    achievements.some((achievement) => achievement.unlocked || achievement.rewardClaimed) ? "album" : null,
    collection.unlockedCompanions > 0 ? "companion" : null,
    collection.equippedDecorations.length > 1 ? "decoration" : null,
    selectCanPrestige(state) ? "prestige" : null,
  ];
  return systems.filter((system): system is string => Boolean(system));
}

function createCheckpoint(label: string, seconds: number, state: GameState, nowMs: number): BalanceCheckpoint {
  const upgrades = getUpgradeViewModels(state);
  const questBoard = getQuestBoardSummary(state, nowMs);
  const achievements = getAchievementViewModels(state, nowMs);
  const collection = getCollectionSummary(state);
  return {
    label,
    seconds,
    oranges: state.currencies.orange.format(state.settings.numberFormat),
    lifetimeOranges: state.lifetime.totalOrangesEarned.format(state.settings.numberFormat),
    eps: selectEps(state, nowMs).format(state.settings.numberFormat),
    tapGain: selectTapGain(state, nowMs).format(state.settings.numberFormat),
    upgradesOwned: ownedLevels(state),
    unlockedUpgrades: upgrades.filter((item) => item.unlocked).length,
    buyableUpgradeNames: upgrades
      .filter((item) => item.unlocked && item.canBuy)
      .sort((a, b) => a.cost.compare(b.cost))
      .slice(0, 5)
      .map((item) => `${item.name} Lv.${item.level + 1}`),
    readyQuestTitles: questBoard.ready.map((quest) => quest.title),
    claimedQuestCount: questBoard.claimed.length,
    unlockedAchievementCount: achievements.filter((achievement) => achievement.unlocked).length,
    claimableAchievementCount: achievements.filter((achievement) => achievement.canClaimReward).length,
    claimedAchievementCount: state.achievements.claimedRewardIds.length,
    unlockedCompanionCount: collection.unlockedCompanions,
    unlockedDecorationCount: collection.unlockedDecorations,
    equippedDecorationCount: collection.equippedDecorations.length,
    systemsSeen: checkpointSystemsSeen(state, nowMs),
    nextQuest: questBoard.next?.title ?? "없음",
    nextGoal: checkpointNextGoal(state, nowMs),
    prestigeGain: selectPrestigeGain(state).format(state.settings.numberFormat),
    canPrestige: selectCanPrestige(state),
  };
}

export function runBalanceSimulation(options: BalanceSimulationOptions): BalanceSimulationResult {
  const tickSeconds = options.tickSeconds ?? 5;
  const tapsPerSecond = options.tapsPerSecond ?? 1.2;
  const maxPurchasesPerTick = options.maxPurchasesPerTick ?? 4;
  const startMs = 1_700_000_000_000;
  let state = createInitialState(startMs);
  state.tutorial.completed = true;
  state.tutorial.visible = false;
  state.currencies.goldenLeaf = BigNumberLite.from(options.startingGoldenLeaf ?? "0");
  state = applyPlayerMaintenance(state, startMs);
  if (options.adBoostActive) {
    state.monetization.adBoostUntil = startMs + options.durationSeconds * 1000 + 60_000;
  }

  const checkpoints: BalanceCheckpoint[] = [];
  let firstPrestigeSeconds: number | null = null;
  let firstPrestigeCheckpoint: BalanceCheckpoint | null = null;
  let postPrestigeThirtyMinuteCheckpoint: BalanceCheckpoint | null = null;
  let checkpointIndex = 0;

  for (let elapsed = tickSeconds; elapsed <= options.durationSeconds; elapsed += tickSeconds) {
    const nowMs = startMs + elapsed * 1000;
    state = applyIncome(state, tickSeconds, tapsPerSecond, nowMs);
    state = advancePlayerDecisionCycle(state, nowMs, maxPurchasesPerTick);
    if (firstPrestigeSeconds === null && selectCanPrestige(state)) {
      firstPrestigeSeconds = elapsed;
      firstPrestigeCheckpoint = createCheckpoint("첫 환생 가능", elapsed, state, nowMs);
      const prestigeResult = performPrestige(state, nowMs);
      if (prestigeResult.ok) {
        let postPrestigeState = prestigeResult.state;
        for (let postElapsed = tickSeconds; postElapsed <= 1800; postElapsed += tickSeconds) {
          const postNow = nowMs + postElapsed * 1000;
          postPrestigeState = applyIncome(postPrestigeState, tickSeconds, tapsPerSecond, postNow);
          postPrestigeState = advancePlayerDecisionCycle(postPrestigeState, postNow, maxPurchasesPerTick);
        }
        postPrestigeThirtyMinuteCheckpoint = createCheckpoint(
          "환생 후 30분",
          elapsed + 1800,
          postPrestigeState,
          nowMs + 1800 * 1000,
        );
      }
    }
    while (checkpointIndex < CHECKPOINTS.length && elapsed >= CHECKPOINTS[checkpointIndex].seconds) {
      const checkpoint = CHECKPOINTS[checkpointIndex];
      checkpoints.push(createCheckpoint(checkpoint.label, elapsed, state, nowMs));
      checkpointIndex += 1;
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
