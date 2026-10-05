import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, CheckListIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import StoreButtons from "@/components/StoreButtons";
import PhoneScreen from "@/components/PhoneScreen";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="nw-hero" aria-labelledby="hero-title">
      <div className="nw-container nw-hero__grid">
        <div className="nw-hero__copy">
          <h1 id="hero-title" className="nw-display">
            {t("headline")}
          </h1>
          <p className="nw-lead">{t("subtext")}</p>
          <StoreButtons />
          <p className="nw-note">{t("availability")}</p>
        </div>

        {/* Product stage: one real screen, two small labelled example fragments */}
        <div className="nw-stage">
          <div className="nw-board nw-stage__board" aria-hidden="true" />
          <PhoneScreen
            src="/screenshots/hero-main.png"
            alt={t("screenAlt")}
            className="nw-stage__phone"
            sizes="(min-width: 1024px) 296px, 264px"
            preload
          />

          <div className="nw-stage__fragments">
            <div className="nw-fragment nw-stage__plan">
              <div className="nw-fragment__head">
                <span className="nw-fragment__label">
                  <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {t("planLabel")}
                </span>
                <span className="nw-fragment__demo">{t("demoLabel")}</span>
              </div>
              <p className="nw-fragment__title">{t("planTitle")}</p>
              <p className="nw-fragment__meta">{t("planTime")}</p>
            </div>

            <div className="nw-fragment nw-stage__task">
              <div className="nw-fragment__head">
                <span className="nw-fragment__label">
                  <HugeiconsIcon icon={CheckListIcon} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {t("taskLabel")}
                </span>
                <span className="nw-fragment__demo">{t("demoLabel")}</span>
              </div>
              <div className="nw-task-row">
                <span className="nw-check" aria-hidden="true">
                  <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.5} />
                </span>
                <p className="nw-fragment__title">{t("taskTitle")}</p>
              </div>
              <div className="nw-task-row" style={{ marginBlockStart: "0.6rem" }}>
                <span className="nw-avatar" aria-hidden="true">
                  {t("taskOwner").slice(0, 1)}
                </span>
                <span className="nw-fragment__meta" style={{ margin: 0 }}>
                  {t("taskOwner")}
                </span>
              </div>
            </div>
          </div>
          <p className="nw-stage__caption">{t("demoLabel")}</p>
        </div>
      </div>
    </section>
  );
}
