'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type TranslationSchema } from '@/lib/translations';

export type Language = 'uk' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
  currentTranslations: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uk');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'uk' || saved === 'en' || saved === 'ru')) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = 'uk';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // Helper to get nested translations, e.g. "nav.philosophy"
  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to default (uk)
        let fallback: any = translations['uk'];
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
export type { TranslationSchema, RoomTranslation, ExperienceTranslation } from '@/lib/translations';
