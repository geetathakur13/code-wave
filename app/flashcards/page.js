'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { flashcardData, subjects } from '@/lib/data';
import { FiCheck, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';

const fcSubjects = Object.keys(flashcardData).map(slug => {
  const s = subjects.find(sub => sub.slug === slug);
  return { slug, name: s?.name || slug };
});

export default function FlashcardsPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [review, setReview] = useState([]);
  const [done, setDone] = useState(false);

  const cards = selectedSubject ? flashcardData[selectedSubject] || [] : [];

  const handleGotIt = () => {
    setKnown(prev => [...prev, currentCard]);
    nextCard();
  };

  const handleReview = () => {
    setReview(prev => [...prev, currentCard]);
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    if (currentCard + 1 >= cards.length) {
      setDone(true);
    } else {
      setTimeout(() => setCurrentCard(c => c + 1), 200);
    }
  };

  const reset = () => {
    setSelectedSubject(null);
    setCurrentCard(0);
    setFlipped(false);
    setKnown([]);
    setReview([]);
    setDone(false);
  };

  if (!selectedSubject) {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Flashcards</h1>
          <p className="text-gray-500 dark:text-slate-400 mb-8">Quick revision with flip cards for key concepts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fcSubjects.map(s => (
              <button key={s.slug} onClick={() => setSelectedSubject(s.slug)}
                className="card-hover bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{flashcardData[s.slug].length} cards</p>
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Session Complete! 🎉</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5">
            <p className="text-3xl font-bold text-green-600">{known.length}</p>
            <p className="text-sm text-green-700 dark:text-green-400">Got It</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5">
            <p className="text-3xl font-bold text-amber-600">{review.length}</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">Needs Review</p>
          </div>
        </div>
        <button onClick={reset} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto">
          <FiRefreshCw size={16} /> Start Over
        </button>
      </div>
    );
  }

  const card = cards[currentCard];

  return (
    <div className="max-w-lg mx-auto px-6 py-8">
      <button onClick={reset} className="flex items-center gap-1 text-sm text-primary-600 hover:underline mb-6">
        <FiArrowLeft size={14} /> Back to subjects
      </button>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 dark:text-slate-400">Card {currentCard + 1} of {cards.length}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-8">
        <div className="bg-primary-600 h-1.5 rounded-full transition-all" style={{ width: `${((currentCard) / cards.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="flip-card w-full" style={{ height: '280px' }} onClick={() => setFlipped(!flipped)}>
        <div className={`flip-card-inner relative w-full h-full cursor-pointer ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front absolute inset-0 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Question</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{card.front}</p>
              <p className="text-xs text-gray-400 mt-4">Tap to flip</p>
            </div>
          </div>
          <div className="flip-card-back absolute inset-0 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-primary-500 uppercase tracking-wider mb-3">Answer</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{card.back}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button onClick={handleReview}
          className="flex-1 py-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors flex items-center justify-center gap-2">
          <FiRefreshCw size={16} /> Review Again
        </button>
        <button onClick={handleGotIt}
          className="flex-1 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center gap-2">
          <FiCheck size={16} /> Got It
        </button>
      </div>
    </div>
  );
}
