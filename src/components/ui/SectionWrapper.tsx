import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  // stacked: otsikko sisällön yläpuolella koko leveydellä (projektit)
  stacked?: boolean;
}

export function Section({ id, title, children, stacked = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-rule py-16 sm:py-20",
        !stacked && "md:grid md:grid-cols-[13rem_1fr] md:gap-12"
      )}
    >
      <h2
        className={cn(
          "font-serif font-semibold tracking-tight",
          stacked ? "mb-12 text-3xl sm:text-4xl" : "mb-8 text-2xl md:mb-0"
        )}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
