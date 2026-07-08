import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export function Skeleton({ className = "", variant = "light", ...props }: SkeletonProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={[
        "skeleton-base",
        isDark ? "skeleton-dark" : "skeleton-light",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
      {...props}
    />
  );
}
