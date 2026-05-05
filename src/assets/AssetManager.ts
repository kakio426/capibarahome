import { AssetConfig } from "../config/AssetConfig";
import { builtinAssets } from "./builtinAssets";

export type AssetKey = keyof typeof AssetConfig;
type BuiltinAssetMap = Partial<Record<AssetKey, (typeof builtinAssets)[keyof typeof builtinAssets]>>;

export const AssetManager = {
  get(key: AssetKey) {
    const assets: BuiltinAssetMap = builtinAssets;
    return assets[key] ?? {
      type: "css",
      value: AssetConfig[key] ?? "asset-missing",
      alt: key,
    };
  },
};
