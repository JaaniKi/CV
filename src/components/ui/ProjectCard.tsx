"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { ProjectCover } from "@/components/ui/ProjectMedia";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const linkClass =
  "inline-flex items-center gap-1 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

function ProjectLinks({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  return (
    <>
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {tx.viewCode}
          <ArrowUpRight size={14} />
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {tx.viewDemo}
          <ArrowUpRight size={14} />
        </a>
      )}
    </>
  );
}

export function Highlights({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  if (!project.highlights?.length) return null;
  return (
    <div className="mt-10">
      <h4 className="mb-4 text-sm font-medium text-faint">{tx.system}</h4>
      <ul className="space-y-2.5">
        {project.highlights.map((h) => (
          <li key={h.en} className="flex gap-3 leading-relaxed">
            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
            {h[lang]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Contributions({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  if (!project.contributions?.length) return null;
  return (
    <div className="mt-10">
      <h4 className="mb-5 text-sm font-medium text-faint">{tx.contributions}</h4>
      <ol className="space-y-5">
        {project.contributions.map((c, i) => (
          <li key={c.title.en} className="grid grid-cols-[2rem_1fr] leading-relaxed">
            <span className="pt-0.5 font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-medium">{c.title[lang]}</p>
              <p className="mt-1 text-muted">{c.text[lang]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProjectFacts({ project, className }: { project: Project; className?: string }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  return (
    <dl className={cn("space-y-5 text-sm", className)}>
      {project.role && (
        <div>
          <dt className="text-faint">{tx.role}</dt>
          <dd className="mt-1">{project.role[lang]}</dd>
        </div>
      )}
      {project.year && (
        <div>
          <dt className="text-faint">{tx.year}</dt>
          <dd className="mt-1">{project.year}</dd>
        </div>
      )}
      <div>
        <dt className="text-faint">{tx.techStack}</dt>
        <dd className="mt-1 leading-relaxed">{project.techStack.join(", ")}</dd>
      </div>
      {(project.repoUrl || project.liveUrl) && (
        <div>
          <dt className="text-faint">{tx.links}</dt>
          <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <ProjectLinks project={project} />
          </dd>
          {project.liveNote && (
            <dd className="mt-1.5 text-xs text-faint">{project.liveNote[lang]}</dd>
          )}
        </div>
      )}
    </dl>
  );
}

/** Iso esittely: leveä kansi ja kuvaus + tiedot kahdessa sarakkeessa. */
export function FeaturedProject({ project, index, onOpen }: ProjectCardProps) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;

  return (
    <motion.article {...reveal} className="group">
      <button
        onClick={() => onOpen(project)}
        aria-label={`${tx.details}: ${project.title}`}
        className="block aspect-video w-full overflow-hidden rounded-md border border-rule"
      >
        <ProjectCover project={project} index={index} large />
      </button>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_15rem] md:gap-12">
        <div>
          {project.context && <p className="mb-3 text-sm text-faint">{project.context[lang]}</p>}
          <h3 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            <button onClick={() => onOpen(project)} className="text-left transition-colors hover:text-accent">
              {project.title}
            </button>
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.longDescription[lang]}</p>
          <Contributions project={project} />
        </div>

        <ProjectFacts
          project={project}
          className="md:sticky md:top-24 md:self-start md:border-l md:border-rule md:pl-6"
        />
      </div>
    </motion.article>
  );
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;

  return (
    <motion.article {...reveal} className="group">
      <button
        onClick={() => onOpen(project)}
        aria-label={`${tx.details}: ${project.title}`}
        className="block aspect-[16/10] w-full overflow-hidden rounded-md border border-rule"
      >
        <ProjectCover project={project} index={index} />
      </button>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl font-semibold">
          <button onClick={() => onOpen(project)} className="text-left transition-colors hover:text-accent">
            {project.title}
          </button>
        </h3>
        {project.year && <span className="text-sm tabular-nums text-faint">{project.year}</span>}
      </div>
      <p className="mt-2 leading-relaxed text-muted">{project.description[lang]}</p>
      <p className="mt-3 font-mono text-xs text-faint">{project.techStack.join(" · ")}</p>
      <div className="mt-3 flex gap-4 text-sm">
        <ProjectLinks project={project} />
      </div>
      {project.liveNote && <p className="mt-1.5 text-xs text-faint">{project.liveNote[lang]}</p>}
    </motion.article>
  );
}
