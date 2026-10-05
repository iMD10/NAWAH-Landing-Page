import { useTranslations } from "next-intl";
import Image from "next/image";
import StoreButtons from "@/components/StoreButtons";
import CtaStage from "@/components/CtaStage";
import logoImg from "@/app/logo.png";

export default function CtaSection() {
  const t = useTranslations("Cta");

  return (
    <section id="download" className="nw-section" aria-labelledby="download-title">
      <div className="nw-container">
        <div className="nw-cta">
          <div className="nw-cta__copy">
            <Image src={logoImg} alt="" width={56} height={56} sizes="56px" className="nw-cta__logo" />
            <h2 id="download-title" className="nw-h2">
              {t("title")}
            </h2>
            <p className="nw-cta__sub">{t("subtext")}</p>
            <StoreButtons tone="light" />

            {/* Desktop visitors: hand off to the phone. Hidden on touch screens. */}
            <div className="nw-cta__qr">
              <Image src="/qr.png" alt={t("qrAlt")} width={370} height={370} sizes="88px" />
              <p>
                <strong>{t("qrTitle")}</strong>
                {t("qrText")}
              </p>
            </div>
          </div>

          {/* Real screens: two pinned to the board, or a browsable 3D ring of all of them */}
          <CtaStage />
        </div>
      </div>
    </section>
  );
}
