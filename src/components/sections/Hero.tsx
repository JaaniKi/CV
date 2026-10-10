"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { EMAIL, GITHUB_URL } from "@/data/contact";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { lang } = useLanguage();
  const tx = t[lang].hero;

  const links = [
    { label: EMAIL, href: `mailto:${EMAIL}` },
    { label: "GitHub", href: GITHUB_URL },
  ];

  return (
    <section className="pb-20 pt-36 sm:pb-28 sm:pt-48">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="font-serif text-6xl font-semibold leading-[0.95] tracking-tight sm:text-8xl"
      >
        Jaani
        <br />
        Kivivasara
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-[1fr_auto] sm:gap-16"
      >
        <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{tx.intro}</p>
        <ul className="space-y-1.5 text-sm sm:text-right">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowUpRight size={14} className="text-faint" />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
