import { describe, expect, it } from "vitest";
import { BigNumberLite } from "../core/BigNumberLite";
import { createInitialState } from "../state/initialState";
import { SaveManager } from "../systems/SaveManager";
import {
  claimDailyReward,
  claimMilestoneReward,
  claimPostPrestigeGoal,
  getDailyRewardStatus,
  getMilestoneViewModels,
  getPostPrestigeGoalView,
} from "../systems/RetentionManager";

const hour = 60 * 60 * 1000;
const day = 24 * hour;

describe("retention systems", () => {
  it("calculates daily reward eligibility with a 20 hour cooldown", () => {
    const nowMs = 1_700_000_000_000;
    const state = createInitialState(nowMs - 19 * hour);
    const waiting = getDailyRewardStatus(state, nowMs);
    expect(waiting.eligible).toBe(false);
    expect(waiting.cooldownRemainingMs).toBe(1 * hour);

    state.retention.firstPlayedAt = nowMs - 21 * hour;
    const ready = getDailyRewardStatus(state, nowMs);
    expect(ready.eligible).toBe(true);
    expect(ready.day).toBe(1);
    expect(ready.reward.oranges.gte(500)).toBe(true);
  });

  it("claims daily reward once and keeps the cooldown after save/load", () => {
    const nowMs = 1_700_000_000_000;
    const state = createInitialState(nowMs - 21 * hour);
    state.retention.firstPlayedAt = nowMs - 21 * hour;
    const first = claimDailyReward(state, nowMs);
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    expect(first.state.retention.dailyStreak).toBe(1);
    expect(first.state.retention.lastDailyClaimAt).toBe(nowMs);
    expect(first.state.currencies.orange.gte(500)).toBe(true);
    const duplicate = claimDailyReward(first.state, nowMs + 1000);
    expect(duplicate.ok).toBe(false);

    const imported = SaveManager.importState(SaveManager.exportState(first.state, nowMs + 2_000), nowMs + 3_000);
    expect(imported.ok).toBe(true);
    if (imported.ok) {
      expect(imported.state.retention.dailyStreak).toBe(1);
      expect(getDailyRewardStatus(imported.state, nowMs + 3_000).eligible).toBe(false);
    }
  });

  it("increments streak and resets it after more than 48 hours", () => {
    const nowMs = 1_700_000_000_000;
    const state = createInitialState(nowMs - 4 * day);
    state.retention.lastDailyClaimAt = nowMs - 21 * hour;
    state.retention.dailyStreak = 1;
    const second = claimDailyReward(state, nowMs);
    expect(second.ok).toBe(true);
    if (second.ok) {
      expect(second.state.retention.dailyStreak).toBe(2);
    }

    const lapsed = createInitialState(nowMs - 5 * day);
    lapsed.retention.lastDailyClaimAt = nowMs - 49 * hour;
    lapsed.retention.dailyStreak = 5;
    const reset = claimDailyReward(lapsed, nowMs);
    expect(reset.ok).toBe(true);
    if (reset.ok) {
      expect(reset.state.retention.dailyStreak).toBe(1);
    }
  });

  it("claims D1, D3, and D7 milestones without duplicate rewards", () => {
    const nowMs = 1_700_000_000_000;
    const state = createInitialState(nowMs - 8 * day);
    state.retention.firstPlayedAt = nowMs - 8 * day;
    state.generators.orange_basket = 10;
    const milestones = getMilestoneViewModels(state, nowMs);
    expect(milestones.every((milestone) => milestone.canClaim)).toBe(true);

    const d1 = claimMilestoneReward(state, "d1_returner", nowMs);
    expect(d1.ok).toBe(true);
    if (!d1.ok) return;
    const d3 = claimMilestoneReward(d1.state, "d3_steady_butler", nowMs + 1);
    expect(d3.ok).toBe(true);
    if (!d3.ok) return;
    const d7 = claimMilestoneReward(d3.state, "d7_golden_regular", nowMs + 2);
    expect(d7.ok).toBe(true);
    if (!d7.ok) return;

    expect(d7.state.retention.claimedMilestones.d1_returner).toBe(true);
    expect(d7.state.retention.claimedMilestones.d3_steady_butler).toBe(true);
    expect(d7.state.retention.claimedMilestones.d7_golden_regular).toBe(true);
    expect(d7.state.currencies.goldenLeaf.gte(4)).toBe(true);
    const duplicate = claimMilestoneReward(d7.state, "d7_golden_regular", nowMs + 3);
    expect(duplicate.ok).toBe(false);
    if (!duplicate.ok) expect(duplicate.reason).toBe("already_claimed");
  });

  it("progresses the post-prestige goal chain with stored steps", () => {
    const nowMs = 1_700_000_000_000;
    const state = createInitialState(nowMs);
    state.lifetime.totalPrestiges = 1;
    state.currencies.goldenLeaf = BigNumberLite.from(1);
    const firstGoal = getPostPrestigeGoalView(state, nowMs);
    expect(firstGoal.canClaim).toBe(true);

    const firstClaim = claimPostPrestigeGoal(state, nowMs);
    expect(firstClaim.ok).toBe(true);
    if (!firstClaim.ok) return;
    expect(firstClaim.state.retention.postPrestigeGoalStep).toBe(1);

    const incomplete = claimPostPrestigeGoal(firstClaim.state, nowMs + 1);
    expect(incomplete.ok).toBe(false);
    if (!incomplete.ok) expect(incomplete.reason).toBe("incomplete");

    const twoLeaves = {
      ...firstClaim.state,
      currencies: {
        ...firstClaim.state.currencies,
        goldenLeaf: BigNumberLite.from(2),
      },
    };
    const secondClaim = claimPostPrestigeGoal(twoLeaves, nowMs + 2);
    expect(secondClaim.ok).toBe(true);
    if (secondClaim.ok) {
      expect(secondClaim.state.retention.postPrestigeGoalStep).toBe(2);
    }
  });
});
