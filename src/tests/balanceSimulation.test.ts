import { describe, expect, it } from "vitest";
import { runBalanceSimulation } from "../systems/BalanceSimulator";

describe("balance simulation", () => {
  it("records required early and mid-game checkpoints", () => {
    const result = runBalanceSimulation({ durationSeconds: 7200, tickSeconds: 15, tapsPerSecond: 1.2 });

    expect(result.checkpoints.map((checkpoint) => checkpoint.label)).toEqual([
      "첫 1분",
      "첫 5분",
      "첫 15분",
      "첫 30분",
      "첫 2시간",
    ]);
    expect(result.checkpoints[0].unlockedUpgrades).toBeGreaterThanOrEqual(2);
    expect(result.checkpoints[4].upgradesOwned).toBeGreaterThan(result.checkpoints[0].upgradesOwned);
    expect(result.offlineEightHourReward.length).toBeGreaterThan(0);
    expect(result.firstPrestigeLabel.length).toBeGreaterThan(0);
    expect(result.firstPrestigeSeconds).toBeGreaterThanOrEqual(30 * 60);
    expect(result.firstPrestigeSeconds).toBeLessThanOrEqual(60 * 60);
  }, 20_000);

  it("keeps first-session rewards and goals visible without debug shortcuts", () => {
    const result = runBalanceSimulation({ durationSeconds: 1800, tickSeconds: 15, tapsPerSecond: 1.2 });
    const oneMinute = result.checkpoints.find((checkpoint) => checkpoint.label === "첫 1분");
    const fiveMinute = result.checkpoints.find((checkpoint) => checkpoint.label === "첫 5분");
    const thirtyMinute = result.checkpoints.find((checkpoint) => checkpoint.label === "첫 30분");

    expect(oneMinute?.claimedQuestCount).toBeGreaterThanOrEqual(1);
    expect(oneMinute?.systemsSeen).toContain("quest");
    expect(fiveMinute?.systemsSeen).toEqual(
      expect.arrayContaining(["upgrade", "quest", "album", "companion", "decoration"]),
    );
    expect(thirtyMinute?.nextGoal.length).toBeGreaterThan(8);
    expect(thirtyMinute?.nextQuest.length).toBeGreaterThan(2);
  }, 10_000);

  it("shows rewarded ad boost changes the two hour economy", () => {
    const normal = runBalanceSimulation({ durationSeconds: 7200, tickSeconds: 15, tapsPerSecond: 1.2 });
    const boosted = runBalanceSimulation({ durationSeconds: 7200, tickSeconds: 15, tapsPerSecond: 1.2, adBoostActive: true });

    expect(boosted.finalState.lifetime.totalOrangesEarned.compare(normal.finalState.lifetime.totalOrangesEarned)).toBeGreaterThan(0);
    expect(boosted.finalState.lifetime.totalTaps).toBe(normal.finalState.lifetime.totalTaps);
  }, 40_000);

  it("shows prestige acceleration after golden leaves", () => {
    const fresh = runBalanceSimulation({ durationSeconds: 1800, tickSeconds: 15, tapsPerSecond: 1.2 });
    const afterPrestige = runBalanceSimulation({ durationSeconds: 1800, tickSeconds: 15, tapsPerSecond: 1.2, startingGoldenLeaf: "5" });

    expect(afterPrestige.finalState.lifetime.totalOrangesEarned.compare(fresh.finalState.lifetime.totalOrangesEarned)).toBeGreaterThan(0);
  }, 10_000);

  it("records first prestige and post-prestige 30 minute checkpoints when reached", () => {
    const result = runBalanceSimulation({ durationSeconds: 7200, tickSeconds: 30, tapsPerSecond: 1.4 });

    expect(result.firstPrestigeSeconds).not.toBeNull();
    expect(result.firstPrestigeCheckpoint?.label).toBe("첫 환생 가능");
    expect(result.postPrestigeThirtyMinuteCheckpoint?.label).toBe("환생 후 30분");
    expect(result.postPrestigeThirtyMinuteCheckpoint?.upgradesOwned).toBeGreaterThan(0);
  }, 20_000);
});
