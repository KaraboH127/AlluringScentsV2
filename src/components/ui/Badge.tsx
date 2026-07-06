import type { ReactNode } from "react";

/**
 * Lightweight label primitive used for collection/category emphasis.
 */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex border border-[#C9A227]/50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#C9A227]">
      {children}
    </span>
  );
}
