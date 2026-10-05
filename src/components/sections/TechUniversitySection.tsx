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
        <p className="text-sm" style={{ color: "var(--text-4)" }}>
          {t("uniBadge")}
        </p>
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
