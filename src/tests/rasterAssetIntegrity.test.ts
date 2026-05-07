import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { RasterAssetRegistry } from "../assets/raster/RasterAssetRegistry";

const requiredRuntimeRasterKeys = [
  "main-hero-background",
  "companion-momo",
  "companion-narin",
  "companion-dami",
  "companion-biro",
  "companion-podo",
  "companion-soda",
  "companion-ruru",
  "companion-hanul",
  "prestige-ritual-raster",
  "shop-reward-banner-raster",
  "offline-reward-raster",
];

const releaseOnlyRasterFiles = [
  "src/assets/raster/home/main-capybara-character.png",
  "src/assets/raster/release/store-key-visual.png",
  "src/assets/raster/release/app-icon-candidate.png",
];

function isPng(bytes: Buffer) {
  return bytes[0] === 0x89
    && bytes[1] === 0x50
    && bytes[2] === 0x4e
    && bytes[3] === 0x47
    && bytes[4] === 0x0d
    && bytes[5] === 0x0a
    && bytes[6] === 0x1a
    && bytes[7] === 0x0a;
}

describe("raster final art assets", () => {
  it("registers every required runtime raster asset", () => {
    for (const key of requiredRuntimeRasterKeys) {
      const href = RasterAssetRegistry[key];
      expect(href, key).toBeTruthy();
      const filePath = fileURLToPath(href);
      expect(existsSync(filePath), key).toBe(true);
      const bytes = readFileSync(filePath);
      expect(isPng(bytes), key).toBe(true);
      expect(bytes.length, key).toBeGreaterThan(40_000);
    }
  });

  it("keeps release-only raster candidates on disk without forcing them into the runtime bundle", () => {
    for (const file of releaseOnlyRasterFiles) {
      const filePath = join(process.cwd(), file);
      expect(existsSync(filePath), file).toBe(true);
      const bytes = readFileSync(filePath);
      expect(isPng(bytes), file).toBe(true);
      expect(bytes.length, file).toBeGreaterThan(40_000);
    }
    expect(RasterAssetRegistry["store-key-visual-raster"]).toBeUndefined();
    expect(RasterAssetRegistry["app-icon-candidate-raster"]).toBeUndefined();
  });

  it("keeps core emotion and store assets out of the SVG registry contract", () => {
    expect(Object.keys(RasterAssetRegistry)).toEqual(requiredRuntimeRasterKeys);
  });
});
