"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Phone, StudioLights, useScreenTextures } from "./Phone";
import { RING } from "./assets";
const STEP = (Math.PI * 2) / RING.length;
const RADIUS = 2.05;

/*
 * A rolodex of the app: the screens stand on a ring that turns to bring one
 * to the front. `pos` is an unbounded index (so turns always take the short
 * way round); dragging moves the ring directly and settles on the nearest
 * screen, carrying a flick's momentum.
 */
function Scene({
  pos,
  rtl,
  onSettle,
  onInteract,
  onReady,
}: {
  pos: number;
  rtl: boolean;
  onSettle: (pos: number) => void;
  onInteract: () => void;
  onReady: () => void;
}) {
  const { screens, logo } = useScreenTextures(RING);
  const ring = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Group | null)[]>([]);
  const materials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const angle = useRef(-pos * STEP);
  const drag = useRef<{ x: number; base: number; last: number; t: number; v: number } | null>(null);
  const gl = useThree((st) => st.gl);
  const width = useThree((st) => st.size.width);
  const s = rtl ? -1 : 1;

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(raf);
  }, [onReady]);

  useEffect(() => {
    const el = gl.domElement;
    // Dragging about a third of the stage moves one screen.
    const perPx = STEP / Math.max(120, width * 0.34);
    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, base: angle.current, last: e.clientX, t: performance.now(), v: 0 };
      el.setPointerCapture(e.pointerId);
      onInteract();
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const now = performance.now();
      d.v = (e.clientX - d.last) / Math.max(1, now - d.t);
      d.last = e.clientX;
      d.t = now;
      angle.current = d.base + s * (e.clientX - d.x) * perPx;
    };
    const up = () => {
      const d = drag.current;
      if (!d) return;
      drag.current = null;
      const projected = angle.current + s * d.v * 180 * perPx;
      onSettle(Math.round(-projected / STEP));
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, width, s, onSettle, onInteract]);

  useFrame((state, dt) => {
    if (!drag.current) angle.current = THREE.MathUtils.damp(angle.current, -pos * STEP, 4.5, dt);
    const yaw = s * angle.current;
    if (ring.current) {
      ring.current.rotation.y = yaw;
      ring.current.position.y = 0.22 + Math.sin(state.clock.elapsedTime * 0.7) * 0.03;
    }
    // Screens dim and shrink as they turn away; the back of the ring folds
    // away entirely so it never clutters the screen in front.
    RING.forEach((_, i) => {
      const facing = (Math.cos(yaw + s * i * STEP) + 1) / 2;
      const presence = THREE.MathUtils.smoothstep(facing, 0.12, 0.32);
      materials.current[i]?.color.setScalar(0.3 + 0.7 * Math.pow(facing, 1.6));
      const card = cards.current[i];
      if (card) {
        card.scale.setScalar((0.62 + 0.1 * facing) * presence);
        card.visible = presence > 0.001;
      }
    });
  });

  return (
    <group ref={ring} rotation-x={0.06}>
      {RING.map((key, i) => {
        const theta = s * i * STEP;
        return (
          <Phone
            key={key}
            ref={(el) => {
              cards.current[i] = el;
            }}
            screen={screens[key]}
            logo={logo}
            screenMaterialRef={(m) => {
              materials.current[i] = m;
            }}
            position={[Math.sin(theta) * RADIUS, 0, Math.cos(theta) * RADIUS]}
            rotation={[0, theta, 0]}
          />
        );
      })}
    </group>
  );
}

export default function CtaCanvas({
  pos,
  rtl,
  active,
  onSettle,
  onInteract,
  onReady,
}: {
  pos: number;
  rtl: boolean;
  active: boolean;
  onSettle: (pos: number) => void;
  onInteract: () => void;
  onReady: () => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 30, position: [0, 0, 7.4] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <StudioLights />
      <Suspense fallback={null}>
        <Scene pos={pos} rtl={rtl} onSettle={onSettle} onInteract={onInteract} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
