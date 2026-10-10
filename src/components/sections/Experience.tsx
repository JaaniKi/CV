"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { experience, hasWork } from "@/data/experience";
import { Section } from "@/components/ui/SectionWrapper";
import type { ExperienceEntry } from "@/lib/types";

const groups = ["education", "work"] as const;

export function Experience() {
  const { lang } = useLanguage();
  const tx = t[lang].experience;

  // Ilman työkokemusta osio on pelkkä "Koulutus" ilman alaotsikoita
  return (
    <Section id="experience" title={hasWork ? tx.title : tx.education}>
      <div className="space-y-12">
        {groups.map((type) => {
          const entries = experience.filter((e) => e.type === type);
          if (entries.length === 0) return null;
          return (
            <div key={type}>
              {hasWork && (
                <h3 className="mb-6 text-sm font-medium text-faint md:pt-1.5">{tx[type]}</h3>
              )}
              <ol className="space-y-8">
                {entries.map((entry) => (
                  <ExperienceItem key={entry.id} entry={entry} />
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const { lang } = useLanguage();

  return (
    <li>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h4 className="font-medium">{entry.role[lang]}</h4>
        <span className="shrink-0 text-sm tabular-nums text-faint">
          {entry.period}
        </span>
      </div>
      <p className="text-muted">{entry.organization}</p>
      {entry.description && (
        <p className="mt-2 leading-relaxed text-muted">{entry.description[lang]}</p>
      )}
      {entry.tech && entry.tech.length > 0 && (
        <p className="mt-2 font-mono text-xs text-faint">{entry.tech.join(" · ")}</p>
      )}
    </li>
  );
}
