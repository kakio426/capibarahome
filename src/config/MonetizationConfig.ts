export const MonetizationConfig = {
  rewardedAd: {
    placementId: "orange_harvest_festival",
    multiplier: 2,
    durationSeconds: 1800,
    stacking: "extend",
    maxDurationSeconds: 7200,
  },
  products: [
    { id: "starter_pack", name: "스타터 귤 바구니", description: "초반 시설을 빠르게 열 수 있는 귤 보상입니다.", orangeReward: "5000" },
    { id: "no_ads_pack", name: "광고 제거 패키지", description: "출시 빌드에서 광고 노출을 줄이는 상품 자리입니다.", orangeReward: "0" },
    { id: "golden_leaf_pack", name: "황금 나뭇잎 팩", description: "환생 전에도 영구 성장 재화를 체험할 수 있습니다.", goldenLeafReward: "5" },
  ],
} as const;
