'use client';

import { useEffect, useState } from 'react';

export default function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const [code, setCode] = useState<string>('------');

  useEffect(() => {
    let active = true;
    params.then((resolved) => {
      if (!active) return;
      const c = (resolved.code || '').toUpperCase();
      if (c) {
        setCode(c);
        try {
          localStorage.setItem('pending_join_code', c);
        } catch (e) {}
        
        const timer = setTimeout(() => {
          window.location.href = `nawah://join/${c}`;
        }, 250);
        return () => clearTimeout(timer);
      }
    });
    return () => { active = false; };
  }, [params]);

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '48px 24px 64px', textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, borderRadius: 22, background: '#FB943F', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 36 }}>
        N
      </div>
      
      <h1 style={{ fontSize: 24, margin: '0 0 8px', lineHeight: 1.25 }}>You're invited to join a family on Nawah</h1>
      <p style={{ color: '#6b6258', margin: '0 0 24px', lineHeight: 1.5 }}>
        Tap the button below to open Nawah and join. If you don't have the app yet, install it first — your invite will be waiting.
      </p>

      <div style={{ display: 'inline-block', padding: '12px 18px', borderRadius: 12, background: '#fff', border: '1px solid #ead9c5', fontWeight: 700, fontSize: 22, letterSpacing: 4, marginBottom: 32 }}>
        {code}
      </div>

      <a id="open-app" style={{ display: code === '------' ? 'none' : 'block', width: '100%', padding: '14px 20px', borderRadius: 14, background: '#FB943F', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, marginBottom: 12 }} href={`https://nawahfamily.com/join/${code !== '------' ? code : ''}`}>
        Open in Nawah
      </a>
      <a id="ios-store" style={{ display: 'block', width: '100%', padding: '14px 20px', borderRadius: 14, background: '#fff', color: '#1f1c19', border: '1px solid #ead9c5', textDecoration: 'none', fontWeight: 600, fontSize: 16, marginBottom: 12 }} href="https://apps.apple.com/app/id6764706130">
        Get it on the App Store
      </a>
      <a id="play-store" style={{ display: 'block', width: '100%', padding: '14px 20px', borderRadius: 14, background: '#fff', color: '#1f1c19', border: '1px solid #ead9c5', textDecoration: 'none', fontWeight: 600, fontSize: 16, marginBottom: 12 }} href="https://play.google.com/store/apps/details?id=app.nawah.family">
        Get it on Google Play
      </a>

      <p style={{ fontSize: 13, color: '#6b6258', marginTop: 16 }}>
        Or open the Nawah app and enter the code above manually.
      </p>
    </main>
  );
}
