"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Globe } from "lucide-react";
import type { Project, ProjectMedia } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { assetPath, cn } from "@/lib/utils";

const tints = ["bg-tint-1", "bg-tint-2", "bg-tint-3"];

const zoom = "transition-transform duration-700 ease-out group-hover:scale-[1.025]";

const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Typografinen kansi, kun kuvaa tai videota ei ole (tai tiedostoa ei vielä löydy). */
function Placeholder({ title, index, large }: { title: string; index: number; large: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-between p-6 sm:p-8",
        tints[index % tints.length]
      )}
    >
      <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={cn(
          "origin-bottom-left font-serif font-semibold leading-none tracking-tight text-ink/85",
          zoom,
          large ? "text-5xl sm:text-7xl" : "text-4xl"
        )}
      >
        {title}
      </span>
    </div>
  );
}

/** Projektin kansi: erillinen cover-kuva, muuten ensimmäinen media, tai paikkamerkki. */
export function ProjectCover({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  const media = project.media ?? [];
  const [failed, setFailed] = useState(false);
  const coverItem: ProjectMedia | undefined = project.cover
    ? { type: "image", ...project.cover }
    : media[0];
  const cover = failed ? undefined : coverItem;
  const onError = () => setFailed(true);

  // Staattisella sivulla video voi epäonnistua ennen kuin React ehtii kiinnittää onErrorin
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (v && (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) setFailed(true);
  }, []);

  let content;
  switch (cover?.type) {
    case "image":
      content = (
        <Image
          src={assetPath(cover.src)}
          alt={cover.alt ?? project.title}
          fill
          onError={onError}
          className={cn("object-cover", zoom)}
          sizes={large ? "(max-width: 1024px) 100vw, 1024px" : "(max-width: 640px) 100vw, 50vw"}
        />
      );
      break;
    case "video":
      content = (
        <video
          ref={videoRef}
          src={assetPath(cover.src)}
          poster={cover.poster ? assetPath(cover.poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          onError={onError}
          className={cn("h-full w-full object-cover", zoom)}
        />
      );
      break;
    case "youtube":
      content = (
        <Image
          src={youtubeThumb(cover.id)}
          alt={project.title}
          fill
          unoptimized
          onError={onError}
          className={cn("object-cover", zoom)}
        />
      );
      break;
    default:
      content = <Placeholder title={project.title} index={index} large={large} />;
  }

  // Merkki kertoo, että galleriassa on video tai live-demo, jota kansi ei jo näytä
  const others = project.cover ? media : media.slice(1);
  const badge =
    cover?.type === "youtube" || others.some((m) => m.type === "video" || m.type === "youtube")
      ? { icon: Play, label: tx.video }
      : others.some((m) => m.type === "embed") || cover?.type === "embed"
        ? { icon: Globe, label: tx.liveDemo }
        : null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {content}
      {badge && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
          <badge.icon size={12} className="fill-current" />
          {badge.label}
        </span>
      )}
    </div>
  );
}

/** Yksi media täysikokoisena galleriassa. */
export function MediaView({ item, title }: { item: ProjectMedia; title: string }) {
  const [failed, setFailed] = useState(false);
  const onError = () => setFailed(true);

  if (failed) return <Placeholder title={title} index={0} large />;

  switch (item.type) {
    case "image":
      return (
        <Image
          src={assetPath(item.src)}
          alt={item.alt ?? title}
          fill
          onError={onError}
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      );
    case "video":
      return (
        <video
          src={assetPath(item.src)}
          poster={item.poster ? assetPath(item.poster) : undefined}
          controls
          autoPlay
          playsInline
          onError={onError}
          className="h-full w-full object-contain"
        />
      );
    case "youtube":
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full border-0"
        />
      );
    case "embed":
      return (
        <iframe
          src={item.url}
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="h-full w-full border-0 bg-white"
        />
      );
  }
}

/** Pieni esikatselu gallerian valintariviin. */
export function MediaThumb({ item }: { item: ProjectMedia }) {
  // Puuttuva tiedosto: jätetään pelkkä taustaväri rikkinäisen kuvan sijaan
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const onError = () => setFailed(true);

  switch (item.type) {
    case "image":
      return (
        <Image src={assetPath(item.src)} alt="" fill onError={onError} className="object-cover" sizes="96px" />
      );
    case "youtube":
      return (
        <>
          <Image src={youtubeThumb(item.id)} alt="" fill unoptimized className="object-cover" />
          <ThumbIcon icon={Play} />
        </>
      );
    case "video":
      return (
        <>
          {item.poster ? (
            <Image src={assetPath(item.poster)} alt="" fill className="object-cover" sizes="96px" />
          ) : (
            <video src={assetPath(item.src)} muted preload="metadata" className="h-full w-full object-cover" />
          )}
          <ThumbIcon icon={Play} />
        </>
      );
    case "embed":
      return <ThumbIcon icon={Globe} />;
  }
}

function ThumbIcon({ icon: Icon }: { icon: typeof Play }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
      <Icon size={16} />
    </span>
  );
}
