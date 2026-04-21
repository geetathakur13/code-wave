'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSubjectBySlug } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import Footer from '@/components/Footer';
import { FiBookmark, FiDownload, FiChevronDown, FiChevronRight, FiCheckCircle, FiCircle, FiPlay, FiFileText } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';

export default function SubjectPage() {
  const params = useParams();
  const slug = params.slug;
  const subject = getSubjectBySlug(slug);
  const { bookmarks, toggleBookmark, progress, updateProgress } = useApp();
  const { user } = useAuth();
  const [openUnits, setOpenUnits] = useState([1]);
  const [downloadCount] = useState(Math.floor(Math.random() * 300) + 50);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [question, setQuestion] = useState('');

  if (!subject) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subject Not Found</h2>
          <Link href="/semesters" className="text-primary-600 hover:underline">Browse Semesters</Link>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(slug);
  const completedUnits = progress[slug]?.completedUnits || [];
  const progressPercent = Math.round((completedUnits.length / subject.units.length) * 100);

  const toggleUnit = (id) => {
    setOpenUnits(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-lg">Semester {subject.semester}</span>
            <span className="px-2.5 py-1 text-xs font-mono text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 rounded-lg">{subject.code}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{subject.name}</h1>
          <p className="text-gray-500 dark:text-slate-400">{subject.description}</p>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => toggleBookmark(slug)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors
              ${isBookmarked
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400'
                : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
            <FiBookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20">
            <FiDownload size={16} />
            Download PDF
            <span className="text-primary-200 text-xs">({downloadCount})</span>
          </button>
        </div>

        {/* Progress bar */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Your Progress</span>
            <span className="text-sm font-bold text-primary-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
            <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{completedUnits.length} of {subject.units.length} units completed</p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link href="/quiz" className="flex items-center gap-2 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
            <BiBrain size={16} /> Take Quiz
          </Link>
          <Link href="/flashcards" className="flex items-center gap-2 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <FiFileText size={16} /> Flashcards
          </Link>
          <Link href="/videos" className="flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <FiPlay size={16} /> Videos
          </Link>
          <Link href="/pyq" className="flex items-center gap-2 px-4 py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 rounded-xl text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
            <FiFileText size={16} /> PYQs
          </Link>
        </div>

        {/* Units Accordion */}
        <div className="space-y-3 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Units</h2>
          {subject.units.map(unit => {
            const isOpen = openUnits.includes(unit.id);
            const isComplete = completedUnits.includes(unit.id);
            return (
              <div key={unit.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onClick={() => toggleUnit(unit.id)}>
                  <button onClick={e => { e.stopPropagation(); updateProgress(slug, unit.id); }}
                    className="flex-shrink-0" title={isComplete ? 'Mark incomplete' : 'Mark complete'}>
                    {isComplete ? (
                      <FiCheckCircle size={20} className="text-green-500" />
                    ) : (
                      <FiCircle size={20} className="text-gray-300 dark:text-slate-600" />
                    )}
                  </button>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Unit {unit.id}: {unit.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{unit.topics.length} topics</span>
                  </div>
                  {isOpen ? <FiChevronDown size={18} className="text-gray-400" /> : <FiChevronRight size={18} className="text-gray-400" />}
                </div>
                {isOpen && (
                  <div className="px-5 pb-4 pl-14 border-t border-gray-100 dark:border-slate-800">
                    <ul className="space-y-2 pt-3">
                      {unit.topics.map((topic, ti) => (
                        <li key={ti} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Discussion */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5">
          <button onClick={() => setShowDiscussion(!showDiscussion)} className="w-full flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Discussion Forum</h2>
            {showDiscussion ? <FiChevronDown size={18} className="text-gray-400" /> : <FiChevronRight size={18} className="text-gray-400" />}
          </button>
          {showDiscussion && (
            <div className="mt-4">
              {user ? (
                <div className="flex gap-3 mb-4">
                  <input value={question} onChange={e => setQuestion(e.target.value)}
                    placeholder="Ask a question about this subject..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
                  <button className="px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">Post</button>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                  <Link href="/login" className="text-primary-600 hover:underline">Log in</Link> to post questions.
                </p>
              )}
              <div className="text-center py-6 text-sm text-gray-400 dark:text-slate-500">
                No discussions yet. Be the first to ask a question!
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
