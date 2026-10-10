import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  // Ohjelmointikielet
  { name: "C++", category: "languages" },
  { name: "C", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "Scala", category: "languages" },
  { name: "Haskell", category: "languages" },
  { name: "Elm", category: "languages" },

  // Frontend ja käyttöliittymät
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vue", category: "frontend" },
  { name: "Redux", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Qt", category: "frontend" },

  // Backendsj
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Socket.IO", category: "backend" },
  { name: "REST APIs", category: "backend" },

  // Tekoäly ja data
  { name: "RAG", category: "ai" },
  { name: "OpenAI API", category: "ai" },
  { name: "Gemini API", category: "ai" },
  { name: "ChromaDB", category: "ai" },
  { name: "Apache Spark", category: "ai" },

  // Tietokannat
  { name: "PostgreSQL", category: "databases" },
  { name: "MySQL", category: "databases" },
  { name: "MongoDB", category: "databases" },

  // Pilvi ja DevOps
  { name: "Azure", category: "cloud" },
  { name: "Google Cloud Storage", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Netlify", category: "cloud" },
  { name: "Render", category: "cloud" },

  // Työkalut ja menetelmät
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "CMake", category: "tools" },
  { name: "Agile / Scrum", category: "tools" },
];
