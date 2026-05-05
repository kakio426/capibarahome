import { BigNumberInput, BigNumberLite } from "./BigNumberLite";

export function formatNumber(value: BigNumberInput, style: "short" | "scientific" = "short") {
  return BigNumberLite.from(value).format(style);
}

export function formatDuration(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const sec = safe % 60;
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  if (minutes > 0) return `${minutes}분 ${sec}초`;
  return `${sec}초`;
}
