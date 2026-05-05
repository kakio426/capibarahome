import { describe, expect, it, vi } from "vitest";
import { GameConfig } from "../config/GameConfig";
import { advanceGameState } from "../game/GameEngine";
import { GameLoop } from "../game/GameLoop";
import { selectTapGain } from "../game/GameSelectors";
import { clampDelta } from "../core/time";
import { getGameState, setGameState } from "../state/useGameStore";
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

  it("skips RAF income while the document is hidden and resumes when visible", () => {
    const callbacks: Array<(timestamp: number) => void> = [];
    let visibilityState: DocumentVisibilityState = "visible";
    const listeners = new Map<string, EventListenerOrEventListenerObject>();
    const fakeDocument = {
      get visibilityState() {
        return visibilityState;
      },
      addEventListener: vi.fn((event: string, listener: EventListenerOrEventListenerObject) => {
        listeners.set(event, listener);
      }),
      removeEventListener: vi.fn((event: string) => {
        listeners.delete(event);
      }),
    };

    vi.stubGlobal("window", {});
    vi.stubGlobal("document", fakeDocument);
    vi.stubGlobal("requestAnimationFrame", vi.fn((callback: (timestamp: number) => void) => {
      callbacks.push(callback);
      return callbacks.length;
    }));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    const state = makeState();
    state.generators.orange_basket = 10;
    setGameState(state);

    const loop = new GameLoop();
    try {
      loop.start();
      visibilityState = "hidden";
      callbacks.shift()?.(1_000);
      expect(getGameState().currencies.orange.isZero()).toBe(true);

      visibilityState = "visible";
      callbacks.shift()?.(1_500);
      expect(getGameState().currencies.orange.toNumberSafe()).toBeGreaterThan(0);
    } finally {
      loop.stop();
      vi.unstubAllGlobals();
    }
  });
});
