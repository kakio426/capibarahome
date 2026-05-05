import { GameConfig } from "../config/GameConfig";
import { clampDelta } from "../core/time";
import { advanceGameState } from "./GameEngine";
import { getGameState, setGameState } from "../state/useGameStore";

export class GameLoop {
  private rafId: number | null = null;
  private lastMs = 0;
  private accumulatedMs = 0;
  private running = false;
  private visibilityHandler = () => this.handleVisibility();

  start() {
    if (this.running || typeof window === "undefined") return;
    this.running = true;
    this.lastMs = performance.now();
    document.addEventListener("visibilitychange", this.visibilityHandler);
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    document.removeEventListener("visibilitychange", this.visibilityHandler);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  isRunning() {
    return this.running;
  }

  tickForTest(deltaMs: number, nowMs = Date.now()) {
    const clamped = clampDelta(deltaMs, GameConfig.loop.maxDeltaMs);
    setGameState(advanceGameState(getGameState(), clamped, nowMs));
  }

  private tick = (timestamp: number) => {
    if (!this.running) return;
    if (document.visibilityState === "hidden") {
      this.lastMs = timestamp;
      this.accumulatedMs = 0;
      this.rafId = requestAnimationFrame(this.tick);
      return;
    }
    const delta = clampDelta(timestamp - this.lastMs, GameConfig.loop.maxDeltaMs);
    this.lastMs = timestamp;
    this.accumulatedMs += delta;
    if (this.accumulatedMs >= GameConfig.loop.displayUpdateMs) {
      setGameState(advanceGameState(getGameState(), this.accumulatedMs, Date.now()));
      this.accumulatedMs = 0;
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  private handleVisibility() {
    this.lastMs = performance.now();
    this.accumulatedMs = 0;
  }
}
