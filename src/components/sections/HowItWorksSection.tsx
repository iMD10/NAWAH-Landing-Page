import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, UserAdd01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";

const steps = [
  { id: "step1", icon: Home01Icon },
  { id: "step2", icon: UserAdd01Icon },
  { id: "step3", icon: UserGroupIcon },
] as const;

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section id="how-it-works" className="nw-section" aria-labelledby="how-title">
      <div className="nw-container">
        <p className="nw-eyebrow">{t("eyebrow")}</p>
        <h2 id="how-title" className="nw-h2" style={{ marginBlockStart: "1.1rem" }}>
          {t("title")}
        </h2>

        <ol className="nw-steps">
          {steps.map(({ id, icon }, index) => (
            <li key={id} className="nw-step">
              <span className="nw-step__num" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="nw-step__title">
                <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} aria-hidden="true" />
                {t(id)}
              </h3>
              <p>{t(`${id}Desc`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
