'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('studyhouse-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = saved ? saved === 'dark' : prefersDark;
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
    } catch (e) {
      // localStorage unavailable
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      try {
        localStorage.setItem('studyhouse-theme', next ? 'dark' : 'light');
      } catch (e) {}
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark: mounted ? isDark : false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
