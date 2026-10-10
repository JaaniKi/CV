"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { projects, minorProjects } from "@/data/projects";
import { MinorProjects } from "@/components/ui/MinorProjects";
import { FeaturedProject, ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Section } from "@/components/ui/SectionWrapper";
import type { Project } from "@/lib/types";

export function Projects() {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" title={tx.title} stacked>
      <div className="space-y-20">
        {featured.map((project, i) => (
          <FeaturedProject key={project.id} project={project} index={i} onOpen={setOpenProject} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={featured.length + i}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      )}

      <MinorProjects projects={minorProjects} />

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </Section>
  );
}
