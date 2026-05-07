import { GameConfig } from "../config/GameConfig";
import { RetentionConfig } from "../config/RetentionConfig";
import { SavePayloadWithoutChecksum } from "../game/GameTypes";

type LooseSave = Partial<SavePayloadWithoutChecksum> & Record<string, unknown>;

function finiteNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function safeTimestamp(value: unknown, fallback: number, nowMs: number) {
  const parsed = finiteNumber(value, fallback);
  if (parsed <= 0) return fallback;
  return parsed > nowMs + 5 * 60 * 1000 ? nowMs : parsed;
}

function safeObject(value: unknown) {
  return typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
}

function migrateRetention(raw: LooseSave, nowMs: number) {
  const source = safeObject(raw.retention);
  const createdAt = safeTimestamp(raw.createdAt, nowMs, nowMs);
  const firstPlayedAt = safeTimestamp(source.firstPlayedAt, createdAt, nowMs);
  const lastDailyClaimAt = source.lastDailyClaimAt === null || source.lastDailyClaimAt === undefined
    ? null
    : safeTimestamp(source.lastDailyClaimAt, firstPlayedAt, nowMs);
  const claimedSource = safeObject(source.claimedMilestones);
  const claimedMilestones = Object.fromEntries(
    RetentionConfig.milestones.map((milestone) => [milestone.id, claimedSource[milestone.id] === true]),
  );
  const dailyStreak = Math.max(0, Math.min(
    RetentionConfig.daily.loopLength,
    Math.floor(finiteNumber(source.dailyStreak, 0)),
  ));
  const postPrestigeGoalStep = Math.max(0, Math.min(
    RetentionConfig.postPrestigeGoals.length,
    Math.floor(finiteNumber(source.postPrestigeGoalStep, 0)),
  ));

  return {
    firstPlayedAt,
    lastDailyClaimAt,
    dailyStreak,
    claimedMilestones,
    postPrestigeGoalStep,
  };
}

export function migrateSaveData(raw: LooseSave, nowMs = Date.now()): SavePayloadWithoutChecksum {
  const version = Number(raw.version ?? 0);
  const migrated: SavePayloadWithoutChecksum = {
    version: GameConfig.save.version,
    createdAt: Number(raw.createdAt ?? nowMs),
    updatedAt: Number(raw.updatedAt ?? nowMs),
    lastSavedAt: Number(raw.lastSavedAt ?? raw.updatedAt ?? nowMs),
    currencies: {
      orange: String(raw.currencies?.orange ?? "0"),
      goldenLeaf: String(raw.currencies?.goldenLeaf ?? "0"),
    },
    lifetime: {
      totalOrangesEarned: String(raw.lifetime?.totalOrangesEarned ?? raw.currencies?.orange ?? "0"),
      totalTaps: Number(raw.lifetime?.totalTaps ?? 0),
      totalPrestiges: Number(raw.lifetime?.totalPrestiges ?? 0),
    },
    upgrades: { ...(raw.upgrades ?? {}) } as Record<string, number>,
    generators: { ...(raw.generators ?? {}) } as Record<string, number>,
    settings: {
      effectsEnabled: raw.settings?.effectsEnabled ?? true,
      soundMuted: raw.settings?.soundMuted ?? false,
      musicMuted: raw.settings?.musicMuted ?? false,
      vibrationEnabled: raw.settings?.vibrationEnabled ?? true,
      numberFormat: raw.settings?.numberFormat === "scientific" ? "scientific" : "short",
    },
    tutorial: {
      completed: raw.tutorial?.completed ?? false,
      step: Number(raw.tutorial?.step ?? 0),
    },
    monetization: {
      adBoostUntil: raw.monetization?.adBoostUntil ?? null,
      purchasedProductIds: Array.isArray(raw.monetization?.purchasedProductIds)
        ? raw.monetization.purchasedProductIds.map(String)
        : [],
    },
    achievements: {
      unlockedIds: Array.isArray(raw.achievements?.unlockedIds)
        ? raw.achievements.unlockedIds.map(String)
        : [],
      claimedRewardIds: Array.isArray(raw.achievements?.claimedRewardIds)
        ? raw.achievements.claimedRewardIds.map(String)
        : [],
      lastUnlockedId: typeof raw.achievements?.lastUnlockedId === "string" ? raw.achievements.lastUnlockedId : null,
    },
    quests: {
      claimedIds: Array.isArray(raw.quests?.claimedIds)
        ? raw.quests.claimedIds.map(String)
        : [],
      lastClaimedId: typeof raw.quests?.lastClaimedId === "string" ? raw.quests.lastClaimedId : null,
    },
    companions: {
      friendshipById: typeof raw.companions?.friendshipById === "object" && raw.companions?.friendshipById !== null
        ? Object.fromEntries(
          Object.entries(raw.companions.friendshipById as Record<string, unknown>)
            .map(([id, value]) => [id, Number(value) || 0]),
        )
        : {},
      highlightedId: typeof raw.companions?.highlightedId === "string" ? raw.companions.highlightedId : null,
    },
    decorations: {
      equippedBySlot: typeof raw.decorations?.equippedBySlot === "object" && raw.decorations?.equippedBySlot !== null
        ? Object.fromEntries(
          Object.entries(raw.decorations.equippedBySlot as Record<string, unknown>)
            .map(([slot, value]) => [slot, String(value)]),
        )
        : { sky: "sunny_yard" },
    },
    progression: {
      unlockedTierIds: Array.isArray(raw.progression?.unlockedTierIds)
        ? raw.progression.unlockedTierIds.map(String)
        : ["yard"],
      lastUnlockedTierId: typeof raw.progression?.lastUnlockedTierId === "string" ? raw.progression.lastUnlockedTierId : null,
    },
    retention: migrateRetention(raw, nowMs),
    epsAtLastSave: String(raw.epsAtLastSave ?? "0"),
  };

  if (version > GameConfig.save.version) {
    throw new Error(`지원하지 않는 저장 버전입니다: ${version}`);
  }
  return migrated;
}
