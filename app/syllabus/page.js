'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { semesters, getSubjectsBySemester } from '@/lib/data';
import { FiChevronDown, FiChevronRight, FiDownload } from 'react-icons/fi';

export default function SyllabusPage() {
  const [openSem, setOpenSem] = useState([3]);
  const [openSubjects, setOpenSubjects] = useState([]);

  const toggleSem = (id) => setOpenSem(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  const toggleSubject = (slug) => setOpenSubjects(p => p.includes(slug) ? p.filter(s => s !== slug) : [...p, slug]);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">RGPV CSE Syllabus</h1>
            <p className="text-gray-500 dark:text-slate-400">Complete syllabus for all 8 semesters</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
            <FiDownload size={14} /> Download Full Syllabus
          </button>
        </div>

        <div className="space-y-3">
          {semesters.map(sem => {
            const subjects = getSubjectsBySemester(sem.id);
            const isOpen = openSem.includes(sem.id);
            return (
              <div key={sem.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button onClick={() => toggleSem(sem.id)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors text-left">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{sem.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{sem.label} • {subjects.length} subjects</p>
                  </div>
                  {isOpen ? <FiChevronDown size={18} className="text-gray-400" /> : <FiChevronRight size={18} className="text-gray-400" />}
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 dark:border-slate-800">
                    {subjects.map(subject => {
                      const subOpen = openSubjects.includes(subject.slug);
                      return (
                        <div key={subject.slug} className="border-b border-gray-50 dark:border-slate-800/50 last:border-b-0">
                          <button onClick={() => toggleSubject(subject.slug)}
                            className="w-full flex items-center justify-between px-5 py-3 pl-8 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors text-left">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-gray-400">{subject.code}</span>
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{subject.name}</span>
                            </div>
                            {subOpen ? <FiChevronDown size={14} className="text-gray-400" /> : <FiChevronRight size={14} className="text-gray-400" />}
                          </button>
                          {subOpen && (
                            <div className="px-5 pb-4 pl-12 space-y-3">
                              {subject.units.map(unit => (
                                <div key={unit.id}>
                                  <p className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Unit {unit.id}: {unit.name}</p>
                                  <ul className="space-y-1 ml-4">
                                    {unit.topics.map((topic, ti) => (
                                      <li key={ti} className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                                        <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
