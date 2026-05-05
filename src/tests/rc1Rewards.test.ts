import { describe, expect, it } from "vitest";
import { BigNumberLite } from "../core/BigNumberLite";
import { selectEps, selectPrestigeGain, selectTapGain } from "../game/GameSelectors";
import { AchievementConfig } from "../config/AchievementConfig";
import { resolveAchievementReward } from "../config/AchievementRewardConfig";
import { getCompanionBonuses } from "../systems/CompanionBonusManager";
import { claimAchievementReward, getAchievementViewModels } from "../systems/AchievementManager";
import { createOfflineReward } from "../systems/OfflineRewardManager";
import { applyProgressionUnlocks } from "../systems/ProgressionRewardManager";
import { SoundManager } from "../systems/SoundManager";
import { makeState } from "./testUtils";

describe("RC-1 reward loops", () => {
  it("gives every achievement a real claimable reward summary", () => {
    const state = makeState();
    for (const achievement of AchievementConfig.achievements) {
      const reward = resolveAchievementReward(achievement);
      const hasReward = Boolean(
        reward.oranges
          || reward.goldenLeaf
          || reward.friendship
          || reward.permanentMultiplier
          || reward.decorationIds?.length,
      );
      expect(hasReward, achievement.id).toBe(true);
    }
    const summaries = getAchievementViewModels(state).map((achievement) => achievement.rewardSummary);
    expect(summaries.every((summary) => summary.includes("귤"))).toBe(true);
  });

  it("applies capybara passive abilities to income, offline, quest, decoration, and prestige math", () => {
    const base = makeState();
    base.generators.orange_basket = 10;
    base.lifetime.totalOrangesEarned = BigNumberLite.from("4000000");

    const boosted = makeState();
    boosted.generators.orange_basket = 10;
    boosted.lifetime.totalOrangesEarned = BigNumberLite.from("4000000");
    boosted.decorations.equippedBySlot.storage = "orange_basket_corner";
    boosted.decorations.equippedBySlot.path = "tiny_watering_path";
    boosted.companions.friendshipById = {
      momo: 30,
      narin: 30,
      dami: 60,
      biro: 30,
      podo: 30,
      soda: 30,
      ruru: 30,
      hanul: 30,
    };

    const bonuses = getCompanionBonuses(boosted);
    expect(bonuses.tapMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.epsMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.offlineMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.questOrangeMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.questFriendshipBonus).toBeGreaterThan(0);
    expect(bonuses.achievementOrangeMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.decorationEpsMultiplier.compare(1)).toBeGreaterThan(0);
    expect(bonuses.prestigeGainMultiplier.compare(1)).toBeGreaterThan(0);
    expect(selectTapGain(boosted).compare(selectTapGain(base))).toBeGreaterThan(0);
    expect(selectEps(boosted).compare(selectEps(base))).toBeGreaterThan(0);
    expect(selectPrestigeGain(boosted).gte(selectPrestigeGain(base))).toBe(true);

    boosted.epsAtLastSave = BigNumberLite.from("10");
    boosted.lastSavedAt = 0;
    const offline = createOfflineReward(boosted, 10_000);
    expect(offline?.oranges.compare(75)).toBeGreaterThan(0);
  });

  it("lets players claim achievement rewards once and turns permanent rewards into multipliers", () => {
    const first = makeState();
    first.lifetime.totalTaps = 1;
    const firstClaim = claimAchievementReward(first, "first_orange", 4_000);
    expect(firstClaim.ok).toBe(true);
    if (firstClaim.ok) {
      expect(firstClaim.state.achievements.claimedRewardIds).toEqual(["first_orange"]);
      expect(firstClaim.state.currencies.orange.toNumberSafe()).toBe(120);
      expect(firstClaim.state.companions.friendshipById.momo).toBe(2);
      const second = claimAchievementReward(firstClaim.state, "first_orange", 5_000);
      expect(second.ok).toBe(false);
      if (!second.ok) expect(second.reason).toBe("already_claimed");
    }

    const permanent = makeState();
    permanent.lifetime.totalOrangesEarned = BigNumberLite.from("5000");
    const before = selectTapGain(permanent).toNumberSafe();
    const claim = claimAchievementReward(permanent, "storehouse_5k", 4_000);
    expect(claim.ok).toBe(true);
    if (claim.ok) {
      expect(selectTapGain(claim.state).toNumberSafe()).toBeGreaterThan(before);
      expect(claim.state.companions.friendshipById.narin).toBe(8);
    }
  });

  it("records progression tier unlock rewards and tier toast state", () => {
    const state = makeState();
    state.lifetime.totalOrangesEarned = BigNumberLite.from("75000");

    const next = applyProgressionUnlocks(state, 4_000);

    expect(next.progression.unlockedTierIds).toEqual(["yard", "storehouse", "onsen"]);
    expect(next.progression.lastUnlockedTierId).toBe("onsen");
    expect(next.lastAction?.kind).toBe("tier");
    expect(next.lastToast).toContain("온천");
  });

  it("uses the sound mute flag for real WebAudio-backed effects", () => {
    SoundManager.setSoundMuted(false);
    const before = SoundManager.getState().playCount;
    SoundManager.play("tap");
    expect(SoundManager.getState().playCount).toBe(before + 1);
    SoundManager.setSoundMuted(true);
    SoundManager.play("achievement");
    expect(SoundManager.getState().playCount).toBe(before + 1);
    SoundManager.setSoundMuted(false);
  });
});
