export type SoundName = "tap" | "purchase" | "prestige" | "error" | "ad" | "offline" | "achievement";

let soundMuted = false;
let musicMuted = false;
let audioContext: AudioContext | null = null;
let playCount = 0;
let lastPlayed: SoundName | null = null;

type ToneSpec = {
  frequency: number;
  secondFrequency?: number;
  duration: number;
  gain: number;
  type: OscillatorType;
};

const toneSpecs: Record<SoundName, ToneSpec> = {
  tap: { frequency: 520, secondFrequency: 690, duration: 0.055, gain: 0.035, type: "sine" },
  purchase: { frequency: 420, secondFrequency: 760, duration: 0.11, gain: 0.045, type: "triangle" },
  prestige: { frequency: 330, secondFrequency: 930, duration: 0.22, gain: 0.05, type: "sine" },
  error: { frequency: 150, secondFrequency: 110, duration: 0.12, gain: 0.04, type: "sawtooth" },
  ad: { frequency: 450, secondFrequency: 660, duration: 0.13, gain: 0.035, type: "triangle" },
  offline: { frequency: 260, secondFrequency: 520, duration: 0.16, gain: 0.04, type: "sine" },
  achievement: { frequency: 620, secondFrequency: 980, duration: 0.18, gain: 0.05, type: "triangle" },
};

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  return audioContext;
}

function playTone(name: SoundName) {
  const context = getAudioContext();
  if (!context) return;
  const spec = toneSpecs[name];
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
      void getAudioContext()?.resume();
      playTone(name);
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
    return { soundMuted, musicMuted, playCount, lastPlayed };
  },
};
