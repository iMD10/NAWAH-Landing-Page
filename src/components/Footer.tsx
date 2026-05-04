import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import logoImg from "@/app/logo.png";

const sectionHeadingClass =
  "text-[11px] font-bold uppercase  ";

const navLinkClass =
  "text-sm transition-colors hover:text-[color:var(--text-nav-hover)]";

export default function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const tBrand = useTranslations("Brand");
  const tHero = useTranslations("Hero");

  const storeLinks = [
    {
      href: "https://apps.apple.com",
      eyebrow: tHero("appStorePre"),
      label: tHero("appStore"),
      primary: true,
      icon: (
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      ),
    },
    {
      href: "https://play.google.com",
      eyebrow: tHero("playStorePre"),
      label: tHero("playStore"),
      primary: false,
      icon: <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.3-1.5.33-1.5-.8z" />,
    },
  ];

  return (
    <footer
      className="relative mt-auto overflow-hidden border-t"
      style={{
        background: "var(--bg-footer)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--shimmer-line), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--icon-sky)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-15"
        style={{ background: "var(--icon-lavender)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-md">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl overflow-hidden"
                style={{
                  background: "var(--color-blue)",
                  boxShadow:
                    "0 0 32px var(--border-blue), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoImg.src} alt="Nawah Logo" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div>
                <p
                  className="text-xl font-black tracking-tight"
                  style={{ color: "var(--text-1)" }}
                >
                  {tBrand("name")}
                </p>
                <p
                  className="text-xs uppercase"
                  style={{ color: "var(--text-4)" }}
                >
                  {tBrand("badge")}
                </p>
              </div>
            </div>

            <p
              className="max-w-sm text-sm leading-7"
              style={{ color: "var(--text-3)" }}
            >
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <h3 className={sectionHeadingClass} style={{ color: "var(--text-1)" }}>
              {tFooter("legal")}
            </h3>
            <ul className="mt-5 space-y-3" style={{ color: "var(--text-3)" }}>
              <li>
                <Link href="/privacy" className={navLinkClass}>
                  {tNav("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={navLinkClass}>
                  {tNav("terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionHeadingClass} style={{ color: "var(--text-1)" }}>
              {tFooter("help")}
            </h3>
            <ul className="mt-5 space-y-3" style={{ color: "var(--text-3)" }}>
              <li>
                <Link href="/support" className={navLinkClass}>
                  {tNav("support")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionHeadingClass} style={{ color: "var(--text-1)" }}>
              {tFooter("storeTitle")}
            </h3>
            <div className="mt-5 space-y-3">
              {storeLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5"
                  style={
                    link.primary
                      ? {
                        background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                        color: "#ffffff",
                        boxShadow: "0 12px 36px var(--border-blue)",
                        backgroundClip: "padding-box",
                      }
                      : {
                        background: "linear-gradient(135deg, var(--color-navy), var(--color-blue))",
                        color: "#ffffff",
                        boxShadow: "0 8px 24px var(--border-blue)",
                        backgroundClip: "padding-box",
                      }
                  }
                >
                  <svg className="h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    {link.icon}
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase  opacity-70">
                      {link.eyebrow}
                    </p>
                    <p className="text-sm font-bold leading-tight">{link.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p style={{ color: "var(--text-5)" }}>
            &copy; {new Date().getFullYear()} {tBrand("name")} {tFooter("allRights")}
          </p>
          <p style={{ color: "var(--text-5)" }}>
            {tFooter("taglineBottom")}
          </p>
        </div>
      </div>
    </footer>
  );
}
