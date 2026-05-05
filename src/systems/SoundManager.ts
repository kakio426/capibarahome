import { AudioConfig, AudioSlotName } from "../config/AudioConfig";

export type SoundName = AudioSlotName;

let soundMuted = false;
let musicMuted = false;
let audioContext: AudioContext | null = null;
const fileCache = new Map<SoundName, HTMLAudioElement>();
let playCount = 0;
let lastPlayed: SoundName | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  return audioContext;
}

function playFile(name: SoundName) {
  const slot = AudioConfig.slots[name];
  if (!slot.fileSrc || typeof Audio === "undefined") return false;
  let audio = fileCache.get(name);
  if (!audio) {
    audio = new Audio(slot.fileSrc);
    audio.preload = "auto";
    fileCache.set(name, audio);
  }
  audio.currentTime = 0;
  audio.volume = Math.min(1, Math.max(0, slot.fallbackTone.gain * 9));
  void audio.play();
  return true;
}

function playTone(name: SoundName) {
  const context = getAudioContext();
  if (!context) return;
  const spec = AudioConfig.slots[name].fallbackTone;
  const start = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = spec.type;
  oscillator.frequency.setValueAtTime(spec.frequency, start);
  if (spec.secondFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(spec.secondFrequency, start + spec.duration * 0.72);
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(spec.gain, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + spec.duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + spec.duration + 0.02);
}

export const SoundManager = {
  play(name: SoundName) {
    if (soundMuted) return;
    playCount += 1;
    lastPlayed = name;
    try {
      if (!playFile(name)) {
        void getAudioContext()?.resume();
        playTone(name);
      }
    } catch (error) {
      console.warn("[sound] playback skipped", error);
    }
  },

  setSoundMuted(value: boolean) {
    soundMuted = value;
  },

  setMusicMuted(value: boolean) {
    musicMuted = value;
  },

  getState() {
    return {
      soundMuted,
      musicMuted,
      playCount,
      lastPlayed,
      slots: Object.keys(AudioConfig.slots) as SoundName[],
      fileReadySlots: Array.from(fileCache.keys()),
    };
  },
};
