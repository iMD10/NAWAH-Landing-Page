'use client';

import { useEffect, useState } from 'react';
import { Apple, Play, Languages } from 'lucide-react';
import logoImg from '../../logo.png';
import en from '../../../../messages/en.json';
import ar from '../../../../messages/ar.json';

type Locale = 'en' | 'ar';
const messages = { en, ar };

export default function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const [code, setCode] = useState<string>('');
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar') setLocale('ar');
  }, []);

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

  const t = messages[locale].Join;
  const isRtl = locale === 'ar';

  return (
    <main 
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative" 
      style={{ background: 'var(--bg-hero)', direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium backdrop-blur-md"
        >
          <Languages size={16} />
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-lavender/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md w-full glass-dark rounded-[40px] p-8 md:p-12 shadow-2xl border-white/10 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary blur-xl opacity-50" />

        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 overflow-hidden p-2 shadow-2xl transform hover:scale-105 transition-transform"
          style={{
            background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))',
            boxShadow: '0 12px 32px rgba(39, 137, 211, 0.4)'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoImg.src} alt="Nawah Logo" className="w-full h-full object-contain" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight text-white tracking-tight">
          {t.title}
        </h1>
        
        <p className="text-white/90 text-lg mb-10 leading-relaxed font-medium">
          {t.description}
        </p>

        <div className={`inline-block px-10 py-5 rounded-3xl bg-white/5 border border-white/10 font-heading font-bold text-4xl tracking-[0.25em] mb-12 text-primary shadow-inner ${!code ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
          {code || 'NAWAH'}
        </div>

        <div className="space-y-4">
          <a 
            id="open-app" 
            className="flex items-center justify-center w-full px-8 py-5 rounded-2xl text-white font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg" 
            style={{
              background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))',
              boxShadow: '0 8px 24px rgba(39, 137, 211, 0.3)'
            }}
            href={`nawah://join/${code || ''}`}
          >
            {t.button}
          </a>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              id="ios-store" 
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm transition-all hover:bg-white/10 active:scale-[0.98]" 
              href="https://apps.apple.com/app/id6764706130"
            >
              <Apple size={20} />
              {t.appStore}
            </a>
            <a 
              id="play-store" 
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm transition-all hover:bg-white/10 active:scale-[0.98]" 
              href="https://play.google.com/store/apps/details?id=app.nawah.family"
            >
              <Play size={18} />
              {t.playStore}
            </a>
          </div>
        </div>

        <p className="text-sm text-white/60 mt-10 font-medium">
          {t.manual}
        </p>
      </div>
    </main>
  );
}
