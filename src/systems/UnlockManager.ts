import { UnlockRequirement } from "../config/BalanceConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameState } from "../game/GameTypes";

export function isUnlockRequirementMet(requirement: UnlockRequirement, state: GameState) {
  if (requirement.type === "none") return true;
  if (requirement.type === "lifetimeOranges") return state.lifetime.totalOrangesEarned.gte(requirement.value);
  if (requirement.type === "goldenLeaf") return state.currencies.goldenLeaf.gte(requirement.value);
  if (requirement.type === "prestiges") return state.lifetime.totalPrestiges >= requirement.value;
  if (requirement.type === "generatorLevel") return (state.generators[requirement.id] ?? 0) >= requirement.level;
  return false;
}

export function getUnlockProgress(requirement: UnlockRequirement, state: GameState) {
  if (requirement.type === "none") return 1;
  if (requirement.type === "lifetimeOranges") {
    return state.lifetime.totalOrangesEarned.divide(requirement.value).toNumberSafe();
  }
  if (requirement.type === "goldenLeaf") {
    return state.currencies.goldenLeaf.divide(requirement.value).toNumberSafe();
  }
  if (requirement.type === "prestiges") {
    return state.lifetime.totalPrestiges / Math.max(1, requirement.value);
  }
  if (requirement.type === "generatorLevel") {
    return (state.generators[requirement.id] ?? 0) / Math.max(1, requirement.level);
  }
  return 0;
}

export function getRequirementCurrentValue(requirement: UnlockRequirement, state: GameState) {
  if (requirement.type === "none") return "완료";
  if (requirement.type === "lifetimeOranges") return state.lifetime.totalOrangesEarned.toString();
  if (requirement.type === "goldenLeaf") return state.currencies.goldenLeaf.toString();
  if (requirement.type === "prestiges") return String(state.lifetime.totalPrestiges);
  if (requirement.type === "generatorLevel") return String(state.generators[requirement.id] ?? 0);
  return BigNumberLite.zero().toString();
}

