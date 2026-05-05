import { describe, expect, it } from "vitest";
import { MockRewardedAdProvider } from "../systems/AdsManager";
import { MockIAPProvider } from "../systems/IAPManager";
import { AdsManager } from "../systems/AdsManager";
import { IAPManager } from "../systems/IAPManager";
import { applyIAPPurchaseResult, applyRewardedAdResult } from "../systems/MonetizationEventManager";
import { getAdMultiplier } from "../core/gameMath";
import { makeState } from "./testUtils";

describe("monetization mock", () => {
  it("applies ad boost on rewarded ad success", async () => {
    const result = await AdsManager.runRewardedAd(new MockRewardedAdProvider(true));
    let state = makeState(1_000);
    state = applyRewardedAdResult(state, result, 1_000);
    expect(state.monetization.adBoostUntil).toBeGreaterThan(1_000);
    expect(getAdMultiplier(state.monetization.adBoostUntil, 2_000).toNumberSafe()).toBe(2);
  });

  it("does not apply boost on rewarded ad failure", () => {
    const state = applyRewardedAdResult(makeState(), { status: "failed", error: "network" }, 1_000);
    expect(state.monetization.adBoostUntil).toBeNull();
  });

  it("handles IAP mock success and failure events", async () => {
    const success = await IAPManager.purchase("golden_leaf_pack", new MockIAPProvider(true));
    const afterSuccess = applyIAPPurchaseResult(makeState(), success, 1_000);
    expect(afterSuccess.currencies.goldenLeaf.toNumberSafe()).toBe(5);
    expect(afterSuccess.monetization.purchasedProductIds).toContain("golden_leaf_pack");

    const failed = await IAPManager.purchase("starter_pack", new MockIAPProvider(false));
    const afterFailure = applyIAPPurchaseResult(makeState(), failed, 1_000);
    expect(afterFailure.currencies.orange.toNumberSafe()).toBe(0);
  });
});
