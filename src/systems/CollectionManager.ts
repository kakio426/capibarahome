import { DecorationConfig, DecorationConfigItem, DecorationSlot, DecorationUnlock } from "../config/DecorationConfig";
import { ProgressionConfig, ProgressionTierId } from "../config/ProgressionConfig";
import { StoryConfig, CapybaraCharacter } from "../config/StoryConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameState } from "../game/GameTypes";
import { getCompanionAbilityView, getFriendshipLevel, getNextFriendshipTarget } from "./CompanionBonusManager";

export type CompanionMood = "sleepy" | "curious" | "happy" | "proud" | "legend";

export type CompanionCardViewModel = CapybaraCharacter & {
  unlocked: boolean;
  unlockLabel: string;
  friendship: number;
  friendshipLevel: number;
  nextFriendshipTarget: number | null;
  mood: CompanionMood;
  progress: number;
  abilityLabel: string;
  abilityDescription: string;
  abilityCurrentBonus: string;
  abilityNextBonus: string;
};

export type DecorationViewModel = DecorationConfigItem & {
  unlocked: boolean;
  equipped: boolean;
  unlockLabel: string;
  progress: number;
};

export type DecorationEquipResult =
  | { ok: true; state: GameState; decoration: DecorationViewModel }
  | { ok: false; state: GameState; reason: "not_found" | "locked"; decoration?: DecorationViewModel };

const companionUnlockTier: Record<string, ProgressionTierId> = {
  momo: "yard",
  podo: "yard",
  narin: "storehouse",
  dami: "onsen",
  soda: "onsen",
  biro: "bamboo_garden",
  ruru: "bamboo_garden",
  hanul: "golden_forest",
};

function tierOrder(id: ProgressionTierId) {
  return ProgressionConfig.tiers.find((tier) => tier.id === id)?.order ?? 1;
}

function currentTierOrder(state: GameState) {
  return ProgressionConfig.tiers
    .filter((tier) => state.lifetime.totalOrangesEarned.gte(tier.requiredLifetimeOranges))
    .reduce((max, tier) => Math.max(max, tier.order), 1);
}

function tierRequirement(id: ProgressionTierId) {
  return ProgressionConfig.tiers.find((tier) => tier.id === id)?.requiredLifetimeOranges ?? "0";
}

function progressToTier(state: GameState, id: ProgressionTierId) {
  const required = BigNumberLite.from(tierRequirement(id));
  if (required.isZero()) return 1;
  return Math.max(0, Math.min(1, state.lifetime.totalOrangesEarned.divide(required).toNumberSafe()));
}

function moodFor(friendship: number, unlocked: boolean): CompanionMood {
  if (!unlocked) return "sleepy";
  if (friendship >= 100) return "legend";
  if (friendship >= 60) return "proud";
  if (friendship >= 20) return "happy";
  return "curious";
}

function isDecorationUnlockMet(unlock: DecorationUnlock, state: GameState) {
  if (unlock.type === "default") return true;
  if (unlock.type === "tier") return currentTierOrder(state) >= tierOrder(unlock.id);
  if (unlock.type === "questClaimed") return state.quests.claimedIds.includes(unlock.id);
  if (unlock.type === "achievementUnlocked") return state.achievements.unlockedIds.includes(unlock.id);
  if (unlock.type === "goldenLeaf") return state.currencies.goldenLeaf.gte(unlock.value);
  return state.lifetime.totalPrestiges >= unlock.value;
}

function decorationUnlockProgress(unlock: DecorationUnlock, state: GameState) {
  if (unlock.type === "default") return 1;
  if (unlock.type === "tier") return progressToTier(state, unlock.id);
  if (unlock.type === "questClaimed") return state.quests.claimedIds.includes(unlock.id) ? 1 : 0;
  if (unlock.type === "achievementUnlocked") return state.achievements.unlockedIds.includes(unlock.id) ? 1 : 0;
  if (unlock.type === "goldenLeaf") {
    const target = BigNumberLite.from(unlock.value);
    if (target.isZero()) return 1;
    return Math.max(0, Math.min(1, state.currencies.goldenLeaf.divide(target).toNumberSafe()));
  }
  return Math.max(0, Math.min(1, state.lifetime.totalPrestiges / unlock.value));
}

function decorationUnlockLabel(unlock: DecorationUnlock) {
  if (unlock.type === "default") return "기본 제공";
  if (unlock.type === "tier") {
    const tier = ProgressionConfig.tiers.find((item) => item.id === unlock.id);
    return `${tier?.name ?? unlock.id} 도달`;
  }
  if (unlock.type === "questClaimed") return "연결 퀘스트 완료";
  if (unlock.type === "achievementUnlocked") return "연결 업적 해금";
  if (unlock.type === "goldenLeaf") return `황금 나뭇잎 ${unlock.value}개`;
  return `환생 ${unlock.value}회`;
}

export function getCompanionCards(state: GameState): CompanionCardViewModel[] {
  const currentOrder = currentTierOrder(state);
  return StoryConfig.capybaras.map((capybara) => {
    const requiredTier = companionUnlockTier[capybara.id] ?? "yard";
    const unlocked = currentOrder >= tierOrder(requiredTier);
    const friendship = state.companions.friendshipById[capybara.id] ?? 0;
    const ability = getCompanionAbilityView(capybara.id, state);
    return {
      ...capybara,
      unlocked,
      unlockLabel: `${ProgressionConfig.tiers.find((tier) => tier.id === requiredTier)?.name ?? requiredTier}에서 만남`,
      friendship,
      friendshipLevel: getFriendshipLevel(friendship),
      nextFriendshipTarget: getNextFriendshipTarget(friendship),
      mood: moodFor(friendship, unlocked),
      progress: unlocked ? Math.min(1, friendship / 100) : progressToTier(state, requiredTier),
      abilityLabel: ability.label,
      abilityDescription: ability.description,
      abilityCurrentBonus: ability.currentBonus,
      abilityNextBonus: ability.nextBonus,
    };
  });
}

export function getDecorationViewModels(state: GameState): DecorationViewModel[] {
  return DecorationConfig.decorations.map((decoration) => {
    const unlocked = isDecorationUnlockMet(decoration.unlock, state);
    return {
      ...decoration,
      unlocked,
      equipped: state.decorations.equippedBySlot[decoration.slot] === decoration.id,
      unlockLabel: decorationUnlockLabel(decoration.unlock),
      progress: decorationUnlockProgress(decoration.unlock, state),
    };
  });
}

export function getEquippedDecorations(state: GameState): DecorationViewModel[] {
  const decorations = getDecorationViewModels(state);
  return decorations.filter((decoration) => decoration.equipped);
}

export function getCollectionSummary(state: GameState) {
  const companions = getCompanionCards(state);
  const decorations = getDecorationViewModels(state);
  return {
    companions,
    decorations,
    unlockedCompanions: companions.filter((item) => item.unlocked).length,
    totalCompanions: companions.length,
    unlockedDecorations: decorations.filter((item) => item.unlocked).length,
    totalDecorations: decorations.length,
    equippedDecorations: decorations.filter((item) => item.equipped),
  };
}

export function equipDecoration(state: GameState, decorationId: string, nowMs = Date.now()): DecorationEquipResult {
  const decoration = getDecorationViewModels(state).find((item) => item.id === decorationId);
  if (!decoration) return { ok: false, state, reason: "not_found" };
  if (!decoration.unlocked) return { ok: false, state, reason: "locked", decoration };

  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    decorations: {
      equippedBySlot: {
        ...state.decorations.equippedBySlot,
        [decoration.slot as DecorationSlot]: decoration.id,
      },
    },
    lastToast: `${decoration.name} 장식을 배치했어요.`,
    lastAction: {
      kind: "decoration",
      message: decoration.flavorLine,
      createdAt: nowMs,
    },
  };
  return { ok: true, state: nextState, decoration };
}
