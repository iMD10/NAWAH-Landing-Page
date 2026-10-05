"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Phone, StudioLights, clamp01, easeInOutCubic, easeOutCubic, useScreenTextures } from "./Phone";
import type { ScreenKey } from "./assets";

/*
 * The family's day assembling around Nawah: four real screens fly in from
 * scattered positions and dock around the home screen, then drift gently
 * with the pointer and spread out as the hero scrolls away.
 * Positions are for LTR (copy on the left); RTL mirrors x and yaw.
 */
const CARDS: {
  key: ScreenKey;
  at: [number, number, number];
  rot: [number, number, number];
  from: [number, number, number];
}[] = [
  { key: "events", at: [-1.45, 0.9, -1.1], rot: [0.05, 0.42, 0.06], from: [-4.5, 3.2, -6] },
  { key: "chat", at: [1.5, 0.5, -1.4], rot: [-0.02, -0.5, -0.05], from: [5, 1.6, -7] },
  { key: "tasks", at: [-1.3, -0.82, 0.25], rot: [-0.06, 0.38, -0.05], from: [-4, -3.6, 3] },
  { key: "vault", at: [1.35, -0.95, 0], rot: [0.04, -0.42, 0.07], from: [4.2, -3.8, 2.5] },
];
const KEYS: ScreenKey[] = ["home", ...CARDS.map((c) => c.key)];
const CARD_SCALE = 0.42;
const SPIN = 0.85; // seconds for a swap turn

type Spin = { start: number | null; to: ScreenKey; swapped: boolean };

function Scene({ rtl, onReady }: { rtl: boolean; onReady: () => void }) {
  const { screens, logo } = useScreenTextures(KEYS);
  const s = rtl ? -1 : 1;
  const rig = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Group | null)[]>([]);
  const start = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const viewport = useThree((st) => st.viewport);

  // Tap a floating screen to bring it into the main phone. Slot 0 is the main
  // phone; slots 1–4 are the cards. Both turn once and trade screens mid-turn.
  const slots = useRef<ScreenKey[]>([...KEYS]);
  const spins = useRef<(Spin | null)[]>(KEYS.map(() => null));
  const materials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const hovered = useRef<number | null>(null);
  const lift = useRef(CARDS.map(() => 0));

  const swap = (card: number) => {
    const slot = card + 1;
    if (spins.current[0] || spins.current[slot]) return;
    const next = slots.current[slot];
    slots.current[slot] = slots.current[0];
    slots.current[0] = next;
    spins.current[0] = { start: null, to: next, swapped: false };
    spins.current[slot] = { start: null, to: slots.current[slot], swapped: false };
  };

  /** Extra yaw for a slot that is mid-swap; trades its texture at the half-turn. */
  const spinFor = (slot: number, now: number) => {
    const spin = spins.current[slot];
    if (!spin) return 0;
    if (spin.start === null) spin.start = now;
    const p = clamp01((now - spin.start) / SPIN);
    const mat = materials.current[slot];
    if (p >= 0.5 && !spin.swapped && mat) {
      mat.map = screens[spin.to];
      spin.swapped = true;
    }
    if (p >= 1) spins.current[slot] = null;
    return easeInOutCubic(p) * Math.PI * 2;
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    // Textures are uploaded; let the first frame paint before revealing.
    const raf = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, [onReady]);

  // Narrow stages pull the cards in and send them behind the phone, so they
  // peek out at its sides instead of covering the screen.
  const fit = Math.min(1, (viewport.width / 2 - 0.3) / 1.6);
  const behind = fit < 0.8;

  useFrame((state, dt) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    const scroll = clamp01(window.scrollY / 700);

    if (rig.current) {
      const r = rig.current.rotation;
      r.x = THREE.MathUtils.damp(r.x, pointer.current.y * 0.1, 3, dt);
      r.y = THREE.MathUtils.damp(r.y, pointer.current.x * 0.16, 3, dt);
      rig.current.position.y = scroll * 0.5;
    }

    if (phone.current) {
      const e = easeOutCubic(clamp01(t / 1.4));
      phone.current.position.y = THREE.MathUtils.lerp(-0.7, 0, e) + Math.sin(t * 0.7) * 0.03;
      phone.current.rotation.y = s * (-0.3 + (1 - e) * 0.9 - scroll * 0.35 + spinFor(0, t));
      phone.current.rotation.x = 0.04;
    }

    CARDS.forEach((c, i) => {
      const g = cards.current[i];
      if (!g) return;
      const e = easeOutCubic(clamp01((t - 0.25 - i * 0.14) / 1.5));
      const spread = 1 + scroll * 0.45;
      const bob = Math.sin(t * 0.9 + i * 1.7) * 0.05;
      g.position.set(
        s * THREE.MathUtils.lerp(c.from[0], c.at[0] * fit * spread, e),
        THREE.MathUtils.lerp(c.from[1], c.at[1] * spread, e) + bob,
        THREE.MathUtils.lerp(c.from[2], behind ? -0.5 - Math.abs(c.at[2]) : c.at[2], e)
      );
      g.rotation.set(
        c.rot[0] + (1 - e) * 0.6,
        s * (c.rot[1] + (1 - e) * 1.4 + spinFor(i + 1, t)),
        s * (c.rot[2] + (1 - e) * 0.5 + Math.sin(t * 0.6 + i) * 0.015)
      );
      lift.current[i] = THREE.MathUtils.damp(lift.current[i], hovered.current === i ? 1 : 0, 10, dt);
      g.scale.setScalar(CARD_SCALE * THREE.MathUtils.lerp(0.4, 1, e) * (1 + lift.current[i] * 0.08));
    });
  });

  return (
    <group ref={rig}>
      <Phone
        ref={phone}
        screen={screens.home}
        logo={logo}
        screenMaterialRef={(m) => {
          materials.current[0] = m;
        }}
      />
      {CARDS.map((c, i) => (
        <Phone
          key={c.key}
          ref={(el) => {
            cards.current[i] = el;
          }}
          screen={screens[c.key]}
          screenMaterialRef={(m) => {
            materials.current[i + 1] = m;
          }}
          scale={0}
          onClick={(e) => {
            e.stopPropagation();
            swap(i);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hovered.current = i;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (hovered.current === i) hovered.current = null;
            document.body.style.cursor = "";
          }}
        />
      ))}
    </group>
  );
}

export default function HeroCanvas({
  rtl,
  active,
  onReady,
}: {
  rtl: boolean;
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 30, position: [0, 0, 6.6] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <StudioLights />
      <Suspense fallback={null}>
        <Scene rtl={rtl} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
