import { GameConfig } from "../config/GameConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { selectEps } from "../game/GameSelectors";
import { GameState, SavePayload, SavePayloadWithoutChecksum } from "../game/GameTypes";
import { createInitialState } from "../state/initialState";
import { migrateSaveData } from "../state/migrations";
import { createOfflineReward } from "./OfflineRewardManager";

export type SaveStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type ImportResult =
  | { ok: true; state: GameState }
  | { ok: false; error: string };

class VolatileSaveStorage implements SaveStorage {
  private readonly data = new Map<string, string>();

  getItem(key: string) {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.data.set(key, value);
  }

  removeItem(key: string) {
    this.data.delete(key);
  }
}

const volatileStorage = new VolatileSaveStorage();

export function getDefaultSaveStorage(): SaveStorage {
  try {
    return globalThis.localStorage ?? volatileStorage;
  } catch (error) {
    console.warn("[save] localStorage unavailable, using volatile session storage", error);
    return volatileStorage;
  }
}

function resolveStorageAndTime(storageOrNowMs: SaveStorage | number | undefined, maybeNowMs: number) {
  if (typeof storageOrNowMs === "number") {
    return { storage: getDefaultSaveStorage(), nowMs: storageOrNowMs };
  }
  return { storage: storageOrNowMs ?? getDefaultSaveStorage(), nowMs: maybeNowMs };
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}

export function checksum(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function encodeBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return globalThis.btoa(binary);
}

function decodeBase64(encoded: string) {
  const binary = globalThis.atob(encoded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function payloadWithoutChecksum(state: GameState, nowMs = Date.now()): SavePayloadWithoutChecksum {
  return {
    version: GameConfig.save.version,
    createdAt: state.createdAt,
    updatedAt: nowMs,
    lastSavedAt: nowMs,
    currencies: {
      orange: state.currencies.orange.toString(),
      goldenLeaf: state.currencies.goldenLeaf.toString(),
    },
    lifetime: {
      totalOrangesEarned: state.lifetime.totalOrangesEarned.toString(),
      totalTaps: state.lifetime.totalTaps,
      totalPrestiges: state.lifetime.totalPrestiges,
    },
    upgrades: { ...state.upgrades },
    generators: { ...state.generators },
    settings: { ...state.settings },
    tutorial: {
      completed: state.tutorial.completed,
      step: state.tutorial.step,
    },
    monetization: {
      adBoostUntil: state.monetization.adBoostUntil,
      purchasedProductIds: [...state.monetization.purchasedProductIds],
    },
    achievements: {
      unlockedIds: [...state.achievements.unlockedIds],
      claimedRewardIds: [...state.achievements.claimedRewardIds],
      lastUnlockedId: state.achievements.lastUnlockedId,
    },
    quests: {
      claimedIds: [...state.quests.claimedIds],
      lastClaimedId: state.quests.lastClaimedId,
    },
    companions: {
      friendshipById: { ...state.companions.friendshipById },
      highlightedId: state.companions.highlightedId,
    },
    decorations: {
      equippedBySlot: { ...state.decorations.equippedBySlot },
    },
    progression: {
      unlockedTierIds: [...state.progression.unlockedTierIds],
      lastUnlockedTierId: state.progression.lastUnlockedTierId,
    },
    retention: {
      firstPlayedAt: state.retention.firstPlayedAt,
      lastDailyClaimAt: state.retention.lastDailyClaimAt,
      dailyStreak: state.retention.dailyStreak,
      claimedMilestones: { ...state.retention.claimedMilestones },
      postPrestigeGoalStep: state.retention.postPrestigeGoalStep,
    },
    epsAtLastSave: selectEps(state, nowMs).toString(),
  };
}

function withChecksum(payload: SavePayloadWithoutChecksum): SavePayload {
  const body = stableStringify(payload);
  return { ...payload, checksum: checksum(body) };
}

function stateFromPayload(payload: SavePayloadWithoutChecksum, nowMs = Date.now()): GameState {
  const base = createInitialState(nowMs);
  return {
    ...base,
    createdAt: payload.createdAt,
    updatedAt: nowMs,
    lastSavedAt: payload.lastSavedAt,
    currencies: {
      orange: BigNumberLite.from(payload.currencies.orange),
      goldenLeaf: BigNumberLite.from(payload.currencies.goldenLeaf),
    },
    lifetime: {
      totalOrangesEarned: BigNumberLite.from(payload.lifetime.totalOrangesEarned),
      totalTaps: payload.lifetime.totalTaps,
      totalPrestiges: payload.lifetime.totalPrestiges,
    },
    upgrades: { ...payload.upgrades },
    generators: { ...payload.generators },
    settings: { ...payload.settings },
    tutorial: {
      ...base.tutorial,
      completed: payload.tutorial.completed,
      step: payload.tutorial.step,
      visible: !payload.tutorial.completed,
    },
    monetization: {
      adBoostUntil: payload.monetization.adBoostUntil,
      purchasedProductIds: [...payload.monetization.purchasedProductIds],
    },
    achievements: {
      unlockedIds: [...payload.achievements.unlockedIds],
      claimedRewardIds: [...payload.achievements.claimedRewardIds],
      lastUnlockedId: payload.achievements.lastUnlockedId,
    },
    quests: {
      claimedIds: [...payload.quests.claimedIds],
      lastClaimedId: payload.quests.lastClaimedId,
    },
    companions: {
      friendshipById: { ...payload.companions.friendshipById },
      highlightedId: payload.companions.highlightedId,
    },
    decorations: {
      equippedBySlot: { ...payload.decorations.equippedBySlot },
    },
    progression: {
      unlockedTierIds: [...payload.progression.unlockedTierIds],
      lastUnlockedTierId: payload.progression.lastUnlockedTierId,
    },
    retention: {
      firstPlayedAt: payload.retention.firstPlayedAt,
      lastDailyClaimAt: payload.retention.lastDailyClaimAt,
      dailyStreak: payload.retention.dailyStreak,
      claimedMilestones: { ...payload.retention.claimedMilestones },
      postPrestigeGoalStep: payload.retention.postPrestigeGoalStep,
    },
    epsAtLastSave: BigNumberLite.from(payload.epsAtLastSave),
  };
}

function parseSaveCode(code: string, nowMs = Date.now()): ImportResult {
  try {
    const decoded = decodeBase64(String(code).trim());
    const parsed = JSON.parse(decoded) as Partial<SavePayload>;
    const { checksum: parsedChecksum, ...body } = parsed;
    const migrated = migrateSaveData(body, nowMs);
    if (!parsedChecksum) {
      return { ok: false, error: "저장 코드에 checksum이 없습니다." };
    }
    const checksumMatchesCurrent = checksum(stableStringify(migrated)) === parsedChecksum;
    const checksumMatchesRaw = checksum(stableStringify(body)) === parsedChecksum;
    if (!checksumMatchesCurrent && !checksumMatchesRaw) {
      return { ok: false, error: "저장 코드 checksum이 일치하지 않습니다." };
    }
    return { ok: true, state: stateFromPayload(migrated, nowMs) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "저장 코드를 읽을 수 없습니다.",
    };
  }
}

export const SaveManager = {
  exportState(state: GameState, nowMs = Date.now()) {
    const payload = withChecksum(payloadWithoutChecksum(state, nowMs));
    return encodeBase64(JSON.stringify(payload));
  },

  importState(code: string, nowMs = Date.now()) {
    return parseSaveCode(code, nowMs);
  },

  saveToStorage(state: GameState, storageOrNowMs?: SaveStorage | number, maybeNowMs = Date.now()) {
    const { storage, nowMs } = resolveStorageAndTime(storageOrNowMs, maybeNowMs);
    const code = this.exportState(state, nowMs);
    try {
      storage.setItem(GameConfig.save.key, code);
    } catch (error) {
      console.warn("[save] localStorage write failed", error);
    }
    return code;
  },

  loadFromStorage(storageOrNowMs?: SaveStorage | number, maybeNowMs = Date.now()): ImportResult {
    const { storage, nowMs } = resolveStorageAndTime(storageOrNowMs, maybeNowMs);
    try {
      const code = storage.getItem(GameConfig.save.key);
      if (!code) return { ok: true, state: createInitialState(nowMs) };
      const imported = this.importState(code, nowMs);
      if (!imported.ok) return imported;
      const offlineReward = createOfflineReward(imported.state, nowMs);
      return {
        ok: true,
        state: {
          ...imported.state,
          lastSavedAt: nowMs,
          offlineReward,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "저장 데이터를 읽을 수 없습니다.",
      };
    }
  },

  clearStorage(storage: SaveStorage = getDefaultSaveStorage()) {
    try {
      storage.removeItem(GameConfig.save.key);
    } catch (error) {
      console.warn("[save] localStorage remove failed", error);
    }
  },
};
