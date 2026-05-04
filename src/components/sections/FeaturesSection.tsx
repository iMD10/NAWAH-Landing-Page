"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, CalendarDays, CheckSquare, Image as ImageIcon, Sparkles } from "lucide-react";

const features = [
  {
    id: "chat",
    icon: MessageCircle,
    gradient: "var(--bg-feat-blue)",
    border: "var(--border-feat-blue)",
    iconBg: "var(--bg-badge)",
    iconColor: "var(--icon-sky)",
    glow: "var(--border-blue)",
    shimmer: "var(--shimmer-line)",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "events",
    icon: CalendarDays,
    gradient: "var(--bg-feat-purple)",
    border: "var(--border-feat-purple)",
    iconBg: "var(--bg-badge)",
    iconColor: "var(--icon-lavender)",
    glow: "var(--border-purple)",
    shimmer: "var(--shimmer-line)",
    className: "md:col-span-1",
  },
  {
    id: "tasks",
    icon: CheckSquare,
    gradient: "var(--bg-feat-lblue)",
    border: "var(--border-feat-lblue)",
    iconBg: "var(--bg-badge)",
    iconColor: "var(--icon-sky)",
    glow: "var(--border-blue)",
    shimmer: "var(--shimmer-line)",
    className: "md:col-span-1",
  },
  {
    id: "vault",
    icon: ImageIcon,
    gradient: "var(--bg-feat-purple)",
    border: "var(--border-feat-purple)",
    iconBg: "var(--bg-badge)",
    iconColor: "var(--icon-lavender)",
    glow: "var(--border-purple)",
    shimmer: "var(--shimmer-line)",
    className: "md:col-span-1",
  },
  {
    id: "ai",
    icon: Sparkles,
    gradient: "var(--bg-feat-mixed)",
    border: "var(--border-feat-blue)",
    iconBg: "var(--bg-badge)",
    iconColor: "var(--icon-sky)",
    glow: "var(--border-blue)",
    shimmer: "var(--shimmer-line)",
    className: "md:col-span-1",
  },
];

export default function FeaturesSection() {
  const t = useTranslations("Features");
  const locale = useLocale();

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span
          className="inline-block text-xs font-bold uppercase mb-4 px-4 py-1.5 rounded-full"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 flex flex-col h-[360px] cursor-default transition-all duration-300 hover:-translate-y-1"
              style={{
                background: feature.gradient,
                border: `1px solid ${feature.border}`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Decorative glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: feature.glow }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10"
                style={{
                  background: feature.iconBg,
                  border: `1px solid ${feature.border}`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: feature.iconColor }} />
              </div>

              <h3 className="text-xl font-bold mb-2 relative z-10" style={{ color: "var(--text-1)" }}>
                {t(feature.id)}
              </h3>
              <p className="text-sm leading-relaxed text-balance mb-6 relative z-10 opacity-70 max-w-[75%]" style={{ color: "var(--text-1)" }}>
                {t(`${feature.id}Desc`)}
              </p>

              {/* Peeking UI */}
              <div
                className={`absolute -bottom-16 w-[200px] aspect-[9/19] rounded-[2rem] shadow-2xl transition-transform duration-500 overflow-hidden ${locale === "ar"
                    ? "left-[-2.5rem] -rotate-12 group-hover:-translate-y-6 group-hover:-rotate-6"
                    : "right-[-2.5rem] rotate-12 group-hover:-translate-y-6 group-hover:rotate-6"
                  }`}
                style={{ border: "1px solid var(--border-purple)", background: "var(--bg-card-alt)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center z-20">
                  <div className="w-16 h-4 bg-black rounded-full" />
                </div>
                <Image
                  src={`/screenshots/${feature.id}.png`}
                  alt={t(feature.id)}
                  fill
                  className="object-cover object-top opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
