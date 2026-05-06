import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}>;

export function Button({ children, className = "", variant = "primary", fullWidth = false, ...props }: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    "ui-button",
    `ui-button--${variant}`,
    fullWidth ? "btn-full ui-button--full" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
