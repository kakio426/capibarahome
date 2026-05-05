import { ProgressionTierId } from "./ProgressionConfig";

export type CapybaraAbilityType =
  | "tapMultiplier"
  | "epsMultiplier"
  | "offlineMultiplier"
  | "questOrangeMultiplier"
  | "questFriendshipBonus"
  | "achievementOrangeMultiplier"
  | "decorationEpsMultiplier"
  | "prestigeGainMultiplier";

export type CapybaraAbility = {
  type: CapybaraAbilityType;
  name: string;
  description: string;
  perLevel: number;
  unit: "percent" | "flat";
};

export type CapybaraCharacter = {
  id: string;
  name: string;
  role: string;
  personality: string;
  favoriteOrange: string;
  favoriteFacility: string;
  ability: CapybaraAbility;
  line: string;
};

export const StoryConfig = {
  worldSummary: "귤빛 강가에 작은 정원이 생기고, 집사는 카피바라들이 편안히 쉬며 귤을 나눌 수 있도록 하루씩 돌봅니다.",
  butler: {
    title: "귤 정원 집사",
    description: "크게 명령하지 않고, 바구니를 채우고 물길을 정리하며 카피바라들이 스스로 움직일 수 있게 돕는 조용한 주인공입니다.",
  },
  capybaras: [
    {
      id: "momo",
      name: "모모",
      role: "첫 손님",
      personality: "느긋하지만 첫 귤 냄새에는 누구보다 빠릅니다.",
      favoriteOrange: "작은 꿀귤",
      favoriteFacility: "귤 바구니",
      ability: {
        type: "tapMultiplier",
        name: "첫 귤 감각",
        description: "친밀도 레벨마다 터치 수익이 증가합니다.",
        perLevel: 0.04,
        unit: "percent",
      },
      line: "한 알만 더 주면 오늘도 좋은 날이에요.",
    },
    {
      id: "narin",
      name: "나린",
      role: "창고 기록 담당",
      personality: "상자 수를 세는 걸 좋아하고, 정리된 선반을 보면 잠이 옵니다.",
      favoriteOrange: "향기 진한 창고귤",
      favoriteFacility: "향기 창고",
      ability: {
        type: "epsMultiplier",
        name: "창고 정리표",
        description: "친밀도 레벨마다 자동 생산량이 증가합니다.",
        perLevel: 0.03,
        unit: "percent",
      },
      line: "왼쪽 선반은 새 귤, 오른쪽 선반은 달콤한 귤이에요.",
    },
    {
      id: "dami",
      name: "다미",
      role: "온천 안내원",
      personality: "따뜻한 김을 따라 천천히 움직이며 모두를 쉬게 합니다.",
      favoriteOrange: "따뜻한 껍질귤",
      favoriteFacility: "따뜻한 온천",
      ability: {
        type: "offlineMultiplier",
        name: "느긋한 온천 근무",
        description: "친밀도 레벨마다 오프라인 보상이 증가합니다.",
        perLevel: 0.06,
        unit: "percent",
      },
      line: "쉬면 더 오래 모을 수 있어요.",
    },
    {
      id: "biro",
      name: "비로",
      role: "대나무 운반수",
      personality: "작은 수레를 밀 때만큼은 놀랄 만큼 집중합니다.",
      favoriteOrange: "단단한 길귤",
      favoriteFacility: "대나무 카트",
      ability: {
        type: "questOrangeMultiplier",
        name: "빠른 운반 동선",
        description: "친밀도 레벨마다 퀘스트 귤 보상이 증가합니다.",
        perLevel: 0.05,
        unit: "percent",
      },
      line: "상자는 흔들리지 않게, 마음은 가볍게!",
    },
    {
      id: "soda",
      name: "소다",
      role: "간식 연구가",
      personality: "새로운 귤 간식 조합을 발견하면 꼬리를 살짝 흔듭니다.",
      favoriteOrange: "톡톡 청귤",
      favoriteFacility: "귤 간식대",
      ability: {
        type: "achievementOrangeMultiplier",
        name: "간식 보상 연구",
        description: "친밀도 레벨마다 업적 귤 보상이 증가합니다.",
        perLevel: 0.04,
        unit: "percent",
      },
      line: "이건 쉬는 시간용, 이건 수확 전용이에요.",
    },
    {
      id: "ruru",
      name: "루루",
      role: "축제 준비장",
      personality: "등불을 달고 작은 깃발을 세우는 일을 즐깁니다.",
      favoriteOrange: "축제 홍귤",
      favoriteFacility: "귤 등불길",
      ability: {
        type: "decorationEpsMultiplier",
        name: "장식 축제 동선",
        description: "친밀도 레벨과 배치 장식 수에 따라 자동 생산량이 증가합니다.",
        perLevel: 0.01,
        unit: "percent",
      },
      line: "밤에도 귤빛은 꺼지지 않아요.",
    },
    {
      id: "hanul",
      name: "하늘",
      role: "황금 숲 파수꾼",
      personality: "환생한 나뭇잎을 조용히 모아 다음 계절을 준비합니다.",
      favoriteOrange: "황금잎 귤",
      favoriteFacility: "황금 숲길",
      ability: {
        type: "prestigeGainMultiplier",
        name: "황금잎 파수",
        description: "친밀도 레벨마다 환생 황금 나뭇잎 보상이 증가합니다.",
        perLevel: 0.05,
        unit: "percent",
      },
      line: "지난 정원도 여기서 반짝이고 있어요.",
    },
    {
      id: "podo",
      name: "포도",
      role: "잠꾸러기 응원단",
      personality: "자주 졸지만 중요한 순간에는 제일 큰 박수를 보냅니다.",
      favoriteOrange: "말랑 귤조각",
      favoriteFacility: "낮잠 평상",
      ability: {
        type: "questFriendshipBonus",
        name: "졸린 응원",
        description: "친밀도 레벨마다 퀘스트 친밀도 보너스가 추가됩니다.",
        perLevel: 1,
        unit: "flat",
      },
      line: "조금만 자고 나면 더 많이 도울게요.",
    },
  ],
  tierLines: {
    yard: "마당의 첫 귤은 언제나 천천히, 오래 기억됩니다.",
    storehouse: "창고 문이 열리자 귤 향이 정원의 길을 만들었습니다.",
    onsen: "온천의 김은 수확을 재촉하지 않고 오래 이어지게 합니다.",
    bamboo_garden: "대나무 길이 이어지면 작은 정원도 큰 수확을 품습니다.",
    golden_forest: "황금 숲의 빛은 끝이 아니라 다시 시작하는 약속입니다.",
  } satisfies Record<ProgressionTierId, string>,
  prestigeMeaning: "환생은 정원을 지우는 일이 아니라, 돌본 시간을 황금 나뭇잎으로 접어 다음 계절에 남기는 일입니다.",
  tutorial: [
    "모모가 기다리고 있어요. 카피바라에게 첫 귤을 건네 주세요.",
    "귤이 모이면 정원 도구를 하나씩 마련해 보세요.",
    "정원이 충분히 자라면 황금 나뭇잎으로 다음 계절을 준비합니다.",
  ],
  offlineReturnLines: [
    "다녀오신 동안 바구니가 조용히 차올랐어요.",
    "카피바라들이 쉬엄쉬엄 귤을 모아 두었습니다.",
    "정원은 느리지만 멈추지 않았어요.",
  ],
  upgradeUnlockLines: [
    "새 시설 자리가 반짝입니다.",
    "카피바라들이 다음 일을 알아챘어요.",
    "정원에 새로운 길이 생겼습니다.",
  ],
  achievementLines: [
    "작은 기록이 정원 앨범에 붙었습니다.",
    "카피바라들이 조용히 박수를 보냅니다.",
    "오늘의 수확표에 별표가 생겼어요.",
  ],
} as const;
