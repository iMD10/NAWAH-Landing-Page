"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { UserPlus, Users, Sparkles } from "lucide-react";

const steps = [
  {
    id: "step1",
    Icon: Sparkles,
    glow: "var(--border-blue)",
    iconColor: "var(--text-badge)",
  },
  {
    id: "step2",
    Icon: UserPlus,
    glow: "var(--border-purple)",
    iconColor: "var(--text-badge)",
  },
  {
    id: "step3",
    Icon: Users,
    glow: "var(--border-purple)",
    iconColor: "var(--text-badge)",
  },
];

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <span
          className="inline-block text-xs font-bold tracking-[0.22em] uppercase mb-4 px-4 py-1.5 rounded-full"
          style={{ color: "var(--text-badge)", background: "var(--bg-badge)", border: "1px solid var(--border-badge)" }}
        >
          {t("badge")}
        </span>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight"
          style={{ color: "var(--text-1)", textShadow: "0 0 40px var(--border-blue)" }}
        >
          {t("title")}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connector line */}
        <div
          className="absolute top-14 left-[16.66%] right-[16.66%] h-px hidden md:block -z-10"
          style={{ background: "linear-gradient(90deg, var(--border-blue), var(--border-purple), var(--border-blue))" }}
        />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
          {steps.map(({ id, Icon, glow, iconColor }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
              className="flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 md:text-center group"
            >
              <div className="relative flex-shrink-0">
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: glow }}
                />

                <div
                  className="relative w-28 h-28 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: "var(--background)",
                    boxShadow: `0 8px 32px ${glow}`,
                    border: "1px solid var(--border-ghost)",
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: iconColor }} />
                </div>
              </div>

              <div className="flex-1 md:mt-8">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
                  {t(id)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                  {t(`${id}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
