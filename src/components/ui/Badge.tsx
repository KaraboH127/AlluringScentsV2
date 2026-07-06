import type { ReactNode } from "react";

/**
 * Lightweight label primitive used for collection/category emphasis.
 */
export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}
