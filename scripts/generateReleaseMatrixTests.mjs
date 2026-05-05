import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, "src");
const outDir = join(srcDir, "tests", "generated");

function read(relativePath) {
  return readFileSync(join(srcDir, relativePath), "utf8");
}

function captureAll(pattern, text) {
  const matches = [];
  let match = pattern.exec(text);
  while (match) {
    matches.push(match[1]);
    match = pattern.exec(text);
  }
  return [...new Set(matches)];
}

function idsFrom(relativePath) {
  return captureAll(/^\s+id:\s*"([^"]+)"/gm, read(relativePath));
}

function registryKeys() {
  return captureAll(/^\s+"([^"]+)":\s+new URL/gm, read("assets/generated/GeneratedAssetRegistry.ts")).sort((a, b) => a.localeCompare(b));
}

function literalArray(values) {
  return `[\n${values.map((value) => `  ${JSON.stringify(value)},`).join("\n")}\n] as const`;
}

function writeAssetMatrix(keys) {
  const chunks = [];
  chunks.push(`import { describe, expect, it } from "vitest";`);
  chunks.push(`import { readFileSync } from "node:fs";`);
  chunks.push(`import { fileURLToPath } from "node:url";`);
  chunks.push(`import { GeneratedAssetRegistry } from "../../assets/generated/GeneratedAssetRegistry";`);
  chunks.push("");
  chunks.push(`const expectedAssetKeys = ${literalArray(keys)};`);
  chunks.push("");
  chunks.push(`describe("generated visual asset registry matrix", () => {`);
  chunks.push(`  it("keeps the generated registry size release-scale", () => {`);
  chunks.push(`    expect(expectedAssetKeys.length).toBeGreaterThanOrEqual(220);`);
  chunks.push(`    expect(Object.keys(GeneratedAssetRegistry).length).toBeGreaterThanOrEqual(expectedAssetKeys.length);`);
  chunks.push(`  });`);
  chunks.push("");
  for (const key of keys) {
    chunks.push(`  it(${JSON.stringify(`validates generated SVG asset ${key}`)}, () => {`);
    chunks.push(`    const href = GeneratedAssetRegistry[${JSON.stringify(key)}];`);
    chunks.push(`    expect(href, ${JSON.stringify(key)}).toBeTruthy();`);
    chunks.push(`    const filePath = fileURLToPath(href);`);
    chunks.push(`    const body = readFileSync(filePath, "utf8");`);
    chunks.push(`    expect(body.startsWith("<svg"), ${JSON.stringify(key)}).toBe(true);`);
    chunks.push(`    expect(body, ${JSON.stringify(key)}).toContain("aria-label");`);
    chunks.push(`    expect(body.length, ${JSON.stringify(key)}).toBeGreaterThan(10_000);`);
    chunks.push(`    expect(body, ${JSON.stringify(key)}).toContain("</svg>");`);
    chunks.push(`  });`);
    chunks.push("");
  }
  chunks.push(`});`);
  writeFileSync(join(outDir, "assetRegistryMatrix.test.ts"), `${chunks.join("\n")}\n`, "utf8");
}

function writeContentMatrix({ upgradeIds, achievementIds, questIds, decorationIds, capybaraIds, tierIds }) {
  const chunks = [];
  chunks.push(`import { describe, expect, it } from "vitest";`);
  chunks.push(`import { AchievementConfig } from "../../config/AchievementConfig";`);
  chunks.push(`import { BalanceConfig } from "../../config/BalanceConfig";`);
  chunks.push(`import { DecorationConfig } from "../../config/DecorationConfig";`);
  chunks.push(`import { ProgressionConfig } from "../../config/ProgressionConfig";`);
  chunks.push(`import { QuestConfig } from "../../config/QuestConfig";`);
  chunks.push(`import { StoryConfig } from "../../config/StoryConfig";`);
  chunks.push(`import { BigNumberLite } from "../../core/BigNumberLite";`);
  chunks.push(`import { GeneratedAssetRegistry } from "../../assets/generated/GeneratedAssetRegistry";`);
  chunks.push("");
  chunks.push(`const expectedUpgradeIds = ${literalArray(upgradeIds)};`);
  chunks.push(`const expectedAchievementIds = ${literalArray(achievementIds)};`);
  chunks.push(`const expectedQuestIds = ${literalArray(questIds)};`);
  chunks.push(`const expectedDecorationIds = ${literalArray(decorationIds)};`);
  chunks.push(`const expectedCapybaraIds = ${literalArray(capybaraIds)};`);
  chunks.push(`const expectedTierIds = ${literalArray(tierIds)};`);
  chunks.push("");
  chunks.push(`function allUpgrades() {`);
  chunks.push(`  return [...BalanceConfig.tapUpgrades, ...BalanceConfig.generators];`);
  chunks.push(`}`);
  chunks.push("");
  chunks.push(`describe("release content snapshot matrix", () => {`);
  chunks.push(`  it("keeps expected content counts stable", () => {`);
  chunks.push(`    expect(allUpgrades().map((item) => item.id)).toEqual(expectedUpgradeIds);`);
  chunks.push(`    expect(AchievementConfig.achievements.map((item) => item.id)).toEqual(expectedAchievementIds);`);
  chunks.push(`    expect(QuestConfig.quests.map((item) => item.id)).toEqual(expectedQuestIds);`);
  chunks.push(`    expect(DecorationConfig.decorations.map((item) => item.id)).toEqual(expectedDecorationIds);`);
  chunks.push(`    expect(StoryConfig.capybaras.map((item) => item.id)).toEqual(expectedCapybaraIds);`);
  chunks.push(`    expect(ProgressionConfig.tiers.map((item) => item.id)).toEqual(expectedTierIds);`);
  chunks.push(`  });`);
  chunks.push("");
  for (const id of upgradeIds) {
    chunks.push(`  it(${JSON.stringify(`upgrade ${id} has release-ready content and asset`)}, () => {`);
    chunks.push(`    const item = allUpgrades().find((upgrade) => upgrade.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.name.length, ${JSON.stringify(id)}).toBeGreaterThan(2);`);
    chunks.push(`    expect(item?.description.length, ${JSON.stringify(id)}).toBeGreaterThan(12);`);
    chunks.push(`    expect(item?.uiCopy.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(BigNumberLite.from(item?.baseCost ?? "0").gte(1), ${JSON.stringify(id)}).toBe(true);`);
    chunks.push(`    expect(item?.growthRate, ${JSON.stringify(id)}).toBeGreaterThan(1);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(id)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  for (const id of achievementIds) {
    chunks.push(`  it(${JSON.stringify(`achievement ${id} has album copy and asset`)}, () => {`);
    chunks.push(`    const item = AchievementConfig.achievements.find((achievement) => achievement.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.name.length, ${JSON.stringify(id)}).toBeGreaterThan(2);`);
    chunks.push(`    expect(item?.description.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(item?.rewardText.length, ${JSON.stringify(id)}).toBeGreaterThan(4);`);
    chunks.push(`    expect(item?.toast.length, ${JSON.stringify(id)}).toBeGreaterThan(6);`);
    chunks.push(`    expect(item?.collectionLine.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(id)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  for (const id of questIds) {
    chunks.push(`  it(${JSON.stringify(`quest ${id} has actionable user-facing copy and reward`)}, () => {`);
    chunks.push(`    const item = QuestConfig.quests.find((quest) => quest.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.title.length, ${JSON.stringify(id)}).toBeGreaterThan(3);`);
    chunks.push(`    expect(item?.instruction.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(item?.helperLine.length, ${JSON.stringify(id)}).toBeGreaterThan(12);`);
    chunks.push(`    expect(item?.completionLine.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(BigNumberLite.from(item?.reward.oranges ?? "0").gte(1), ${JSON.stringify(id)}).toBe(true);`);
    chunks.push(`    expect(item?.reward.friendship, ${JSON.stringify(id)}).toBeGreaterThan(0);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(id)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  for (const id of decorationIds) {
    chunks.push(`  it(${JSON.stringify(`decoration ${id} has placement copy and asset`)}, () => {`);
    chunks.push(`    const item = DecorationConfig.decorations.find((decoration) => decoration.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.name.length, ${JSON.stringify(id)}).toBeGreaterThan(2);`);
    chunks.push(`    expect(item?.description.length, ${JSON.stringify(id)}).toBeGreaterThan(10);`);
    chunks.push(`    expect(item?.flavorLine.length, ${JSON.stringify(id)}).toBeGreaterThan(10);`);
    chunks.push(`    expect(item?.visualClass.startsWith("decor-"), ${JSON.stringify(id)}).toBe(true);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(id)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  for (const id of capybaraIds) {
    chunks.push(`  it(${JSON.stringify(`capybara ${id} has story bible fields and portrait asset`)}, () => {`);
    chunks.push(`    const item = StoryConfig.capybaras.find((capybara) => capybara.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.name.length, ${JSON.stringify(id)}).toBeGreaterThan(1);`);
    chunks.push(`    expect(item?.role.length, ${JSON.stringify(id)}).toBeGreaterThan(3);`);
    chunks.push(`    expect(item?.personality.length, ${JSON.stringify(id)}).toBeGreaterThan(10);`);
    chunks.push(`    expect(item?.favoriteFacility.length, ${JSON.stringify(id)}).toBeGreaterThan(2);`);
    chunks.push(`    expect(item?.line.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(`capybara-${id}`)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  for (const id of tierIds) {
    chunks.push(`  it(${JSON.stringify(`progression tier ${id} has story, goal, and background asset`)}, () => {`);
    chunks.push(`    const item = ProgressionConfig.tiers.find((tier) => tier.id === ${JSON.stringify(id)});`);
    chunks.push(`    expect(item).toBeTruthy();`);
    chunks.push(`    expect(item?.name.length, ${JSON.stringify(id)}).toBeGreaterThan(1);`);
    chunks.push(`    expect(item?.story.length, ${JSON.stringify(id)}).toBeGreaterThan(12);`);
    chunks.push(`    expect(item?.representativeFacility.length, ${JSON.stringify(id)}).toBeGreaterThan(2);`);
    chunks.push(`    expect(item?.unlockMessage.length, ${JSON.stringify(id)}).toBeGreaterThan(8);`);
    chunks.push(`    expect(item?.goalText.length, ${JSON.stringify(id)}).toBeGreaterThan(10);`);
    chunks.push(`    expect(GeneratedAssetRegistry[${JSON.stringify(`tier-${id}`)}], ${JSON.stringify(id)}).toBeTruthy();`);
    chunks.push(`  });`);
    chunks.push("");
  }
  chunks.push(`});`);
  writeFileSync(join(outDir, "contentSnapshotMatrix.test.ts"), `${chunks.join("\n")}\n`, "utf8");
}

mkdirSync(outDir, { recursive: true });

const upgradeIds = idsFrom("config/BalanceConfig.ts");
const achievementIds = idsFrom("config/AchievementConfig.ts");
const questIds = idsFrom("config/QuestConfig.ts");
const decorationIds = idsFrom("config/DecorationConfig.ts");
const capybaraIds = idsFrom("config/StoryConfig.ts");
const tierIds = captureAll(/\bid:\s*"(yard|storehouse|onsen|bamboo_garden|golden_forest)"/g, read("config/ProgressionConfig.ts"));
const keys = registryKeys();

writeAssetMatrix(keys);
writeContentMatrix({ upgradeIds, achievementIds, questIds, decorationIds, capybaraIds, tierIds });

console.info(`generated release matrix tests for ${keys.length} assets and ${upgradeIds.length + achievementIds.length + questIds.length + decorationIds.length + capybaraIds.length + tierIds.length} content records`);
