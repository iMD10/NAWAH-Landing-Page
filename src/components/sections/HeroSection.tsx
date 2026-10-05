"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import StoreButtons from "@/components/StoreButtons";

/* ── Phone Mockup Component ── */
const PhoneMockup = ({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => (
  <div
    className={`overflow-hidden ${className || "relative"}`}
    style={{
      aspectRatio: "9 / 19.5",
      borderRadius: "2.25rem",
      border: "6px solid #13152A",
      background: "#13152A",
      boxShadow: "0 30px 60px -20px rgba(19,21,42,0.35)",
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 240px, 52vw"
      className="object-cover"
      style={{ borderRadius: "1.85rem" }}
      priority={priority}
    />
  </div>
);

export default function HeroSection() {
  const t = useTranslations("Hero");
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--bg-hero)" }}>
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 items-center gap-14 md:gap-8">
        {/* Copy */}
        <div className="flex flex-col items-center md:items-start text-center md:text-start">
          <motion.h1
            {...fadeUp(0)}
            className="font-extrabold tracking-tight text-balance leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)", color: "var(--text-1)" }}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="text-lg md:text-xl leading-relaxed text-balance max-w-lg mb-10"
            style={{ color: "var(--text-3)" }}
          >
            {t("subtext")}
          </motion.p>

          <motion.div {...fadeUp(0.2)}>
            <StoreButtons />
          </motion.div>
        </div>

        {/* Screenshots */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[460px] h-[420px] sm:h-[540px]"
        >
          <PhoneMockup
            src="/screenshots/chat.png"
            alt="Nawah family chat"
            className="absolute top-12 start-[2%] w-[42%] sm:w-[200px] opacity-95"
          />
          <PhoneMockup
            src="/screenshots/hero-main.png"
            alt="Nawah home screen"
            className="absolute top-0 end-[2%] w-[52%] sm:w-[240px] z-10"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
