export const now = () => Date.now();

export function clampDelta(deltaMs: number, maxMs: number) {
  return Math.max(0, Math.min(deltaMs, maxMs));
}
