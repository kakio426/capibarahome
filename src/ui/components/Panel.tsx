import { PropsWithChildren } from "react";

export function Panel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`panel ui-panel ui-panel--parchment ${className}`.trim()}>{children}</section>;
}
