import { useTranslations } from "next-intl";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  AiChat02Icon,
  Album02Icon,
  Calendar03Icon,
  CheckListIcon,
  Message01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import PhoneScreen from "@/components/PhoneScreen";
import TasksShowcase from "./TasksShowcase";

type FeatureId = "events" | "tasks" | "chat" | "vault" | "ai";

function FeatureCopy({ id, icon }: { id: FeatureId; icon: IconSvgElement }) {
  const t = useTranslations("Features");
  return (
    <div className="nw-feature__copy">
      {/* Where this moment sits in the family's day */}
      <p className="nw-when">{t(`${id}When`)}</p>
      <p className="nw-eyebrow">
        <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} aria-hidden="true" />
        {t(id)}
      </p>
      <h3 className="nw-h3">{t(`${id}Headline`)}</h3>
      <p className="nw-body">{t(`${id}Desc`)}</p>
      <ul className="nw-details">
        {([1, 2] as const).map((n) => (
          <li key={n}>
            <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2.2} aria-hidden="true" />
            {t(`${id}Detail${n}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section id="features" aria-labelledby="features-title">
      <div className="nw-container nw-section" style={{ paddingBlockEnd: 0 }}>
        <header className="nw-features__head">
          <div>
            <p className="nw-eyebrow">{t("eyebrow")}</p>
            <h2 id="features-title" className="nw-h2">
              {t("title")}
            </h2>
          </div>
          <p className="nw-lead">{t("intro")}</p>
        </header>

        <div className="nw-feature-list">
          {/* Plan */}
          <article className="nw-feature">
            <FeatureCopy id="events" icon={Calendar03Icon} />
            <div className="nw-feature__media">
              <div className="nw-board nw-board--sand" aria-hidden="true" />
              <PhoneScreen src="/screenshots/events.png" alt={t("eventsAlt")} />
            </div>
          </article>

          {/* Shared tasks & lists — hands-on */}
          <article className="nw-feature" data-flip>
            <FeatureCopy id="tasks" icon={CheckListIcon} />
            <div className="nw-feature__media">
              <div className="nw-board" aria-hidden="true" />
              <TasksShowcase />
            </div>
          </article>

          {/* Chat */}
          <article className="nw-feature">
            <FeatureCopy id="chat" icon={Message01Icon} />
            <div className="nw-feature__media">
              <div className="nw-board nw-board--lavender" aria-hidden="true" />
              <PhoneScreen src="/screenshots/chat.png" alt={t("chatAlt")} />
            </div>
          </article>
        </div>
      </div>

      {/* Memories: a calmer band */}
      <div className="nw-band" style={{ marginBlockStart: "clamp(4.5rem, 10vw, 8rem)" }}>
        <div className="nw-container">
          <article className="nw-feature" data-flip>
            <FeatureCopy id="vault" icon={Album02Icon} />
            <div className="nw-feature__media" style={{ paddingBlock: 0 }}>
              <PhoneScreen src="/screenshots/vault.png" alt={t("vaultAlt")} />
            </div>
          </article>
        </div>
      </div>

      {/* AI assistant: a supporting capability, presented compactly */}
      <div className="nw-container" style={{ paddingBlockStart: "clamp(4rem, 9vw, 7rem)" }}>
        <article className="nw-support">
          <PhoneScreen src="/screenshots/ai.png" alt={t("aiAlt")} sizes="224px" />
          <div className="nw-support__copy">
            <FeatureCopy id="ai" icon={AiChat02Icon} />
          </div>
        </article>
      </div>
    </section>
  );
}
