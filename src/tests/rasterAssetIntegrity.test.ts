import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { RasterAssetRegistry } from "../assets/raster/RasterAssetRegistry";

const requiredRasterKeys = [
  "main-hero-background",
  "main-capybara-character",
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
  "store-key-visual-raster",
  "app-icon-candidate-raster",
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
  it("registers every required final-style raster asset", () => {
    for (const key of requiredRasterKeys) {
      const href = RasterAssetRegistry[key];
      expect(href, key).toBeTruthy();
      const filePath = fileURLToPath(href);
      expect(existsSync(filePath), key).toBe(true);
      const bytes = readFileSync(filePath);
      expect(isPng(bytes), key).toBe(true);
      expect(bytes.length, key).toBeGreaterThan(40_000);
    }
  });

  it("keeps core emotion and store assets out of the SVG registry contract", () => {
    expect(Object.keys(RasterAssetRegistry).length).toBeGreaterThanOrEqual(requiredRasterKeys.length);
  });
});
