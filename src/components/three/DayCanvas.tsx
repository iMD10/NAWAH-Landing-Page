"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Phone, StudioLights, useScreenTextures } from "./Phone";
import type { ScreenKey } from "./assets";

export const DAY_SCREENS: ScreenKey[] = ["events", "tasks", "list", "chat", "vault", "ai"];

/*
 * One phone pinned beside the family's day. Each time the screen changes it
 * turns a full circle (the Nawah logo passes on the back) and comes round
 * showing the new real screen. Turns accumulate, so fast scrolling queues
 * extra turns instead of snapping.
 */
function Scene({
  screen,
  turn,
  rtl,
  onReady,
}: {
  screen: ScreenKey;
  turn: number;
  rtl: boolean;
  onReady: () => void;
}) {
  const { screens, logo } = useScreenTextures(DAY_SCREENS);
  const phone = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const angle = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const s = rtl ? -1 : 1;
  // The mesh keeps its first texture; later screens are swapped mid-turn below,
  // so a prop change never flashes the new screen before the phone turns.
  const [initial] = useState(screen);
  // Count turns from wherever the visitor was when the scene loaded.
  const [baseTurn] = useState(turn);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const raf = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [onReady]);

  useFrame((state, dt) => {
    const g = phone.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const target = (turn - baseTurn) * Math.PI * 2;
    angle.current = THREE.MathUtils.damp(angle.current, target, 3.2, dt);

    // Swap the screen while its back faces the viewer (last half-turn).
    if (material.current && Math.abs(target - angle.current) < Math.PI) {
      const next = screens[screen];
      if (material.current.map !== next) material.current.map = next;
    }

    // Turned toward the copy column (inline-end), with a slow idle sway.
    g.rotation.y = s * 0.24 + angle.current + Math.sin(t * 0.5) * 0.06 + pointer.current.x * 0.12;
    g.rotation.x = 0.03 + pointer.current.y * 0.06;
    g.position.y = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <Phone
      ref={phone}
      screen={screens[initial]}
      logo={logo}
      screenMaterialRef={material}
      scale={0.95}
    />
  );
}

export default function DayCanvas({
  screen,
  turn,
  rtl,
  active,
  onReady,
}: {
  screen: ScreenKey;
  /** Signed count of screen changes; each step is one full turn. */
  turn: number;
  rtl: boolean;
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 30, position: [0, 0, 6.4] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <StudioLights />
      <Suspense fallback={null}>
        <Scene screen={screen} turn={turn} rtl={rtl} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
