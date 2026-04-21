'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { navItems } from '@/lib/data';
import { FiHome, FiBookOpen, FiFileText, FiPlay, FiLayers, FiUpload, FiLayout, FiUsers, FiMail, FiLogOut, FiLogIn, FiSun, FiMoon, FiX, FiClipboard } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

const iconMap = {
  Home: FiHome,
  BookOpen: FiBookOpen,
  FileText: FiFileText,
  Play: FiPlay,
  Brain: BiBrain,
  Layers: FiLayers,
  ClipboardList: FiClipboard,
  Upload: FiUpload,
  LayoutDashboard: FiLayout,
  Users: FiUsers,
  Mail: FiMail,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Listen for sidebar toggle events from header
  useEffect(() => {
    const handler = () => setOpen(prev => !prev);
    window.addEventListener('toggle-sidebar', handler);
    return () => window.removeEventListener('toggle-sidebar', handler);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 sidebar-transition flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="StudyHouse" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">StudyHouse</h1>
              <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-tight">RGPV Resources</p>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-gray-800 dark:hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* User profile area */}
        {user && (
          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  (user.name || user.email || 'U')[0].toUpperCase()
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name || 'Student'}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || FiHome;
            const active = isActive(item.path);
            return (
              <Link key={item.path} href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                <Icon size={18} className={active ? 'text-primary-600 dark:text-primary-400' : ''} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* Auth button */}
          {user ? (
            <button onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <FiLogOut size={18} />
              Logout
            </button>
          ) : (
            <Link href="/login"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <FiLogIn size={18} />
              Login / Sign Up
            </Link>
          )}

          {/* Social */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <a href="https://wa.me/919584452490" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">
              <FaWhatsapp size={18} />
            </a>
            <a href="mailto:geetathakurr13@gmail.com" className="text-gray-400 hover:text-primary-600 transition-colors">
              <MdOutlineMailOutline size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
