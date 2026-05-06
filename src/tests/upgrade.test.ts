import { describe, expect, it } from "vitest";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateUpgradePurchasePlan, getUpgradePurchasePreview, purchaseUpgrade } from "../systems/UpgradeManager";
import { makeState } from "./testUtils";

describe("upgrade purchases", () => {
  it("allows purchase when oranges are sufficient", () => {
    const state = makeState();
    state.currencies.orange = state.currencies.orange.add(100);
    const result = purchaseUpgrade(state, "soft_paw", 2_000);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.upgrades.soft_paw).toBe(1);
      expect(result.state.currencies.orange.toNumberSafe()).toBe(85);
    }
  });

  it("rejects purchase when oranges are insufficient", () => {
    const state = makeState();
    const result = purchaseUpgrade(state, "orange_basket", 2_000);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("insufficient_oranges");
      expect(result.state.currencies.orange.toNumberSafe()).toBe(0);
    }
  });

  it("increases next cost after purchase", () => {
    const state = makeState();
    state.currencies.orange = state.currencies.orange.add(1_000);
    const first = purchaseUpgrade(state, "orange_basket", 2_000);
    expect(first.ok).toBe(true);
    if (first.ok) {
      const second = purchaseUpgrade(first.state, "orange_basket", 3_000);
      expect(second.ok).toBe(true);
      if (second.ok) {
        expect(second.item.cost.gte(first.item.cost)).toBe(true);
        expect(second.state.generators.orange_basket).toBe(2);
      }
    }
  });

  it("buys ten levels with one BigNumber-backed purchase plan", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("10000");
    const preview = getUpgradePurchasePreview(state, "soft_paw", "ten");

    expect(preview.canBuy).toBe(true);
    expect(preview.quantity).toBe(10);

    const result = purchaseUpgrade(state, "soft_paw", 2_000, "ten");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.quantity).toBe(10);
      expect(result.nextLevel).toBe(10);
      expect(result.state.upgrades.soft_paw).toBe(10);
      expect(result.state.currencies.orange.toNumberSafe()).toBeCloseTo(
        BigNumberLite.from("10000").subtract(preview.totalCost).toNumberSafe(),
        5,
      );
    }
  });

  it("rejects ten-buy when only a single level is affordable", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("100");

    const preview = getUpgradePurchasePreview(state, "soft_paw", "ten");
    expect(preview.canBuy).toBe(false);
    expect(preview.reason).toBe("insufficient_oranges");

    const result = purchaseUpgrade(state, "soft_paw", 2_000, "ten");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("insufficient_oranges");
      expect(result.state.upgrades.soft_paw).toBeUndefined();
    }
  });

  it("buys the maximum affordable levels without creating negative oranges", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("1000");

    const preview = getUpgradePurchasePreview(state, "orange_basket", "max");
    expect(preview.canBuy).toBe(true);
    expect(preview.quantity).toBeGreaterThan(1);

    const result = purchaseUpgrade(state, "orange_basket", 2_000, "max");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.generators.orange_basket).toBe(preview.quantity);
      expect(result.state.currencies.orange.gte(0)).toBe(true);
      const nextPreview = getUpgradePurchasePreview(result.state, "orange_basket", "one");
      expect(nextPreview.canBuy).toBe(false);
    }
  });

  it("caps planned purchases at maxLevel when a capped upgrade exists", () => {
    const plan = calculateUpgradePurchasePlan({
      baseCost: "10",
      growthRate: 1,
      currentLevel: 3,
      maxLevel: 5,
      balance: "1000",
      mode: "ten",
    });

    expect(plan.canBuy).toBe(true);
    expect(plan.quantity).toBe(2);
    expect(plan.nextLevel).toBe(5);

    const capped = calculateUpgradePurchasePlan({
      baseCost: "10",
      growthRate: 1,
      currentLevel: 5,
      maxLevel: 5,
      balance: "1000",
      mode: "max",
    });

    expect(capped.canBuy).toBe(false);
    expect(capped.reason).toBe("max_level");
  });

  it("keeps max-buy stable with very large BigNumber costs", () => {
    const plan = calculateUpgradePurchasePlan({
      baseCost: "1e45",
      growthRate: 1.01,
      currentLevel: 0,
      maxLevel: null,
      balance: "1e48",
      mode: "max",
      maxIterations: 20,
    });

    expect(plan.canBuy).toBe(true);
    expect(plan.quantity).toBeGreaterThan(0);
    expect(plan.totalCost.gte("1e45")).toBe(true);
    expect(plan.nextLevel).toBe(plan.quantity);
  });
});
