
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

export type Language = 'en' | 'pt' | 'es';
export type NavKey = 'bookings' | 'events' | 'marketplace' | 'academy' | 'blog' | 'contato' | 'gravadora';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = Cookies.get('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    Cookies.set('language', language, { expires: 365 });
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
