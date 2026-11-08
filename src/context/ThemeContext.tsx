'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true); // Default to luxury dark mode
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('novawear_theme') || localStorage.getItem('theme');
      if (saved !== null) {
        setIsDark(saved === 'dark');
      } else {
        setIsDark(true); // default luxury black & gold
      }
    } catch {
      // ignore
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('novawear_theme', isDark ? 'dark' : 'light');
      document.body.classList.remove('light-mode', 'dark-mode');
      document.body.classList.add(isDark ? 'dark-mode' : 'light-mode');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme: isDark ? 'dark' : 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

