"use client";

import { useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import PhoneScreen from "@/components/PhoneScreen";

const screens = [
  { id: "tasks", src: "/screenshots/tasks.png", label: "screenTasks", alt: "tasksAlt" },
  { id: "list", src: "/screenshots/step-1.png", label: "screenList", alt: "listAlt" },
] as const;

const demoItems = ["item1", "item2", "item3"] as const;

/** Real task/list screens with a switcher, beside a small hands-on checklist demo. */
export default function TasksShowcase() {
  const t = useTranslations("Features");
  const tDemo = useTranslations("Demo");
  const [screen, setScreen] = useState<(typeof screens)[number]["id"]>("tasks");
  const [done, setDone] = useState<Record<string, boolean>>({ item1: true });
  const [lastChange, setLastChange] = useState<string | null>(null);

  const count = demoItems.filter((id) => done[id]).length;
  const total = demoItems.length;

  const status =
    count === total
      ? tDemo("allDone")
      : lastChange
        ? done[lastChange]
          ? tDemo("itemDone", { item: tDemo(lastChange) })
          : tDemo("itemUndone", { item: tDemo(lastChange) })
        : tDemo("hint");

  return (
    <div className="nw-tasks-media">
      <div className="nw-segmented" role="group" aria-label={t("screenPicker")}>
        {screens.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={screen === s.id}
            onClick={() => setScreen(s.id)}
          >
            {t(s.label)}
          </button>
        ))}
      </div>

      <div className="nw-screen-swap">
        {screens.map((s) => (
          <div key={s.id} data-active={screen === s.id} aria-hidden={screen !== s.id}>
            <PhoneScreen src={s.src} alt={t(s.alt)} sizes="(min-width: 896px) 280px, 256px" />
          </div>
        ))}
      </div>

      <aside className="nw-demo" aria-labelledby="family-demo-title">
        <span className="nw-demo__caption">{tDemo("caption")}</span>
        <h4 id="family-demo-title" className="nw-demo__title">
          {tDemo("title")}
        </h4>
        <div className="nw-demo__progress">
          <span className="nw-demo__bar" aria-hidden="true">
            <span style={{ "--p": `${(count / total) * 100}%` } as CSSProperties} />
          </span>
          <span>{tDemo("progress", { done: count, total })}</span>
        </div>
        <ul className="nw-demo__list">
          {demoItems.map((id) => (
            <li key={id} className="nw-demo__item">
              <label className="nw-demo__task">
                <input
                  type="checkbox"
                  checked={!!done[id]}
                  onChange={(e) => {
                    setDone((d) => ({ ...d, [id]: e.target.checked }));
                    setLastChange(id);
                  }}
                />
                <span className="nw-demo__box" aria-hidden="true">
                  <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.6} />
                </span>
                <span className="nw-demo__text">{tDemo(id)}</span>
                <span className="sr-only">({tDemo(`${id}Owner`)})</span>
                <span className="nw-avatar" aria-hidden="true" title={tDemo(`${id}Owner`)}>
                  {tDemo(`${id}Owner`).slice(0, 1)}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <p className="nw-demo__status" role="status">
          {status}
        </p>
      </aside>
    </div>
  );
}
