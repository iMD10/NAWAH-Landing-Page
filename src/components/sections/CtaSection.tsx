"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

export default function CtaSection() {
  const t = useTranslations("Cta");
  const tHero = useTranslations("Hero");
  const shouldReduce = useReducedMotion();

  return (
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[3rem] p-12 md:p-20"
        style={{
          background: "var(--bg-cta)",
          border: "1px solid var(--border-purple)",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.3), 0 0 80px var(--border-subtle)",
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--shimmer-line), transparent)" }}
        />

        {/* Glow blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] -mr-40 -mt-40 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "var(--icon-sky)", transform: "translateZ(0)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] -ml-40 -mb-40 rounded-full pointer-events-none blur-3xl opacity-15"
          style={{ background: "var(--icon-lavender)", transform: "translateZ(0)" }}
        />

        {/* Decorative rotating shapes */}
        <motion.div
          animate={shouldReduce ? {} : { rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-8 right-16 opacity-20"
          style={{ willChange: "transform" }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor" style={{ color: "var(--icon-lavender)" }} />
          </svg>
        </motion.div>
        <motion.div
          animate={shouldReduce ? {} : { rotate: [360, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-14 opacity-15"
          style={{ willChange: "transform" }}
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor" style={{ color: "var(--icon-sky)" }} />
          </svg>
        </motion.div>

        {/* Headline */}
        <h2
          className="text-4xl md:text-6xl font-black mb-4 relative z-10 text-balance leading-tight"
          style={{ color: "var(--text-1)", textShadow: "0 0 60px var(--border-blue)" }}
        >
          {t("title")}
        </h2>

        <p className="text-lg mb-12 relative z-10" style={{ color: "var(--text-3)" }}>
          {t("subtext")}
        </p>

        {/* Store buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 min-w-[200px]"
            style={{
              background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
              color: "#ffffff",
              boxShadow: "0 8px 32px var(--border-blue)",
              backgroundClip: "padding-box",
            }}
          >
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] opacity-70 leading-none">{tHero("appStorePre")}</div>
              <div className="text-base font-bold leading-tight">{tHero("appStore")}</div>
            </div>
          </a>

          <div
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 opacity-60 cursor-not-allowed min-w-[200px]"
            style={{
              background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
              color: "#ffffff",
              boxShadow: "0 8px 32px var(--border-blue)",
              backgroundClip: "padding-box",
            }}
          >
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.3-1.5.33-1.5-.8z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] opacity-60 leading-none">{tHero("playStorePre")}</div>
              <div className="text-base font-bold leading-tight">{tHero("playStoreComingSoon")}</div>
            </div>
          </div>
        </div>


      </motion.div>
    </section>
  );
}
