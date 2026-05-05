import { describe, expect, it } from "vitest";
import { selectTapGain } from "../game/GameSelectors";
import { getPrestigeStatus, performPrestige } from "../systems/PrestigeManager";
import { SaveManager } from "../systems/SaveManager";
import { makeState } from "./testUtils";

describe("prestige", () => {
  it("blocks prestige before requirement", () => {
    const state = makeState();
    const result = performPrestige(state, 2_000);
    expect(result.ok).toBe(false);
  });

  it("grants golden leaves and resets regular progression", () => {
    const state = makeState();
    state.currencies.orange = state.currencies.orange.add("25000000");
    state.lifetime.totalOrangesEarned = state.lifetime.totalOrangesEarned.add("100000000");
    state.upgrades.soft_paw = 5;
    state.generators.orange_basket = 10;

    const status = getPrestigeStatus(state);
    expect(status.gain.toNumberSafe()).toBe(2);

    const result = performPrestige(state, 2_000);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.currencies.orange.toNumberSafe()).toBe(0);
      expect(result.state.currencies.goldenLeaf.toNumberSafe()).toBe(2);
      expect(result.state.upgrades.soft_paw).toBeUndefined();
      expect(result.state.generators.orange_basket).toBeUndefined();
      expect(selectTapGain(result.state, 3_000).toNumberSafe()).toBeCloseTo(1.1, 5);
      const code = SaveManager.exportState(result.state, 4_000);
      const imported = SaveManager.importState(code, 5_000);
      expect(imported.ok).toBe(true);
      if (imported.ok) {
        expect(imported.state.currencies.goldenLeaf.toNumberSafe()).toBe(2);
        expect(imported.state.currencies.orange.toNumberSafe()).toBe(0);
        expect(imported.state.upgrades.soft_paw).toBeUndefined();
      }
    }
  });
});
