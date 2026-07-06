import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

/**
 * Brand-consistent button primitive.
 *
 * Variants centralize action styling so marketing and commerce actions stay
 * visually coherent across the application.
 */
export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border px-5 py-3 text-sm uppercase tracking-[0.16em] transition",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
