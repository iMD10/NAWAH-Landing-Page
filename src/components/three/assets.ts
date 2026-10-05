import { getImageProps } from "next/image";
import logoImg from "@/app/logo.png";

/** Real Nawah app screenshots (1170×2532) used as screen textures. */
export const SCREENS = {
  home: "/screenshots/hero-main.png",
  events: "/screenshots/events.png",
  tasks: "/screenshots/tasks.png",
  list: "/screenshots/step-1.png",
  chat: "/screenshots/chat.png",
  vault: "/screenshots/vault.png",
  ai: "/screenshots/ai.png",
} as const;

export type ScreenKey = keyof typeof SCREENS;

/** Every real screen, in the order of a family's day (download-board ring). */
export const RING: ScreenKey[] = ["home", "events", "tasks", "list", "chat", "vault", "ai"];

/*
 * Textures go through the Next image optimizer (≈768px wide WebP/AVIF)
 * instead of the 0.2–1.5 MB source PNGs.
 */
export function screenTextureUrl(key: ScreenKey) {
  return getImageProps({ src: SCREENS[key], alt: "", width: 384, height: 831 }).props.src;
}

export function logoTextureUrl() {
  return getImageProps({ src: logoImg, alt: "", width: 240, height: 240 }).props.src;
}
