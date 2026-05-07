import { describe, expect, it, vi } from "vitest";
import { GameConfig } from "../config/GameConfig";
import { BigNumberLite } from "../core/BigNumberLite";
import { calculateOfflineReward } from "../core/gameMath";
import { GameActions } from "../game/GameActions";
import { GameLoop } from "../game/GameLoop";
import { selectEps } from "../game/GameSelectors";
import { getGameState, resetGameState, setGameState } from "../state/useGameStore";
import { claimOfflineReward } from "../systems/OfflineRewardManager";
import { performPrestige } from "../systems/PrestigeManager";
import {
  claimDailyReward,
  claimMilestoneReward,
  claimPostPrestigeGoal,
  getDailyRewardStatus,
  getPostPrestigeGoalView as getRetentionGoalView,
} from "../systems/RetentionManager";
import { checksum, SaveManager } from "../systems/SaveManager";
import { calculateUpgradePurchasePlan, getUpgradePurchasePreview, purchaseUpgrade } from "../systems/UpgradeManager";
import { runBalanceSimulation } from "../systems/BalanceSimulator";
import { encodePayload, makeState, MemoryStorage } from "./testUtils";

const hour = 60 * 60 * 1000;
const day = 24 * hour;

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(",")}}`;
}

function saveCodeFor(body: Record<string, unknown>) {
  return encodePayload({ ...body, checksum: checksum(stableStringify(body)) });
}

function decodeSave(code: string) {
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(code), (char) => char.charCodeAt(0)))) as Record<string, unknown>;
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
    settings: { effectsEnabled: true, soundMuted: false, musicMuted: false },
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

function v4PayloadWithoutRetention(nowMs: number) {
  const state = makeState(nowMs);
  state.achievements.unlockedIds = ["first_orange"];
  state.achievements.claimedRewardIds = ["first_orange"];
  state.progression.unlockedTierIds = ["yard", "storehouse"];
  const payload = decodeSave(SaveManager.exportState(state, nowMs + 500));
  delete payload.checksum;
  delete payload.retention;
  payload.version = 4;
  return payload;
}

function expectFiniteCurrency(value: BigNumberLite) {
  expect(Number.isFinite(value.mantissa)).toBe(true);
  expect(Number.isFinite(value.exponent)).toBe(true);
  expect(value.gte(0)).toBe(true);
}

describe("RC-8 release candidate bug bash", () => {
  it("migrates v1, v2, v3, and v4 saves into v5 retention state", () => {
    const nowMs = 10_000;
    const payloads = [legacyPayload(1), legacyPayload(2), legacyPayload(3), v4PayloadWithoutRetention(nowMs)];
    for (const body of payloads) {
      const imported = SaveManager.importState(saveCodeFor(body), nowMs);
      expect(imported.ok).toBe(true);
      if (!imported.ok) continue;
      expect(GameConfig.save.version).toBe(5);
      expect(imported.state.retention.firstPlayedAt).toBeGreaterThan(0);
      expect(imported.state.retention.dailyStreak).toBe(0);
      expect(imported.state.retention.claimedMilestones.d1_returner).toBe(false);
      expect(imported.state.retention.claimedMilestones.d3_steady_butler).toBe(false);
      expect(imported.state.retention.claimedMilestones.d7_golden_regular).toBe(false);
      expect(imported.state.retention.postPrestigeGoalStep).toBe(0);
    }
  });

  it("recovers corrupted v5 retention fields without crashing import", () => {
    const nowMs = 20_000;
    const state = makeState(nowMs);
    const code = SaveManager.exportState({
      ...state,
      retention: {
        firstPlayedAt: Number.NaN,
        lastDailyClaimAt: 999_999_999_999_999,
        dailyStreak: -30,
        claimedMilestones: { d1_returner: true, unknown: true },
        postPrestigeGoalStep: 999,
      },
    }, nowMs + 1_000);

    const imported = SaveManager.importState(code, nowMs + 2_000);
    expect(imported.ok).toBe(true);
    if (!imported.ok) return;
    expect(imported.state.retention.firstPlayedAt).toBe(nowMs);
    expect(imported.state.retention.lastDailyClaimAt).toBe(nowMs + 2_000);
    expect(imported.state.retention.dailyStreak).toBe(0);
    expect(imported.state.retention.claimedMilestones.d1_returner).toBe(true);
    expect(imported.state.retention.claimedMilestones.d3_steady_butler).toBe(false);
    expect(imported.state.retention.postPrestigeGoalStep).toBe(5);
  });

  it("lets offline reward and D1 daily reward resolve in the same return session without double payout", () => {
    const nowMs = 1_700_000_000_000;
    const state = makeState(nowMs - day);
    state.retention.firstPlayedAt = nowMs - day;
    state.retention.lastDailyClaimAt = null;
    state.generators.orange_basket = 10;
    state.epsAtLastSave = BigNumberLite.from("2");
    state.lastSavedAt = nowMs - 2 * hour;
    const storage = new MemoryStorage();
    SaveManager.saveToStorage(state, storage, state.lastSavedAt);

    const loaded = SaveManager.loadFromStorage(storage, nowMs);
    expect(loaded.ok).toBe(true);
    if (!loaded.ok) return;
    expect(loaded.state.offlineReward?.pending).toBe(true);

    const afterOffline = claimOfflineReward(loaded.state, nowMs + 1);
    const afterDaily = claimDailyReward(afterOffline, nowMs + 2);
    expect(afterDaily.ok).toBe(true);
    if (!afterDaily.ok) return;
    const duplicateDaily = claimDailyReward(afterDaily.state, nowMs + 3);
    expect(duplicateDaily.ok).toBe(false);
    expect(afterDaily.state.offlineReward).toBeNull();
    expect(afterDaily.state.retention.dailyStreak).toBe(1);
    expect(afterDaily.state.currencies.orange.gte(loaded.state.offlineReward?.oranges ?? 0)).toBe(true);
  });

  it("keeps daily cooldown and milestone duplicate guards after export/import", () => {
    const nowMs = 1_700_000_000_000;
    const state = makeState(nowMs - 8 * day);
    state.retention.firstPlayedAt = nowMs - 8 * day;
    state.retention.lastDailyClaimAt = nowMs - 21 * hour;
    state.retention.dailyStreak = 2;

    const daily = claimDailyReward(state, nowMs);
    expect(daily.ok).toBe(true);
    if (!daily.ok) return;
    const d7 = claimMilestoneReward(daily.state, "d7_golden_regular", nowMs + 1);
    expect(d7.ok).toBe(true);
    if (!d7.ok) return;

    const imported = SaveManager.importState(SaveManager.exportState(d7.state, nowMs + 2), nowMs + 3);
    expect(imported.ok).toBe(true);
    if (!imported.ok) return;
    expect(getDailyRewardStatus(imported.state, nowMs + 3).eligible).toBe(false);
    const duplicateMilestone = claimMilestoneReward(imported.state, "d7_golden_regular", nowMs + 4);
    expect(duplicateMilestone.ok).toBe(false);
    if (!duplicateMilestone.ok) expect(duplicateMilestone.reason).toBe("already_claimed");
  });

  it("keeps post-prestige goal claim state stable across prestige, save, load", () => {
    const nowMs = 1_700_000_000_000;
    const state = makeState(nowMs);
    state.currencies.orange = BigNumberLite.from("100000000");
    state.lifetime.totalOrangesEarned = BigNumberLite.from("100000000");
    const prestige = performPrestige(state, nowMs + 1);
    expect(prestige.ok).toBe(true);
    if (!prestige.ok) return;

    const firstGoal = getRetentionGoalView(prestige.state, nowMs + 2);
    expect(firstGoal.canClaim).toBe(true);
    const claimed = claimPostPrestigeGoal(prestige.state, nowMs + 3);
    expect(claimed.ok).toBe(true);
    if (!claimed.ok) return;

    const imported = SaveManager.importState(SaveManager.exportState(claimed.state, nowMs + 4), nowMs + 5);
    expect(imported.ok).toBe(true);
    if (!imported.ok) return;
    expect(imported.state.retention.postPrestigeGoalStep).toBe(1);
    expect(getRetentionGoalView(imported.state, nowMs + 5).title).toBe("황금 나뭇잎 2개 보유");
  });

  it("keeps max-buy safety caps and disabled zero-quantity states explicit", () => {
    const cappedPlan = calculateUpgradePurchasePlan({
      baseCost: "1",
      growthRate: 1,
      currentLevel: 0,
      maxLevel: null,
      balance: "100000",
      mode: "max",
      maxIterations: 3,
    });
    expect(cappedPlan.canBuy).toBe(true);
    expect(cappedPlan.quantity).toBe(3);
    expect(cappedPlan.limitedBySafety).toBe(true);

    const emptyState = makeState();
    const disabled = getUpgradePurchasePreview(emptyState, "soft_paw", "max");
    expect(disabled.canBuy).toBe(false);
    expect(disabled.quantity).toBe(0);
    expect(disabled.reason).toBe("insufficient_oranges");
  });

  it("formats very large retention rewards without NaN or Infinity", () => {
    const nowMs = 1_700_000_000_000;
    const state = makeState(nowMs - day);
    state.retention.firstPlayedAt = nowMs - day;
    state.generators.orange_basket = 1000;
    state.currencies.goldenLeaf = BigNumberLite.from("1e45");
    const status = getDailyRewardStatus(state, nowMs);
    expect(status.eligible).toBe(true);
    expect(status.reward.label).toContain("e");
    expect(status.reward.label).not.toContain("NaN");
    expect(status.reward.label).not.toContain("Infinity");
  });

  it("uses a volatile fallback when localStorage is unavailable and safely fails throwing storage", () => {
    const state = makeState(1_000);
    vi.stubGlobal("localStorage", undefined);
    try {
      SaveManager.clearStorage();
      SaveManager.saveToStorage(state, 2_000);
      const loaded = SaveManager.loadFromStorage(3_000);
      expect(loaded.ok).toBe(true);
      if (loaded.ok) {
        expect(loaded.state.createdAt).toBe(1_000);
      }
    } finally {
      vi.unstubAllGlobals();
    }

    const throwingStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      expect(() => SaveManager.saveToStorage(state, throwingStorage, 4_000)).not.toThrow();
      expect(SaveManager.loadFromStorage(throwingStorage, 4_000).ok).toBe(false);
      expect(() => SaveManager.clearStorage(throwingStorage)).not.toThrow();
    } finally {
      warnSpy.mockRestore();
    }
  });

  it("passes long-session, offline-cap, rapid tap, quick-buy, and save/load stress checks", () => {
    const simulation = runBalanceSimulation({ durationSeconds: 7200, tickSeconds: 15, tapsPerSecond: 1.2 });
    expect(simulation.checkpoints.some((checkpoint) => checkpoint.label === "첫 2시간")).toBe(true);
    expectFiniteCurrency(simulation.finalState.currencies.orange);
    expectFiniteCurrency(simulation.finalState.lifetime.totalOrangesEarned);
    expect(selectEps(simulation.finalState).toString()).not.toContain("NaN");

    const offline = calculateOfflineReward({
      epsAtLastSave: "100",
      lastSavedAt: 0,
      nowMs: 10 * hour,
    });
    expect(offline.seconds).toBe(GameConfig.offline.maxSeconds);

    resetGameState(1_000);
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => undefined);
    try {
      for (let index = 0; index < 500; index += 1) {
        GameActions.tapOrange(1_000 + index);
      }
    } finally {
      infoSpy.mockRestore();
    }
    expect(getGameState().lifetime.totalTaps).toBe(500);
    expectFiniteCurrency(getGameState().currencies.orange);

    let purchaseState = makeState(10_000);
    purchaseState.currencies.orange = BigNumberLite.from("1e24");
    for (let index = 0; index < 100; index += 1) {
      const result = purchaseUpgrade(purchaseState, "orange_basket", 10_000 + index, "max");
      if (result.ok) {
        purchaseState = result.state;
      }
      expectFiniteCurrency(purchaseState.currencies.orange);
    }

    let saveState = purchaseState;
    for (let index = 0; index < 20; index += 1) {
      const imported = SaveManager.importState(SaveManager.exportState(saveState, 20_000 + index), 30_000 + index);
      expect(imported.ok).toBe(true);
      if (imported.ok) saveState = imported.state;
      expectFiniteCurrency(saveState.currencies.orange);
    }
  });

  it("cleans RAF visibility listeners and avoids duplicate running loops", () => {
    const callbacks: Array<(timestamp: number) => void> = [];
    let visibilityState: DocumentVisibilityState = "visible";
    const listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();
    const fakeDocument = {
      get visibilityState() {
        return visibilityState;
      },
      addEventListener: vi.fn((event: string, listener: EventListenerOrEventListenerObject) => {
        listeners.set(event, (listeners.get(event) ?? new Set()).add(listener));
      }),
      removeEventListener: vi.fn((event: string, listener: EventListenerOrEventListenerObject) => {
        listeners.get(event)?.delete(listener);
      }),
    };

    vi.stubGlobal("window", {});
    vi.stubGlobal("document", fakeDocument);
    vi.stubGlobal("requestAnimationFrame", vi.fn((callback: (timestamp: number) => void) => {
      callbacks.push(callback);
      return callbacks.length;
    }));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    setGameState(makeState());
    const loop = new GameLoop();
    try {
      loop.start();
      loop.start();
      expect(fakeDocument.addEventListener).toHaveBeenCalledTimes(1);
      visibilityState = "hidden";
      callbacks.shift()?.(1_000);
      visibilityState = "visible";
      listeners.get("visibilitychange")?.forEach((listener) => {
        if (typeof listener === "function") listener(new Event("visibilitychange"));
      });
    } finally {
      loop.stop();
      expect(listeners.get("visibilitychange")?.size ?? 0).toBe(0);
      vi.unstubAllGlobals();
    }
  });
});
