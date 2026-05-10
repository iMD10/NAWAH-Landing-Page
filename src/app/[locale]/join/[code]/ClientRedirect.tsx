'use client';

import { useEffect } from 'react';

export default function ClientRedirect({ code }: { code: string }) {
  useEffect(() => {
    if (code) {
      try {
        localStorage.setItem('pending_join_code', code);
      } catch (e) {}

      const timer = setTimeout(() => {
        window.location.href = `nawah://join/${code}`;
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [code]);

  return null;
}
