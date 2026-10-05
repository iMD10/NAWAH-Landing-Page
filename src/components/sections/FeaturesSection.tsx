"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, CalendarDays, ListChecks, Images, Sparkles } from "lucide-react";

const features = [
  { id: "chat", icon: MessageCircle, className: "md:col-span-2" },
  { id: "events", icon: CalendarDays, className: "" },
  { id: "tasks", icon: ListChecks, className: "" },
  { id: "vault", icon: Images, className: "" },
  { id: "ai", icon: Sparkles, className: "" },
];

export default function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col min-h-[340px] ${feature.className}`}
              style={{ background: "var(--bg-card-alt)", border: "1px solid var(--border-subtle)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative z-10"
                style={{ background: "var(--bg-badge)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "var(--color-blue)" }} />
              </div>

              <h3 className="text-xl font-bold mb-2 relative z-10 max-w-[55%]" style={{ color: "var(--text-1)" }}>
                {t(feature.id)}
              </h3>
              <p className="text-sm leading-relaxed relative z-10 max-w-[55%]" style={{ color: "var(--text-3)" }}>
                {t(`${feature.id}Desc`)}
              </p>

              {/* Screenshot peeking from the corner */}
              <div
                className="absolute -bottom-16 -end-8 w-[190px] aspect-[9/19] rounded-[1.75rem] overflow-hidden transition-transform duration-500 group-hover:-translate-y-3"
                style={{
                  border: "5px solid #13152A",
                  background: "#13152A",
                  boxShadow: "0 20px 40px -15px rgba(19,21,42,0.4)",
                }}
              >
                <Image
                  src={`/screenshots/${feature.id}.png`}
                  alt={t(feature.id)}
                  fill
                  sizes="190px"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
