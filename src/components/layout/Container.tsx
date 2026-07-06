import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/**
 * Width-constrained wrapper used across sections to maintain consistent
 * editorial rhythm and horizontal spacing.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
