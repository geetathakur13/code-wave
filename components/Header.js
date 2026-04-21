'use client';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';

export default function Header() {
  const { user } = useAuth();
  const { streak } = useApp();
  const pathname = usePathname();

  const breadcrumb = () => {
    if (pathname === '/') return 'Home';
    const parts = pathname.split('/').filter(Boolean);
    return parts.map(p => p.replace(/-/g, ' ').replace(/\[.*\]/, '')).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
            className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <FiMenu size={20} />
          </button>
          <span className="text-sm text-gray-500 dark:text-slate-400 hidden sm:block">{breadcrumb()}</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event('open-search'))}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <FiSearch size={15} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 bg-gray-200 dark:bg-slate-700 rounded font-mono">⌘K</kbd>
          </button>

          {/* Streak */}
          {streak.current > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg" title={`${streak.current} day streak`}>
              <span className="fire-glow">🔥</span>
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{streak.current}</span>
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User avatar / login */}
          {user ? (
            <Link href="/dashboard" className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                (user.name || 'U')[0].toUpperCase()
              )}
            </Link>
          ) : (
            <Link href="/login" className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
