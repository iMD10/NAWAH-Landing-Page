"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import StoreButtons from "@/components/StoreButtons";

export default function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl px-8 py-14 md:p-16 flex flex-col items-center text-center"
        style={{ background: "linear-gradient(160deg, #13152A 0%, #1b2a55 100%)", border: "1px solid var(--border-blue)" }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance text-white">
          {t("title")}
        </h2>
        <p className="text-lg mb-10 text-white/70">{t("subtext")}</p>
        <StoreButtons tone="light" />
      </motion.div>
    </section>
  );
}
