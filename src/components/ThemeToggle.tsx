"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

const buttonClass =
  "grid place-items-center w-10 h-10 rounded-[0.75rem] text-[color:var(--muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={buttonClass}
      aria-label={t("themeToggle")}
      aria-pressed={theme === "dark"}
    >
      <HugeiconsIcon icon={theme === "dark" ? Sun03Icon : Moon02Icon} size={19} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
