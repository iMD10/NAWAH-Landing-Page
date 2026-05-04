"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import logoImg from "@/app/logo.png";


export default function ProblemSection() {
  const t = useTranslations("Problem");
  const tBrand = useTranslations("Brand");
  const locale = useLocale();
  const isAr = locale === "ar";

  const apps = [
    { name: t("chat"), color: "#4B9EF9", icon: "💬" },
    { name: t("calendar"), color: "#4285F4", icon: "📅" },
    { name: t("notes"), color: "#FFD60A", icon: "📝" },
    { name: t("photos"), color: "#FF6B6B", icon: "🖼️" },
    { name: t("tasks"), color: "#FF9500", icon: "✅" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-blue)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.2), inset 0 1px 0 var(--border-subtle)",
        }}
      >
        {/* Glow blobs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 -mr-20 -mt-20 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "var(--icon-lavender)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 -ml-20 -mb-20 rounded-full pointer-events-none blur-3xl opacity-15"
          style={{ background: "var(--icon-sky)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--shimmer-line), transparent)" }}
        />

        {/* App icons and Solution Flow */}
        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-12">
          {/* Distracting Apps Grid */}
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-md order-1 md:order-none">
            {apps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 + i * 4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 + i * 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${app.color}15`,
                    border: `1px solid ${app.color}35`,
                    boxShadow: `0 4px 16px ${app.color}20`,
                  }}
                >
                  {app.icon}
                </div>
                <span className="text-[10px] font-medium" style={{ color: "var(--text-4)" }}>
                  {app.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Solution Flow (Arrow and Nawah) */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-none">
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex items-center justify-center transition-transform duration-500 ${isAr ? "md:rotate-180" : ""
                } rotate-90 md:rotate-0`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" style={{ color: "var(--icon-sky)" }} strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.div>

            {/* Nawah pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center overflow-hidden"
                style={{
                  background: "var(--color-blue)",
                  boxShadow: "0 12px 32px var(--border-blue)",
                  border: "2px solid var(--border-blue)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoImg.src} alt="Nawah Logo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <span className="text-xs font-bold" style={{ color: "var(--text-badge)" }}>{tBrand("name")}</span>
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 text-center">
          <h2
            className="text-3xl md:text-5xl font-black mb-4 text-balance"
            style={{ color: "var(--text-1)", textShadow: "0 0 40px var(--border-blue)" }}
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
      </motion.div>
    </section>
  );
}
