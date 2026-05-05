import { AssetConfig } from "../config/AssetConfig";
import { placeholderAssets } from "./placeholderAssets";

export type AssetKey = keyof typeof AssetConfig;
type PlaceholderAssetMap = Partial<Record<AssetKey, (typeof placeholderAssets)[keyof typeof placeholderAssets]>>;

export const AssetManager = {
  get(key: AssetKey) {
    const assets: PlaceholderAssetMap = placeholderAssets;
    return assets[key] ?? {
      type: "emoji",
      value: AssetConfig[key] ?? "□",
      alt: key,
    };
  },
};
