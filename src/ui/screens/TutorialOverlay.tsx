import { TutorialConfig } from "../../config/TutorialConfig";
import { setGameState, useGameStore } from "../../state/useGameStore";
import { completeTutorial, nextTutorialStep, previousTutorialStep, shouldShowTutorial } from "../../systems/TutorialManager";
import { Button } from "../components/Button";

export function TutorialOverlay() {
  const state = useGameStore((snapshot) => snapshot);
  if (!shouldShowTutorial(state)) return null;
  const step = TutorialConfig.steps[state.tutorial.step] ?? TutorialConfig.steps[0];

  return (
    <aside className="tutorial-overlay" role="dialog" aria-live="polite">
      <span className="tutorial-step">{state.tutorial.step + 1} / {TutorialConfig.steps.length}</span>
      <h2>{step.title}</h2>
      <p>{step.body}</p>
      <div className="tutorial-actions">
        <Button variant="ghost" disabled={state.tutorial.step === 0} onClick={() => setGameState((current) => previousTutorialStep(current))}>이전</Button>
        <Button variant="secondary" onClick={() => setGameState((current) => completeTutorial(current))}>건너뛰기</Button>
        <Button onClick={() => setGameState((current) => nextTutorialStep(current))}>다음</Button>
      </div>
    </aside>
  );
}
