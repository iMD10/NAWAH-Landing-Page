"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import logoImg from "@/app/logo.png";

const linkClass =
  "text-[0.9375rem] font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors duration-150";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const tBrand = useTranslations("Brand");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const navLinks = [
    { href: "/#features", label: t("features") },
    { href: "/#how-it-works", label: t("howItWorks") },
    { href: "/about", label: t("about") },
  ];

  const solid = scrolled || menuOpen;

  return (
    <header
      className="sticky top-0 z-50 w-full transition-[background-color,border-color] duration-200"
      style={{
        background: solid ? "var(--bg-nav)" : "var(--bg-nav-top)",
        backdropFilter: solid ? "saturate(140%) blur(12px)" : "none",
        borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="mx-auto w-[min(100%-2.5rem,76rem)]">
        <div className="flex items-center justify-between h-[4.25rem] gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 rounded-lg" onClick={() => setMenuOpen(false)}>
            <Image src={logoImg} alt="" width={36} height={36} sizes="36px" preload className="w-9 h-9 rounded-[0.6rem]" />
            <span className="font-heading font-bold text-xl tracking-tight text-[color:var(--ink)]">
              {tBrand("name")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t("primary")} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <Link
              href="/#download"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 ms-1 text-sm font-semibold rounded-[0.75rem] text-white bg-[color:var(--brand-btn)] hover:bg-[color:var(--brand-btn-hover)] active:scale-[0.97] transition-[background-color,transform] duration-150 motion-reduce:transition-none"
            >
              {t("download")}
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden grid place-items-center w-10 h-10 rounded-[0.75rem] text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
            >
              <HugeiconsIcon icon={menuOpen ? Cancel01Icon : Menu01Icon} size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-menu" hidden={!menuOpen} className="md:hidden border-t border-[color:var(--line)]">
        <nav aria-label={t("primary")} className="mx-auto w-[min(100%-2.5rem,76rem)] flex flex-col py-3 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-3 px-3 rounded-[0.75rem] text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#download"
            onClick={() => setMenuOpen(false)}
            className="mt-3 mb-2 flex items-center justify-center h-12 font-semibold rounded-[0.75rem] text-white bg-[color:var(--brand-btn)]"
          >
            {t("download")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
