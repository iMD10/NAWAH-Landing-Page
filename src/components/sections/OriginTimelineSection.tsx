"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const timelineItems = [
  { yearKey: "timeline1Year", titleKey: "timeline1Title", descKey: "timeline1Desc" },
  { yearKey: "timeline2Year", titleKey: "timeline2Title", descKey: "timeline2Desc" },
  { yearKey: "timeline3Year", titleKey: "timeline3Title", descKey: "timeline3Desc" },
  { yearKey: "timeline4Year", titleKey: "timeline4Title", descKey: "timeline4Desc" },
];

export default function OriginTimelineSection() {
  const t = useTranslations("About");

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Origin story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-bold uppercase mb-4 px-4 py-1.5 rounded-full tracking-widest"
            style={{ color: "var(--text-badge)", background: "var(--bg-badge)", border: "1px solid var(--border-badge)" }}
          >
            {t("originBadge")}
          </span>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-6"
            style={{ color: "var(--text-1)", textShadow: "0 0 40px var(--border-blue)" }}
          >
            {t("originTitle")}
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
            {t("originText")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-bold uppercase mb-6 px-4 py-1.5 rounded-full tracking-widest"
            style={{ color: "var(--text-badge)", background: "var(--bg-badge)", border: "1px solid var(--border-badge)" }}
          >
            {t("timelineBadge")}
          </motion.span>

          <div className="relative">
            <div
              className="absolute start-4 top-0 bottom-0 w-px"
              style={{ background: "var(--border-subtle)" }}
            />

            <div className="space-y-8">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.yearKey}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 ps-12 relative"
                >
                  <div
                    className="absolute start-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--bg-card)",
                      border: "2px solid var(--border-blue)",
                      boxShadow: "0 0 12px var(--border-blue)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-blue)" }} />
                  </div>

                  <div>
                    <span className="text-xs font-bold" style={{ color: "var(--color-blue)" }}>
                      {t(item.yearKey)}
                    </span>
                    <h4 className="font-bold text-base mt-0.5" style={{ color: "var(--text-1)" }}>
                      {t(item.titleKey)}
                    </h4>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {t(item.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
