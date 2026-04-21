'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
          <FiLock size={24} className="text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Login Required</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm">Please sign in to access this page.</p>
        <Link href="/login" className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
          Login / Sign Up
        </Link>
      </div>
    );
  }

  return children;
}
