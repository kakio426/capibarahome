export type AppTab = "home" | "upgrades" | "prestige" | "collection" | "shop" | "settings";

export const routes: Array<{ id: AppTab; label: string; ariaLabel?: string; icon: string }> = [
  { id: "home", label: "홈", icon: "home" },
  { id: "upgrades", label: "성장", ariaLabel: "업그레이드", icon: "basket" },
  { id: "prestige", label: "환생", icon: "leaf" },
  { id: "collection", label: "앨범", icon: "album" },
  { id: "shop", label: "상점", icon: "gift" },
  { id: "settings", label: "설정", icon: "toolbox" },
];
