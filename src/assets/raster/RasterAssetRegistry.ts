export const RasterAssetRegistry: Record<string, string> = {
  "main-hero-background": new URL("./home/main-hero-background.png", import.meta.url).href,
  "companion-momo": new URL("./companions/capybara-momo.png", import.meta.url).href,
  "companion-narin": new URL("./companions/capybara-narin.png", import.meta.url).href,
  "companion-dami": new URL("./companions/capybara-dami.png", import.meta.url).href,
  "companion-biro": new URL("./companions/capybara-biro.png", import.meta.url).href,
  "companion-podo": new URL("./companions/capybara-podo.png", import.meta.url).href,
  "companion-soda": new URL("./companions/capybara-soda.png", import.meta.url).href,
  "companion-ruru": new URL("./companions/capybara-ruru.png", import.meta.url).href,
  "companion-hanul": new URL("./companions/capybara-hanul.png", import.meta.url).href,
  "prestige-ritual-raster": new URL("./release/prestige-ritual.png", import.meta.url).href,
  "shop-reward-banner-raster": new URL("./release/shop-reward-banner.png", import.meta.url).href,
  "offline-reward-raster": new URL("./release/offline-reward.png", import.meta.url).href,
};

export function getRasterAsset(key: string) {
  return RasterAssetRegistry[key] ?? null;
}
