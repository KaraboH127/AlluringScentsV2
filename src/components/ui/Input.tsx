import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Shared text input control for form consistency across cart and checkout.
 */
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      aria-label={props["aria-label"] ?? props.placeholder}
      className={cn(
        "h-11 w-full border bg-transparent px-3 text-sm outline-none placeholder:text-muted focus:border-gold",
        props.className,
      )}
    />
  );
}
