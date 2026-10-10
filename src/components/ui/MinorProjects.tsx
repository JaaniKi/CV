"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import type { MinorProject } from "@/lib/types";

/** Pienemmät projektit tiiviinä listana: nimi, kuvaus, teknologiat ja linkit. */
export function MinorProjects({ projects }: { projects: MinorProject[] }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;

  if (projects.length === 0) return null;

  return (
    <div className="mt-24">
      <h3 className="mb-2 text-sm font-medium text-faint">{tx.minor}</h3>
      <ul className="divide-y divide-rule border-y border-rule">
        {projects.map((project) => (
          <li
            key={project.id}
            className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[12rem_1fr_auto]"
          >
            <div className="flex items-baseline gap-3 md:block">
              <h4 className="font-serif text-lg font-semibold">{project.title}</h4>
              {project.year && (
                <span className="text-sm tabular-nums text-faint md:mt-0.5 md:block">
                  {project.year}
                </span>
              )}
            </div>
            <div>
              <p className="leading-relaxed text-muted">{project.description[lang]}</p>
              <p className="mt-2 font-mono text-xs text-faint">{project.techStack.join(" · ")}</p>
            </div>
            <div className="flex gap-4 text-sm md:flex-col md:items-end md:gap-1 md:pt-0.5">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 whitespace-nowrap underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {link.label[lang]}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
