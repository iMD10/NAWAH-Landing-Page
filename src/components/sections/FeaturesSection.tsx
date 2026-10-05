"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MessageCircle, CalendarDays, ListChecks, Images, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PhoneFrame from "@/components/PhoneFrame";

const features = [
  { id: "chat", Icon: MessageCircle, tint: "#2789D3" },
  { id: "events", Icon: CalendarDays, tint: "#e2574c" },
  { id: "tasks", Icon: ListChecks, tint: "#2fae7a" },
  { id: "vault", Icon: Images, tint: "#9b6fcc" },
  { id: "ai", Icon: Sparkles, tint: "#e8a33d" },
] as const;

export default function FeaturesSection() {
  const t = useTranslations("Features");
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* the item crossing the middle band of the viewport becomes active */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" className="relative w-full py-24 md:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" kicker={t("kicker")} title={t("title")} className="mb-14 lg:mb-6" />

        {/* ── Desktop: scroll-driven sticky phone ── */}
        <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-10">
          <div className="relative">
            {/* progress rail */}
            <div
              aria-hidden="true"
              className="absolute top-[22vh] bottom-[22vh] start-0 w-px"
              style={{ background: "var(--border-subtle)" }}
            >
              <div
                className="absolute inset-x-0 top-0 transition-[height] duration-500 ease-out"
                style={{
                  height: `${((active + 1) / features.length) * 100}%`,
                  background: "var(--accent)",
                }}
              />
            </div>

            {features.map(({ id, Icon, tint }, i) => {
              const on = active === i;
              return (
                <div
                  key={id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="min-h-[62vh] flex items-center ps-12"
                >
                  <div
                    className="transition-all duration-500 ease-out"
                    style={{ opacity: on ? 1 : 0.32, transform: on ? "none" : "translateY(6px)" }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="grid place-items-center w-11 h-11 rounded-xl transition-colors duration-500"
                        style={{
                          background: on ? tint : "var(--bg-sunken)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: on ? "#fff" : "var(--text-4)" }} />
                      </span>
                      <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text-5)" }}>
                        {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-semibold tracking-[-0.035em] mb-4 leading-[1.05]"
                      style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", color: "var(--text-1)" }}
                    >
                      {t(id)}
                    </h3>
                    <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--text-3)" }}>
                      {t(`${id}Desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            <div className="sticky top-0 h-[100svh] flex items-center justify-center">
              {/* backdrop panel */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[12%] bottom-[12%] rounded-[2rem] overflow-hidden"
                style={{ background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="surface-grid absolute inset-0" />
                <div
                  className="absolute inset-0 transition-colors duration-700"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 55%, ${features[active].tint}26, transparent 70%)`,
                  }}
                />
                <span
                  className="absolute -bottom-6 end-4 font-heading font-semibold tabular-nums leading-none tracking-[-0.06em] transition-opacity duration-500"
                  style={{ fontSize: "11rem", color: "var(--text-1)", opacity: 0.05 }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className="relative w-[270px]"
                style={{
                  aspectRatio: "9 / 19.5",
                  borderRadius: "2.6rem",
                  padding: "8px",
                  background: "var(--device-frame)",
                  boxShadow: "var(--shadow-device)",
                }}
              >
                <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "2.1rem" }}>
                  {features.map(({ id }, i) => (
                    <Image
                      key={id}
                      src={`/screenshots/${id}.png`}
                      alt={t(id)}
                      fill
                      sizes="270px"
                      className="object-cover object-top transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        opacity: active === i ? 1 : 0,
                        transform: active === i ? "none" : `scale(1.04) translateY(${i < active ? "-12px" : "12px"})`,
                        filter: active === i ? "none" : "blur(4px)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet: swipeable rail ── */}
        <div className="lg:hidden -mx-4 sm:-mx-6">
          <div className="snap-rail flex gap-4 overflow-x-auto px-4 sm:px-6 pb-4">
            {features.map(({ id, Icon, tint }, i) => (
              <article
                key={id}
                className="relative flex-shrink-0 w-[82vw] max-w-[360px] rounded-[1.75rem] overflow-hidden flex flex-col"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-5">
                    <span className="grid place-items-center w-10 h-10 rounded-xl" style={{ background: tint }}>
                      <Icon className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-sm tabular-nums" style={{ color: "var(--text-5)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] mb-2" style={{ color: "var(--text-1)" }}>
                    {t(id)}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {t(`${id}Desc`)}
                  </p>
                </div>
                <div
                  className="relative mt-6 h-[300px] overflow-hidden"
                  style={{ background: `radial-gradient(70% 60% at 50% 100%, ${tint}22, transparent 70%)` }}
                >
                  <PhoneFrame
                    src={`/screenshots/${id}.png`}
                    alt={t(id)}
                    sizes="200px"
                    className="absolute left-1/2 -translate-x-1/2 top-2 w-[200px]"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
