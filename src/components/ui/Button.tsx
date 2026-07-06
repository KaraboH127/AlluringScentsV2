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
        variant === "primary" && "border-[#C9A227] bg-[#C9A227] text-black hover:bg-transparent hover:text-[#C9A227]",
        variant === "secondary" && "border-white text-white hover:border-[#C9A227] hover:text-[#C9A227]",
        variant === "ghost" && "border-[#2A2A2A] text-white hover:border-[#C9A227] hover:text-[#C9A227]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
