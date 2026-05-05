import { GameState, NumberFormatMode } from "../game/GameTypes";

export function updateSetting<K extends keyof GameState["settings"]>(
  state: GameState,
  key: K,
  value: GameState["settings"][K],
  nowMs = Date.now(),
): GameState {
  return {
    ...state,
    updatedAt: nowMs,
    settings: {
      ...state.settings,
      [key]: value,
    },
    lastAction: {
      kind: "save",
      message: "설정이 적용되었습니다.",
      createdAt: nowMs,
    },
  };
}

export function setNumberFormat(state: GameState, value: NumberFormatMode, nowMs = Date.now()) {
  return updateSetting(state, "numberFormat", value, nowMs);
}
