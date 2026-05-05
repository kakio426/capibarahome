import { BalanceConfig } from "../config/BalanceConfig";
import { GameConfig } from "../config/GameConfig";
import { MonetizationConfig } from "../config/MonetizationConfig";
import { BigNumberInput, BigNumberLite } from "./BigNumberLite";

export function upgradeCost(baseCost: BigNumberInput, growthRate: number, level: number) {
  return BigNumberLite.from(baseCost).multiply(BigNumberLite.from(growthRate).pow(level)).floor();
}

export function getPrestigeMultiplier(goldenLeaves: BigNumberInput) {
  return BigNumberLite.one().add(BigNumberLite.from(goldenLeaves).multiply(GameConfig.prestige.goldenLeafPower));
}

export function getAdMultiplier(adBoostUntil: number | null, nowMs: number) {
  return adBoostUntil && adBoostUntil > nowMs ? BigNumberLite.from(MonetizationConfig.rewardedAd.multiplier) : BigNumberLite.one();
}

export function getTapUpgradeMultiplier(upgrades: Record<string, number>) {
  return BalanceConfig.tapUpgrades.reduce((total, upgrade) => {
    const level = upgrades[upgrade.id] ?? 0;
    return total.add(level * upgrade.tapMultiplierPerLevel);
  }, BigNumberLite.one());
}

export function calculateTapGain(params: {
  upgrades: Record<string, number>;
  goldenLeaf: BigNumberInput;
  adBoostUntil: number | null;
  nowMs: number;
  bonusMultiplier?: BigNumberInput;
}) {
  return BigNumberLite.from(GameConfig.tap.baseGain)
    .multiply(getTapUpgradeMultiplier(params.upgrades))
    .multiply(getPrestigeMultiplier(params.goldenLeaf))
    .multiply(getAdMultiplier(params.adBoostUntil, params.nowMs))
    .multiply(params.bonusMultiplier ?? 1);
}

export function calculateGlobalGeneratorMultiplier(generators: Record<string, number>) {
  return BalanceConfig.generators.reduce((multiplier, generator) => {
    if (generator.generatorMultiplier <= 1) return multiplier;
    const level = generators[generator.id] ?? 0;
    if (level <= 0) return multiplier;
    return multiplier.multiply(1 + Math.max(0, level) * (generator.generatorMultiplier - 1));
  }, BigNumberLite.one());
}

export function calculateEps(params: {
  generators: Record<string, number>;
  goldenLeaf: BigNumberInput;
  adBoostUntil: number | null;
  nowMs: number;
  bonusMultiplier?: BigNumberInput;
}) {
  const raw = BalanceConfig.generators.reduce((sum, generator) => {
    const level = params.generators[generator.id] ?? 0;
    if (level <= 0) return sum;
    return sum.add(BigNumberLite.from(generator.baseEps).multiply(level));
  }, BigNumberLite.zero());

  return raw
    .multiply(BalanceConfig.global.baseMultiplier)
    .multiply(calculateGlobalGeneratorMultiplier(params.generators))
    .multiply(getPrestigeMultiplier(params.goldenLeaf))
    .multiply(getAdMultiplier(params.adBoostUntil, params.nowMs))
    .multiply(params.bonusMultiplier ?? 1);
}

export function calculatePrestigeGain(totalLifetimeOranges: BigNumberInput, bonusMultiplier: BigNumberInput = 1) {
  const ratio = BigNumberLite.from(totalLifetimeOranges).divide(GameConfig.prestige.requirement);
  if (ratio.lt(1)) return BigNumberLite.zero();
  return ratio.pow(0.5).multiply(bonusMultiplier).floor();
}

export function calculateOfflineReward(params: {
  epsAtLastSave: BigNumberInput;
  lastSavedAt: number;
  nowMs: number;
  bonusMultiplier?: BigNumberInput;
}) {
  const elapsed = Math.max(0, Math.floor((params.nowMs - params.lastSavedAt) / 1000));
  const cappedSeconds = Math.min(elapsed, GameConfig.offline.maxSeconds);
  const reward = BigNumberLite.from(params.epsAtLastSave)
    .multiply(cappedSeconds)
    .multiply(GameConfig.offline.efficiency)
    .multiply(params.bonusMultiplier ?? 1);
  return { seconds: cappedSeconds, reward };
}
