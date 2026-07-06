import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Vertical spacing primitive for route sections.
 *
 * Combines semantic section markup with shared spacing and the Container
 * wrapper so page components can focus on content composition.
 */
export function Section({ children, className, containerClassName }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
