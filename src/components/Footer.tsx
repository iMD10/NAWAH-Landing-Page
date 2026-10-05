import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import logoImg from "@/app/logo.png";
import StoreButtons from "./StoreButtons";

const sectionHeadingClass = "text-xs font-medium uppercase tracking-[0.16em]";

const navLinkClass =
  "text-sm transition-colors hover:text-[color:var(--text-nav-hover)]";

export default function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const tBrand = useTranslations("Brand");

  return (
    <footer className="mt-auto relative overflow-hidden" style={{ background: "var(--bg-footer)" }}>
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoImg.src} alt="" className="h-10 w-10 rounded-xl object-cover" />
              <p className="text-xl font-bold tracking-tight" style={{ color: "var(--text-1)" }}>
                {tBrand("name")}
              </p>
            </div>
            <p className="text-sm leading-7" style={{ color: "var(--text-3)" }}>
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <h3 className={sectionHeadingClass} style={{ color: "var(--text-1)" }}>
              {tFooter("legal")}
            </h3>
            <ul className="mt-4 space-y-3" style={{ color: "var(--text-3)" }}>
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
            <ul className="mt-4 space-y-3" style={{ color: "var(--text-3)" }}>
              <li>
                <Link href="/support" className={navLinkClass}>
                  {tNav("support")}
                </Link>
              </li>
              <li>
                <Link href="/about" className={navLinkClass}>
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionHeadingClass} style={{ color: "var(--text-1)" }}>
              {tFooter("storeTitle")}
            </h3>
            <StoreButtons stacked className="mt-4" />
          </div>
        </div>

        <div
          className="mt-12 border-t pt-6 text-sm"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-5)" }}
        >
          &copy; {new Date().getFullYear()} {tBrand("name")}. {tFooter("allRights")}
        </div>
      </div>

      {/* oversized wordmark sign-off, cropped by the page edge */}
      <div aria-hidden="true" className="relative h-[clamp(4.5rem,15vw,13rem)]">
        <span className="wordmark bottom-[-0.32em] opacity-[0.07] dark:opacity-[0.1]" style={{ fontSize: "clamp(8rem, 27vw, 25rem)" }}>
          {tBrand("name")}
        </span>
      </div>
    </footer>
  );
}
