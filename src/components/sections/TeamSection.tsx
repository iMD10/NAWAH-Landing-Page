"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const memberGradients = [
  "linear-gradient(135deg, #13152A, #2789D3)",
  "linear-gradient(135deg, #2d1b6e, #7c3aed)",
  "linear-gradient(135deg, #0c4a6e, #0ea5e9)",
  "linear-gradient(135deg, #4a1d7a, #a855f7)",
  "linear-gradient(135deg, #1e3a5f, #3b82f6)",
];

const members = [
  {
    id: "muhannad",
    nameEn: "Muhannad Alfawzan",
    nameAr: "مهند الفوزان",
    initials: "MF",
    photo: "/team/muhannad.jpg",
    linkedin: "https://www.linkedin.com/in/muhannad-alfawzan",
    github: "https://github.com/iMD10",
  },
  {
    id: "mohammed-b",
    nameEn: "Mohammed Albulaihy",
    nameAr: "محمد البليهي",
    initials: "MB",
    photo: "/team/mohammed-b.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-albulaihy-8b19b4340/",
    github: "#",
  },
  {
    id: "amer",
    nameEn: "Amer Alsenani",
    nameAr: "عامر السناني",
    initials: "AS",
    photo: "/team/amer.jpg",
    linkedin: "#",
    github: "#",
  },
  {
    id: "eyad",
    nameEn: "Eyad Alarfaj",
    nameAr: "إياد العرفج",
    initials: "EA",
    photo: "/team/eyad.jpg",
    linkedin: "#",
    github: "#",
  },
  {
    id: "mohammed-s",
    nameEn: "Mohammed Alsaif",
    nameAr: "محمد السيف",
    initials: "MS",
    photo: "/team/mohammed-s.jpg",
    linkedin: "#",
    github: "#",
  },
];

function MemberPhoto({
  src,
  name,
  initials,
  gradient,
}: {
  src: string;
  name: string;
  initials: string;
  gradient: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-2"
      style={{
        ringColor: "var(--border-blue)",
        boxShadow: "0 0 0 3px var(--border-blue), 0 8px 32px rgba(39,137,211,0.2)",
      }}
    >
      {!hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-white text-xl font-bold select-none"
          style={{ background: gradient }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span
          className="inline-block text-xs font-bold uppercase mb-4 px-4 py-1.5 rounded-full tracking-widest"
          style={{
            color: "var(--text-badge)",
            background: "var(--bg-badge)",
            border: "1px solid var(--border-badge)",
          }}
        >
          {t("badge")}
        </span>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          style={{ color: "var(--text-1)", textShadow: "0 0 40px var(--border-blue)" }}
        >
          {t("title")}
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          {t("description")}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-5 lg:gap-6">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col items-center gap-4 p-7 rounded-[2rem] w-[200px] transition-all duration-300 hover:-translate-y-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "0 0 0 1px var(--border-blue), 0 8px 40px var(--border-blue)" }}
            />

            <MemberPhoto
              src={member.photo}
              name={locale === "ar" ? member.nameAr : member.nameEn}
              initials={member.initials}
              gradient={memberGradients[i]}
            />

            <h3
              className="text-sm font-bold text-center leading-snug relative z-10"
              style={{ color: "var(--text-1)" }}
            >
              {locale === "ar" ? member.nameAr : member.nameEn}
            </h3>

            <div className="flex gap-2.5 relative z-10">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedinLabel")}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
                style={{
                  background: "var(--bg-badge)",
                  border: "1px solid var(--border-badge)",
                  color: "var(--color-blue)",
                }}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("githubLabel")}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:brightness-110"
                style={{
                  background: "var(--bg-badge)",
                  border: "1px solid var(--border-badge)",
                  color: "var(--text-2)",
                }}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
