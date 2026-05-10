import { PropsWithChildren } from "react";

export function GamePanel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`panel ui-panel game-panel ${className}`.trim()}>{children}</section>;
}
