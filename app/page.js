'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { semesters, getSubjectsBySemester } from '@/lib/data';
import { FiBookOpen, FiUsers, FiDownload, FiStar, FiArrowRight, FiFileText, FiPlay, FiLayers } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';

const stats = [
  { label: 'Study Materials', value: '200+', icon: FiFileText, color: 'text-primary-600' },
  { label: 'Active Students', value: '500+', icon: FiUsers, color: 'text-green-600' },
  { label: 'Subjects', value: '40+', icon: FiBookOpen, color: 'text-purple-600' },
  { label: 'User Rating', value: '4.8★', icon: FiStar, color: 'text-amber-500' },
];

const features = [
  { icon: FiBookOpen, title: 'Class Notes', desc: 'Comprehensive notes for every subject, organized by semester and unit.', color: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' },
  { icon: FiFileText, title: 'Previous Year Questions', desc: 'Practice with real RGPV PYQs sorted by year and subject.', color: 'bg-green-50 dark:bg-green-900/20 text-green-600' },
  { icon: FiPlay, title: 'Video Lectures', desc: 'Curated YouTube lectures from top educators for every topic.', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
  { icon: BiBrain, title: 'Quizzes & AI Quiz', desc: 'Test yourself with practice MCQs and AI-generated questions.', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' },
  { icon: FiLayers, title: 'Flashcards', desc: 'Quick revision with flip cards for key concepts.', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' },
  { icon: FiDownload, title: 'Offline Access', desc: 'Download PDFs for offline studying anywhere, anytime.', color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600' },
];

export default function HomePage() {
  const [activeSem, setActiveSem] = useState(3);
  const semSubjects = getSubjectsBySemester(activeSem);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(37,99,235,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37,99,235,0.1) 0%, transparent 50%)' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <Image src="/logo.png" alt="StudyHouse" width={80} height={80} className="mx-auto mb-6 rounded-2xl shadow-lg" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Your One-Stop{' '}
            <span className="text-primary-600">Resource Destination</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Access notes, PYQs, video lectures, quizzes & more for RGPV engineering students. Everything you need to ace your exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/semesters" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25">
              Browse Semesters <FiArrowRight size={16} />
            </Link>
            <Link href="/quiz" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Take a Quiz <BiBrain size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon size={24} className={`${s.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semester Explorer */}
      <section className="bg-white dark:bg-slate-950 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Explore by Semester</h2>
          <p className="text-gray-500 dark:text-slate-400 text-center mb-8">Select a semester to view its subjects</p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {semesters.map(s => (
              <button key={s.id} onClick={() => setActiveSem(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${activeSem === s.id
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>
                Sem {s.id}
              </button>
            ))}
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semSubjects.map(subject => (
              <Link key={subject.slug} href={`/subject/${subject.slug}`}
                className="card-hover group bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 block">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                    <FiBookOpen size={18} className="text-primary-600" />
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-md">
                    {subject.units.length} Units
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">{subject.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{subject.description}</p>
                <div className="mt-3 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Subject <FiArrowRight size={14} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/semesters" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All Semesters <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-slate-900 py-12 md:py-16 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Everything You Need</h2>
          <p className="text-gray-500 dark:text-slate-400 text-center mb-8">One platform with all the tools to excel in your engineering journey</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl p-6">
                <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
