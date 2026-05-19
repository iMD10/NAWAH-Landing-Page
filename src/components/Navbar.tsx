"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import logoImg from "@/app/logo.png";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const tBrand = useTranslations("Brand");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { href: "/#download", label: t("download") },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-nav)" : "var(--bg-nav-top)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid var(--border-nav)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "var(--color-blue)",
                boxShadow: "0 4px 16px var(--border-blue)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoImg.src} alt="Nawah Logo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <span className="hidden sm:block font-bold text-xl tracking-tight" style={{ color: "var(--foreground)" }}>
              {tBrand("name")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--text-nav)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-nav-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-nav)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <a
              href="https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                color: "#ffffff",
                boxShadow: "0 4px 14px var(--border-blue)",
                backgroundClip: "padding-box",
              }}
            >
              {t("download")}
            </a>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg transition-colors"
              style={{ background: menuOpen ? "var(--bg-badge)" : "transparent" }}
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
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuOpen ? "26rem" : "0", opacity: menuOpen ? 1 : 0 }}
      >
        <nav
          className="flex flex-col px-4 pb-6 gap-1 pt-3"
          style={{ borderTop: "1px solid var(--border-nav)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium py-3 px-3 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--text-nav)" }}
            >
              {link.label}
            </Link>
          ))}
          

          <div className="mt-4 px-3">
            <a
              href="https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 font-bold rounded-2xl"
              style={{
                background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                color: "#ffffff",
                boxShadow: "0 8px 24px var(--border-blue)",
                backgroundClip: "padding-box",
              }}
            >
              {t("download")}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
