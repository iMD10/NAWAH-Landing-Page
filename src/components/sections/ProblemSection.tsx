"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { CalendarDays, Images, ListChecks, MessageCircle, StickyNote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import logoImg from "@/app/logo.png";

/*
 * Scattered apps get pulled into Nawah as you scroll.
 * One motion value (--p, 0 → 1) drives every icon through CSS calc(),
 * with offsets in container units so the scene scales with the stage.
 */
const apps = [
  { key: "chat", Icon: MessageCircle, x: -36, y: -26, r: -14, tint: "#2789D3" },
  { key: "calendar", Icon: CalendarDays, x: 34, y: -30, r: 12, tint: "#e2574c" },
  { key: "notes", Icon: StickyNote, x: -40, y: 22, r: 9, tint: "#e8a33d" },
  { key: "photos", Icon: Images, x: 38, y: 20, r: -10, tint: "#9b6fcc" },
  { key: "tasks", Icon: ListChecks, x: 2, y: 36, r: 6, tint: "#2fae7a" },
] as const;

export default function ProblemSection() {
  const t = useTranslations("Problem");
  const tBrand = useTranslations("Brand");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0.08, 0.72], [0, 1], { clamp: true });
  const p = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.6 });

  return (
    <section ref={ref} className={`relative w-full ${reduce ? "" : "h-[230vh]"}`}>
      <div className={`${reduce ? "py-24" : "sticky top-0 h-[100svh]"} flex flex-col px-4 sm:px-6 pt-20 md:pt-24 pb-10`}>
        <div className="max-w-3xl mx-auto w-full">
          <SectionHeading index="01" kicker={t("kicker")} title={t("title")} />
          <p
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto text-center text-balance leading-relaxed"
            style={{ color: "var(--text-3)" }}
          >
            {t("description")}
          </p>
        </div>

        <motion.div
          className="relative flex-1 w-full max-w-4xl mx-auto mt-6 min-h-[300px]"
          style={{ containerType: "size", "--p": reduce ? 1 : p } as never}
        >
          {/* faint orbit rings */}
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
            {[78, 54, 30].map((s) => (
              <span
                key={s}
                className="absolute rounded-full"
                style={{
                  width: `${s}cqmin`,
                  height: `${s}cqmin`,
                  border: "1px dashed var(--guide-line)",
                  opacity: "calc(1 - var(--p) * 0.6)",
                }}
              />
            ))}
          </div>

          {/* scattered apps */}
          {apps.map(({ key, Icon, x, y, r, tint }) => (
            <div
              key={key}
              className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2"
              style={{
                translate: "-50% -50%",
                transform: `translate(calc((1 - var(--p)) * ${x}cqw), calc((1 - var(--p)) * ${y}cqh)) rotate(calc((1 - var(--p)) * ${r}deg)) scale(calc(1 - var(--p) * 0.55))`,
                opacity: "calc(1.15 - var(--p) * 1.15)",
              }}
            >
              <span
                className="grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-[1.1rem]"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: tint }} strokeWidth={1.75} />
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--text-4)" }}>
                {t(key)}
              </span>
            </div>
          ))}

          {/* Nawah */}
          <div
            className="absolute left-1/2 top-1/2 flex flex-col items-center"
            style={{ translate: "-50% -50%", transform: "scale(calc(0.72 + var(--p) * 0.28))" }}
          >
            <span className="relative block w-24 h-24 sm:w-28 sm:h-28">
              <span
                aria-hidden="true"
                className="absolute -inset-6 rounded-full blur-2xl"
                style={{ background: "var(--accent)", opacity: "calc(var(--p) * 0.35)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoImg.src}
                alt={tBrand("name")}
                className="relative w-full h-full rounded-[1.6rem] object-cover"
                style={{ boxShadow: "0 18px 40px -14px rgba(39,137,211,0.6)" }}
              />
            </span>
          </div>

          <p
            className="absolute inset-x-0 bottom-2 text-center font-heading font-semibold tracking-[-0.03em] text-xl sm:text-2xl"
            style={{
              color: "var(--text-1)",
              opacity: "clamp(0, (var(--p) - 0.7) * 3.4, 1)",
              transform: "translateY(calc((1 - var(--p)) * 24px))",
            }}
          >
            {t("after")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
