import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import logoImg from "@/app/logo.png";
import StoreButtons from "./StoreButtons";

const sectionHeadingClass = "text-sm font-semibold";

const navLinkClass =
  "text-sm transition-colors hover:text-[color:var(--text-nav-hover)] underline-offset-4 hover:underline";

export default function Footer() {
  const tNav = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const tBrand = useTranslations("Brand");

  return (
    <footer
      className="mt-auto border-t"
      style={{ background: "var(--bg-footer)", borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto w-[min(100%-2.5rem,76rem)] py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-3">
              <Image src={logoImg} alt="" width={40} height={40} sizes="40px" className="h-10 w-10 rounded-[0.7rem]" />
              <p className="font-heading text-xl font-bold tracking-tight" style={{ color: "var(--text-1)" }}>
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
    </footer>
  );
}
