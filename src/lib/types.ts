export type Lang = "fi" | "en";

export interface BilingualText {
  fi: string;
  en: string;
}

export type ProjectMedia =
  // Kuva public-kansiosta, esim. "/projects/music-quiz/lobby.png"
  | { type: "image"; src: string; alt?: string }
  // Oma videotiedosto public-kansiosta, esim. "/projects/music-quiz/demo.mp4"
  | { type: "video"; src: string; poster?: string }
  // YouTube-video, id on osoitteen v=-parametri
  | { type: "youtube"; id: string }
  // Live-sovellus upotettuna iframeen
  | { type: "embed"; url: string };

export interface Project {
  id: string;
  title: string;
  year?: string;
  // Lyhyt taustatieto, esim. kurssi ja asiakas
  context?: BilingualText;
  description: BilingualText;
  longDescription: BilingualText;
  // Oma rooli tiimissä, esim. "Junior-kehittäjä, pääosin backend"
  role?: BilingualText;
  // Mitä tein itse: näkyy esittelyssä ja projekti-ikkunassa
  contributions?: { title: BilingualText; text: BilingualText }[];
  // Koko järjestelmän tekniset kohokohdat: näkyy projekti-ikkunassa
  highlights?: BilingualText[];
  // Kansikuva, joka näkyy vain projektikortissa (ei galleriassa).
  // Jos puuttuu, kansi on media-listan ensimmäinen.
  cover?: { src: string; alt?: string };
  // Projekti-ikkunan galleria
  media?: ProjectMedia[];
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  // Lyhyt huomautus live-linkin viereen, esim. hidas käynnistys
  liveNote?: BilingualText;
  featured: boolean;
}

// Pienempi projekti, joka näytetään tiiviissä listassa ilman kuvia
export interface MinorProject {
  id: string;
  title: string;
  year?: string;
  description: BilingualText;
  techStack: string[];
  links: { label: BilingualText; url: string }[];
}

export type SkillCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "ai"
  | "databases"
  | "cloud"
  | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ExperienceEntry {
  id: string;
  role: BilingualText;
  organization: string;
  period: string;
  type: "work" | "education";
  description?: BilingualText;
  tech?: string[];
}
