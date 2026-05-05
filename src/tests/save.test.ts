import { describe, expect, it } from "vitest";
import { checksum, SaveManager } from "../systems/SaveManager";
import { GameConfig } from "../config/GameConfig";
import { encodePayload, makeState, MemoryStorage } from "./testUtils";

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}

describe("save manager", () => {
  it("saves and loads the same state", () => {
    const storage = new MemoryStorage();
    const state = makeState();
    state.currencies.orange = state.currencies.orange.add(1234);
    state.currencies.goldenLeaf = state.currencies.goldenLeaf.add(3);
    state.upgrades.soft_paw = 2;

    SaveManager.saveToStorage(state, storage, 2_000);
    const loaded = SaveManager.loadFromStorage(storage, 3_000);
    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(loaded.state.currencies.orange.toNumberSafe()).toBe(1234);
      expect(loaded.state.currencies.goldenLeaf.toNumberSafe()).toBe(3);
      expect(loaded.state.upgrades.soft_paw).toBe(2);
    }
  });

  it("rejects corrupted base64 safely", () => {
    const result = SaveManager.importState("not valid base64");
    expect(result.ok).toBe(false);
  });

  it("rejects checksum mismatch", () => {
    const code = SaveManager.exportState(makeState(), 2_000);
    const decoded = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(code), (char) => char.charCodeAt(0))));
    decoded.currencies.orange = "999999";
    const tampered = encodePayload(decoded);
    const result = SaveManager.importState(tampered, 3_000);
    expect(result.ok).toBe(false);
  });

  it("migrates old save payloads after checksum verification", () => {
    const oldPayload = {
      version: 0,
      createdAt: 1_000,
      updatedAt: 1_000,
      lastSavedAt: 1_000,
      currencies: { orange: "10", goldenLeaf: "1" },
      lifetime: { totalOrangesEarned: "10", totalTaps: 1, totalPrestiges: 0 },
      upgrades: {},
      generators: {},
      settings: { effectsEnabled: true, soundMuted: false, musicMuted: false },
      tutorial: { completed: true, step: 2 },
      monetization: { adBoostUntil: null },
      epsAtLastSave: "0",
    };
    const code = encodePayload({ ...oldPayload, checksum: checksum(stableStringify(oldPayload)) });
    const result = SaveManager.importState(code, 2_000);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.settings.vibrationEnabled).toBe(true);
      expect(result.state.monetization.purchasedProductIds).toEqual([]);
      expect(result.state.quests.claimedIds).toEqual([]);
      expect(result.state.companions.friendshipById).toEqual({});
      expect(result.state.decorations.equippedBySlot.sky).toBe("sunny_yard");
      expect(result.state.achievements.claimedRewardIds).toEqual([]);
      expect(result.state.progression.unlockedTierIds).toEqual(["yard"]);
      expect(result.state.lastSavedAt).toBe(1_000);
    }
    expect(GameConfig.save.version).toBe(4);
  });
});
