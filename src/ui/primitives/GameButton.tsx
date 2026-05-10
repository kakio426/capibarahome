import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type GameButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type GameButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GameButtonVariant;
  fullWidth?: boolean;
}>;

export function GameButton({ children, className = "", variant = "primary", fullWidth = false, ...props }: GameButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    "ui-button",
    `ui-button--${variant}`,
    "game-button",
    `game-button--${variant}`,
    fullWidth ? "btn-full ui-button--full game-button--full" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      data-ui-critical="button"
      {...props}
    >
      {children}
    </button>
  );
}
