import { createInitialState } from "../state/initialState";
import { SaveStorage } from "../systems/SaveManager";

export class MemoryStorage implements SaveStorage {
  private readonly data = new Map<string, string>();

  getItem(key: string) {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.data.set(key, value);
  }

  removeItem(key: string) {
    this.data.delete(key);
  }
}

export function makeState(nowMs = 1_700_000_000_000) {
  return createInitialState(nowMs);
}

export function encodePayload(payload: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}
