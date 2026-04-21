'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { subjects } from '@/lib/data';
import { FiSearch, FiX, FiBookOpen, FiArrowRight } from 'react-icons/fi';

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const results = query.trim().length > 0
    ? subjects.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.slug.includes(query.toLowerCase()) ||
        s.units.some(u => u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.topics.some(t => t.toLowerCase().includes(query.toLowerCase()))
        )
      ).slice(0, 8)
    : [];

  const pages = query.trim().length > 0
    ? [
        { name: 'PYQ — Previous Year Questions', path: '/pyq' },
        { name: 'Video Lectures', path: '/videos' },
        { name: 'Quiz', path: '/quiz' },
        { name: 'Flashcards', path: '/flashcards' },
        { name: 'Syllabus', path: '/syllabus' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Upload Notes', path: '/upload' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ].filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const allResults = [...results.map(s => ({ type: 'subject', ...s })), ...pages.map(p => ({ type: 'page', ...p }))];

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const openHandler = () => setOpen(true);
    window.addEventListener('keydown', handler);
    window.addEventListener('open-search', openHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('open-search', openHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const navigate = useCallback((item) => {
    setOpen(false);
    if (item.type === 'subject') router.push(`/subject/${item.slug}`);
    else router.push(item.path);
  }, [router]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, allResults.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter' && allResults[selected]) navigate(allResults[selected]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="flex items-center gap-3 px-5 border-b border-gray-200 dark:border-slate-700">
          <FiSearch className="text-gray-400 flex-shrink-0" size={18} />
          <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search subjects, topics, pages..."
            className="flex-1 py-4 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400" />
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <FiX size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {allResults.length === 0 && query.trim() && (
            <p className="text-center text-gray-500 dark:text-slate-400 py-8 text-sm">No results found for &quot;{query}&quot;</p>
          )}
          {!query.trim() && (
            <p className="text-center text-gray-400 dark:text-slate-500 py-8 text-sm">Start typing to search...</p>
          )}
          {allResults.map((item, i) => (
            <button key={i} onClick={() => navigate(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
                ${i === selected ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'subject' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'}`}>
                {item.type === 'subject' ? <FiBookOpen size={14} /> : <FiArrowRight size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                {item.type === 'subject' && (
                  <p className="text-xs text-gray-500 dark:text-slate-400">Semester {item.semester} • {item.code}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-slate-800 flex items-center gap-4 text-xs text-gray-400">
          <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded font-mono">↵</kbd> open</span>
          <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
