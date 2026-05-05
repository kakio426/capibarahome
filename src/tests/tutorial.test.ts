import { describe, expect, it } from "vitest";
import { completeTutorial, nextTutorialStep, restartTutorial, shouldShowTutorial } from "../systems/TutorialManager";
import { makeState } from "./testUtils";

describe("tutorial state", () => {
  it("shows for new users and completes after final step", () => {
    let state = makeState();
    expect(shouldShowTutorial(state)).toBe(true);
    state = nextTutorialStep(state);
    state = nextTutorialStep(state);
    state = nextTutorialStep(state);
    expect(state.tutorial.completed).toBe(true);
    expect(shouldShowTutorial(state)).toBe(false);
  });

  it("can restart from settings", () => {
    const completed = completeTutorial(makeState());
    const restarted = restartTutorial(completed);
    expect(restarted.tutorial.completed).toBe(false);
    expect(restarted.tutorial.step).toBe(0);
    expect(restarted.tutorial.visible).toBe(true);
  });
});
