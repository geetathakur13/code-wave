'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getLocal, setLocal } from '@/lib/storage';

const AppContext = createContext({
  bookmarks: [], toggleBookmark: () => {},
  progress: {}, updateProgress: () => {},
  streak: { current: 0, longest: 0, lastDate: '' },
  quizHistory: [], addQuizResult: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [progress, setProgress] = useState({});
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastDate: '' });
  const [quizHistory, setQuizHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    setBookmarks(getLocal('sh-bookmarks', []));
    setProgress(getLocal('sh-progress', {}));
    setStreak(getLocal('sh-streak', { current: 0, longest: 0, lastDate: '' }));
    setQuizHistory(getLocal('sh-quiz-history', []));
  }, []);

  // Update streak on visit
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStreak(prev => {
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let current = prev.lastDate === yesterday ? prev.current + 1 : 1;
      const longest = Math.max(current, prev.longest);
      const next = { current, longest, lastDate: today };
      setLocal('sh-streak', next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((slug) => {
    setBookmarks(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
      setLocal('sh-bookmarks', next);
      return next;
    });
  }, []);

  const updateProgress = useCallback((slug, unitId) => {
    setProgress(prev => {
      const subj = prev[slug] || { completedUnits: [] };
      const units = subj.completedUnits.includes(unitId)
        ? subj.completedUnits.filter(u => u !== unitId)
        : [...subj.completedUnits, unitId];
      const next = { ...prev, [slug]: { completedUnits: units } };
      setLocal('sh-progress', next);
      return next;
    });
  }, []);

  const addQuizResult = useCallback((result) => {
    setQuizHistory(prev => {
      const next = [result, ...prev].slice(0, 50);
      setLocal('sh-quiz-history', next);
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      bookmarks, toggleBookmark,
      progress, updateProgress,
      streak,
      quizHistory, addQuizResult,
    }}>
      {children}
    </AppContext.Provider>
  );
}
