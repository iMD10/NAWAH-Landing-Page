"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import PhoneScreen from "@/components/PhoneScreen";
import { RING } from "@/components/three/assets";
import { useCan3D, useNearViewport } from "@/components/three/useCan3D";

const CtaCanvas = dynamic(() => import("@/components/three/CtaCanvas"), { ssr: false });

const LABELS = {
  home: "screenHome",
  events: "screenEvents",
  tasks: "screenTasks",
  list: "screenList",
  chat: "screenChat",
  vault: "screenVault",
  ai: "screenAi",
} as const;

const AUTOPLAY_MS = 3200;

/**
 * Download board media. Two real screens render first (and stay as the
 * fallback); with 3D, a browsable ring of every screen replaces them. It turns
 * slowly until the visitor drags it or uses the buttons, pauses on hover or
 * focus, and the caption names the screen in front.
 */
export default function CtaStage() {
  const t = useTranslations("Cta");
  const rtl = useLocale() === "ar";
  const can3D = useCan3D();
  const stageRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(stageRef);

  const [pos, setPos] = useState(0);
  const [ready, setReady] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  const onReady = useCallback(() => setReady(true), []);
  const onInteract = useCallback(() => setAutoplay(false), []);
  const onSettle = useCallback((p: number) => setPos(p), []);

  useEffect(() => {
    if (!ready || !autoplay || paused || !near) return;
    const id = window.setInterval(() => setPos((p) => p + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [ready, autoplay, paused, near]);

  const step = (delta: number) => {
    setAutoplay(false);
    setPos((p) => p + delta);
  };

  const index = ((pos % RING.length) + RING.length) % RING.length;
  const live = can3D && ready;

  return (
    <div
      ref={stageRef}
      className="nw-cta__screens"
      data-3d={live ? "ready" : undefined}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Real screens pinned to the board, cropped by its edge */}
      <PhoneScreen src="/screenshots/hero-main.png" alt={t("homeAlt")} sizes="232px" />
      <PhoneScreen src="/screenshots/vault.png" alt={t("vaultAlt")} sizes="232px" />

      {can3D && (
        <div className="nw-cta__canvas" aria-hidden="true">
          <CtaCanvas
            pos={pos}
            rtl={rtl}
            active={near}
            onSettle={onSettle}
            onInteract={onInteract}
            onReady={onReady}
          />
        </div>
      )}

      {live && (
        <div className="nw-cta__controls" role="group" aria-label={t("gallery")}>
          <button type="button" aria-label={t("prev")} onClick={() => step(-1)}>
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={2} aria-hidden="true" />
          </button>
          <p aria-live={autoplay ? "off" : "polite"}>
            <strong>{t(LABELS[RING[index]])}</strong>
            <span>{t("position", { n: index + 1, total: RING.length })}</span>
          </p>
          <button type="button" aria-label={t("next")} onClick={() => step(1)}>
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
