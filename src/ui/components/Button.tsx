import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}>;

export function Button({ children, className = "", variant = "primary", fullWidth = false, ...props }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}${fullWidth ? " btn-full" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
