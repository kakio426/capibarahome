import { AchievementConfig, AchievementConfigItem, AchievementCondition } from "../config/AchievementConfig";
import { AchievementReward, resolveAchievementReward } from "../config/AchievementRewardConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateEps } from "../core/gameMath";
import { GameState } from "../game/GameTypes";
import { getCompanionBonuses } from "./CompanionBonusManager";

export type AchievementViewModel = AchievementConfigItem & {
  unlocked: boolean;
  rewardClaimed: boolean;
  canClaimReward: boolean;
  progress: number;
  currentText: string;
  reward: AchievementReward;
  rewardSummary: string;
};

export type AchievementRewardClaimResult =
  | { ok: true; state: GameState; achievement: AchievementViewModel }
  | { ok: false; state: GameState; reason: "not_found" | "locked" | "already_claimed"; achievement?: AchievementViewModel };

function totalUpgradeLevels(state: GameState) {
  return Object.values(state.upgrades).reduce((sum, level) => sum + Math.max(0, level), 0);
}

function totalGeneratorLevels(state: GameState) {
  return Object.values(state.generators).reduce((sum, level) => sum + Math.max(0, level), 0);
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(1, value));
}

function progressFromBigNumber(current: BigNumberLite, target: string) {
  return clampProgress(current.divide(target).toNumberSafe());
}

function calculateStateEps(state: GameState, nowMs = Date.now()) {
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

export function isAchievementConditionMet(condition: AchievementCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") return state.lifetime.totalOrangesEarned.gte(condition.value);
  if (condition.type === "totalTaps") return state.lifetime.totalTaps >= condition.value;
  if (condition.type === "upgradeLevel") return (state.upgrades[condition.id] ?? 0) >= condition.level;
  if (condition.type === "generatorLevel") return (state.generators[condition.id] ?? 0) >= condition.level;
  if (condition.type === "totalUpgradeLevels") return totalUpgradeLevels(state) >= condition.value;
  if (condition.type === "totalGeneratorLevels") return totalGeneratorLevels(state) >= condition.value;
  if (condition.type === "eps") {
    return calculateStateEps(state, nowMs).gte(condition.value);
  }
  if (condition.type === "goldenLeaf") return state.currencies.goldenLeaf.gte(condition.value);
  if (condition.type === "prestiges") return state.lifetime.totalPrestiges >= condition.value;
  if (condition.type === "adBoostActive") return Boolean(state.monetization.adBoostUntil && state.monetization.adBoostUntil > nowMs);
  if (condition.type === "purchasedProducts") return state.monetization.purchasedProductIds.length >= condition.value;
  return false;
}

export function getAchievementProgress(condition: AchievementCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") return progressFromBigNumber(state.lifetime.totalOrangesEarned, condition.value);
  if (condition.type === "totalTaps") return clampProgress(state.lifetime.totalTaps / condition.value);
  if (condition.type === "upgradeLevel") return clampProgress((state.upgrades[condition.id] ?? 0) / condition.level);
  if (condition.type === "generatorLevel") return clampProgress((state.generators[condition.id] ?? 0) / condition.level);
  if (condition.type === "totalUpgradeLevels") return clampProgress(totalUpgradeLevels(state) / condition.value);
  if (condition.type === "totalGeneratorLevels") return clampProgress(totalGeneratorLevels(state) / condition.value);
  if (condition.type === "eps") {
    const eps = calculateStateEps(state, nowMs);
    return progressFromBigNumber(eps, condition.value);
  }
  if (condition.type === "goldenLeaf") return progressFromBigNumber(state.currencies.goldenLeaf, condition.value);
  if (condition.type === "prestiges") return clampProgress(state.lifetime.totalPrestiges / condition.value);
  if (condition.type === "adBoostActive") return state.monetization.adBoostUntil && state.monetization.adBoostUntil > nowMs ? 1 : 0;
  if (condition.type === "purchasedProducts") return clampProgress(state.monetization.purchasedProductIds.length / condition.value);
  return 0;
}

export function getAchievementCurrentText(condition: AchievementCondition, state: GameState, nowMs = Date.now()) {
  if (condition.type === "totalOranges") return state.lifetime.totalOrangesEarned.format(state.settings.numberFormat);
  if (condition.type === "totalTaps") return state.lifetime.totalTaps.toLocaleString("ko-KR");
  if (condition.type === "upgradeLevel") return `Lv.${state.upgrades[condition.id] ?? 0}`;
  if (condition.type === "generatorLevel") return `Lv.${state.generators[condition.id] ?? 0}`;
  if (condition.type === "totalUpgradeLevels") return `${totalUpgradeLevels(state)}레벨`;
  if (condition.type === "totalGeneratorLevels") return `${totalGeneratorLevels(state)}레벨`;
  if (condition.type === "eps") {
    const eps = calculateStateEps(state, nowMs);
    return `${eps.format(state.settings.numberFormat)} /초`;
  }
  if (condition.type === "goldenLeaf") return state.currencies.goldenLeaf.format(state.settings.numberFormat);
  if (condition.type === "prestiges") return `${state.lifetime.totalPrestiges}회`;
  if (condition.type === "adBoostActive") return state.monetization.adBoostUntil && state.monetization.adBoostUntil > nowMs ? "진행 중" : "대기";
  if (condition.type === "purchasedProducts") return `${state.monetization.purchasedProductIds.length}개`;
  return "";
}

function rewardOrangeAmount(reward: AchievementReward, state: GameState) {
  if (!reward.oranges) return BigNumberLite.zero();
  return BigNumberLite.from(reward.oranges).multiply(getCompanionBonuses(state).achievementOrangeMultiplier).floor();
}

export function formatAchievementReward(reward: AchievementReward, state: GameState) {
  const parts: string[] = [];
  const oranges = rewardOrangeAmount(reward, state);
  if (!oranges.isZero()) parts.push(`${oranges.format(state.settings.numberFormat)} 귤`);
  if (reward.goldenLeaf) parts.push(`${BigNumberLite.from(reward.goldenLeaf).format(state.settings.numberFormat)} 황금잎`);
  if (reward.friendship) parts.push(`${reward.friendship.amount} 친밀도`);
  if (reward.permanentMultiplier) parts.push(`영구 x${(1 + reward.permanentMultiplier).toFixed(2)}`);
  if (reward.decorationIds?.length) parts.push("장식 해금");
  return parts.join(" · ") || "앨범 기록";
}

export function getAchievementViewModels(state: GameState, nowMs = Date.now()): AchievementViewModel[] {
  const unlockedIds = new Set(state.achievements.unlockedIds);
  const claimedRewardIds = new Set(state.achievements.claimedRewardIds);
  return AchievementConfig.achievements.map((achievement) => ({
    ...achievement,
    unlocked: unlockedIds.has(achievement.id) || isAchievementConditionMet(achievement.condition, state, nowMs),
    rewardClaimed: claimedRewardIds.has(achievement.id),
    canClaimReward: (unlockedIds.has(achievement.id) || isAchievementConditionMet(achievement.condition, state, nowMs)) && !claimedRewardIds.has(achievement.id),
    progress: getAchievementProgress(achievement.condition, state, nowMs),
    currentText: getAchievementCurrentText(achievement.condition, state, nowMs),
    reward: resolveAchievementReward(achievement),
    rewardSummary: formatAchievementReward(resolveAchievementReward(achievement), state),
  }));
}

export function applyAchievementUnlocks(state: GameState, nowMs = Date.now()): GameState {
  const currentUnlocked = new Set(state.achievements.unlockedIds);
  const newlyUnlocked = AchievementConfig.achievements.filter((achievement) => {
    return !currentUnlocked.has(achievement.id) && isAchievementConditionMet(achievement.condition, state, nowMs);
  });

  if (newlyUnlocked.length === 0) return state;

  const first = newlyUnlocked[0];
  const nextUnlockedIds = [...currentUnlocked, ...newlyUnlocked.map((achievement) => achievement.id)];

  return {
    ...state,
    updatedAt: nowMs,
    achievements: {
      unlockedIds: nextUnlockedIds,
      claimedRewardIds: [...state.achievements.claimedRewardIds],
      lastUnlockedId: first.id,
    },
    lastToast: state.lastToast ?? first.toast,
    lastAction: state.lastToast
      ? state.lastAction
      : {
          kind: "achievement",
          message: first.name,
          createdAt: nowMs,
        },
  };
}

export function getClaimedAchievementRewardMultiplier(state: GameState) {
  return state.achievements.claimedRewardIds.reduce((multiplier, achievementId) => {
    const achievement = AchievementConfig.achievements.find((item) => item.id === achievementId);
    if (!achievement) return multiplier;
    const reward = resolveAchievementReward(achievement);
    return reward.permanentMultiplier ? multiplier.multiply(1 + reward.permanentMultiplier) : multiplier;
  }, BigNumberLite.one());
}

export function claimAchievementReward(state: GameState, achievementId: string, nowMs = Date.now()): AchievementRewardClaimResult {
  const achievement = getAchievementViewModels(state, nowMs).find((item) => item.id === achievementId);
  if (!achievement) return { ok: false, state, reason: "not_found" };
  if (!achievement.unlocked) return { ok: false, state, reason: "locked", achievement };
  if (achievement.rewardClaimed) return { ok: false, state, reason: "already_claimed", achievement };

  const orangeReward = rewardOrangeAmount(achievement.reward, state);
  const goldenLeafReward = achievement.reward.goldenLeaf ? BigNumberLite.from(achievement.reward.goldenLeaf) : BigNumberLite.zero();
  const currentFriendship = achievement.reward.friendship
    ? state.companions.friendshipById[achievement.reward.friendship.capybaraId] ?? 0
    : 0;
  const nextUnlockedIds = state.achievements.unlockedIds.includes(achievement.id)
    ? state.achievements.unlockedIds
    : [...state.achievements.unlockedIds, achievement.id];

  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    currencies: {
      orange: state.currencies.orange.add(orangeReward),
      goldenLeaf: state.currencies.goldenLeaf.add(goldenLeafReward),
    },
    lifetime: {
      ...state.lifetime,
      totalOrangesEarned: state.lifetime.totalOrangesEarned.add(orangeReward),
    },
    achievements: {
      unlockedIds: nextUnlockedIds,
      claimedRewardIds: [...state.achievements.claimedRewardIds, achievement.id],
      lastUnlockedId: achievement.id,
    },
    companions: achievement.reward.friendship
      ? {
          friendshipById: {
            ...state.companions.friendshipById,
            [achievement.reward.friendship.capybaraId]: currentFriendship + achievement.reward.friendship.amount,
          },
          highlightedId: achievement.reward.friendship.capybaraId,
        }
      : state.companions,
    lastToast: `업적 보상: ${formatAchievementReward(achievement.reward, state)}`,
    lastAction: {
      kind: "achievement",
      message: `${achievement.name} 보상을 받았어요.`,
      createdAt: nowMs,
    },
  };

  return { ok: true, state: nextState, achievement };
}
