"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { hasWork } from "@/data/experience";
import { cn } from "@/lib/utils";

export function NavBar() {
  const { lang, toggleLang } = useLanguage();
  const tx = t[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "projects", label: tx.projects },
    { id: "about", label: tx.about },
    { id: "experience", label: hasWork ? tx.experience : t[lang].experience.education },
    { id: "skills", label: tx.skills },
    { id: "contact", label: tx.contact },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const langToggle = (
    <button
      onClick={toggleLang}
      className="text-sm text-faint transition-colors hover:text-ink"
      aria-label={lang === "fi" ? "Switch to English" : "Vaihda suomeksi"}
    >
      <span className={cn(lang === "en" && "text-ink")}>EN</span>
      {" / "}
      <span className={cn(lang === "fi" && "text-ink")}>FI</span>
    </button>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-colors",
        scrolled || isOpen ? "border-rule" : "border-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif font-semibold"
        >
          Jaani Kivivasara
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </button>
          ))}
          {langToggle}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {langToggle}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={isOpen}
            className="text-muted"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="py-2 text-left text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
