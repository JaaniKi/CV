"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { skills } from "@/data/skills";
import { Section } from "@/components/ui/SectionWrapper";
import type { SkillCategory } from "@/lib/types";

const categories: SkillCategory[] = [
  "languages",
  "frontend",
  "backend",
  "ai",
  "databases",
  "cloud",
  "tools",
];

export function Skills() {
  const { lang } = useLanguage();
  const tx = t[lang].skills;

  return (
    <Section id="skills" title={tx.title}>
      <dl className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="sm:grid sm:grid-cols-[13rem_1fr] sm:gap-4">
            <dt className="text-sm text-faint sm:pt-0.5">{tx.categories[category]}</dt>
            <dd>
              {skills
                .filter((s) => s.category === category)
                .map((s) => s.name)
                .join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
