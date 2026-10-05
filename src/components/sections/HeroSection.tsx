"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CalendarDays, ListChecks } from "lucide-react";
import StoreButtons from "@/components/StoreButtons";
import PhoneFrame from "@/components/PhoneFrame";
import logoImg from "@/app/logo.png";

/* iOS-style notification card floating beside the phones */
function Notification({
  icon: Icon,
  tint,
  title,
  body,
  time,
  className,
  delay,
}: {
  icon: typeof ListChecks;
  tint: string;
  title: string;
  body: string;
  time: string;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.92, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
      className={`absolute z-20 w-[230px] sm:w-[250px] ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
        className="flex items-start gap-3 rounded-2xl p-3"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 18px 40px -18px rgba(19,21,42,0.35)",
        }}
      >
        <span className="grid place-items-center w-9 h-9 rounded-[10px] flex-shrink-0" style={{ background: tint }}>
          <Icon className="w-[18px] h-[18px] text-white" strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-semibold truncate" style={{ color: "var(--text-1)" }}>
              {title}
            </span>
            <span className="text-[11px] flex-shrink-0" style={{ color: "var(--text-5)" }}>
              {time}
            </span>
          </span>
          <span className="block text-[12.5px] leading-snug mt-0.5" style={{ color: "var(--text-3)" }}>
            {body}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const t = useTranslations("Hero");
  const tBrand = useTranslations("Brand");
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /* pointer position (-0.5 … 0.5) drives the spotlight and a subtle phone parallax */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20 });
  const sy = useSpring(py, { stiffness: 120, damping: 20 });
  const backX = useTransform(sx, (v) => v * -14);
  const backY = useTransform(sy, (v) => v * -10);
  const frontX = useTransform(sx, (v) => v * 22);
  const frontY = useTransform(sy, (v) => v * 16);
  const rotY = useTransform(sx, (v) => v * 8);
  const rotX = useTransform(sy, (v) => v * -6);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const el = frameRef.current;
      if (!el) return;
      const { clientX, clientY } = e;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const r = el.getBoundingClientRect();
        const x = clientX - r.left;
        const y = clientY - r.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        px.set(x / r.width - 0.5);
        py.set(y / r.height - 0.5);
      });
    },
    [reduce, px, py]
  );

  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const words = t("headline").split(" ");

  return (
    <section className="relative w-full px-2 sm:px-3 pt-1 pb-6">
      <div
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem]"
        style={{
          background: "var(--bg-hero)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* surface details */}
        <div aria-hidden="true" className="surface-grid absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="surface-spotlight absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="surface-grain absolute inset-0 pointer-events-none" />

        {/* giant wordmark */}
        <span
          aria-hidden="true"
          className="wordmark bottom-[-0.12em] opacity-[0.06] dark:opacity-[0.09]"
          style={{ fontSize: "clamp(7rem, 24vw, 22rem)" }}
        >
          {tBrand("name")}
        </span>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-24 md:pt-20 md:pb-36 grid lg:grid-cols-[1.05fr_1fr] items-center gap-16 lg:gap-6">
          {/* Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
            <p
              className="intro inline-flex items-center gap-2 rounded-full ps-2.5 pe-3.5 py-1.5 mb-7 text-[13px] font-medium"
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-2)",
              }}
            >
              <span className="live-dot w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {t("eyebrow")}
            </p>

            <h1
              className="font-heading font-semibold tracking-[-0.045em] leading-[1.02] text-balance mb-6"
              style={{ fontSize: "clamp(2.75rem, 6.4vw, 5.25rem)", color: "var(--text-1)" }}
            >
              {words.map((word, i) => (
                <span key={i} className="intro inline-block" style={{ "--d": `${80 + i * 70}ms` } as React.CSSProperties}>
                  {word}
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>

            <p
              className="intro text-lg md:text-xl leading-relaxed text-balance max-w-[34rem] mb-10"
              style={{ color: "var(--text-3)", "--d": `${120 + words.length * 70}ms` } as React.CSSProperties}
            >
              {t("subtext")}
            </p>

            <div className="intro" style={{ "--d": `${200 + words.length * 70}ms` } as React.CSSProperties}>
              <StoreButtons />
            </div>
          </div>

          {/* Devices */}
          <div className="relative mx-auto w-full max-w-[480px] h-[460px] sm:h-[560px]" style={{ perspective: 1200 }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: backX, y: backY }}
              className="absolute top-14 start-[4%] w-[44%] sm:w-[205px]"
            >
              <PhoneFrame src="/screenshots/chat.png" alt="Nawah family chat" sizes="(min-width: 640px) 205px, 44vw" />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: frontX, y: frontY, rotateY: rotY, rotateX: rotX }}
              className="absolute top-0 end-[4%] w-[54%] sm:w-[250px] z-10"
            >
              <PhoneFrame
                src="/screenshots/hero-main.png"
                alt="Nawah home screen"
                sizes="(min-width: 640px) 250px, 54vw"
                priority
              />
            </motion.div>

            <Notification
              icon={ListChecks}
              tint="#2789D3"
              title={t("notif1Title")}
              body={t("notif1")}
              time={t("now")}
              delay={1.1}
              className="bottom-24 sm:bottom-28 start-[-2%] sm:start-[-12%]"
            />
            <Notification
              icon={CalendarDays}
              tint="#9b6fcc"
              title={t("notif2Title")}
              body={t("notif2")}
              time="9:41"
              delay={1.5}
              className="bottom-4 sm:bottom-6 end-[-2%] sm:end-[-8%]"
            />

            {/* app icon tucked behind */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.9 }}
              className="absolute top-0 start-[2%] z-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden rotate-[-10deg]"
              style={{ boxShadow: "0 16px 30px -12px rgba(39,137,211,0.6)" }}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoImg.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
