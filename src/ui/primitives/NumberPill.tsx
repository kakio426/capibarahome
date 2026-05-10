import { PropsWithChildren } from "react";

type NumberPillProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export function NumberPill({ label, children, className = "" }: NumberPillProps) {
  return (
    <div className={`number-pill ${className}`.trim()} data-ui-critical="number-pill">
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  );
}
