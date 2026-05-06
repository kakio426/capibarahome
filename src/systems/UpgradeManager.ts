import { BalanceConfig, UpgradeId } from "../config/BalanceConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { upgradeCost } from "../core/gameMath";
import { GameState } from "../game/GameTypes";
import { getUnlockProgress, isUnlockRequirementMet } from "./UnlockManager";

export type UpgradeCategory = "tap" | "generator";
export type UpgradePurchaseMode = "one" | "ten" | "max";
export type UpgradePurchaseFailureReason = "not_found" | "locked" | "max_level" | "insufficient_oranges";

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

export type UpgradePurchasePlan = {
  mode: UpgradePurchaseMode;
  quantity: number;
  requestedQuantity: number;
  totalCost: BigNumberLite;
  nextLevel: number;
  canBuy: boolean;
  reason?: Exclude<UpgradePurchaseFailureReason, "not_found" | "locked">;
  limitedBySafety: boolean;
};

export type UpgradePurchasePreview = Omit<UpgradePurchasePlan, "reason"> & {
  item?: UpgradeViewModel;
  reason?: UpgradePurchaseFailureReason;
};

export type UpgradePurchaseResult =
  | { ok: true; state: GameState; item: UpgradeViewModel; quantity: number; totalCost: BigNumberLite; nextLevel: number }
  | { ok: false; state: GameState; reason: UpgradePurchaseFailureReason; item?: UpgradeViewModel };

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

function getUpgradeConfig(id: string) {
  const tapUpgrade = BalanceConfig.tapUpgrades.find((upgrade) => upgrade.id === id);
  if (tapUpgrade) {
    return { category: "tap" as const, config: tapUpgrade };
  }
  const generator = BalanceConfig.generators.find((upgrade) => upgrade.id === id);
  if (generator) {
    return { category: "generator" as const, config: generator };
  }
  return null;
}

export function calculateUpgradePurchasePlan({
  baseCost,
  growthRate,
  currentLevel,
  maxLevel,
  balance,
  mode,
  maxIterations = 500,
}: {
  baseCost: string;
  growthRate: number;
  currentLevel: number;
  maxLevel: number | null;
  balance: BigNumberLite | string | number;
  mode: UpgradePurchaseMode;
  maxIterations?: number;
}): UpgradePurchasePlan {
  const normalizedLevel = Math.max(0, Math.floor(currentLevel));
  const availableBalance = BigNumberLite.from(balance);
  const remainingToCap = maxLevel === null ? Number.POSITIVE_INFINITY : Math.max(0, maxLevel - normalizedLevel);
  const requestedQuantity = mode === "one" ? 1 : mode === "ten" ? 10 : Number.isFinite(remainingToCap) ? remainingToCap : maxIterations;
  const targetQuantity = Math.min(requestedQuantity, remainingToCap, maxIterations);

  if (targetQuantity <= 0) {
    return {
      mode,
      quantity: 0,
      requestedQuantity: 0,
      totalCost: BigNumberLite.zero(),
      nextLevel: normalizedLevel,
      canBuy: false,
      reason: "max_level",
      limitedBySafety: false,
    };
  }

  let quantity = 0;
  let totalCost = BigNumberLite.zero();
  let lacksFullBatch = false;

  for (let offset = 0; offset < targetQuantity; offset += 1) {
    const nextCost = upgradeCost(baseCost, growthRate, normalizedLevel + offset);
    totalCost = totalCost.add(nextCost);
    if (!availableBalance.gte(totalCost)) {
      if (mode === "max") {
        totalCost = totalCost.subtract(nextCost);
        break;
      }
      lacksFullBatch = true;
      continue;
    }
    quantity += 1;
  }

  if (lacksFullBatch) {
    return {
      mode,
      quantity: 0,
      requestedQuantity: targetQuantity,
      totalCost,
      nextLevel: normalizedLevel,
      canBuy: false,
      reason: "insufficient_oranges",
      limitedBySafety: false,
    };
  }

  if (quantity <= 0) {
    return {
      mode,
      quantity: 0,
      requestedQuantity: targetQuantity,
      totalCost: upgradeCost(baseCost, growthRate, normalizedLevel),
      nextLevel: normalizedLevel,
      canBuy: false,
      reason: "insufficient_oranges",
      limitedBySafety: false,
    };
  }

  const nextLevel = normalizedLevel + quantity;
  const hasMoreCap = maxLevel === null || nextLevel < maxLevel;
  const couldAffordAnother = hasMoreCap && availableBalance.gte(totalCost.add(upgradeCost(baseCost, growthRate, nextLevel)));

  return {
    mode,
    quantity,
    requestedQuantity: targetQuantity,
    totalCost,
    nextLevel,
    canBuy: true,
    limitedBySafety: mode === "max" && quantity >= maxIterations && couldAffordAnother,
  };
}

export function getUpgradePurchasePreview(state: GameState, id: string, mode: UpgradePurchaseMode = "one"): UpgradePurchasePreview {
  const item = findUpgrade(state, id);
  if (!item) {
    return {
      mode,
      quantity: 0,
      requestedQuantity: 0,
      totalCost: BigNumberLite.zero(),
      nextLevel: 0,
      canBuy: false,
      reason: "not_found",
      limitedBySafety: false,
    };
  }
  if (!item.unlocked) {
    return {
      mode,
      item,
      quantity: 0,
      requestedQuantity: 0,
      totalCost: item.cost,
      nextLevel: item.level,
      canBuy: false,
      reason: "locked",
      limitedBySafety: false,
    };
  }
  const configEntry = getUpgradeConfig(id);
  if (!configEntry) {
    return {
      mode,
      item,
      quantity: 0,
      requestedQuantity: 0,
      totalCost: BigNumberLite.zero(),
      nextLevel: item.level,
      canBuy: false,
      reason: "not_found",
      limitedBySafety: false,
    };
  }
  const plan = calculateUpgradePurchasePlan({
    baseCost: configEntry.config.baseCost,
    growthRate: configEntry.config.growthRate,
    currentLevel: item.level,
    maxLevel: item.maxLevel,
    balance: state.currencies.orange,
    mode,
  });
  return {
    ...plan,
    item,
  };
}

export function purchaseUpgrade(
  state: GameState,
  id: string,
  nowMs = Date.now(),
  mode: UpgradePurchaseMode = "one",
): UpgradePurchaseResult {
  const preview = getUpgradePurchasePreview(state, id, mode);
  const item = preview.item;
  if (!item) return { ok: false, state, reason: preview.reason ?? "not_found" };
  if (!preview.canBuy) {
    return { ok: false, state, reason: preview.reason ?? "insufficient_oranges", item };
  }

  const quantity = preview.quantity;
  const nextLevel = preview.nextLevel;
  const quantityLabel = quantity > 1 ? ` ${quantity}회` : "";

  const nextState: GameState = {
    ...state,
    updatedAt: nowMs,
    currencies: {
      ...state.currencies,
      orange: state.currencies.orange.subtract(preview.totalCost).max(0),
    },
    upgrades: item.category === "tap"
      ? { ...state.upgrades, [item.id]: nextLevel }
      : state.upgrades,
    generators: item.category === "generator"
      ? { ...state.generators, [item.id]: nextLevel }
      : state.generators,
    lastToast: `${item.name}${quantityLabel} 업그레이드 완료`,
    lastAction: {
      kind: "purchase",
      message: `${item.name} Lv.${nextLevel}`,
      createdAt: nowMs,
    },
  };

  return { ok: true, state: nextState, item, quantity, totalCost: preview.totalCost, nextLevel };
}
