import { describe, expect, it } from "vitest";
import { calculateOfflineReward } from "../core/gameMath";
import { GameConfig } from "../config/GameConfig";
import { claimOfflineReward, createOfflineReward } from "../systems/OfflineRewardManager";
import { makeState } from "./testUtils";

describe("offline reward", () => {
  it("calculates capped offline reward", () => {
    const reward = calculateOfflineReward({
      epsAtLastSave: "10",
      lastSavedAt: 0,
      nowMs: (GameConfig.offline.maxSeconds + 1000) * 1000,
    });
    expect(reward.seconds).toBe(GameConfig.offline.maxSeconds);
    expect(reward.reward.toNumberSafe()).toBeCloseTo(GameConfig.offline.maxSeconds * 10 * GameConfig.offline.efficiency, 5);
  });

  it("creates and claims offline reward once", () => {
    const state = makeState(10_000);
    state.epsAtLastSave = state.epsAtLastSave.add(2);
    state.lastSavedAt = 0;
    const pending = createOfflineReward(state, 10_000);
    expect(pending?.seconds).toBe(10);
    const withPending = { ...state, offlineReward: pending };
    const claimed = claimOfflineReward(withPending, 20_000);
    expect(claimed.offlineReward).toBeNull();
    expect(claimed.currencies.orange.toNumberSafe()).toBe(15);
    const second = claimOfflineReward(claimed, 21_000);
    expect(second.currencies.orange.toNumberSafe()).toBe(15);
  });
});
