"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TechUniversitySection() {
  const t = useTranslations("About");

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-5"
      >
        <span
          className="inline-block text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-widest"
          style={{ color: "var(--text-badge)", background: "var(--bg-badge)", border: "1px solid var(--border-badge)" }}
        >
          {t("uniBadge")}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/university-logo.png"
          alt={t("uniName")}
          className="h-20 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-75"
        />
      </motion.div>
    </section>
  );
}
