import { useTranslations } from "next-intl";
import StoreButtons from "@/components/StoreButtons";
import HeroStage from "@/components/HeroStage";

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

        {/* Product stage: the real home screen, joined in 3D by four more real screens */}
        <HeroStage screenAlt={t("screenAlt")} hint={t("stageHint")} />
      </div>
    </section>
  );
}
