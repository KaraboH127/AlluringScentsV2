import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/**
 * Optional bordered surface primitive.
 *
 * Kept intentionally minimal because the design system avoids unnecessary
 * heavy card styling.
 */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border border-[#222] bg-[#111]", className)}>{children}</div>;
}
