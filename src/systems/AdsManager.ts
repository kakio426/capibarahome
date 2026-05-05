import { MonetizationConfig } from "../config/MonetizationConfig";

export type RewardedAdResult = { status: "completed" } | { status: "failed"; error: string };

export interface RewardedAdProvider {
  loadRewardedAd(placementId: string): Promise<void>;
  showRewardedAd(placementId: string): Promise<RewardedAdResult>;
}

export class MockRewardedAdProvider implements RewardedAdProvider {
  constructor(private readonly shouldSucceed = true) {}

  async loadRewardedAd(placementId: string) {
    console.info("[ad:mock] load", placementId);
  }

  async showRewardedAd(placementId: string): Promise<RewardedAdResult> {
    console.info("[ad:mock] show", placementId);
    if (!this.shouldSucceed) {
      return { status: "failed", error: "mock ad failed" };
    }
    return { status: "completed" };
  }
}

export function calculateNextAdBoostUntil(currentUntil: number | null, nowMs = Date.now()) {
  const durationMs = MonetizationConfig.rewardedAd.durationSeconds * 1000;
  const maxMs = MonetizationConfig.rewardedAd.maxDurationSeconds * 1000;
  const base = currentUntil && currentUntil > nowMs && MonetizationConfig.rewardedAd.stacking === "extend"
    ? currentUntil
    : nowMs;
  return Math.min(base + durationMs, nowMs + maxMs);
}

export const AdsManager = {
  async runRewardedAd(provider: RewardedAdProvider = new MockRewardedAdProvider()) {
    const placementId = MonetizationConfig.rewardedAd.placementId;
    await provider.loadRewardedAd(placementId);
    return provider.showRewardedAd(placementId);
  },
};
