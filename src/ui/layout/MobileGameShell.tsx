import { PropsWithChildren, ReactNode } from "react";

type MobileGameShellProps = PropsWithChildren<{
  top: ReactNode;
  bottom: ReactNode;
  overlays?: ReactNode;
  tutorialTarget?: string;
  soundMuted: boolean;
  effectsEnabled: boolean;
  lastActionKind: string;
  toastVisible: boolean;
}>;

export function MobileGameShell({
  top,
  bottom,
  overlays,
  children,
  tutorialTarget,
  soundMuted,
  effectsEnabled,
  lastActionKind,
  toastVisible,
}: MobileGameShellProps) {
  return (
    <div className="app-frame ui-game-frame rc20-app-frame">
      <div
        className="game-shell ui-game-shell rc20-game-shell"
        data-tutorial-active-target={tutorialTarget}
        data-sound-muted={soundMuted ? "true" : "false"}
        data-effects-enabled={effectsEnabled ? "true" : "false"}
        data-last-action-kind={lastActionKind}
        data-toast-visible={toastVisible ? "true" : "false"}
      >
        {top}
        <div className="content-shell rc20-content-shell">
          {children}
        </div>
        {bottom}
        {overlays}
      </div>
    </div>
  );
}
