"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { cn } from "@/lib/utils";
import { MediaView, MediaThumb } from "@/components/ui/ProjectMedia";
import { Contributions, Highlights, ProjectFacts } from "@/components/ui/ProjectCard";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
        >
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            exit={{ y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-5xl overflow-y-auto rounded-md bg-paper shadow-2xl"
          >
            <ModalContent key={project.id} project={project} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  const media = project.media ?? [];
  const [active, setActive] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = (dir: number) => setActive((i) => (i + dir + media.length) % media.length);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (media.length > 1 && e.key === "ArrowLeft") step(-1);
      if (media.length > 1 && e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, media.length]);

  return (
    <>
      <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6">
        <h3 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={tx.close}
          className="-m-1 p-1 text-faint transition-colors hover:text-ink"
        >
          <X size={22} />
        </button>
      </div>

      {media.length > 0 && (
        <div className="bg-black">
          <div className="relative aspect-video w-full">
            <MediaView key={active} item={media[active]} title={project.title} />
            {media.length > 1 && (
              <>
                <GalleryArrow side="left" label={tx.previous} onClick={() => step(-1)} />
                <GalleryArrow side="right" label={tx.next} onClick={() => step(1)} />
              </>
            )}
          </div>
        </div>
      )}

      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-5 pt-4 sm:px-8">
          {media.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`${tx.showMedia} ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-video w-24 shrink-0 overflow-hidden rounded-sm bg-tint-1 transition-opacity",
                i === active ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"
              )}
            >
              <MediaThumb item={item} />
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[1fr_14rem] md:gap-12">
        <div>
          {project.context && <p className="mb-3 text-sm text-faint">{project.context[lang]}</p>}
          <p className="text-lg leading-relaxed text-muted">{project.longDescription[lang]}</p>
          <Contributions project={project} />
          <Highlights project={project} />
        </div>
        <ProjectFacts project={project} className="md:sticky md:top-0 md:self-start" />
      </div>
    </>
  );
}

function GalleryArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 rounded-full bg-paper/85 p-2 text-ink shadow transition hover:bg-paper",
        side === "left" ? "left-3" : "right-3"
      )}
    >
      <Icon size={20} />
    </button>
  );
}
