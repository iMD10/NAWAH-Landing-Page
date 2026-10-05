"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Album02Icon,
  Calendar03Icon,
  CheckListIcon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import logoImg from "@/app/logo.png";

/*
 * Four everyday family notes, each living somewhere different (another chat,
 * one person's phone, the fridge, a camera roll), assemble into one tidy
 * Nawah stack. sx/sy are offsets from the tidy position in units of --spread-x/-y
 * (sy grows down the list, so scattered notes never cover each other);
 * sr is the scattered tilt. Without JS or with reduced motion the board shows
 * the tidy state, and the visitor can switch between the two at any time.
 */
const notes = [
  { key: "chat", icon: Message01Icon, sx: -0.9, sy: -0.45, sr: "-6deg" },
  { key: "calendar", icon: Calendar03Icon, sx: 0.8, sy: 0, sr: "5deg" },
  { key: "list", icon: CheckListIcon, sx: -0.7, sy: 0.3, sr: "3deg" },
  { key: "memory", icon: Album02Icon, sx: 0.6, sy: 0.6, sr: "-4deg" },
] as const;

type View = "scattered" | "gathered";

export default function ProblemSection() {
  const t = useTranslations("Problem");
  const tBrand = useTranslations("Brand");
  const boardRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("gathered");
  // Once the visitor picks a view, the automatic assembly never overrides it.
  const chosen = useRef(false);

  // Play the assembly once when the board first scrolls into view.
  useEffect(() => {
    const el = boardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let first = true;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (first && !chosen.current) setView("scattered");
          // Let the scattered layout paint, then hold it briefly so it reads.
          timer = window.setTimeout(() => {
            if (!chosen.current) setView("gathered");
          }, first ? 900 : 0);
          io.disconnect();
        } else if (first && !chosen.current) {
          setView("scattered");
        }
        first = false;
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="nw-section" aria-labelledby="story-title">
      <div className="nw-container nw-story">
        <div className="nw-story__copy">
          <h2 id="story-title" className="nw-h2">
            {t("title")}
          </h2>
          <p className="nw-body">{t("description")}</p>

          <div className="nw-segmented" role="group" aria-label={t("viewPicker")}>
            {(["scattered", "gathered"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => {
                  chosen.current = true;
                  setView(v);
                }}
              >
                {v === "scattered" ? t("before") : t("after")}
              </button>
            ))}
          </div>
        </div>

        <div ref={boardRef} className="nw-board nw-board--paper nw-gather" data-state={view}>
          <p className="nw-gather__caption">{t("demoLabel")}</p>

          <div className="nw-gather__stack">
            <div className="nw-gather__hub">
              <Image src={logoImg} alt="" width={40} height={40} sizes="40px" />
              <span>{tBrand("name")}</span>
            </div>

            <ul className="nw-gather__notes">
              {notes.map(({ key, icon, ...pos }, i) => (
                <li
                  key={key}
                  className="nw-note-card"
                  style={
                    { "--i": i, "--sx": pos.sx, "--sy": pos.sy, "--sr": pos.sr } as CSSProperties
                  }
                >
                  <span className="nw-note-card__icon" aria-hidden="true">
                    <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
                  </span>
                  <span className="nw-note-card__body">
                    <span className="nw-note-card__text">{t(`${key}Note`)}</span>
                    <span className="nw-note-card__where" data-when="scattered">
                      {t(`${key}Before`)}
                    </span>
                    <span className="nw-note-card__where" data-when="gathered">
                      {t(`${key}After`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
