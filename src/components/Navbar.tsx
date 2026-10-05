"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoImg from "@/app/logo.png";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const tBrand = useTranslations("Brand");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { href: "/#features", label: t("features") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-2 sm:px-3 pt-2 sm:pt-3 pb-2">
      <div
        className="mx-auto max-w-6xl rounded-[1.4rem] backdrop-blur-xl transition-[background,box-shadow,border-color] duration-300"
        style={{
          background: scrolled || menuOpen ? "var(--bg-nav)" : "var(--bg-nav-top)",
          border: "1px solid var(--border-nav)",
          boxShadow: scrolled ? "0 10px 30px -18px rgba(19,21,42,0.35)" : "none",
        }}
      >
        <div className="flex justify-between items-center h-14 ps-2.5 pe-2">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 rounded-xl pe-2" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoImg.src} alt="Nawah Logo" className="w-9 h-9 rounded-[11px] object-cover" />
            <span className="hidden sm:block font-heading font-semibold text-lg tracking-[-0.03em]" style={{ color: "var(--foreground)" }}>
              {tBrand("name")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
                style={{ color: hovered === link.href ? "var(--text-nav-hover)" : "var(--text-nav)" }}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--bg-nav-pill)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <Link
              href="/#download"
              className="btn-raised hidden sm:inline-flex items-center justify-center h-10 px-4 text-sm font-semibold rounded-xl text-white bg-[#2789D3] hover:bg-[#1f7fc6]"
            >
              {t("download")}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-colors"
              style={{ background: menuOpen ? "var(--bg-nav-pill)" : "transparent" }}
            >
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{ background: "var(--text-nav-hover)", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }}
              />
              <span
                className="block w-5 h-0.5 rounded-full my-1 transition-all duration-300"
                style={{ background: "var(--text-nav-hover)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{ background: "var(--text-nav-hover)", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: menuOpen ? "26rem" : "0", opacity: menuOpen ? 1 : 0 }}
        >
          <nav className="flex flex-col px-2 pb-3 gap-1 pt-2" style={{ borderTop: "1px solid var(--border-nav)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium py-3 px-3 rounded-xl transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: "var(--text-nav-hover)" }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#download"
              onClick={() => setMenuOpen(false)}
              className="btn-raised mt-2 flex items-center justify-center w-full py-3.5 font-semibold rounded-xl text-white bg-[#2789D3]"
            >
              {t("download")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
