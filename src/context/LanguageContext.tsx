'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import arTranslations from '@/locales/ar';
import enTranslations from '@/locales/en';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const translations: Record<Language, any> = {
  ar: arTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Arabic (AR) as strictly required
  const [language, setLanguageState] = useState<Language>('ar');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('novawear_lang') as Language | null;
      if (savedLang === 'en' || savedLang === 'ar') {
        setLanguageState(savedLang);
      } else {
        // Default to Arabic on first visit
        setLanguageState('ar');
        localStorage.setItem('novawear_lang', 'ar');
      }
    } catch {
      // ignore storage access errors
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('novawear_lang', language);
      } catch {
        // ignore
      }
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      
      document.body.classList.remove('lang-ar', 'lang-en', 'rtl', 'ltr');
      document.body.classList.add(
        language === 'ar' ? 'lang-ar' : 'lang-en',
        language === 'ar' ? 'rtl' : 'ltr'
      );
    }
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const t = useCallback(
    (path: string, fallback?: string, params?: Record<string, string | number>): string => {
      const keys = path.split('.');
      let current = translations[language];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          current = undefined;
          break;
        }
      }

      // Respect strict language separation: never leak opposite language fallback
      let result = typeof current === 'string' ? current : fallback || path;

      // Replace template params like {count} or {remaining} or {year}
      if (params && typeof result === 'string') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        });
      }

      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isRTL: language === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
