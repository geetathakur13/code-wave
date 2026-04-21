'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { videoData } from '@/lib/data';
import { FiPlay, FiSearch, FiX, FiClock } from 'react-icons/fi';

const allSubjects = [...new Set(videoData.map(v => v.subject))].sort();

export default function VideosPage() {
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [playing, setPlaying] = useState(null);

  const filtered = videoData.filter(v => {
    if (filterSubject !== 'all' && v.subject !== filterSubject) return false;
    if (search.trim() && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Video Lectures</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">Curated video lectures from top educators</p>

        {/* Search & filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30" />
          </div>
          <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
            className="px-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30">
            <option value="all">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(v => (
            <div key={v.id} className="card-hover bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              {/* Thumbnail */}
              <div className="relative bg-gray-100 dark:bg-slate-800 aspect-video flex items-center justify-center cursor-pointer group"
                onClick={() => setPlaying(v.id)}>
                <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <FiPlay size={20} className="text-primary-600 ml-1" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                  <FiClock size={10} /> {v.duration}
                </span>
              </div>
              <div className="p-4">
                <span className="px-2 py-0.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-md">{v.subject}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-2 text-sm">{v.title}</h3>
                <p className="text-xs text-gray-400 mt-1">Semester {v.semester}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-slate-500">
            <FiPlay size={40} className="mx-auto mb-3 opacity-50" />
            <p>No videos found.</p>
          </div>
        )}
      </div>

      {/* Video modal */}
      {playing && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
          <div className="relative w-full max-w-3xl aspect-video" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPlaying(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <FiX size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoData.find(v => v.id === playing)?.youtubeId || ''}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
