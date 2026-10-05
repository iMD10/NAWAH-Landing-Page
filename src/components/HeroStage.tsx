"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import PhoneScreen from "@/components/PhoneScreen";
import { useCan3D, useNearViewport } from "@/components/three/useCan3D";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

/**
 * Hero product stage. The real home screenshot renders first (and stays as the
 * fallback); where 3D is allowed, the three.js scene loads afterwards and
 * cross-fades in once its textures are ready.
 */
export default function HeroStage({ screenAlt }: { screenAlt: string }) {
  const rtl = useLocale() === "ar";
  const can3D = useCan3D();
  const stageRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(stageRef);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <div ref={stageRef} className="nw-stage" data-3d={can3D && ready ? "ready" : undefined}>
      <div className="nw-board nw-stage__board" aria-hidden="true" />
      <PhoneScreen
        src="/screenshots/hero-main.png"
        alt={screenAlt}
        className="nw-stage__phone"
        sizes="(min-width: 1024px) 296px, 264px"
        preload
      />
      {can3D && (
        <div className="nw-stage__canvas" aria-hidden="true">
          <HeroCanvas rtl={rtl} active={near} onReady={onReady} />
        </div>
      )}
    </div>
  );
}
