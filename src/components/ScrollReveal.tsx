import type { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
