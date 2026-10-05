"use client";

import { forwardRef, useMemo, useRef } from "react";
import { useFrame, useLoader, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { logoTextureUrl, screenTextureUrl, type ScreenKey } from "./assets";

/* Screen matches the 1170×2532 screenshots; the body adds a slim bezel. */
export const SCREEN_H = 2.56;
export const SCREEN_W = (SCREEN_H * 1170) / 2532;
const BEZEL = 0.065;
const BODY_W = SCREEN_W + BEZEL * 2;
const BODY_H = SCREEN_H + BEZEL * 2;
const BEVEL = 0.03;
const DEPTH = 0.08;
/** z of the front glass after centring the extruded body. */
const FRONT = DEPTH / 2 + BEVEL;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Flat rounded rectangle with 0–1 UVs across its bounds (ShapeGeometry's are in shape units). */
function roundedPlane(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 10);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  }
  return g;
}

// Shared by every phone in every scene.
const geometry = {
  // The bevel grows the outline by BEVEL on each side, so start that much smaller.
  body: (() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(BODY_W - BEVEL * 2, BODY_H - BEVEL * 2, 0.19), {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 6,
      curveSegments: 18,
    });
    g.center();
    return g;
  })(),
  screen: roundedPlane(SCREEN_W, SCREEN_H, 0.17),
  logo: roundedPlane(0.5, 0.5, 0.12),
};

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: "#13152A",
  roughness: 0.42,
  metalness: 0.35,
});

/* A soft diagonal light streak drawn once, cloned per phone. */
let glintSource: THREE.CanvasTexture | null = null;
function glintTexture() {
  if (!glintSource) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 256, 256, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.44, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.2)");
    g.addColorStop(0.55, "rgba(255,255,255,0.05)");
    g.addColorStop(0.68, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    glintSource = new THREE.CanvasTexture(c);
  }
  const t = glintSource.clone();
  t.needsUpdate = true;
  return t;
}

const facing = new THREE.Vector3();

/** Glass reflection that slides across the screen as the phone turns. */
function Glint() {
  const mesh = useRef<THREE.Mesh>(null);
  const map = useMemo(() => glintTexture(), []);
  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    m.getWorldDirection(facing);
    const tex = (m.material as THREE.MeshBasicMaterial).map;
    if (tex) tex.offset.set(-facing.x * 0.9, facing.y * 0.6);
  });
  return (
    <mesh ref={mesh} geometry={geometry.screen} position={[0, 0, FRONT + 0.004]}>
      <meshBasicMaterial map={map} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/** Texture loader that returns screenshots ready to draw (sRGB, sharp at an angle). */
class ScreenTextureLoader extends THREE.TextureLoader {
  load(
    url: string,
    onLoad?: (texture: THREE.Texture<HTMLImageElement>) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (err: unknown) => void
  ) {
    return super.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        onLoad?.(texture);
      },
      onProgress,
      onError
    );
  }
}

/** Loads the given app screens plus the logo; suspends until ready. */
export function useScreenTextures<K extends ScreenKey>(keys: readonly K[]) {
  const urls = useMemo(() => [...keys.map(screenTextureUrl), logoTextureUrl()], [keys]);
  const loaded = useLoader(ScreenTextureLoader, urls);

  return useMemo(() => {
    const screens = Object.fromEntries(keys.map((k, i) => [k, loaded[i]])) as Record<K, THREE.Texture>;
    return { screens, logo: loaded[loaded.length - 1] };
  }, [keys, loaded]);
}

type PhoneProps = ThreeElements["group"] & {
  screen: THREE.Texture;
  logo?: THREE.Texture;
  /** Receives the screen material so a scene can swap textures without re-rendering. */
  screenMaterialRef?: React.Ref<THREE.MeshBasicMaterial>;
};

/** A Nawah phone: navy body, real screenshot on the glass, logo on the back. */
export const Phone = forwardRef<THREE.Group, PhoneProps>(function Phone(
  { screen, logo, screenMaterialRef, ...props },
  ref
) {
  return (
    <group ref={ref} {...props}>
      <mesh geometry={geometry.body} material={bodyMaterial} />
      <mesh geometry={geometry.screen} position={[0, 0, FRONT + 0.002]}>
        <meshBasicMaterial ref={screenMaterialRef} map={screen} toneMapped={false} />
      </mesh>
      <Glint />
      {logo && (
        <mesh geometry={geometry.logo} position={[0, 0.55, -FRONT - 0.002]} rotation={[0, Math.PI, 0]}>
          <meshBasicMaterial map={logo} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
});

/** Soft key light, a cool brand-blue rim that catches the bevel, and fill. */
export function StudioLights() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 6]} intensity={2.2} />
      <directionalLight position={[-5, 2, -4]} intensity={4} color="#4AA3E6" />
      <directionalLight position={[4, -3, -3]} intensity={2} color="#DFBCF4" />
    </>
  );
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
