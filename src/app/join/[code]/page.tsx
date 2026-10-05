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
      className="flex-1 flex flex-col items-center justify-center p-6 text-center relative min-h-screen" 
      style={{ background: 'var(--bg-hero)', direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Language Switcher */}
      <div className="absolute top-8 right-8 z-20">
        <button 
          onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-colors bg-[#13152A] hover:bg-[#1f2340]"
        >
          <Languages size={20} />
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="relative z-10 max-w-md w-full rounded-3xl p-10 md:p-12 bg-[#13152A] overflow-hidden">
        <div 
          className="w-20 h-20 rounded-[22px] flex items-center justify-center mx-auto mb-8 overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={logoImg.src} 
            alt="Nawah Logo" 
            className="w-full h-full object-cover block"
          />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight text-white tracking-tight">
          {t.title}
        </h1>
        
        <p className="text-white/90 text-lg mb-10 leading-relaxed font-medium">
          {t.description}
        </p>

        <div className={`inline-block px-10 py-5 rounded-3xl bg-white/5 border border-white/10 font-heading font-bold text-4xl tracking-[0.25em] mb-12 text-primary ${!code ? 'opacity-0' : 'opacity-100'}`}>
          {code || 'NAWAH'}
        </div>

        <div className="space-y-4">
          <a 
            id="open-app" 
            className="flex items-center justify-center w-full px-8 py-4 rounded-xl text-white font-semibold text-lg transition-colors bg-[#2789D3] hover:bg-[#1f74b5]"
            href={`nawah://join/${code || ''}`}
          >
            {t.button}
          </a>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              id="ios-store" 
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm transition-all hover:bg-white/10 " 
              href="https://apps.apple.com/app/id6764706130"
            >
              <Apple size={20} />
              {t.appStore}
            </a>
            <a 
              id="play-store" 
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm transition-all hover:bg-white/10 " 
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
