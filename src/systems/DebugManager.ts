import { BigNumberLite } from "../core/BigNumberLite";
import { GameConfig } from "../config/GameConfig";
import { selectEps } from "../game/GameSelectors";
import { GameState } from "../game/GameTypes";
import { restartTutorial } from "./TutorialManager";
import { calculateNextAdBoostUntil } from "./AdsManager";
import { createOfflineReward } from "./OfflineRewardManager";
import { RetentionConfig } from "../config/RetentionConfig";

function stamp(state: GameState, message: string, nowMs: number): GameState {
  return {
    ...state,
    updatedAt: nowMs,
    lastToast: message,
    lastAction: { kind: "debug", message, createdAt: nowMs },
  };
}

export const DebugManager = {
  grantOranges(state: GameState, amount: string, nowMs = Date.now()) {
    return stamp({
      ...state,
      currencies: {
        ...state.currencies,
        orange: state.currencies.orange.add(amount),
      },
      lifetime: {
        ...state.lifetime,
        totalOrangesEarned: state.lifetime.totalOrangesEarned.add(amount),
      },
    }, `디버그 귤 +${BigNumberLite.from(amount).format()}`, nowMs);
  },

  grantGoldenLeaf(state: GameState, amount = "1", nowMs = Date.now()) {
    return stamp({
      ...state,
      currencies: {
        ...state.currencies,
        goldenLeaf: state.currencies.goldenLeaf.add(amount),
      },
    }, `디버그 황금 나뭇잎 +${amount}`, nowMs);
  },

  simulateOffline(state: GameState, seconds: number, nowMs = Date.now()) {
    const simulated = {
      ...state,
      lastSavedAt: nowMs - seconds * 1000,
      epsAtLastSave: selectEps(state, nowMs),
    };
    return stamp({
      ...simulated,
      offlineReward: createOfflineReward(simulated, nowMs),
    }, `오프라인 ${Math.floor(seconds / 60)}분 시뮬레이션`, nowMs);
  },

  resetTutorial(state: GameState, nowMs = Date.now()) {
    return stamp(restartTutorial(state, nowMs), "튜토리얼 초기화", nowMs);
  },

  forceAdBoost(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      monetization: {
        ...state.monetization,
        adBoostUntil: calculateNextAdBoostUntil(state.monetization.adBoostUntil, nowMs),
      },
    }, "광고 버프 적용", nowMs);
  },

  makePrestigeReady(state: GameState, nowMs = Date.now()) {
    const requirement = BigNumberLite.from(GameConfig.prestige.requirement);
    const orangeGrant = requirement.subtract(state.currencies.orange).max(0);
    return stamp({
      ...state,
      currencies: {
        ...state.currencies,
        orange: state.currencies.orange.add(orangeGrant),
      },
      lifetime: {
        ...state.lifetime,
        totalOrangesEarned: state.lifetime.totalOrangesEarned.max(requirement),
      },
    }, "환생 가능 상태로 변경", nowMs);
  },

  makeDailyRewardReady(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      retention: {
        ...state.retention,
        firstPlayedAt: Math.min(state.retention.firstPlayedAt, nowMs - RetentionConfig.daily.cooldownMs - 60_000),
        lastDailyClaimAt: nowMs - RetentionConfig.daily.cooldownMs - 60_000,
      },
    }, "일일 보상 가능 상태", nowMs);
  },

  simulateRetentionStreak3(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      retention: {
        ...state.retention,
        firstPlayedAt: nowMs - 3 * 24 * 60 * 60 * 1000 - 60_000,
        lastDailyClaimAt: nowMs - RetentionConfig.daily.cooldownMs - 60_000,
        dailyStreak: 2,
      },
    }, "리텐션 3일차 시뮬레이션", nowMs);
  },

  simulateRetentionStreak7(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      retention: {
        ...state.retention,
        firstPlayedAt: nowMs - 7 * 24 * 60 * 60 * 1000 - 60_000,
        lastDailyClaimAt: nowMs - RetentionConfig.daily.cooldownMs - 60_000,
        dailyStreak: 6,
      },
    }, "리텐션 7일차 시뮬레이션", nowMs);
  },

  resetRetentionMilestones(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      retention: {
        ...state.retention,
        claimedMilestones: {},
      },
    }, "복귀 마일스톤 초기화", nowMs);
  },

  advancePostPrestigeGoal(state: GameState, nowMs = Date.now()) {
    return stamp({
      ...state,
      retention: {
        ...state.retention,
        postPrestigeGoalStep: Math.min(
          RetentionConfig.postPrestigeGoals.length,
          state.retention.postPrestigeGoalStep + 1,
        ),
      },
    }, "환생 목표 단계 이동", nowMs);
  },
};
