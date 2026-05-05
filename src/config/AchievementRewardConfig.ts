import { AchievementConfigItem } from "./AchievementConfig";
import { ProgressionTierId } from "./ProgressionConfig";

export type AchievementReward = {
  oranges?: string;
  goldenLeaf?: string;
  friendship?: { capybaraId: string; amount: number };
  permanentMultiplier?: number;
  decorationIds?: string[];
};

export const AchievementRewardConfig = {
  tierOrangeRewards: {
    yard: "120",
    storehouse: "4200",
    onsen: "36000",
    bamboo_garden: "420000",
    golden_forest: "1800000",
  } satisfies Record<ProgressionTierId, string>,
  specialRewards: {
    first_orange: { friendship: { capybaraId: "momo", amount: 2 }, decorationIds: ["sunny_yard"] },
    soft_paw_1: { friendship: { capybaraId: "momo", amount: 4 }, decorationIds: ["soft_paw_stamp"] },
    basket_1: { friendship: { capybaraId: "podo", amount: 4 }, decorationIds: ["orange_basket_corner"] },
    storehouse_5k: { friendship: { capybaraId: "narin", amount: 8 }, permanentMultiplier: 0.01 },
    onsen_75k: { friendship: { capybaraId: "dami", amount: 8 }, permanentMultiplier: 0.01 },
    bamboo_1m: { friendship: { capybaraId: "biro", amount: 10 }, permanentMultiplier: 0.015 },
    ad_festival: { friendship: { capybaraId: "ruru", amount: 8 }, decorationIds: ["festival_ribbon"] },
    sandbox_gift: { friendship: { capybaraId: "soda", amount: 8 } },
    first_leaf: { goldenLeaf: "1", friendship: { capybaraId: "hanul", amount: 12 }, permanentMultiplier: 0.02 },
    first_prestige: { goldenLeaf: "1", friendship: { capybaraId: "hanul", amount: 18 }, permanentMultiplier: 0.03 },
    third_prestige: { goldenLeaf: "2", friendship: { capybaraId: "hanul", amount: 24 }, permanentMultiplier: 0.05 },
  } satisfies Record<string, AchievementReward>,
} as const;

export function resolveAchievementReward(achievement: AchievementConfigItem): AchievementReward {
  const base: AchievementReward = {
    oranges: AchievementRewardConfig.tierOrangeRewards[achievement.tier],
  };
  const specialRewards: Record<string, AchievementReward> = AchievementRewardConfig.specialRewards;
  const special = specialRewards[achievement.id] ?? {};
  return { ...base, ...special };
}
