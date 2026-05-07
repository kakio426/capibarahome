import { RetentionConfig, RetentionRewardConfig } from "../config/RetentionConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { selectCanPrestige, selectEps, selectPrestigeProgress } from "../game/GameSelectors";
import { GameState } from "../game/GameTypes";

export type RetentionRewardView = {
  oranges: BigNumberLite;
  goldenLeaf: BigNumberLite;
  label: string;
};

export type DailyRewardStatus = {
  eligible: boolean;
  day: number;
  streakAfterClaim: number;
  currentStreak: number;
  nextClaimAt: number;
  cooldownRemainingMs: number;
  resetRisk: boolean;
  title: string;
  flavor: string;
  reward: RetentionRewardView;
};

export type RetentionMilestoneViewModel = {
  id: string;
  day: number;
  title: string;
  description: string;
  assetKey: string;
  progress: number;
  unlocked: boolean;
  claimed: boolean;
  canClaim: boolean;
  reward: RetentionRewardView;
};

export type PostPrestigeGoalView = {
  id: string | null;
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  assetKey: string;
  progress: number;
  completed: boolean;
  canClaim: boolean;
  reward: RetentionRewardView;
};

export type DailyRewardClaimResult =
  | { ok: true; state: GameState; status: DailyRewardStatus }
  | { ok: false; state: GameState; reason: "cooldown"; status: DailyRewardStatus };

export type RetentionMilestoneClaimResult =
  | { ok: true; state: GameState; milestone: RetentionMilestoneViewModel }
  | { ok: false; state: GameState; reason: "not_found" | "locked" | "already_claimed"; milestone?: RetentionMilestoneViewModel };

export type PostPrestigeGoalClaimResult =
  | { ok: true; state: GameState; goal: PostPrestigeGoalView }
  | { ok: false; state: GameState; reason: "completed" | "incomplete"; goal: PostPrestigeGoalView };

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function safeTimestamp(value: number | null | undefined, fallback: number, nowMs: number) {
  if (!Number.isFinite(value ?? Number.NaN) || !value || value < 0) return fallback;
  return value > nowMs + 5 * 60 * 1000 ? nowMs : value;
}

function safeStreak(value: number) {
  return Math.max(0, Math.min(RetentionConfig.daily.loopLength, Math.floor(Number.isFinite(value) ? value : 0)));
}

function resolveReward(state: GameState, reward: RetentionRewardConfig, nowMs: number): RetentionRewardView {
  const epsSeconds = Math.max(0, reward.oranges.epsMinutes * 60);
  const epsReward = selectEps(state, nowMs).multiply(epsSeconds);
  const oranges = epsReward.max(reward.oranges.min).floor();
  const goldenLeaf = BigNumberLite.from(reward.goldenLeaf ?? "0").floor();
  const parts = [`${oranges.format(state.settings.numberFormat)} 귤`];
  if (goldenLeaf.gte(1)) parts.push(`${goldenLeaf.format(state.settings.numberFormat)} 황금잎`);
  return {
    oranges,
    goldenLeaf,
    label: parts.join(" + "),
  };
}

function applyReward(state: GameState, reward: RetentionRewardView) {
  return {
    ...state,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.add(reward.oranges),
      goldenLeaf: state.currencies.goldenLeaf.add(reward.goldenLeaf),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(reward.oranges),
    },
  };
}

export function formatRetentionDuration(ms: number) {
  const safe = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  if (minutes > 0) return `${minutes}분`;
  return "곧";
}

export function getDailyRewardStatus(state: GameState, nowMs = Date.now()): DailyRewardStatus {
  const firstPlayedAt = safeTimestamp(state.retention.firstPlayedAt, state.createdAt, nowMs);
  const lastDailyClaimAt = state.retention.lastDailyClaimAt === null
    ? null
    : safeTimestamp(state.retention.lastDailyClaimAt, firstPlayedAt, nowMs);
  const baseTime = lastDailyClaimAt ?? firstPlayedAt;
  const elapsed = Math.max(0, nowMs - baseTime);
  const eligible = elapsed >= RetentionConfig.daily.cooldownMs;
  const currentStreak = safeStreak(state.retention.dailyStreak);
  const resetRisk = Boolean(lastDailyClaimAt && nowMs - lastDailyClaimAt > RetentionConfig.daily.streakResetMs);
  const nextStreak = !eligible
    ? Math.max(1, currentStreak + 1)
    : resetRisk
      ? 1
      : Math.max(1, currentStreak + 1);
  const loopedDay = ((Math.min(RetentionConfig.daily.loopLength, nextStreak) - 1) % RetentionConfig.daily.loopLength) + 1;
  const rewardConfig = RetentionConfig.daily.rewards.find((item) => item.day === loopedDay) ?? RetentionConfig.daily.rewards[0];
  const nextClaimAt = eligible ? nowMs : baseTime + RetentionConfig.daily.cooldownMs;
  return {
    eligible,
    day: rewardConfig.day,
    streakAfterClaim: loopedDay,
    currentStreak,
    nextClaimAt,
    cooldownRemainingMs: Math.max(0, nextClaimAt - nowMs),
    resetRisk,
    title: rewardConfig.title,
    flavor: rewardConfig.flavor,
    reward: resolveReward(state, rewardConfig.reward, nowMs),
  };
}

export function claimDailyReward(state: GameState, nowMs = Date.now()): DailyRewardClaimResult {
  const status = getDailyRewardStatus(state, nowMs);
  if (!status.eligible) {
    return { ok: false, state, reason: "cooldown", status };
  }
  const rewarded = applyReward(state, status.reward);
  return {
    ok: true,
    status,
    state: {
      ...rewarded,
      updatedAt: nowMs,
      retention: {
        ...rewarded.retention,
        firstPlayedAt: safeTimestamp(rewarded.retention.firstPlayedAt, rewarded.createdAt, nowMs),
        lastDailyClaimAt: nowMs,
        dailyStreak: status.streakAfterClaim,
      },
      lastToast: `복귀 보상 수령: ${status.reward.label}`,
      lastAction: {
        kind: "daily",
        message: `${status.title} · ${status.reward.label}`,
        createdAt: nowMs,
      },
    },
  };
}

export function getMilestoneViewModels(state: GameState, nowMs = Date.now()): RetentionMilestoneViewModel[] {
  const firstPlayedAt = safeTimestamp(state.retention.firstPlayedAt, state.createdAt, nowMs);
  const elapsed = Math.max(0, nowMs - firstPlayedAt);
  return RetentionConfig.milestones.map((milestone) => {
    const claimed = state.retention.claimedMilestones[milestone.id] === true;
    const unlocked = elapsed >= milestone.unlockAfterMs;
    return {
      id: milestone.id,
      day: milestone.day,
      title: milestone.title,
      description: milestone.description,
      assetKey: milestone.assetKey,
      progress: clamp01(elapsed / milestone.unlockAfterMs),
      unlocked,
      claimed,
      canClaim: unlocked && !claimed,
      reward: resolveReward(state, milestone.reward, nowMs),
    };
  });
}

export function claimMilestoneReward(state: GameState, milestoneId: string, nowMs = Date.now()): RetentionMilestoneClaimResult {
  const milestone = getMilestoneViewModels(state, nowMs).find((item) => item.id === milestoneId);
  if (!milestone) return { ok: false, state, reason: "not_found" };
  if (milestone.claimed) return { ok: false, state, reason: "already_claimed", milestone };
  if (!milestone.unlocked) return { ok: false, state, reason: "locked", milestone };
  const rewarded = applyReward(state, milestone.reward);
  return {
    ok: true,
    milestone,
    state: {
      ...rewarded,
      updatedAt: nowMs,
      retention: {
        ...rewarded.retention,
        claimedMilestones: {
          ...rewarded.retention.claimedMilestones,
          [milestone.id]: true,
        },
      },
      lastToast: `${milestone.title} 배지 보상: ${milestone.reward.label}`,
      lastAction: {
        kind: "milestone",
        message: `${milestone.title} · ${milestone.reward.label}`,
        createdAt: nowMs,
      },
    },
  };
}

function postPrestigeGoalProgress(state: GameState, goalId: string) {
  if (goalId === "first_prestige") {
    return clamp01(state.lifetime.totalPrestiges / 1);
  }
  if (goalId === "two_leaves") {
    return clamp01(state.currencies.goldenLeaf.divide(2).toNumberSafe());
  }
  if (goalId === "post_soft_paw_10") {
    return clamp01((state.upgrades.soft_paw ?? 0) / 10);
  }
  if (goalId === "post_basket_10") {
    return clamp01((state.generators.orange_basket ?? 0) / 10);
  }
  if (goalId === "second_prestige_ready") {
    if (state.lifetime.totalPrestiges >= 2 || selectCanPrestige(state)) return 1;
    return selectPrestigeProgress(state);
  }
  return 0;
}

export function getPostPrestigeGoalView(state: GameState, nowMs = Date.now()): PostPrestigeGoalView {
  const safeStep = Math.max(0, Math.min(
    RetentionConfig.postPrestigeGoals.length,
    Math.floor(Number.isFinite(state.retention.postPrestigeGoalStep) ? state.retention.postPrestigeGoalStep : 0),
  ));
  const goal = RetentionConfig.postPrestigeGoals[safeStep];
  if (!goal) {
    return {
      id: null,
      step: safeStep,
      totalSteps: RetentionConfig.postPrestigeGoals.length,
      title: "두 번째 계절 루프 안정화",
      description: "첫 장기 목표 장부를 모두 완료했습니다. 다음 환생과 앨범 보상을 이어가세요.",
      assetKey: "golden_forest",
      progress: 1,
      completed: true,
      canClaim: false,
      reward: { oranges: BigNumberLite.zero(), goldenLeaf: BigNumberLite.zero(), label: "완료" },
    };
  }
  const progress = postPrestigeGoalProgress(state, goal.id);
  return {
    id: goal.id,
    step: safeStep,
    totalSteps: RetentionConfig.postPrestigeGoals.length,
    title: goal.title,
    description: goal.description,
    assetKey: goal.assetKey,
    progress,
    completed: false,
    canClaim: progress >= 1,
    reward: resolveReward(state, goal.reward, nowMs),
  };
}

export function claimPostPrestigeGoal(state: GameState, nowMs = Date.now()): PostPrestigeGoalClaimResult {
  const goal = getPostPrestigeGoalView(state, nowMs);
  if (goal.completed) return { ok: false, state, reason: "completed", goal };
  if (!goal.canClaim) return { ok: false, state, reason: "incomplete", goal };
  const rewarded = applyReward(state, goal.reward);
  return {
    ok: true,
    goal,
    state: {
      ...rewarded,
      updatedAt: nowMs,
      retention: {
        ...rewarded.retention,
        postPrestigeGoalStep: goal.step + 1,
      },
      lastToast: `${goal.title} 완료: ${goal.reward.label}`,
      lastAction: {
        kind: "retention_goal",
        message: `${goal.title} · ${goal.reward.label}`,
        createdAt: nowMs,
      },
    },
  };
}
