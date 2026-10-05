import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

let webgl: boolean | undefined;

function hasWebGL() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      webgl = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return !window.matchMedia(REDUCED).matches && !saveData && hasWebGL();
}

/**
 * Whether to load the 3D scenes: WebGL available, no reduced-motion
 * preference and no Data Saver. Always false on the server, so the static
 * screenshots render first and stay as the fallback.
 */
export function useCan3D() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True while the element is near the viewport (used to pause render loops). */
export function useNearViewport(ref: RefObject<Element | null>, margin = "150px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return near;
}

/** Live `matchMedia` result; false on the server. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
