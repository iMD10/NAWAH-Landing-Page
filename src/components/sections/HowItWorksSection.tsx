"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { House, UserPlus, Users } from "lucide-react";

const steps = [
  { id: "step1", Icon: House },
  { id: "step2", Icon: UserPlus },
  { id: "step3", Icon: Users },
];

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full scroll-mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-14"
        style={{ color: "var(--text-1)" }}
      >
        {t("title")}
      </motion.h2>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map(({ id, Icon }, index) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-3xl p-8"
            style={{ background: "var(--bg-card-alt)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "var(--bg-badge)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "var(--color-blue)" }} />
              </div>
              <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text-5)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
              {t(id)}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              {t(`${id}Desc`)}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
