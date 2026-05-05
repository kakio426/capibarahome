import { BalanceConfig, UpgradeId } from "../config/BalanceConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { upgradeCost } from "../core/gameMath";
import { GameState } from "../game/GameTypes";
import { getUnlockProgress, isUnlockRequirementMet } from "./UnlockManager";

export type UpgradeCategory = "tap" | "generator";

export type UpgradeViewModel = {
  id: UpgradeId;
  category: UpgradeCategory;
  name: string;
  description: string;
  tier: string;
  icon: string;
  level: number;
  maxLevel: number | null;
  cost: BigNumberLite;
  unlocked: boolean;
  unlockLabel: string;
  unlockProgress: number;
  canBuy: boolean;
  effectText: string;
  uiCopy: string;
};

export type UpgradePurchaseResult =
  | { ok: true; state: GameState; item: UpgradeViewModel }
  | { ok: false; state: GameState; reason: "not_found" | "locked" | "max_level" | "insufficient_oranges"; item?: UpgradeViewModel };

function tapEffect(level: number, perLevel: number) {
  return `터치 배율 +${level * perLevel}`;
}

function generatorEffect(level: number, baseEps: string, multiplier: number) {
  const eps = BigNumberLite.from(baseEps).multiply(level);
  const extra = multiplier > 1 ? `, 전체 생산 +${Math.round((multiplier - 1) * level * 100)}%` : "";
  return `${eps.format()} 귤/초${extra}`;
}

export function getUpgradeViewModels(state: GameState): UpgradeViewModel[] {
  const tapItems = BalanceConfig.tapUpgrades.map((upgrade) => {
    const level = state.upgrades[upgrade.id] ?? 0;
    const cost = upgradeCost(upgrade.baseCost, upgrade.growthRate, level);
    const capped = upgrade.maxLevel !== null && level >= upgrade.maxLevel;
    const unlocked = isUnlockRequirementMet(upgrade.unlock, state);
    return {
      id: upgrade.id,
      category: "tap" as const,
      name: upgrade.name,
      description: upgrade.description,
      tier: upgrade.tier,
      icon: upgrade.icon,
      level,
      maxLevel: upgrade.maxLevel,
      cost,
      unlocked,
      unlockLabel: upgrade.unlockLabel,
      unlockProgress: Math.max(0, Math.min(1, getUnlockProgress(upgrade.unlock, state))),
      canBuy: unlocked && !capped && state.currencies.orange.gte(cost),
      effectText: tapEffect(level, upgrade.tapMultiplierPerLevel),
      uiCopy: upgrade.uiCopy,
    };
  });

  const generatorItems = BalanceConfig.generators.map((generator) => {
    const level = state.generators[generator.id] ?? 0;
    const cost = upgradeCost(generator.baseCost, generator.growthRate, level);
    const capped = generator.maxLevel !== null && level >= generator.maxLevel;
    const unlocked = isUnlockRequirementMet(generator.unlock, state);
    return {
      id: generator.id,
      category: "generator" as const,
      name: generator.name,
      description: generator.description,
      tier: generator.tier,
      icon: generator.icon,
      level,
      maxLevel: generator.maxLevel,
      cost,
      unlocked,
      unlockLabel: generator.unlockLabel,
      unlockProgress: Math.max(0, Math.min(1, getUnlockProgress(generator.unlock, state))),
      canBuy: unlocked && !capped && state.currencies.orange.gte(cost),
      effectText: generatorEffect(level, generator.baseEps, generator.generatorMultiplier),
      uiCopy: generator.uiCopy,
    };
  });

  return [...tapItems, ...generatorItems];
}

export function findUpgrade(state: GameState, id: string) {
  return getUpgradeViewModels(state).find((item) => item.id === id);
}

export function purchaseUpgrade(state: GameState, id: string, nowMs = Date.now()): UpgradePurchaseResult {
  const item = findUpgrade(state, id);
  if (!item) return { ok: false, state, reason: "not_found" };
  if (!item.unlocked) return { ok: false, state, reason: "locked", item };
  if (item.maxLevel !== null && item.level >= item.maxLevel) {
    return { ok: false, state, reason: "max_level", item };
  }
  if (!state.currencies.orange.gte(item.cost)) {
    return { ok: false, state, reason: "insufficient_oranges", item };
  }

  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.subtract(item.cost).max(0),
    },
    upgrades: item.category === "tap"
      ? { ...state.upgrades, [item.id]: item.level + 1 }
      : state.upgrades,
    generators: item.category === "generator"
      ? { ...state.generators, [item.id]: item.level + 1 }
      : state.generators,
    lastToast: `${item.name}을(를) 업그레이드했어요.`,
    lastAction: {
      kind: "purchase",
      message: `${item.name} Lv.${item.level + 1}`,
      createdAt: nowMs,
    },
  };

  return { ok: true, state: nextState, item };
}
