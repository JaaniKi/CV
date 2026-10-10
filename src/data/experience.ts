import type { ExperienceEntry } from "@/lib/types";

// Alan työkokemuksen voi lisätä myöhemmin type: "work" -merkintöinä.
// Kun sellaisia on, osio näyttää Koulutus- ja Työkokemus-alaotsikot automaattisesti.
export const experience: ExperienceEntry[] = [
  {
    id: "edu-msc",
    role: {
      fi: "Tietojenkäsittelytieteiden maisteriopinnot",
      en: "MSc studies, Computer Science",
    },
    organization: "Tampere University",
    period: "2026 – 2028",
    type: "education",
    description: {
      fi: "Pääaine ohjelmistot, sivuaine tekoäly.",
      en: "Major in software, minor in artificial intelligence.",
    },
  },
  {
    id: "edu-bsc",
    role: {
      fi: "Tietojenkäsittelytieteiden kandidaatti",
      en: "BSc, Computer Science",
    },
    organization: "Tampere University",
    period: "2023 – 2026",
    type: "education",
    description: {
      fi: "Sivuaine kauppatieteet.",
      en: "Minor in business studies.",
    },
  },
];

export const hasWork = experience.some((e) => e.type === "work");
