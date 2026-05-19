"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const stats = [
  { valueKey: "statsDevelopers", labelKey: "statsDevelopersLabel" },
  { valueKey: "statsMonths", labelKey: "statsMonthsLabel" },
  { valueKey: "statsFeatures", labelKey: "statsFeaturesLabel" },
];

export default function MissionSection() {
  const t = useTranslations("About");

  return (
    <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <blockquote
          className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto"
          style={{ color: "var(--text-1)", textShadow: "0 0 60px var(--border-blue)" }}
        >
          &ldquo;{t("missionQuote")}&rdquo;
        </blockquote>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.valueKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center p-6 rounded-[2rem] text-center"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <span
              className="text-4xl md:text-5xl font-black mb-1"
              style={{ color: "var(--color-blue)", textShadow: "0 0 30px var(--border-blue)" }}
            >
              {t(stat.valueKey)}
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--text-3)" }}>
              {t(stat.labelKey)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
