import { getRasterAsset } from "../../assets/raster/RasterAssetRegistry";

type RasterAssetImageProps = {
  assetKey: string;
  className?: string;
  alt?: string;
};

export function RasterAssetImage({ assetKey, className = "", alt = "" }: RasterAssetImageProps) {
  const src = getRasterAsset(assetKey);
  if (!src) return null;
  return <img className={`raster-asset ${className}`} src={src} alt={alt} loading="lazy" />;
}

export function getRasterAssetUrl(assetKey: string) {
  return getRasterAsset(assetKey);
}
