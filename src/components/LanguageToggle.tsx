"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { LanguageSquareIcon } from "@hugeicons/core-free-icons";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const nextLocale = locale === "en" ? "ar" : "en";

  const toggleLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-2 h-10 px-3 rounded-[0.75rem] text-sm font-medium text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
      title={t("languageToggle")}
    >
      <HugeiconsIcon icon={LanguageSquareIcon} size={18} strokeWidth={1.8} aria-hidden="true" />
      <span lang={nextLocale}>{locale === "en" ? "عربي" : "English"}</span>
    </button>
  );
}
