"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  CheckListIcon,
  Image01Icon,
  Message01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import logoImg from "@/app/logo.png";

/*
 * Five everyday family tools start scattered and gather around Nawah when the
 * board scrolls into view. Positions are multiples of the ring radius:
 * g = gathered (a ring around the logo), s = scattered (towards the edges).
 * Without JS or with reduced motion, the board simply shows the gathered state.
 */
const tiles = [
  { key: "chat", icon: Message01Icon, gx: 0, gy: -1, sx: -1.55, sy: -1.15, sr: "-12deg" },
  { key: "calendar", icon: Calendar03Icon, gx: 0.95, gy: -0.31, sx: 1.6, sy: -0.95, sr: "9deg" },
  { key: "tasks", icon: CheckListIcon, gx: 0.59, gy: 0.81, sx: 1.25, sy: 1.15, sr: "-6deg" },
  { key: "photos", icon: Image01Icon, gx: -0.59, gy: 0.81, sx: -0.35, sy: 1.25, sr: "11deg" },
  { key: "notes", icon: Note01Icon, gx: -0.95, gy: -0.31, sx: -1.6, sy: 0.35, sr: "7deg" },
] as const;

export default function ProblemSection() {
  const t = useTranslations("Problem");
  const tBrand = useTranslations("Brand");
  const boardRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"gathered" | "scattered">("gathered");

  useEffect(() => {
    const el = boardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Let the scattered layout paint once before gathering.
          if (first) {
            setState("scattered");
            requestAnimationFrame(() => requestAnimationFrame(() => setState("gathered")));
          } else {
            setState("gathered");
          }
          io.disconnect();
        } else if (first) {
          setState("scattered");
        }
        first = false;
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="nw-section" aria-labelledby="story-title">
      <div className="nw-container nw-story">
        <div className="nw-story__copy">
          <h2 id="story-title" className="nw-h2">
            {t("title")}
          </h2>
          <p className="nw-body">{t("description")}</p>
        </div>

        <div ref={boardRef} className="nw-board nw-board--paper nw-gather" data-state={state}>
          <ul className="nw-gather__tiles">
            {tiles.map(({ key, icon, ...pos }, i) => (
              <li
                key={key}
                className="nw-tile"
                style={
                  {
                    "--i": i,
                    "--gx": pos.gx,
                    "--gy": pos.gy,
                    "--sx": pos.sx,
                    "--sy": pos.sy,
                    "--sr": pos.sr,
                  } as CSSProperties
                }
              >
                <span className="nw-tile__icon" aria-hidden="true">
                  <HugeiconsIcon icon={icon} size={22} strokeWidth={1.7} />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="nw-gather__hub">
            <Image src={logoImg} alt="" width={80} height={80} sizes="80px" />
            <span>{tBrand("name")}</span>
          </div>

          <p className="nw-gather__caption" aria-hidden="true">
            {state === "scattered" ? t("before") : t("after")}
          </p>
        </div>
      </div>
    </section>
  );
}
