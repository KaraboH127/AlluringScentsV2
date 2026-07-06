import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Shared select control, primarily used for fragrance size selection.
 */
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full border bg-transparent px-3 text-sm text-muted outline-none focus:border-gold",
        props.className,
      )}
    />
  );
}
