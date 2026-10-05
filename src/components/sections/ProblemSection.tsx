"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Images, ListChecks, MessageCircle, StickyNote } from "lucide-react";
import logoImg from "@/app/logo.png";

export default function ProblemSection() {
  const t = useTranslations("Problem");
  const tBrand = useTranslations("Brand");
  const locale = useLocale();
  const isAr = locale === "ar";

  const apps = [
    { name: t("chat"), Icon: MessageCircle },
    { name: t("calendar"), Icon: CalendarDays },
    { name: t("notes"), Icon: StickyNote },
    { name: t("photos"), Icon: Images },
    { name: t("tasks"), Icon: ListChecks },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-8 md:p-14"
        style={{ background: "var(--bg-card-alt)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance"
            style={{ color: "var(--text-1)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto text-balance leading-relaxed"
            style={{ color: "var(--text-3)" }}
          >
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
          {/* Scattered apps */}
          <div className="flex flex-wrap justify-center gap-4">
            {apps.map(({ name, Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2 w-16">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--bg-page)", border: "1px solid var(--border-subtle)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "var(--text-4)" }} strokeWidth={1.75} />
                </div>
                <span className="text-xs" style={{ color: "var(--text-4)" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          <ArrowRight
            className={`w-6 h-6 flex-shrink-0 rotate-90 ${isAr ? "md:rotate-180" : "md:rotate-0"}`}
            style={{ color: "var(--text-5)" }}
            aria-hidden="true"
          />

          {/* Nawah */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-[1.4rem] overflow-hidden" style={{ boxShadow: "0 10px 30px -10px rgba(39,137,211,0.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoImg.src} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              {tBrand("name")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
