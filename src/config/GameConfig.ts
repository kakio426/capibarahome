export const GameConfig = {
  currency: {
    orange: { id: "orange", name: "귤", assetKey: "orange" },
    goldenLeaf: { id: "goldenLeaf", name: "황금 나뭇잎", assetKey: "leaf" },
  },
  tap: {
    baseGain: "1",
  },
  prestige: {
    requirement: "25000000",
    goldenLeafPower: 0.05,
  },
  offline: {
    efficiency: 0.75,
    minSeconds: 60,
    maxSeconds: 28800,
  },
  save: {
    key: "capybara-butler-save",
    version: 4,
    autoSaveIntervalMs: 5000,
  },
  loop: {
    maxDeltaMs: 250,
    displayUpdateMs: 120,
  },
} as const;
