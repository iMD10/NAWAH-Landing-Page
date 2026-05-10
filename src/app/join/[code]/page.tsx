'use client';

import { useEffect, useState } from 'react';
import { Apple, Play, Languages } from 'lucide-react';
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
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <Languages size={16} />
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-lavender/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-md w-full glass-dark rounded-[32px] p-8 md:p-10 shadow-2xl border-white/10">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20">
          <span className="text-white font-bold text-4xl">N</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
          {t.title}
        </h1>
        
        <p className="text-[var(--text-3)] mb-8 leading-relaxed">
          {t.description}
        </p>

        <div className={`inline-block px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-heading font-bold text-3xl tracking-[0.2em] mb-10 text-primary ${!code ? 'opacity-0' : 'opacity-100'}`}>
          {code || 'NAWAH'}
        </div>

        <div className="space-y-4">
          <a 
            id="open-app" 
            className="flex items-center justify-center w-full px-6 py-4 rounded-xl bg-primary text-white font-semibold transition-all hover:bg-primary/90 active:scale-[0.98]" 
            href={`nawah://join/${code || ''}`}
          >
            {t.button}
          </a>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              id="ios-store" 
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm transition-all hover:bg-white/10 active:scale-[0.98]" 
              href="https://apps.apple.com/app/id6764706130"
            >
              <Apple size={18} />
              {t.appStore}
            </a>
            <a 
              id="play-store" 
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm transition-all hover:bg-white/10 active:scale-[0.98]" 
              href="https://play.google.com/store/apps/details?id=app.nawah.family"
            >
              <Play size={16} />
              {t.playStore}
            </a>
          </div>
        </div>

        <p className="text-xs text-[var(--text-5)] mt-8">
          {t.manual}
        </p>
      </div>
    </main>
  );
}
