'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { pyqData } from '@/lib/data';
import { FiDownload, FiFilter, FiFileText } from 'react-icons/fi';

const allSemesters = [...new Set(pyqData.map(p => p.semester))].sort();
const allYears = [...new Set(pyqData.map(p => p.year))].sort((a, b) => b - a);
const allSubjects = [...new Set(pyqData.map(p => p.subject))].sort();

export default function PYQPage() {
  const [semFilter, setSemFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filtered = pyqData.filter(p => {
    if (semFilter !== 'all' && p.semester !== parseInt(semFilter)) return false;
    if (yearFilter !== 'all' && p.year !== parseInt(yearFilter)) return false;
    if (subjectFilter !== 'all' && p.subject !== subjectFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Previous Year Questions</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">Practice with real RGPV question papers</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2">
            <FiFilter size={16} className="text-gray-400" />
          </div>
          <select value={semFilter} onChange={e => setSemFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
            <option value="all">All Semesters</option>
            {allSemesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
          </select>
          <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
            <option value="all">All Years</option>
            {allYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
            <option value="all">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-slate-500">
            <FiFileText size={40} className="mx-auto mb-3 opacity-50" />
            <p>No papers found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
                    <FiFileText size={18} className="text-rose-600" />
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-md">{p.type}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{p.subject}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-3">Semester {p.semester} • {p.year}</p>
                <button className="w-full py-2.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FiDownload size={14} /> Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
