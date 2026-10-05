"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
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
import { SCREENS, type ScreenKey } from "@/components/three/assets";
import { useCan3D, useMediaQuery, useNearViewport } from "@/components/three/useCan3D";
import TasksShowcase, { type TaskScreen } from "./TasksShowcase";

const DayCanvas = dynamic(() => import("@/components/three/DayCanvas"), { ssr: false });

type FeatureId = "events" | "tasks" | "chat" | "vault" | "ai";

/** The family's day, morning to weekend. AI closes it as a supporting helper. */
const CHAPTERS: { id: FeatureId; icon: IconSvgElement; board: string }[] = [
  { id: "events", icon: Calendar03Icon, board: "sand" },
  { id: "tasks", icon: CheckListIcon, board: "brand" },
  { id: "chat", icon: Message01Icon, board: "lavender" },
  { id: "vault", icon: Album02Icon, board: "paper" },
  { id: "ai", icon: AiChat02Icon, board: "brand" },
];

/** Every screen the pinned stage can show, for the 2D fallback stack. */
const STAGE_SCREENS: { key: ScreenKey; alt: string }[] = [
  { key: "events", alt: "eventsAlt" },
  { key: "tasks", alt: "tasksAlt" },
  { key: "list", alt: "listAlt" },
  { key: "chat", alt: "chatAlt" },
  { key: "vault", alt: "vaultAlt" },
  { key: "ai", alt: "aiAlt" },
];

const DESKTOP = "(min-width: 64rem)";

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

/**
 * Desktop: one phone stays pinned while the day's chapters scroll past; it
 * turns to each chapter's real screen (in 3D where allowed, otherwise a
 * cross-fade). Phones and tablets: each chapter carries its own screen.
 */
export default function FeaturesSection() {
  const t = useTranslations("Features");
  const rtl = useLocale() === "ar";
  const can3D = useCan3D();
  const desktop = useMediaQuery(DESKTOP);

  const [active, setActive] = useState(0);
  const [taskScreen, setTaskScreen] = useState<TaskScreen>("tasks");
  const [turn, setTurn] = useState(0);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  const activeRef = useRef(0);
  const chapters = useRef<(HTMLElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(stageRef);

  // The chapter crossing the middle of the viewport is the active one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.index);
          if (i === activeRef.current) continue;
          setTurn((n) => n + (i > activeRef.current ? 1 : -1));
          activeRef.current = i;
          setActive(i);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    chapters.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const changeTaskScreen = (next: TaskScreen) => {
    if (next === taskScreen) return;
    setTaskScreen(next);
    if (CHAPTERS[activeRef.current].id === "tasks") setTurn((n) => n + 1);
  };

  const stageScreen: ScreenKey = CHAPTERS[active].id === "tasks" ? taskScreen : CHAPTERS[active].id;
  const show3D = can3D && desktop;

  return (
    <section id="features" aria-labelledby="features-title">
      <div className="nw-container nw-section">
        <header className="nw-features__head">
          <div>
            <p className="nw-eyebrow">{t("eyebrow")}</p>
            <h2 id="features-title" className="nw-h2">
              {t("title")}
            </h2>
          </div>
          <p className="nw-lead">{t("intro")}</p>
        </header>

        <div className="nw-day">
          {/* Pinned stage (desktop only) */}
          <div
            ref={stageRef}
            className="nw-board nw-day__stage"
            data-board={CHAPTERS[active].board}
            data-3d={show3D && ready ? "ready" : undefined}
          >
            <div className="nw-screen-swap nw-day__screens">
              {STAGE_SCREENS.map((s) => (
                <div key={s.key} data-active={stageScreen === s.key} aria-hidden={stageScreen !== s.key}>
                  <PhoneScreen src={SCREENS[s.key]} alt={t(s.alt)} sizes="280px" />
                </div>
              ))}
            </div>

            {show3D && (
              <div className="nw-day__canvas" aria-hidden="true">
                <DayCanvas screen={stageScreen} turn={turn} rtl={rtl} active={near} onReady={onReady} />
              </div>
            )}

            <nav className="nw-day__rail" aria-label={t("dayNav")}>
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => chapters.current[i]?.scrollIntoView({ block: "center" })}
                >
                  {t(`${c.id}When`)}
                </button>
              ))}
            </nav>
          </div>

          <div className="nw-day__chapters">
            {CHAPTERS.map((c, i) => (
              <article
                key={c.id}
                ref={(el) => {
                  chapters.current[i] = el;
                }}
                data-index={i}
                data-id={c.id}
                className="nw-chapter"
              >
                <FeatureCopy id={c.id} icon={c.icon} />
                <div className="nw-chapter__media">
                  <div className="nw-board" data-board={c.board} aria-hidden="true" />
                  {c.id === "tasks" ? (
                    <TasksShowcase screen={taskScreen} onScreenChange={changeTaskScreen} />
                  ) : (
                    <PhoneScreen src={SCREENS[c.id]} alt={t(`${c.id}Alt`)} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
