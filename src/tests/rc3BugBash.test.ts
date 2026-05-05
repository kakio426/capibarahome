import { describe, expect, it, vi } from "vitest";
import { GameConfig } from "../config/GameConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { GameActions } from "../game/GameActions";
import { getGameState, resetGameState } from "../state/useGameStore";
import { claimAchievementReward } from "../systems/AchievementManager";
import { claimOfflineReward } from "../systems/OfflineRewardManager";
import { performPrestige } from "../systems/PrestigeManager";
import { claimQuestReward } from "../systems/QuestManager";
import { checksum, SaveManager } from "../systems/SaveManager";
import { findUpgrade, purchaseUpgrade } from "../systems/UpgradeManager";
import { encodePayload, makeState } from "./testUtils";

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}

function saveCodeFor(body: Record<string, unknown>) {
  return encodePayload({ ...body, checksum: checksum(stableStringify(body)) });
}

function legacyPayload(version: 1 | 2 | 3) {
  const body: Record<string, unknown> = {
    version,
    createdAt: 1_000,
    updatedAt: 1_500,
    lastSavedAt: 1_500,
    currencies: { orange: "1234", goldenLeaf: "2" },
    lifetime: { totalOrangesEarned: "5000", totalTaps: 42, totalPrestiges: 1 },
    upgrades: { soft_paw: 3 },
    generators: { orange_basket: 4 },
    settings: { effectsEnabled: true, soundMuted: version >= 2, musicMuted: false },
    tutorial: { completed: true, step: 2 },
    monetization: { adBoostUntil: null },
    epsAtLastSave: "1.5",
  };

  if (version >= 2) {
    body.achievements = { unlockedIds: ["first_orange"], lastUnlockedId: "first_orange" };
    body.quests = { claimedIds: ["welcome_first_orange"], lastClaimedId: "welcome_first_orange" };
  }
  if (version >= 3) {
    body.settings = { effectsEnabled: false, soundMuted: true, musicMuted: true, vibrationEnabled: false };
    body.monetization = { adBoostUntil: null, purchasedProductIds: ["starter_orange_crate"] };
    body.companions = { friendshipById: { momo: 12 }, highlightedId: "momo" };
    body.decorations = { equippedBySlot: { sky: "sunny_yard", storage: "orange_basket_corner" } };
    body.progression = { unlockedTierIds: ["yard", "storehouse"], lastUnlockedTierId: "storehouse" };
  }
  return body;
}

describe("RC-3 bug bash regressions", () => {
  it("migrates v1, v2, and v3 saves into the current v4 state safely", () => {
    const v1 = SaveManager.importState(saveCodeFor(legacyPayload(1)), 2_000);
    const v2 = SaveManager.importState(saveCodeFor(legacyPayload(2)), 2_000);
    const v3 = SaveManager.importState(saveCodeFor(legacyPayload(3)), 2_000);

    expect(v1.ok).toBe(true);
    expect(v2.ok).toBe(true);
    expect(v3.ok).toBe(true);
    if (v1.ok) {
      expect(v1.state.settings.vibrationEnabled).toBe(true);
      expect(v1.state.settings.numberFormat).toBe("short");
      expect(v1.state.achievements.claimedRewardIds).toEqual([]);
      expect(v1.state.decorations.equippedBySlot.sky).toBe("sunny_yard");
      expect(v1.state.progression.unlockedTierIds).toEqual(["yard"]);
    }
    if (v2.ok) {
      expect(v2.state.achievements.unlockedIds).toEqual(["first_orange"]);
      expect(v2.state.quests.claimedIds).toEqual(["welcome_first_orange"]);
      expect(v2.state.monetization.purchasedProductIds).toEqual([]);
    }
    if (v3.ok) {
      expect(v3.state.settings.vibrationEnabled).toBe(false);
      expect(v3.state.monetization.purchasedProductIds).toEqual(["starter_orange_crate"]);
      expect(v3.state.companions.friendshipById.momo).toBe(12);
      expect(v3.state.progression.unlockedTierIds).toEqual(["yard", "storehouse"]);
    }
    expect(GameConfig.save.version).toBe(4);
  });

  it("rejects corrupted imports without mutating game state assumptions", () => {
    expect(SaveManager.importState("not valid base64").ok).toBe(false);
    expect(SaveManager.importState(encodePayload({ version: GameConfig.save.version })).ok).toBe(false);

    const body = legacyPayload(3);
    const validCode = saveCodeFor(body);
    const decoded = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(validCode), (char) => char.charCodeAt(0))));
    decoded.currencies.orange = "999999999";
    expect(SaveManager.importState(encodePayload(decoded)).ok).toBe(false);
  });

  it("prevents double-click purchases from spending below zero", () => {
    const state = makeState();
    const softPaw = findUpgrade(state, "soft_paw");
    expect(softPaw).toBeTruthy();
    state.currencies.orange = softPaw?.cost ?? BigNumberLite.zero();
    state.lifetime.totalOrangesEarned = state.currencies.orange;

    const first = purchaseUpgrade(state, "soft_paw", 2_000);
    expect(first.ok).toBe(true);
    if (first.ok) {
      const second = purchaseUpgrade(first.state, "soft_paw", 2_001);
      expect(second.ok).toBe(false);
      expect(first.state.currencies.orange.gte(0)).toBe(true);
      expect(first.state.upgrades.soft_paw).toBe(1);
    }
  });

  it("handles rapid tapping without losing taps or corrupting long number state", () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    resetGameState(1_000);
    try {
      for (let index = 0; index < 150; index += 1) {
        GameActions.tapOrange(1_000 + index);
      }
    } finally {
      infoSpy.mockRestore();
    }
    const state = getGameState();
    expect(state.lifetime.totalTaps).toBe(150);
    expect(state.currencies.orange.toNumberSafe()).toBeCloseTo(150, 8);
    expect(state.achievements.unlockedIds).toContain("first_orange");
    expect(BigNumberLite.from("1.23e45").format()).toBe("1.23e45");
  });

  it("does not duplicate offline, achievement, or quest rewards", () => {
    const offlineState = makeState();
    offlineState.currencies.orange = BigNumberLite.from("10");
    offlineState.offlineReward = {
      pending: true,
      claimed: true,
      seconds: 3600,
      oranges: BigNumberLite.from("1000"),
    };
    const afterOffline = claimOfflineReward(offlineState, 2_000);
    expect(afterOffline.currencies.orange.toNumberSafe()).toBe(10);
    expect(afterOffline.offlineReward).toBeNull();

    const questState = makeState();
    questState.lifetime.totalTaps = 1;
    const firstQuest = claimQuestReward(questState, "welcome_first_orange", 2_000);
    expect(firstQuest.ok).toBe(true);
    if (firstQuest.ok) {
      const orangeAfterFirst = firstQuest.state.currencies.orange.toString();
      const friendshipAfterFirst = firstQuest.state.companions.friendshipById.momo;
      const secondQuest = claimQuestReward(firstQuest.state, "welcome_first_orange", 2_001);
      expect(secondQuest.ok).toBe(false);
      if (!secondQuest.ok) {
        expect(secondQuest.reason).toBe("already_claimed");
        expect(secondQuest.state.currencies.orange.toString()).toBe(orangeAfterFirst);
        expect(secondQuest.state.companions.friendshipById.momo).toBe(friendshipAfterFirst);
        expect(secondQuest.state.quests.claimedIds.filter((id) => id === "welcome_first_orange")).toHaveLength(1);
      }
    }

    const achievementState = makeState();
    achievementState.lifetime.totalTaps = 1;
    const firstAchievement = claimAchievementReward(achievementState, "first_orange", 2_000);
    expect(firstAchievement.ok).toBe(true);
    if (firstAchievement.ok) {
      const orangeAfterFirst = firstAchievement.state.currencies.orange.toString();
      const friendshipAfterFirst = firstAchievement.state.companions.friendshipById.momo;
      const secondAchievement = claimAchievementReward(firstAchievement.state, "first_orange", 2_001);
      expect(secondAchievement.ok).toBe(false);
      if (!secondAchievement.ok) {
        expect(secondAchievement.reason).toBe("already_claimed");
        expect(secondAchievement.state.currencies.orange.toString()).toBe(orangeAfterFirst);
        expect(secondAchievement.state.companions.friendshipById.momo).toBe(friendshipAfterFirst);
        expect(secondAchievement.state.achievements.claimedRewardIds.filter((id) => id === "first_orange")).toHaveLength(1);
      }
    }
  });

  it("keeps prestige and sound settings stable after save/load", () => {
    const state = makeState();
    state.currencies.orange = BigNumberLite.from("100000000");
    state.lifetime.totalOrangesEarned = BigNumberLite.from("100000000");
    state.upgrades.soft_paw = 5;
    state.generators.orange_basket = 10;
    state.settings.soundMuted = true;
    state.settings.musicMuted = true;

    const prestige = performPrestige(state, 2_000);
    expect(prestige.ok).toBe(true);
    if (prestige.ok) {
      const imported = SaveManager.importState(SaveManager.exportState(prestige.state, 3_000), 4_000);
      expect(imported.ok).toBe(true);
      if (imported.ok) {
        expect(imported.state.currencies.goldenLeaf.toNumberSafe()).toBe(2);
        expect(imported.state.upgrades.soft_paw).toBeUndefined();
        expect(imported.state.generators.orange_basket).toBeUndefined();
        expect(imported.state.settings.soundMuted).toBe(true);
        expect(imported.state.settings.musicMuted).toBe(true);
      }
    }
  });
});
