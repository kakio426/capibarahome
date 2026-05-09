export type RetentionRewardConfig = {
  oranges: {
    epsMinutes: number;
    min: string;
  };
  goldenLeaf?: string;
};

export type DailyRewardConfigItem = {
  day: number;
  title: string;
  flavor: string;
  reward: RetentionRewardConfig;
};

export type RetentionMilestoneConfigItem = {
  id: string;
  day: number;
  title: string;
  description: string;
  assetKey: string;
  unlockAfterMs: number;
  reward: RetentionRewardConfig;
};

export type PostPrestigeGoalConfigItem = {
  id: string;
  title: string;
  description: string;
  assetKey: string;
  reward: RetentionRewardConfig;
};

const hourMs = 60 * 60 * 1000;
const dayMs = 24 * hourMs;

export const RetentionConfig = {
  daily: {
    cooldownMs: 20 * hourMs,
    streakResetMs: 48 * hourMs,
    loopLength: 7,
    rewards: [
      {
        day: 1,
        title: "다시 연 정원 문",
        flavor: "밤새 모아둔 귤 바구니를 확인합니다.",
        reward: { oranges: { epsMinutes: 10, min: "500" } },
      },
      {
        day: 2,
        title: "따뜻한 아침 물주기",
        flavor: "어제보다 조금 묵직한 귤 바구니입니다.",
        reward: { oranges: { epsMinutes: 20, min: "2000" } },
      },
      {
        day: 3,
        title: "꾸준한 집사 도장",
        flavor: "정원 장부에 첫 장기 복귀 도장을 찍습니다.",
        reward: { oranges: { epsMinutes: 30, min: "5000" }, goldenLeaf: "1" },
      },
      {
        day: 4,
        title: "정원 선반 정리",
        flavor: "생산 시설을 다시 돌릴 수 있는 귤 보급입니다.",
        reward: { oranges: { epsMinutes: 40, min: "10000" } },
      },
      {
        day: 5,
        title: "귤 향기 가득한 오후",
        flavor: "중반 성장에 보탬이 되는 넉넉한 바구니입니다.",
        reward: { oranges: { epsMinutes: 60, min: "25000" } },
      },
      {
        day: 6,
        title: "황금 숲 산책 준비",
        flavor: "다음 환생 목표가 가까워지는 큰 귤 더미입니다.",
        reward: { oranges: { epsMinutes: 90, min: "50000" } },
      },
      {
        day: 7,
        title: "황금 숲 단골 인장",
        flavor: "일주일 정원 장부에 황금 도장을 남깁니다.",
        reward: { oranges: { epsMinutes: 120, min: "100000" }, goldenLeaf: "2" },
      },
    ],
  },
  milestones: [
    {
      id: "d1_returner",
      day: 1,
      title: "정원 복귀자",
      description: "첫 복귀 기록",
      assetKey: "first_orange",
      unlockAfterMs: 20 * hourMs,
      reward: { oranges: { epsMinutes: 30, min: "5000" } },
    },
    {
      id: "d3_steady_butler",
      day: 3,
      title: "꾸준한 집사",
      description: "3일 복귀 기록",
      assetKey: "first_leaf",
      unlockAfterMs: 3 * dayMs,
      reward: { oranges: { epsMinutes: 60, min: "25000" }, goldenLeaf: "1" },
    },
    {
      id: "d7_golden_regular",
      day: 7,
      title: "황금 숲 단골",
      description: "7일 복귀 기록",
      assetKey: "golden_five_leaves",
      unlockAfterMs: 7 * dayMs,
      reward: { oranges: { epsMinutes: 120, min: "100000" }, goldenLeaf: "3" },
    },
  ],
  postPrestigeGoals: [
    {
      id: "first_prestige",
      title: "첫 계절을 넘기기",
      description: "환생을 마친 뒤 새 정원 목표 장부를 엽니다.",
      assetKey: "first_prestige",
      reward: { oranges: { epsMinutes: 5, min: "5000" } },
    },
    {
      id: "two_leaves",
      title: "황금 나뭇잎 2개 보유",
      description: "영구 배율이 체감되는 두 번째 잎을 확보합니다.",
      assetKey: "leaf",
      reward: { oranges: { epsMinutes: 10, min: "15000" } },
    },
    {
      id: "post_soft_paw_10",
      title: "말랑 앞발 Lv.10 재건",
      description: "환생 후 터치 성장의 출발선을 빠르게 복구합니다.",
      assetKey: "soft_paw_10",
      reward: { oranges: { epsMinutes: 15, min: "25000" } },
    },
    {
      id: "post_basket_10",
      title: "귤 바구니 Lv.10 재가동",
      description: "자동 생산 루프가 다시 굴러가기 시작합니다.",
      assetKey: "basket_25",
      reward: { oranges: { epsMinutes: 20, min: "30000" } },
    },
    {
      id: "second_prestige_ready",
      title: "두 번째 환생 준비",
      description: "두 번째 계절 전환으로 장기 루프를 고정합니다.",
      assetKey: "third_prestige",
      reward: { oranges: { epsMinutes: 30, min: "50000" }, goldenLeaf: "1" },
    },
  ],
} as const;

export type RetentionMilestoneId = (typeof RetentionConfig.milestones)[number]["id"];
