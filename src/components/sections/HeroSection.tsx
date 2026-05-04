"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import logoImg from "@/app/logo.png";

/* ── Animated background glow blob ── */
const GlowOrb = ({
  delay = 0,
  duration = 10,
  style,
}: {
  delay?: number;
  duration?: number;
  style: React.CSSProperties;
}) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: "blur(60px)", willChange: "transform", ...style }}
      animate={shouldReduce ? {} : { y: [0, -40, 0], x: [0, 20, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: "reverse", delay, ease: "easeInOut" }}
    />
  );
};

/* ── 3D logo-like object replacing the GLB model ── */
const LogoObject = () => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-full"
      style={{ willChange: "transform" }}
      animate={shouldReduce ? {} : { y: [0, -18, 0] }}
      transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      {/* Outer atmospheric glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "95%",
          height: "95%",
          background:
            "radial-gradient(circle, var(--border-blue) 0%, var(--border-purple) 50%, transparent 75%)",
          filter: "blur(28px)",
          transform: "translateZ(0)",
        }}
      />

      {/* The logo image */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          width: "72%",
          aspectRatio: "1 / 1",
          borderRadius: "26%",
          boxShadow: "0 24px 70px var(--border-blue), 0 0 60px var(--border-subtle)",
          willChange: "transform",
        }}
        animate={shouldReduce ? {} : { rotateY: [0, 3, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoImg.src}
          alt="Nawah"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Glass specular highlight over the logo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 28% 22%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Orbiting lavender dot — top-right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "10%",
          height: "10%",
          top: "8%",
          right: "10%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), var(--icon-lavender) 50%, var(--icon-lavender) 100%)",
          boxShadow: "0 0 12px var(--border-purple)",
          border: "1px solid rgba(255,255,255,0.3)",
          willChange: "transform",
        }}
        animate={shouldReduce ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: "12%", left: "15%", width: "38%", height: "26%",
            background: "rgba(255,255,255,0.7)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Orbiting blue dot — bottom-left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "7%",
          height: "7%",
          bottom: "14%",
          left: "8%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.8), var(--icon-sky) 60%, var(--color-blue) 100%)",
          boxShadow: "0 0 10px var(--border-blue)",
          willChange: "transform",
        }}
        animate={shouldReduce ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2.5 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: "14%", left: "16%", width: "36%", height: "24%",
            background: "rgba(255,255,255,0.6)",
            filter: "blur(1px)",
          }}
        />
      </motion.div>

      {/* Tiny dot — mid right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "4%",
          height: "4%",
          top: "42%",
          right: "3%",
          background: "var(--icon-lavender)",
          boxShadow: "0 0 10px var(--border-purple)",
        }}
        animate={shouldReduce ? {} : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Star shape — top left of orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "4%", left: "6%", opacity: 0.65 }}
        animate={shouldReduce ? {} : { rotate: [0, 18, -18, 0], y: [0, -7, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
            style={{ color: "var(--icon-lavender)" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

/* ── Floating decorative shape ── */
const FloatDeco = ({
  style,
  delay = 0,
  children,
}: {
  style: React.CSSProperties;
  delay?: number;
  children: React.ReactNode;
}) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ willChange: "transform", ...style }}
      animate={shouldReduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

/* ── Phone Mockup Component ── */
const PhoneMockup = ({ 
  src, 
  alt, 
  className = "", 
  style = {},
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: "min(240px, 45vw)",
        aspectRatio: "9 / 19.5",
        borderRadius: "min(2.8rem, 8vw)",
        border: "1px solid var(--border-purple)",
        background: "var(--bg-card-alt)",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.25), 0 0 30px var(--border-blue)",
        ...style
      }}
    >
      {/* Thinner, smaller notch */}
      <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[25%] h-[2%] bg-black rounded-full z-30" 
        style={{ opacity: 0.9 }}
      />
      
      {/* Screen Content */}
      <div className="absolute inset-0 z-10">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="min(240px, 45vw)"
          className="object-cover"
          priority={priority}
        />
      </div>
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default function HeroSection() {
  const t = useTranslations("Hero");
  const containerRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : 100]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.7], [1, shouldReduce ? 1 : 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "var(--bg-hero)",
      }}
    >
      {/* ── Background glow orbs ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GlowOrb
          style={{ width: 700, height: 700, top: -200, left: -150, background: "var(--icon-sky)", opacity: 0.22 }}
          delay={0} duration={12}
        />
        <GlowOrb
          style={{ width: 580, height: 580, top: "25%", right: -180, background: "var(--icon-lavender)", opacity: 0.1 }}
          delay={3} duration={14}
        />
        <GlowOrb
          style={{ width: 480, height: 480, bottom: -120, left: "28%", background: "var(--icon-sky)", opacity: 0.16 }}
          delay={6} duration={10}
        />
      </div>

      {/* ── Decorative floating shapes ── */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <FloatDeco style={{ top: "18%", left: "10%", width: 120, height: 120 }} delay={0}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "var(--bg-ghost)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border-ghost)",
              boxShadow: "0 10px 40px var(--border-subtle), inset 0 0 20px rgba(255,255,255,0.2)",
            }}
          />
        </FloatDeco>

        <FloatDeco style={{ bottom: "20%", right: "8%", width: 180, height: 40, transform: "rotate(-15deg)" }} delay={1}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "var(--bg-ghost)",
              boxShadow: "0 0 30px var(--border-subtle)",
              opacity: 0.6,
            }}
          />
        </FloatDeco>

        <FloatDeco style={{ top: "45%", right: "12%", width: 80, height: 80 }} delay={2}>
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--shimmer-line), transparent)" }} />
            <div className="absolute top-0 left-1/2 w-px h-full" style={{ background: "linear-gradient(180deg, transparent, var(--shimmer-line), transparent)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg" style={{ background: "var(--text-badge)", boxShadow: "0 0 15px var(--text-badge)" }} />
          </div>
        </FloatDeco>

        <FloatDeco style={{ bottom: "35%", left: "5%", width: 60, height: 45 }} delay={1.5}>
          <div
            className="w-full h-full"
            style={{
              borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
              background: "var(--bg-badge)",
              backdropFilter: "blur(6px)",
              border: "1px solid var(--border-badge)",
              boxShadow: "0 0 20px var(--border-subtle)",
            }}
          />
        </FloatDeco>
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: yText, opacity: opacityOut }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-12
                   flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase"
              style={{
                color: "var(--text-badge)",
                background: "var(--bg-badge)",
                border: "1px solid var(--border-badge)",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--text-badge)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-black tracking-tighter leading-[0.88] mb-6"
            style={{
              fontSize: "clamp(4.5rem, 13vw, 10rem)",
              color: "var(--text-1)",
              textShadow: "0 0 60px var(--border-blue), 0 0 120px var(--border-purple)",
            }}
          >
            {t("name")}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold mb-4 text-balance"
            style={{ color: "var(--text-2)" }}
          >
            {t("headline")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg mb-10 text-balance max-w-md leading-relaxed"
            style={{ color: "var(--text-4)" }}
          >
            {t("subtext")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                color: "#ffffff",
                boxShadow: "0 8px 32px var(--border-blue)",
                backgroundClip: "padding-box",
              }}
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="text-[10px] opacity-70 leading-none">{t("appStorePre")}</div>
                <div className="text-sm font-bold leading-tight">{t("appStore")}</div>
              </div>
            </a>

            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                color: "#ffffff",
                boxShadow: "0 8px 32px var(--border-blue)",
                backgroundClip: "padding-box",
              }}
            >
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.3-1.5.33-1.5-.8z" />
              </svg>
              <div>
                <div className="text-[10px] opacity-60 leading-none">{t("playStorePre")}</div>
                <div className="text-sm font-bold leading-tight">{t("playStore")}</div>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative flex-1 flex items-center justify-center w-full"
          style={{ maxWidth: 500, aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
        >
          <LogoObject />
        </motion.div>
      </motion.div>

      {/* ── Triple Phone mockup ── */}
      <div className="relative z-10 mt-12 mb-24 w-full max-w-5xl mx-auto px-6 h-[320px] sm:h-[480px] flex items-center justify-center">
        {/* Left Screen */}
        <motion.div
          initial={{ opacity: 0, x: -80, y: 40, rotate: -12 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -12 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute left-[2%] md:left-[10%] z-0 translate-x-[-15%] sm:translate-x-0 scale-[0.7] sm:scale-[0.85]"
        >
          <PhoneMockup 
            src="/screenshots/chat.png" 
            alt="Chat feature" 
            style={{ opacity: 0.85 }}
          />
        </motion.div>

        {/* Right Screen */}
        <motion.div
          initial={{ opacity: 0, x: 80, y: 40, rotate: 12 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute right-[2%] md:right-[10%] z-0 translate-x-[15%] sm:translate-x-0 scale-[0.7] sm:scale-[0.85]"
        >
          <PhoneMockup 
            src="/screenshots/events.png" 
            alt="Events feature" 
            style={{ opacity: 0.85 }}
          />
        </motion.div>

        {/* Center Screen (Main) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 scale-[0.85] sm:scale-100"
        >
          <PhoneMockup 
            src="/screenshots/hero-main.png" 
            alt="Nawah Home" 
            priority={true}
          />
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </section>
  );
}
