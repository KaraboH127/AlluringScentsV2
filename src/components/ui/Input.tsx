import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/**
 * Shared text input control for form consistency across cart and checkout.
 */
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full border border-[#2A2A2A] bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#8C8C8C] focus:border-[#C9A227]",
        props.className,
      )}
    />
  );
}
