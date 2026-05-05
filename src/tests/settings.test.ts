import { describe, expect, it } from "vitest";
import { SaveManager } from "../systems/SaveManager";
import { updateSetting, setNumberFormat } from "../systems/SettingsManager";
import { makeState, MemoryStorage } from "./testUtils";

describe("settings", () => {
  it("toggles settings and persists through save/load", () => {
    const storage = new MemoryStorage();
    let state = makeState();
    state = updateSetting(state, "effectsEnabled", false);
    state = updateSetting(state, "soundMuted", true);
    state = updateSetting(state, "musicMuted", true);
    state = updateSetting(state, "vibrationEnabled", false);
    state = setNumberFormat(state, "scientific");
    SaveManager.saveToStorage(state, storage, 2_000);
    const loaded = SaveManager.loadFromStorage(storage, 3_000);
    expect(loaded.ok).toBe(true);
    if (loaded.ok) {
      expect(loaded.state.settings.effectsEnabled).toBe(false);
      expect(loaded.state.settings.soundMuted).toBe(true);
      expect(loaded.state.settings.musicMuted).toBe(true);
      expect(loaded.state.settings.vibrationEnabled).toBe(false);
      expect(loaded.state.settings.numberFormat).toBe("scientific");
    }
  });
});
