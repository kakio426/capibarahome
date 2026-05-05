import { describe, expect, it } from "vitest";
import { purchaseUpgrade } from "../systems/UpgradeManager";
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
});
