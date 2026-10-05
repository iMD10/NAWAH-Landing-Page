"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  InformationCircleIcon,
  Moon02Icon,
  Sun03Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import StoreButtons from "./StoreButtons";
import { useTheme } from "./ThemeProvider";
import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import logoImg from "@/app/logo.png";

type Section = "features" | "how-it-works" | "download";

const NAV: { href: string; key: "features" | "howItWorks" | "about"; section?: Section; icon: IconSvgElement }[] = [
  { href: "/#features", key: "features", section: "features", icon: Calendar03Icon },
  { href: "/#how-it-works", key: "howItWorks", section: "how-it-works", icon: UserGroupIcon },
  { href: "/about", key: "about", icon: InformationCircleIcon },
];

/** Which home-page section is under the middle of the viewport (scrollspy). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<Section | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const ids: Section[] = ["features", "how-it-works", "download"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActive((ids.find((id) => visible.has(id)) as Section | undefined) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

/** Close on Escape and on a click or focus outside `ref`. */
function useDismiss(open: boolean, ref: RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onFocus = (e: FocusEvent) => {
      if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open, ref, close]);
}

/** Desktop "Get app": store links plus a QR hand-off, from anywhere on the page. */
function GetAppMenu() {
  const t = useTranslations("Navigation");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, wrap, close);

  return (
    <div ref={wrap} className="nw-getapp">
      <button
        ref={button}
        type="button"
        className="nw-btn-primary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      >
        {t("download")}
        <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={2} aria-hidden="true" className="nw-getapp__chev" />
      </button>
      <div id={panelId} className="nw-getapp__panel" data-open={open || undefined} hidden={!open}>
        <div className="nw-getapp__head">
          <Image src={logoImg} alt="" width={40} height={40} sizes="40px" />
          <div>
            <p className="nw-getapp__title">{t("getAppTitle")}</p>
            <p className="nw-getapp__note">{t("getAppNote")}</p>
          </div>
        </div>
        <StoreButtons stacked className="nw-getapp__stores" />
        <div className="nw-getapp__qr">
          <Image src="/qr.png" alt="" width={370} height={370} sizes="72px" />
          <p>{t("scanNote")}</p>
        </div>
      </div>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; lang?: string; icon?: IconSvgElement }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="nw-sheet__setting">
      <span className="nw-sheet__setting-label">{label}</span>
      <div className="nw-segmented" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            lang={o.lang}
          >
            {o.icon && <HugeiconsIcon icon={o.icon} size={16} strokeWidth={1.8} aria-hidden="true" />}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Mobile menu: a full sheet below the header, modal while open. */
function MobileSheet({
  open,
  onClose,
  active,
  sheetRef,
}: {
  open: boolean;
  onClose: () => void;
  active: Section | null;
  sheetRef: RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div
      ref={sheetRef}
      id="mobile-menu"
      className="nw-sheet md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t("menuTitle")}
      data-open={open || undefined}
      inert={!open}
    >
      <nav aria-label={t("primary")}>
        <ol className="nw-sheet__nav">
          {NAV.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={item.href}
                onClick={onClose}
                className="nw-sheet__link"
                aria-current={item.section && item.section === active ? "location" : undefined}
              >
                <span className="nw-sheet__icon" aria-hidden="true">
                  <HugeiconsIcon icon={item.icon} size={22} strokeWidth={1.7} />
                </span>
                <span className="nw-sheet__text">
                  <span className="nw-sheet__name">{t(item.key)}</span>
                  <span className="nw-sheet__desc">{t(`${item.key}Desc`)}</span>
                </span>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="nw-sheet__arrow"
                />
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="nw-sheet__download" aria-label={t("getAppTitle")} style={{ "--i": 3 } as React.CSSProperties}>
        <div className="nw-sheet__download-head">
          <Image src={logoImg} alt="" width={44} height={44} sizes="44px" />
          <div>
            <p className="nw-sheet__download-title">{t("getAppTitle")}</p>
            <p className="nw-sheet__download-note">{t("getAppNote")}</p>
          </div>
        </div>
        <StoreButtons tone="light" className="nw-sheet__stores" />
      </section>

      <div className="nw-sheet__settings" style={{ "--i": 4 } as React.CSSProperties}>
        <Segmented
          label={t("language")}
          value={locale as "en" | "ar"}
          options={[
            { value: "ar", label: "العربية", lang: "ar" },
            { value: "en", label: "English", lang: "en" },
          ]}
          onChange={(next) => {
            if (next !== locale) router.replace(pathname, { locale: next });
          }}
        />
        <Segmented
          label={t("theme")}
          value={theme}
          options={[
            { value: "light", label: t("light"), icon: Sun03Icon },
            { value: "dark", label: t("dark"), icon: Moon02Icon },
          ]}
          onChange={setTheme}
        />
      </div>

      <nav className="nw-sheet__more" aria-label={t("more")} style={{ "--i": 5 } as React.CSSProperties}>
        <Link href="/support" onClick={onClose}>{t("support")}</Link>
        <Link href="/privacy" onClick={onClose}>{t("privacy")}</Link>
        <Link href="/terms" onClick={onClose}>{t("terms")}</Link>
      </nav>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("Navigation");
  const tBrand = useTranslations("Brand");
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Modal behaviour while the sheet is open: lock page scroll, trap focus,
  // close on Escape or when the viewport grows past the mobile layout.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const first = sheet.current?.querySelector<HTMLElement>("a, button");
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      // The menu button stays reachable so the sheet can be closed from it.
      const focusables = [
        menuButton.current,
        ...sheet.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter(Boolean) as HTMLElement[];
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && closeMenu();
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;

  return (
    <header className="nw-header" data-solid={solid || undefined} data-menu={menuOpen || undefined}>
      <div className="nw-header__bar">
        <Link href="/" className="nw-header__brand" onClick={() => closeMenu()}>
          <Image src={logoImg} alt="" width={36} height={36} sizes="36px" preload />
          <span>{tBrand("name")}</span>
        </Link>

        {/* Desktop nav with a marker on the section being read */}
        <nav aria-label={t("primary")} className="nw-header__nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nw-header__link"
              aria-current={item.section && item.section === active ? "location" : undefined}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="nw-header__actions">
          <div className="nw-header__desktop-only">
            <ThemeToggle />
          </div>
          <LanguageToggle />
          <div className="nw-header__desktop-only">
            <GetAppMenu />
          </div>
          <button
            ref={menuButton}
            type="button"
            className="nw-burger"
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileSheet open={menuOpen} onClose={() => closeMenu()} active={active} sheetRef={sheet} />
    </header>
  );
}
