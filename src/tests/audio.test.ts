import { describe, expect, it } from "vitest";
import { AudioConfig, AudioSlotName } from "../config/AudioConfig";
import { SoundManager } from "../systems/SoundManager";

describe("audio readiness", () => {
  it("defines all store-critical effect slots with tone fallbacks", () => {
    const requiredSlots: AudioSlotName[] = [
      "tap",
      "purchase",
      "achievement",
      "quest",
      "offlineReward",
      "prestige",
      "error",
      "navigation",
    ];

    for (const slotName of requiredSlots) {
      const slot = AudioConfig.slots[slotName];
      expect(slot, slotName).toBeDefined();
      expect(slot.requiredForStore, slotName).toBe(true);
      expect(slot.licenseStatus, slotName).toBe("synthetic_tone");
      expect(slot.fileSrc, slotName).toBeNull();
      expect(Number.isFinite(slot.fallbackTone.frequency), slotName).toBe(true);
      expect(slot.fallbackTone.duration, slotName).toBeGreaterThan(0);
      expect(slot.fallbackTone.gain, slotName).toBeGreaterThan(0);
    }
  });

  it("connects sound and music mute state to the audio layer", () => {
    SoundManager.setSoundMuted(false);
    SoundManager.setMusicMuted(false);
    const before = SoundManager.getState().playCount;

    SoundManager.play("navigation");
    expect(SoundManager.getState().lastPlayed).toBe("navigation");
    expect(SoundManager.getState().playCount).toBe(before + 1);

    SoundManager.setSoundMuted(true);
    SoundManager.play("tap");
    expect(SoundManager.getState().lastPlayed).toBe("navigation");
    expect(SoundManager.getState().playCount).toBe(before + 1);

    SoundManager.setMusicMuted(true);
    expect(SoundManager.getState().musicMuted).toBe(true);
    SoundManager.setSoundMuted(false);
    SoundManager.setMusicMuted(false);
  });
});
