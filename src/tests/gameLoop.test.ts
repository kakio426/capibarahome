import { describe, expect, it } from "vitest";
import { GameConfig } from "../config/GameConfig";
import { advanceGameState } from "../game/GameEngine";
import { selectTapGain } from "../game/GameSelectors";
import { clampDelta } from "../core/time";
import { makeState } from "./testUtils";

describe("game loop simulation", () => {
  it("adds EPS after one second", () => {
    const state = makeState();
    state.generators.orange_basket = 5;
    const next = advanceGameState(state, 1000, 2_000);
    expect(next.currencies.orange.toNumberSafe()).toBe(1);
  });

  it("calculates tap gain for immediate touch", () => {
    const state = makeState();
    state.upgrades.soft_paw = 1;
    expect(selectTapGain(state, 2_000).toNumberSafe()).toBe(2);
  });

  it("clamps large delta", () => {
    expect(clampDelta(5000, GameConfig.loop.maxDeltaMs)).toBe(250);
  });

  it("does not advance when delta is zero", () => {
    const state = makeState();
    state.generators.orange_basket = 10;
    const next = advanceGameState(state, 0, 2_000);
    expect(next).toBe(state);
  });
});
