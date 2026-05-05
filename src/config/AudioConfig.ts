export type AudioToneSpec = {
  frequency: number;
  secondFrequency?: number;
  duration: number;
  gain: number;
  type: OscillatorType;
};

export type AudioSlotName =
  | "tap"
  | "purchase"
  | "achievement"
  | "quest"
  | "offlineReward"
  | "prestige"
  | "error"
  | "navigation"
  | "ad";

export type AudioSlot = {
  id: AudioSlotName;
  label: string;
  fileSrc: string | null;
  fallbackTone: AudioToneSpec;
  requiredForStore: boolean;
  licenseStatus: "synthetic_tone" | "needs_final_asset" | "cleared";
};

export const AudioConfig: { slots: Record<AudioSlotName, AudioSlot> } = {
  slots: {
    tap: {
      id: "tap",
      label: "터치 수확",
      fileSrc: null,
      fallbackTone: { frequency: 520, secondFrequency: 690, duration: 0.055, gain: 0.035, type: "sine" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    purchase: {
      id: "purchase",
      label: "구매 성공",
      fileSrc: null,
      fallbackTone: { frequency: 420, secondFrequency: 760, duration: 0.11, gain: 0.045, type: "triangle" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    achievement: {
      id: "achievement",
      label: "업적 수령",
      fileSrc: null,
      fallbackTone: { frequency: 620, secondFrequency: 980, duration: 0.18, gain: 0.05, type: "triangle" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    quest: {
      id: "quest",
      label: "퀘스트 보상",
      fileSrc: null,
      fallbackTone: { frequency: 540, secondFrequency: 820, duration: 0.14, gain: 0.044, type: "triangle" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    offlineReward: {
      id: "offlineReward",
      label: "오프라인 보상",
      fileSrc: null,
      fallbackTone: { frequency: 260, secondFrequency: 520, duration: 0.16, gain: 0.04, type: "sine" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    prestige: {
      id: "prestige",
      label: "환생 완료",
      fileSrc: null,
      fallbackTone: { frequency: 330, secondFrequency: 930, duration: 0.22, gain: 0.05, type: "sine" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    error: {
      id: "error",
      label: "실패 안내",
      fileSrc: null,
      fallbackTone: { frequency: 150, secondFrequency: 110, duration: 0.12, gain: 0.04, type: "sawtooth" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    navigation: {
      id: "navigation",
      label: "탭 이동",
      fileSrc: null,
      fallbackTone: { frequency: 370, secondFrequency: 510, duration: 0.065, gain: 0.024, type: "sine" },
      requiredForStore: true,
      licenseStatus: "synthetic_tone",
    },
    ad: {
      id: "ad",
      label: "광고 보상",
      fileSrc: null,
      fallbackTone: { frequency: 450, secondFrequency: 660, duration: 0.13, gain: 0.035, type: "triangle" },
      requiredForStore: false,
      licenseStatus: "synthetic_tone",
    },
  },
};
