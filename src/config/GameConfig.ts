export const GameConfig = {
  currency: {
    orange: { id: "orange", name: "귤", emoji: "🍊" },
    goldenLeaf: { id: "goldenLeaf", name: "황금 나뭇잎", emoji: "🍂" },
  },
  tap: {
    baseGain: "1",
  },
  prestige: {
    requirement: "1000000",
    goldenLeafPower: 0.05,
  },
  offline: {
    efficiency: 0.75,
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
