"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";
import { EMAIL, GITHUB_URL } from "@/data/contact";
import { Section } from "@/components/ui/SectionWrapper";

export function Contact() {
  const { lang } = useLanguage();
  const tx = t[lang].contact;

  const links = [
    { label: tx.email, href: `mailto:${EMAIL}`, value: EMAIL },
    { label: tx.github, href: GITHUB_URL, value: GITHUB_URL.replace("https://", "") },
  ];

  return (
    <Section id="contact" title={tx.title}>
      <p className="mb-6 text-muted">{tx.subtitle}</p>
      <dl className="space-y-3">
        {links.map((link) => (
          <div key={link.label} className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="text-sm text-faint sm:pt-0.5">{link.label}</dt>
            <dd>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="break-all underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
