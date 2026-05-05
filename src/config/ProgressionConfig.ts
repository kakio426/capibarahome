export type ProgressionTierId = "yard" | "storehouse" | "onsen" | "bamboo_garden" | "golden_forest";

export type ProgressionTier = {
  id: ProgressionTierId;
  order: number;
  name: string;
  subtitle: string;
  story: string;
  backgroundClass: string;
  representativeFacility: string;
  unlockMessage: string;
  goalText: string;
  rewardTitle: string;
  rewardDescription: string;
  visualChange: string;
  nextInstruction: string;
  requiredLifetimeOranges: string;
  accent: string;
};

export const ProgressionConfig = {
  tiers: [
    {
      id: "yard",
      order: 1,
      name: "마당",
      subtitle: "첫 귤을 나누는 작은 앞마당",
      story: "햇살 드는 마당에서 카피바라들이 귤 냄새를 따라 모여듭니다.",
      backgroundClass: "tier-yard",
      representativeFacility: "귤 바구니",
      unlockMessage: "마당이 열렸어요. 첫 귤을 건네 보세요.",
      goalText: "말랑 앞발과 귤 바구니를 준비해 초반 흐름을 만듭니다.",
      rewardTitle: "마당 돌봄 시작",
      rewardDescription: "첫 친구 모모와 기본 터치 성장이 정원의 중심 목표가 됩니다.",
      visualChange: "햇살, 잔디, 첫 귤 바구니가 홈 화면에 자리 잡습니다.",
      nextInstruction: "귤을 눌러 모모의 첫 퀘스트와 말랑 앞발 업그레이드를 열어 주세요.",
      requiredLifetimeOranges: "0",
      accent: "#ff8a2a",
    },
    {
      id: "storehouse",
      order: 2,
      name: "귤 창고",
      subtitle: "상자를 쌓고 하루 수확을 계획하는 곳",
      story: "나무 상자마다 이름표가 붙고, 집사는 귤이 눌리지 않게 폭신한 천을 깝니다.",
      backgroundClass: "tier-storehouse",
      representativeFacility: "향기 창고",
      unlockMessage: "귤 창고가 열렸어요. 저장과 분류가 시작됩니다.",
      goalText: "창고 시설을 열어 초당 생산을 안정화합니다.",
      rewardTitle: "창고 동선 해금",
      rewardDescription: "나린의 자동 생산 보너스와 창고 장식 목표가 장기 수익을 밀어 줍니다.",
      visualChange: "홈 화면 뒤편에 상자, 표지판, 창고 색감이 더해집니다.",
      nextInstruction: "귤 바구니 레벨을 올려 EPS를 만들고 창고 퀘스트 보상을 수령하세요.",
      requiredLifetimeOranges: "5000",
      accent: "#d3843f",
    },
    {
      id: "onsen",
      order: 3,
      name: "온천",
      subtitle: "따뜻한 김 사이로 귤 향이 퍼지는 쉼터",
      story: "온천 물결이 잔잔해지면 카피바라들은 더 오래, 더 기분 좋게 일을 돕습니다.",
      backgroundClass: "tier-onsen",
      representativeFacility: "따뜻한 온천",
      unlockMessage: "온천 구역이 열렸어요. 쉬는 시간도 생산의 일부가 됩니다.",
      goalText: "온천과 간식 시설로 중반 배율을 끌어올립니다.",
      rewardTitle: "온천 휴식 루프",
      rewardDescription: "다미의 오프라인 보너스가 커지고 돌아왔을 때 보상 체감이 좋아집니다.",
      visualChange: "물결, 김, 수건 장식이 정원 분위기를 따뜻하게 바꿉니다.",
      nextInstruction: "오프라인 보상과 온천 시설을 묶어 첫 환생 준비율을 끌어올리세요.",
      requiredLifetimeOranges: "75000",
      accent: "#4b8aa8",
    },
    {
      id: "bamboo_garden",
      order: 4,
      name: "대나무 정원",
      subtitle: "바람길과 운반길이 만나는 큰 정원",
      story: "대나무 사이로 작은 수레가 지나가고, 귤 상자는 저녁 전에 모두 정리됩니다.",
      backgroundClass: "tier-bamboo",
      representativeFacility: "대나무 카트",
      unlockMessage: "대나무 정원이 열렸어요. 운반 루트가 길어집니다.",
      goalText: "운반, 분류, 축제 준비 시설을 연결합니다.",
      rewardTitle: "대나무 운반망",
      rewardDescription: "비로의 퀘스트 보상 배율이 커져 목표를 달성할수록 다음 목표가 빨라집니다.",
      visualChange: "대나무 문, 카트 길, 풍경이 홈 화면의 깊이를 만듭니다.",
      nextInstruction: "퀘스트 보상과 장식 배치를 같이 챙겨 후반 생산 루프를 열어 주세요.",
      requiredLifetimeOranges: "1200000",
      accent: "#3c8f72",
    },
    {
      id: "golden_forest",
      order: 5,
      name: "황금 숲",
      subtitle: "환생한 나뭇잎이 빛나는 장기 성장 구역",
      story: "황금 나뭇잎 아래에서는 지난 정원의 기억이 다음 수확을 부드럽게 밀어 줍니다.",
      backgroundClass: "tier-golden",
      representativeFacility: "황금 숲길",
      unlockMessage: "황금 숲이 열렸어요. 환생의 의미가 정원에 남았습니다.",
      goalText: "황금 나뭇잎 배율과 후반 시설을 함께 키웁니다.",
      rewardTitle: "황금 숲 기억",
      rewardDescription: "하늘의 환생 보너스와 영구 배율 보상이 다음 회차를 빠르게 만듭니다.",
      visualChange: "황금 숲길과 보랏빛 잎 장식이 환생 이후 목표를 드러냅니다.",
      nextInstruction: "첫 환생 이후 황금잎 업적 보상을 수령하고 후반 장식을 완성하세요.",
      requiredLifetimeOranges: "25000000",
      accent: "#9a5bb4",
    },
  ],
} as const satisfies { tiers: ProgressionTier[] };
