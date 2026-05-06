"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const client = usePostHog();
  const lastUrl = useRef<string>("");

  useEffect(() => {
    const url =
      pathname +
      (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (url !== lastUrl.current) {
      lastUrl.current = url;
      client.capture("$pageview", { $current_url: window.location.href });
    }
  }, [pathname, searchParams, client]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      disable_toolbar: true,
      session_recording: {
        maskAllInputs: false,
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
