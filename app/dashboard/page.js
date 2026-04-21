'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { getSubjectBySlug } from '@/lib/data';
import Footer from '@/components/Footer';
import { FiBookmark, FiAward, FiTrendingUp, FiDownload, FiClock, FiArrowRight } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';

export default function DashboardPage() {
  const [tab, setTab] = useState('overview');

  return (
    <ProtectedRoute>
      <DashboardContent tab={tab} setTab={setTab} />
    </ProtectedRoute>
  );
}

function DashboardContent({ tab, setTab }) {
  const { user } = useAuth();
  const { bookmarks, streak, quizHistory } = useApp();

  const totalQuizzes = quizHistory.length;
  const avgScore = totalQuizzes > 0 ? Math.round(quizHistory.reduce((a, q) => a + (q.score / q.total) * 100, 0) / totalQuizzes) : 0;

  const stats = [
    { label: 'Study Streak', value: `${streak.current} days`, icon: '🔥', color: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Quizzes Taken', value: totalQuizzes, icon: <BiBrain size={20} className="text-primary-600" />, color: 'bg-primary-50 dark:bg-primary-900/20' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: <FiTrendingUp size={20} className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Bookmarks', value: bookmarks.length, icon: <FiBookmark size={20} className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  const tabs = ['overview', 'bookmarks', 'quiz-history'];

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-500 dark:text-slate-400">Here&apos;s your study progress at a glance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} rounded-2xl p-5`}>
              <div className="text-2xl mb-1">{typeof s.icon === 'string' ? <span className="fire-glow">{s.icon}</span> : s.icon}</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-slate-900 rounded-xl p-1 w-fit">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${tab === t ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white'}`}>
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Streak */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Study Streak</h3>
              <div className="flex items-center gap-4">
                <div className="text-5xl fire-glow">🔥</div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{streak.current} days</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Longest: {streak.longest} days</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/quiz" className="card-hover bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-5 flex items-center gap-3">
                <BiBrain size={24} className="text-primary-600" />
                <span className="font-medium text-gray-900 dark:text-white">Take a Quiz</span>
                <FiArrowRight size={16} className="ml-auto text-primary-600" />
              </Link>
              <Link href="/flashcards" className="card-hover bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 flex items-center gap-3">
                <FiAward size={24} className="text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white">Flashcards</span>
                <FiArrowRight size={16} className="ml-auto text-purple-600" />
              </Link>
              <Link href="/semesters" className="card-hover bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 flex items-center gap-3">
                <FiDownload size={24} className="text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Browse Notes</span>
                <FiArrowRight size={16} className="ml-auto text-green-600" />
              </Link>
            </div>
          </div>
        )}

        {tab === 'bookmarks' && (
          <div>
            {bookmarks.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-slate-500">
                <FiBookmark size={40} className="mx-auto mb-3 opacity-50" />
                <p>No bookmarks yet. Bookmark subjects to find them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map(slug => {
                  const s = getSubjectBySlug(slug);
                  if (!s) return null;
                  return (
                    <Link key={slug} href={`/subject/${slug}`}
                      className="card-hover bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-3">
                      <FiBookmark size={18} className="text-primary-600 fill-current" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                        <p className="text-xs text-gray-500">Semester {s.semester}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'quiz-history' && (
          <div>
            {quizHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-slate-500">
                <BiBrain size={40} className="mx-auto mb-3 opacity-50" />
                <p>No quiz attempts yet. Start a quiz to track your progress!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {quizHistory.map((q, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white
                      ${(q.score / q.total) >= 0.7 ? 'bg-green-500' : (q.score / q.total) >= 0.4 ? 'bg-amber-500' : 'bg-red-500'}`}>
                      {Math.round((q.score / q.total) * 100)}%
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{q.subject?.replace(/-/g, ' ')}</p>
                      <p className="text-xs text-gray-500">{q.score}/{q.total} correct</p>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <FiClock size={12} /> {new Date(q.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
