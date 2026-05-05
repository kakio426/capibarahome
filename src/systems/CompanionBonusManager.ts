import { StoryConfig, CapybaraAbility } from "../config/StoryConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameState } from "../game/GameTypes";

export type CompanionAbilityView = {
  label: string;
  description: string;
  currentBonus: string;
  nextBonus: string;
  nextFriendshipTarget: number | null;
};

export type CompanionBonusTotals = {
  tapMultiplier: BigNumberLite;
  epsMultiplier: BigNumberLite;
  offlineMultiplier: BigNumberLite;
  questOrangeMultiplier: BigNumberLite;
  questFriendshipBonus: number;
  achievementOrangeMultiplier: BigNumberLite;
  decorationEpsMultiplier: BigNumberLite;
  prestigeGainMultiplier: BigNumberLite;
};

const friendshipThresholds = [0, 1, 10, 30, 60, 100] as const;

export function getFriendshipLevel(friendship: number) {
  if (friendship >= 100) return 5;
  if (friendship >= 60) return 4;
  if (friendship >= 30) return 3;
  if (friendship >= 10) return 2;
  if (friendship > 0) return 1;
  return 0;
}

export function getNextFriendshipTarget(friendship: number) {
  return friendshipThresholds.find((threshold) => threshold > friendship) ?? null;
}

function formatAbilityBonus(ability: CapybaraAbility, level: number, equippedDecorations = 0) {
  const scaled = ability.type === "decorationEpsMultiplier"
    ? ability.perLevel * level * equippedDecorations
    : ability.perLevel * level;
  if (ability.unit === "flat") return `+${Math.floor(scaled)}`;
  return `+${Math.round(scaled * 100)}%`;
}

function addPercentMultiplier(current: BigNumberLite, amount: number) {
  if (amount <= 0) return current;
  return current.multiply(1 + amount);
}

export function getCompanionAbilityView(capybaraId: string, state: GameState): CompanionAbilityView {
  const capybara = StoryConfig.capybaras.find((item) => item.id === capybaraId) ?? StoryConfig.capybaras[0];
  const friendship = state.companions.friendshipById[capybara.id] ?? 0;
  const level = getFriendshipLevel(friendship);
  const nextLevel = Math.min(5, level + 1);
  const equippedDecorations = Object.keys(state.decorations.equippedBySlot).length;
  return {
    label: capybara.ability.name,
    description: capybara.ability.description,
    currentBonus: formatAbilityBonus(capybara.ability, level, equippedDecorations),
    nextBonus: level >= 5 ? "최대" : formatAbilityBonus(capybara.ability, nextLevel, equippedDecorations),
    nextFriendshipTarget: getNextFriendshipTarget(friendship),
  };
}

export function getCompanionBonuses(state: GameState): CompanionBonusTotals {
  const equippedDecorations = Object.keys(state.decorations.equippedBySlot).length;
  return StoryConfig.capybaras.reduce<CompanionBonusTotals>((totals, capybara) => {
    const friendship = state.companions.friendshipById[capybara.id] ?? 0;
    const level = getFriendshipLevel(friendship);
    if (level <= 0) return totals;
    const value = capybara.ability.perLevel * level;
    if (capybara.ability.type === "tapMultiplier") {
      totals.tapMultiplier = addPercentMultiplier(totals.tapMultiplier, value);
    } else if (capybara.ability.type === "epsMultiplier") {
      totals.epsMultiplier = addPercentMultiplier(totals.epsMultiplier, value);
    } else if (capybara.ability.type === "offlineMultiplier") {
      totals.offlineMultiplier = addPercentMultiplier(totals.offlineMultiplier, value);
    } else if (capybara.ability.type === "questOrangeMultiplier") {
      totals.questOrangeMultiplier = addPercentMultiplier(totals.questOrangeMultiplier, value);
    } else if (capybara.ability.type === "questFriendshipBonus") {
      totals.questFriendshipBonus += Math.floor(value);
    } else if (capybara.ability.type === "achievementOrangeMultiplier") {
      totals.achievementOrangeMultiplier = addPercentMultiplier(totals.achievementOrangeMultiplier, value);
    } else if (capybara.ability.type === "decorationEpsMultiplier") {
      totals.decorationEpsMultiplier = addPercentMultiplier(totals.decorationEpsMultiplier, value * equippedDecorations);
    } else if (capybara.ability.type === "prestigeGainMultiplier") {
      totals.prestigeGainMultiplier = addPercentMultiplier(totals.prestigeGainMultiplier, value);
    }
    return totals;
  }, {
    tapMultiplier: BigNumberLite.one(),
    epsMultiplier: BigNumberLite.one(),
    offlineMultiplier: BigNumberLite.one(),
    questOrangeMultiplier: BigNumberLite.one(),
    questFriendshipBonus: 0,
    achievementOrangeMultiplier: BigNumberLite.one(),
    decorationEpsMultiplier: BigNumberLite.one(),
    prestigeGainMultiplier: BigNumberLite.one(),
  });
}
