"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { House, UserPlus, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { id: "step1", Icon: House },
  { id: "step2", Icon: UserPlus },
  { id: "step3", Icon: Users },
];

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative w-full py-24 md:py-32 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" kicker={t("kicker")} title={t("title")} className="mb-16 md:mb-20" />

        <div className="relative">
          {/* connecting track (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 inset-x-[16.66%] h-px"
            style={{ background: "repeating-linear-gradient(to right, var(--guide-line) 0 4px, transparent 4px 9px)" }}
          >
            <motion.div
              className="absolute inset-0 origin-left rtl:origin-right"
              style={{ background: "var(--accent)" }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            {steps.map(({ id, Icon }, i) => (
              <motion.li
                key={id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* node */}
                <span
                  className="relative z-10 grid place-items-center w-12 h-12 rounded-full mb-8 text-sm font-semibold tabular-nums"
                  style={{
                    background: "var(--bg-page)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-1)",
                    boxShadow: "0 0 0 6px var(--bg-page)",
                  }}
                >
                  {i + 1}
                </span>

                <div
                  className="relative w-full rounded-2xl p-8 transition-colors duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="guides opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>

                  <span
                    className="mx-auto mb-5 grid place-items-center w-12 h-12 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: "var(--accent-soft)", border: "1px solid var(--border-badge)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </span>

                  <h3
                    className="font-heading text-xl font-semibold tracking-[-0.02em] mb-3"
                    style={{ color: "var(--text-1)" }}
                  >
                    {t(id)}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {t(`${id}Desc`)}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
