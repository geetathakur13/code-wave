'use client';
import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { semesters, getSubjectsBySemester } from '@/lib/data';
import { FiBookOpen, FiArrowRight, FiSearch } from 'react-icons/fi';

export default function SemestersPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">All Semesters</h1>
          <p className="text-gray-500 dark:text-slate-400">Browse subjects across all 8 semesters of the CSE program</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition" />
        </div>

        {/* Semesters */}
        <div className="space-y-10">
          {semesters.map(sem => {
            const subjects = getSubjectsBySemester(sem.id).filter(s =>
              !search.trim() || s.name.toLowerCase().includes(search.toLowerCase())
            );
            if (search.trim() && subjects.length === 0) return null;

            return (
              <div key={sem.id}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{sem.name}</h2>
                  <span className="text-xs px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-md font-medium">{sem.label}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map(subject => (
                    <Link key={subject.slug} href={`/subject/${subject.slug}`}
                      className="card-hover group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 block">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                          <FiBookOpen size={16} className="text-primary-600" />
                        </div>
                        <span className="text-xs text-gray-400 dark:text-slate-500 font-mono">{subject.code}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors mb-1">{subject.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">{subject.units.length} Units</p>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                        View <FiArrowRight size={14} className="ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
