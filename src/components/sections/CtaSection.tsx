"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import StoreButtons from "@/components/StoreButtons";
import PhoneFrame from "@/components/PhoneFrame";

export default function CtaSection() {
  const t = useTranslations("Cta");
  const tBrand = useTranslations("Brand");
  const reduce = useReducedMotion();

  return (
    <section id="download" className="w-full px-2 sm:px-3 pt-8 pb-3 scroll-mt-20">
      <div
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem]"
        style={{
          background: "radial-gradient(90% 120% at 85% 110%, #1f3a7a 0%, #13152A 55%)",
          border: "1px solid rgba(223,188,244,0.12)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(223,188,244,0.05) 1px, transparent 1px)",
            backgroundSize: "88px 100%",
          }}
        />
        <div aria-hidden="true" className="surface-grain absolute inset-0 pointer-events-none !opacity-[0.1]" />
        <span
          aria-hidden="true"
          className="wordmark top-[0.04em] opacity-[0.07]"
          style={{ fontSize: "clamp(6rem, 22vw, 20rem)", color: "#DFBCF4", maskImage: "linear-gradient(to bottom, black, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)" }}
        >
          {tBrand("name")}
        </span>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-12 grid md:grid-cols-[1.2fr_1fr] items-end gap-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pt-16 md:py-24 flex flex-col items-center md:items-start text-center md:text-start"
          >
            <h2
              className="font-heading font-semibold tracking-[-0.045em] leading-[1.02] text-balance text-white mb-5"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              {t("title")}
            </h2>
            <p className="text-lg mb-10 text-white/65">{t("subtext")}</p>
            <StoreButtons tone="light" />
          </motion.div>

          <motion.div
            initial={reduce ? false : { y: 120, rotate: 4 }}
            whileInView={{ y: 0, rotate: 4 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            className="relative mx-auto h-[300px] md:h-[400px] w-[230px] md:w-[260px]"
          >
            <PhoneFrame
              src="/screenshots/events.png"
              alt="Nawah calendar"
              sizes="260px"
              className="absolute top-0 inset-x-0 w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
