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
        "h-11 w-full border border-[#2A2A2A] bg-[#111] px-3 text-sm text-white outline-none focus:border-[#C9A227]",
        props.className,
      )}
    />
  );
}
