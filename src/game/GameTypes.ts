import { BigNumberLite } from "../core/BigNumberLite";

export type NumberFormatMode = "short" | "scientific";

export type SettingsState = {
  effectsEnabled: boolean;
  soundMuted: boolean;
  musicMuted: boolean;
  vibrationEnabled: boolean;
  numberFormat: NumberFormatMode;
};

export type TutorialState = {
  completed: boolean;
  step: number;
  visible: boolean;
};

export type MonetizationState = {
  adBoostUntil: number | null;
  purchasedProductIds: string[];
};

export type AchievementState = {
  unlockedIds: string[];
  claimedRewardIds: string[];
  lastUnlockedId: string | null;
};

export type QuestState = {
  claimedIds: string[];
  lastClaimedId: string | null;
};

export type CompanionState = {
  friendshipById: Record<string, number>;
  highlightedId: string | null;
};

export type DecorationState = {
  equippedBySlot: Record<string, string>;
};

export type ProgressionState = {
  unlockedTierIds: string[];
  lastUnlockedTierId: string | null;
};

export type OfflineRewardState = {
  pending: boolean;
  claimed: boolean;
  seconds: number;
  oranges: BigNumberLite;
};

export type LastActionState = {
  kind: "tap" | "purchase" | "prestige" | "ad" | "iap" | "save" | "error" | "debug" | "achievement" | "quest" | "decoration" | "tier";
  message: string;
  createdAt: number;
} | null;

export type GameState = {
  createdAt: number;
  updatedAt: number;
  lastSavedAt: number;
  currencies: {
    orange: BigNumberLite;
    goldenLeaf: BigNumberLite;
  };
  lifetime: {
    totalOrangesEarned: BigNumberLite;
    totalTaps: number;
    totalPrestiges: number;
  };
  upgrades: Record<string, number>;
  generators: Record<string, number>;
  settings: SettingsState;
  tutorial: TutorialState;
  monetization: MonetizationState;
  achievements: AchievementState;
  quests: QuestState;
  companions: CompanionState;
  decorations: DecorationState;
  progression: ProgressionState;
  offlineReward: OfflineRewardState | null;
  epsAtLastSave: BigNumberLite;
  lastToast: string | null;
  lastAction: LastActionState;
};

export type SavePayload = {
  version: number;
  checksum: string;
  createdAt: number;
  updatedAt: number;
  lastSavedAt: number;
  currencies: {
    orange: string;
    goldenLeaf: string;
  };
  lifetime: {
    totalOrangesEarned: string;
    totalTaps: number;
    totalPrestiges: number;
  };
  upgrades: Record<string, number>;
  generators: Record<string, number>;
  settings: SettingsState;
  tutorial: Pick<TutorialState, "completed" | "step">;
  monetization: {
    adBoostUntil: number | null;
    purchasedProductIds: string[];
  };
  achievements: AchievementState;
  quests: QuestState;
  companions: CompanionState;
  decorations: DecorationState;
  progression: ProgressionState;
  epsAtLastSave: string;
};

export type SavePayloadWithoutChecksum = Omit<SavePayload, "checksum">;

export type FloatingText = {
  id: string;
  text: string;
  x: number;
  y: number;
};
