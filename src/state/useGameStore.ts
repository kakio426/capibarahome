import { useSyncExternalStore } from "react";
import { GameState } from "../game/GameTypes";
import { createInitialState } from "./initialState";

type Listener = () => void;

let state: GameState = createInitialState();
const listeners = new Set<Listener>();

export function getGameState() {
  return state;
}

export function setGameState(next: GameState | ((current: GameState) => GameState)) {
  state = typeof next === "function" ? next(state) : next;
  listeners.forEach((listener) => listener());
}

export function patchGameState(patch: Partial<GameState>) {
  setGameState((current) => ({ ...current, ...patch }));
}

export function resetGameState(nowMs = Date.now()) {
  setGameState(createInitialState(nowMs));
}

export function subscribeGameStore(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useGameStore<T>(selector: (state: GameState) => T) {
  return useSyncExternalStore(subscribeGameStore, () => selector(state), () => selector(state));
}
