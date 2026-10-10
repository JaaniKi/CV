"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { Section } from "@/components/ui/SectionWrapper";

export function About() {
  const { lang } = useLanguage();
  const tx = t[lang].about;

  return (
    <Section id="about" title={tx.title}>
      <div className="space-y-4 leading-relaxed text-muted">
        {tx.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
