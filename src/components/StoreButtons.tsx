import { useTranslations } from "next-intl";

export const APP_STORE_URL =
  "https://apps.apple.com/tr/app/%D9%86%D9%88%D8%A7%D8%A9-%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D8%A6%D9%84%D8%A9/id6764706130";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.nawah.family";

const AppleIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" />
  </svg>
);

/**
 * App Store / Google Play download buttons.
 * `tone="dark"` renders dark buttons (for light surfaces, inverted in dark mode);
 * `tone="light"` renders white buttons for use on dark surfaces.
 * `stacked` keeps the buttons in a single column at every width.
 */
export default function StoreButtons({
  tone = "dark",
  stacked = false,
  className = "",
}: {
  tone?: "dark" | "light";
  stacked?: boolean;
  className?: string;
}) {
  const t = useTranslations("Hero");

  const toneClass =
    tone === "light"
      ? "bg-white text-[#13152A] hover:bg-white/90"
      : "bg-[#13152A] text-white hover:bg-[#1f2340] dark:bg-white dark:text-[#13152A] dark:hover:bg-white/90";

  const stores = [
    { href: APP_STORE_URL, pre: t("appStorePre"), name: t("appStore"), Icon: AppleIcon },
    { href: PLAY_STORE_URL, pre: t("playStorePre"), name: t("playStore"), Icon: PlayIcon },
  ];

  return (
    <div className={`flex flex-col gap-3 ${stacked ? "items-start" : "sm:flex-row"} ${className}`}>
      {stores.map(({ href, pre, name, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center sm:justify-start gap-3 h-14 px-5 min-w-[180px] rounded-xl transition-colors duration-200 ${toneClass}`}
        >
          <Icon />
          <span className="text-start">
            <span className="block text-[11px] leading-none opacity-75">{pre}</span>
            <span className="block text-base font-semibold leading-tight mt-0.5">{name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
