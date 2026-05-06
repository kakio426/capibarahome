import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { AchievementConfig } from "../config/AchievementConfig";
import { BalanceConfig } from "../config/BalanceConfig";
import { DecorationConfig } from "../config/DecorationConfig";
import { ProgressionConfig } from "../config/ProgressionConfig";
import { QuestConfig } from "../config/QuestConfig";
import { StoryConfig } from "../config/StoryConfig";

const repoRoot = process.cwd();
const generatedRoot = join(repoRoot, "src/assets/generated");

function walkFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) return walkFiles(fullPath);
    return [fullPath];
  });
}

function expectGeneratedAsset(relativePath: string) {
  expect(existsSync(join(generatedRoot, relativePath)), relativePath).toBe(true);
}

describe("handmade visual asset integrity", () => {
  it("generates a complete in-repo SVG asset pack", () => {
    const svgFiles = walkFiles(generatedRoot).filter((file) => file.endsWith(".svg"));

    expect(svgFiles.length).toBe(253);
    for (const file of svgFiles) {
      const source = readFileSync(file, "utf8");
      const name = relative(generatedRoot, file);
      expect(source, name).toContain("<svg");
      expect(source, name).toContain("</svg>");
      expect(source, name).not.toContain("<image");
      expect(source, name).not.toMatch(/href=["']https?:/);
      expect(source, name).not.toMatch(/url\(["']?https?:/);
      expect(source, name).not.toContain("\uFFFD");

      if (!name.startsWith("release/")) {
        expect(source, name).not.toContain("<text");
      }
    }
  });

  it("covers all game-facing asset keys from balance, story, quests, achievements, tiers, and decorations", () => {
    expectGeneratedAsset("icons/orange.svg");
    expectGeneratedAsset("icons/leaf.svg");
    expectGeneratedAsset("mascots/mascot-default.svg");
    expectGeneratedAsset("mascots/mascot-happy.svg");
    expectGeneratedAsset("mascots/mascot-sleepy.svg");
    expectGeneratedAsset("mascots/mascot-eating.svg");
    expectGeneratedAsset("mascots/mascot-celebrate.svg");
    expectGeneratedAsset("release/main-hero-final.svg");
    expectGeneratedAsset("release/prestige-ritual-final.svg");
    expectGeneratedAsset("release/shop-reward-banner-final.svg");
    expectGeneratedAsset("release/offline-return-final.svg");
    expectGeneratedAsset("release/store-key-visual-final.svg");
    expectGeneratedAsset("release/app-icon-final.svg");
    expectGeneratedAsset("release/splash-final.svg");
    expectGeneratedAsset("release/store-screenshot-frame-final.svg");

    for (const capybara of StoryConfig.capybaras) {
      expectGeneratedAsset(`portraits/capybara-${capybara.id}.svg`);
    }

    for (const tier of ProgressionConfig.tiers) {
      expectGeneratedAsset(`tiers/tier-${tier.id}.svg`);
    }

    for (const item of [...BalanceConfig.tapUpgrades, ...BalanceConfig.generators]) {
      expectGeneratedAsset(`items/${item.id}.svg`);
      expectGeneratedAsset(`icons/${item.icon}.svg`);
    }

    for (const quest of QuestConfig.quests) {
      expectGeneratedAsset(`items/${quest.id}.svg`);
      expectGeneratedAsset(`icons/${quest.icon}.svg`);
    }

    for (const achievement of AchievementConfig.achievements) {
      expectGeneratedAsset(`items/${achievement.id}.svg`);
      expectGeneratedAsset(`icons/${achievement.icon}.svg`);
    }

    for (const decoration of DecorationConfig.decorations) {
      expectGeneratedAsset(`items/${decoration.id}.svg`);
      expectGeneratedAsset(`icons/${decoration.icon}.svg`);
    }
  });

  it("keeps runtime visual styling free of temporary override markers", () => {
    const runtimeFiles = [
      "src/ui/styles/layout.css",
      "src/ui/styles/tokens.css",
      "src/ui/styles/global.css",
      "src/ui/styles/shell.css",
      "src/ui/styles/hud.css",
      "src/ui/styles/screens.css",
      "src/ui/styles/effects.css",
      "src/assets/AssetManager.ts",
      "src/assets/builtinAssets.ts",
      "scripts/generateVisualAssets.mjs",
    ];
    const bannedPatterns = [
      /RC-\d/i,
      /\bvibe\b/i,
      /placeholder/i,
      /emoji/i,
      /generic card/i,
      /beige dashboard/i,
      /TODO|FIXME/,
      /!important/,
    ];

    for (const file of runtimeFiles) {
      const source = readFileSync(join(repoRoot, file), "utf8");
      for (const pattern of bannedPatterns) {
        expect(source, `${file} contains ${pattern}`).not.toMatch(pattern);
      }
    }
  });
});
