import { describe, expect, it } from "vitest";
import { AchievementConfig } from "../config/AchievementConfig";
import { DecorationConfig, DecorationUnlock } from "../config/DecorationConfig";
import { ProgressionConfig } from "../config/ProgressionConfig";
import { QuestConfig } from "../config/QuestConfig";
import { StoryConfig } from "../config/StoryConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { equipDecoration, getCollectionSummary, getCompanionCards, getDecorationViewModels, getEquippedDecorations } from "../systems/CollectionManager";
import { makeState } from "./testUtils";

function unique(values: string[]) {
  return new Set(values).size === values.length;
}

describe("collection manager", () => {
  it("defines unique decoration content connected to tiers, quests, and achievements", () => {
    expect(DecorationConfig.decorations.length).toBeGreaterThanOrEqual(24);
    expect(unique(DecorationConfig.decorations.map((decoration) => decoration.id))).toBe(true);
    expect(unique(DecorationConfig.decorations.map((decoration) => decoration.name))).toBe(true);

    const tierIds = new Set<string>(ProgressionConfig.tiers.map((tier) => tier.id));
    const questIds = new Set<string>(QuestConfig.quests.map((quest) => quest.id));
    const achievementIds = new Set<string>(AchievementConfig.achievements.map((achievement) => achievement.id));
    for (const decoration of DecorationConfig.decorations) {
      const unlock = decoration.unlock as DecorationUnlock;
      expect(tierIds.has(decoration.tier), decoration.id).toBe(true);
      expect(decoration.description.length, decoration.id).toBeGreaterThan(10);
      expect(decoration.flavorLine.length, decoration.id).toBeGreaterThan(10);
      if (unlock.type === "questClaimed") {
        expect(questIds.has(unlock.id), decoration.id).toBe(true);
      }
      if (unlock.type === "achievementUnlocked") {
        expect(achievementIds.has(unlock.id), decoration.id).toBe(true);
      }
      if (unlock.type === "tier") {
        expect(tierIds.has(unlock.id), decoration.id).toBe(true);
      }
    }
  });

  it("shows only early capybaras in a fresh save and unlocks residents by progression tier", () => {
    const state = makeState();
    let cards = getCompanionCards(state);
    expect(cards.filter((card) => card.unlocked).map((card) => card.id)).toEqual(["momo", "podo"]);

    state.lifetime.totalOrangesEarned = BigNumberLite.from("75000");
    cards = getCompanionCards(state);
    expect(cards.find((card) => card.id === "narin")?.unlocked).toBe(true);
    expect(cards.find((card) => card.id === "dami")?.unlocked).toBe(true);
    expect(cards.find((card) => card.id === "hanul")?.unlocked).toBe(false);
  });

  it("turns quest rewards into visible friendship level progress", () => {
    const state = makeState();
    state.companions.friendshipById.momo = 65;
    const momo = getCompanionCards(state).find((card) => card.id === "momo");
    expect(momo?.friendshipLevel).toBe(4);
    expect(momo?.mood).toBe("proud");
    expect(momo?.progress).toBeCloseTo(0.65, 5);
  });

  it("keeps locked companion cards informative instead of empty placeholders", () => {
    const state = makeState();
    const hanul = getCompanionCards(state).find((card) => card.id === "hanul");
    expect(hanul?.unlocked).toBe(false);
    expect(hanul?.unlockLabel).toContain("황금 숲");
    expect(hanul?.progress).toBe(0);
  });

  it("starts with a default sky decoration equipped", () => {
    const state = makeState();
    const decorations = getDecorationViewModels(state);
    const equipped = getEquippedDecorations(state);
    expect(decorations.find((decoration) => decoration.id === "sunny_yard")?.unlocked).toBe(true);
    expect(equipped.map((decoration) => decoration.id)).toEqual(["sunny_yard"]);
  });

  it("unlocks a quest decoration after the linked quest is claimed and equips it by slot", () => {
    const state = makeState();
    state.quests.claimedIds = ["welcome_first_basket"];
    const decoration = getDecorationViewModels(state).find((item) => item.id === "orange_basket_corner");
    expect(decoration?.unlocked).toBe(true);

    const result = equipDecoration(state, "orange_basket_corner", 9_000);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.decorations.equippedBySlot.storage).toBe("orange_basket_corner");
      expect(result.state.lastAction?.kind).toBe("decoration");
    }
  });

  it("rejects locked decoration placement without changing the equipped layout", () => {
    const state = makeState();
    const result = equipDecoration(state, "memory_gate_halo", 9_000);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("locked");
      expect(result.state.decorations.equippedBySlot).toEqual({ sky: "sunny_yard" });
    }
  });

  it("summarizes album progress for the collection screen", () => {
    const state = makeState();
    state.lifetime.totalOrangesEarned = BigNumberLite.from("1200000");
    state.quests.claimedIds = ["welcome_first_basket", "yard_nap_mat", "bamboo_open"];
    state.achievements.unlockedIds = ["first_orange", "soft_paw_1"];
    const summary = getCollectionSummary(state);
    expect(summary.totalCompanions).toBe(StoryConfig.capybaras.length);
    expect(summary.totalDecorations).toBe(DecorationConfig.decorations.length);
    expect(summary.unlockedCompanions).toBeGreaterThanOrEqual(6);
    expect(summary.unlockedDecorations).toBeGreaterThan(1);
  });
});
