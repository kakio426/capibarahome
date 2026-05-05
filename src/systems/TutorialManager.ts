import { TutorialConfig } from "../config/TutorialConfig";
import { GameState } from "../game/GameTypes";

export function shouldShowTutorial(state: GameState) {
  return !state.tutorial.completed && state.tutorial.visible;
}

export function nextTutorialStep(state: GameState, nowMs = Date.now()): GameState {
  const next = state.tutorial.step + 1;
  if (next >= TutorialConfig.steps.length) {
    return completeTutorial(state, nowMs);
  }
  return {
    ...state,
    updatedAt: nowMs,
    tutorial: {
      ...state.tutorial,
      step: next,
      visible: true,
    },
  };
}

export function previousTutorialStep(state: GameState, nowMs = Date.now()): GameState {
  return {
    ...state,
    updatedAt: nowMs,
    tutorial: {
      ...state.tutorial,
      step: Math.max(0, state.tutorial.step - 1),
      visible: true,
    },
  };
}

export function completeTutorial(state: GameState, nowMs = Date.now()): GameState {
  return {
    ...state,
    updatedAt: nowMs,
    tutorial: {
      completed: true,
      step: TutorialConfig.steps.length - 1,
      visible: false,
    },
  };
}

export function restartTutorial(state: GameState, nowMs = Date.now()): GameState {
  return {
    ...state,
    updatedAt: nowMs,
    tutorial: {
      completed: false,
      step: 0,
      visible: true,
    },
  };
}
