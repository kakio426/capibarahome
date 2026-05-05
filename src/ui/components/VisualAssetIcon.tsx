import { getGeneratedAsset } from "../../assets/generated/GeneratedAssetRegistry";

type VisualAssetIconProps = {
  assetKey: string;
  className?: string;
};

export function VisualAssetIcon({ assetKey, className = "" }: VisualAssetIconProps) {
  const src = getGeneratedAsset(assetKey);
  if (!src) {
    return <span className={`visual-icon icon-${assetKey} ${className}`} aria-hidden="true" />;
  }
  return <img className={`visual-asset ${className}`} src={src} alt="" aria-hidden="true" loading="lazy" />;
}

export function getVisualAssetUrl(assetKey: string) {
  return getGeneratedAsset(assetKey);
}
