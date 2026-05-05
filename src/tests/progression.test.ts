import { describe, expect, it } from "vitest";
import { BigNumberLite } from "../core/BigNumberLite";
import { selectCollectionBadges, selectNextUpgradeGoal, selectPrestigeProgress } from "../game/GameSelectors";
import { makeState } from "./testUtils";

describe("progression selectors", () => {
  it("points a new user to the cheapest meaningful upgrade", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("10");

    const goal = selectNextUpgradeGoal(state);

    expect(goal?.name).toBe("말랑 앞발");
    expect(goal?.canBuy).toBe(false);
    expect(goal?.progress).toBeGreaterThan(0.6);
    expect(goal?.actionLabel).toContain("목표까지");
  });

  it("marks a buyable next goal when the player has enough oranges", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("25");

    const goal = selectNextUpgradeGoal(state);

    expect(goal?.name).toBe("말랑 앞발");
    expect(goal?.canBuy).toBe(true);
    expect(goal?.actionLabel).toBe("지금 구매 가능");
  });

  it("derives collection badges from real progression state", () => {
    const state = makeState();
    state.lifetime.totalTaps = 1;
    state.upgrades.soft_paw = 1;
    state.generators.orange_basket = 1;
    state.lifetime.totalOrangesEarned = BigNumberLite.from("1000000");

    const badges = selectCollectionBadges(state);

    expect(badges.find((badge) => badge.id === "first_orange")?.unlocked).toBe(true);
    expect(badges.find((badge) => badge.id === "soft_paw_1")?.unlocked).toBe(true);
    expect(badges.find((badge) => badge.id === "basket_1")?.unlocked).toBe(true);
    expect(badges.find((badge) => badge.id === "bamboo_1m")?.unlocked).toBe(true);
    expect(selectPrestigeProgress(state)).toBe(1);
  });
});
