import { PropsWithChildren } from "react";
import { GamePanel } from "../primitives/GamePanel";

export function Panel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <GamePanel className={`ui-panel--parchment ${className}`.trim()}>{children}</GamePanel>;
}
