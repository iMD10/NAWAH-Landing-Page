"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar03Icon,
  CheckListIcon,
  Home01Icon,
  Link01Icon,
  Message01Icon,
  RefreshIcon,
  Tick02Icon,
  UserAdd01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

type Step = 0 | 1 | 2;

const STEPS: { id: "step1" | "step2" | "step3"; icon: IconSvgElement }[] = [
  { id: "step1", icon: Home01Icon },
  { id: "step2", icon: UserAdd01Icon },
  { id: "step3", icon: UserGroupIcon },
];

const MEMBERS = ["item1Owner", "item2Owner", "item3Owner"] as const;

const STARTS = [
  { key: "start1", icon: Calendar03Icon, href: "#feature-events" },
  { key: "start2", icon: CheckListIcon, href: "#feature-tasks" },
  { key: "start3", icon: Message01Icon, href: "#feature-chat" },
] as const;

/**
 * Example invite code derived from the family name, in the format of the
 * app's real invite links (nawahfamily.com/join/CODE). No ambiguous letters.
 */
function exampleCode(name: string) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let h = 2166136261;
  for (const ch of name) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619);
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[(h >>> 0) % alphabet.length];
    h = Math.imul(h ^ (h >>> 13), 2246822519);
  }
  return code;
}

/**
 * Getting started, made hands-on: name a family, invite people, then jump to
 * the part of the app to start with. The steps match the real app flow
 * (create → invite by link or code → organise); the data is an example.
 */
export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");
  const tDemo = useTranslations("Demo");
  const inputId = useId();
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const card = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // After a step change, put focus on the new step so keyboard and screen
  // reader users land where the content changed (not on the initial render).
  useEffect(() => {
    if (!moved.current) return;
    card.current?.querySelector<HTMLElement>("[data-step-focus]")?.focus({ preventScroll: true });
  }, [step]);

  const go = (next: Step) => {
    moved.current = true;
    setStep(next);
  };

  const family = name.trim() || t("namePlaceholder");
  const code = exampleCode(family);
  const initial = Array.from(family.replace(/^(عائلة|the)\s+/i, "").replace(/^ال/, ""))[0] ?? "";

  return (
    <section id="how-it-works" className="nw-section" aria-labelledby="how-title">
      <div className="nw-container nw-start">
        <div className="nw-start__copy">
          <p className="nw-eyebrow">{t("eyebrow")}</p>
          <h2 id="how-title" className="nw-h2">
            {t("title")}
          </h2>
          <p className="nw-body">{t("intro")}</p>

          <ol className="nw-stepper" aria-label={t("stepsLabel")}>
            {STEPS.map((s, i) => (
              <li key={s.id} data-state={i < step ? "done" : i === step ? "current" : "next"}>
                <button
                  type="button"
                  aria-current={i === step ? "step" : undefined}
                  onClick={() => go(i as Step)}
                >
                  <span className="nw-stepper__num" aria-hidden="true">
                    {i < step ? <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={2.4} /> : i + 1}
                  </span>
                  <span className="nw-stepper__text">
                    <span className="nw-stepper__title">{t(s.id)}</span>
                    <span className="nw-stepper__desc">{t(`${s.id}Desc`)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="nw-board nw-start__stage">
          <p className="sr-only" aria-live="polite">
            {t(STEPS[step].id)}
          </p>
          <div className="nw-start__card" key={step} ref={card}>
            <p className="nw-start__label">{t("demoLabel")}</p>

            {step === 0 && (
              <form
                className="nw-start__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  go(1);
                }}
              >
                <span className="nw-start__badge" aria-hidden="true">
                  <HugeiconsIcon icon={Home01Icon} size={26} strokeWidth={1.7} />
                </span>
                <label htmlFor={inputId} className="nw-start__title">
                  {t("nameLabel")}
                </label>
                <input
                  id={inputId}
                  data-step-focus
                  className="nw-start__input"
                  value={name}
                  maxLength={32}
                  autoComplete="off"
                  placeholder={t("namePlaceholder")}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="nw-start__primary">
                  {t("create")}
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} aria-hidden="true" className="nw-flip-rtl" />
                </button>
              </form>
            )}

            {step === 1 && (
              <div className="nw-start__invite">
                <p className="nw-start__title" data-step-focus tabIndex={-1}>
                  {t("inviteTitle", { family })}
                </p>
                <p className="nw-start__field-label">{t("inviteLink")}</p>
                <p className="nw-start__link" dir="ltr">
                  <HugeiconsIcon icon={Link01Icon} size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    nawahfamily.com/join/
                    <wbr />
                    {code}
                  </span>
                </p>
                <p className="nw-start__field-label">{t("inviteCode")}</p>
                <p className="nw-start__code" dir="ltr" aria-label={code.split("").join(" ")}>
                  {code}
                </p>
                <p className="nw-start__hint">{t("exampleNote")}</p>

                <div className="nw-start__joining">
                  <ul className="nw-start__avatars">
                    {MEMBERS.map((m, i) => (
                      <li key={m} className="nw-avatar" style={{ "--i": i } as CSSProperties} title={tDemo(m)}>
                        {Array.from(tDemo(m))[0]}
                      </li>
                    ))}
                  </ul>
                  <span className="nw-start__joined">{t("joined")}</span>
                </div>

                <button type="button" className="nw-start__primary" onClick={() => go(2)}>
                  {t("inviteNext")}
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} aria-hidden="true" className="nw-flip-rtl" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="nw-start__ready">
                <ul className="nw-start__avatars nw-start__avatars--big" aria-hidden="true">
                  <li className="nw-avatar nw-avatar--you">{initial}</li>
                  {MEMBERS.map((m) => (
                    <li key={m} className="nw-avatar">
                      {Array.from(tDemo(m))[0]}
                    </li>
                  ))}
                </ul>
                <p className="nw-start__title" data-step-focus tabIndex={-1}>
                  {family}
                </p>
                <p className="nw-start__ready-note">
                  <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2.4} aria-hidden="true" />
                  {t("readyTitle")}
                </p>
                <p className="nw-start__hint">{t("readyText")}</p>
                <ul className="nw-start__starts">
                  {STARTS.map((s) => (
                    <li key={s.key}>
                      <a href={s.href}>
                        <HugeiconsIcon icon={s.icon} size={20} strokeWidth={1.8} aria-hidden="true" />
                        {t(s.key)}
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} aria-hidden="true" className="nw-flip-rtl nw-start__go" />
                      </a>
                    </li>
                  ))}
                </ul>
                <button type="button" className="nw-start__secondary" onClick={() => go(0)}>
                  <HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={1.8} aria-hidden="true" />
                  {t("restart")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
