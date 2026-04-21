'use client';
import { useState, useEffect, useCallback } from 'react';
import Footer from '@/components/Footer';
import { quizData, subjects } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { generateQuiz } from '@/lib/gemini';
import { FiCheck, FiX, FiClock, FiRefreshCw, FiArrowRight, FiZap } from 'react-icons/fi';
import { BiBrain } from 'react-icons/bi';

const quizSubjects = Object.keys(quizData).map(slug => {
  const s = subjects.find(sub => sub.slug === slug);
  return { slug, name: s?.name || slug };
});

export default function QuizPage() {
  const [mode, setMode] = useState(null); // null | 'select' | 'ai-select' | 'playing' | 'result'
  const [currentSubject, setCurrentSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const { addQuizResult } = useApp();

  const handleAnswer = useCallback((idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = questions[currentQ]?.answer;
    const isCorrect = idx === correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { question: currentQ, selected: idx, correct, isCorrect }]);
  }, [answered, currentQ, questions]);

  // Timer
  useEffect(() => {
    if (mode !== 'playing' || answered) return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, mode, answered, handleAnswer]);

  const startPractice = (slug) => {
    const qs = quizData[slug];
    if (!qs) return;
    setCurrentSubject(slug);
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setTimer(30);
    setMode('playing');
  };

  const startAI = async () => {
    if (!aiTopic.trim()) return;
    setAiLoading(true);
    const qs = await generateQuiz(aiTopic.trim(), 5);
    setAiLoading(false);
    if (qs && qs.length > 0) {
      setQuestions(qs);
      setCurrentQ(0);
      setSelected(null);
      setAnswered(false);
      setScore(0);
      setAnswers([]);
      setTimer(30);
      setMode('playing');
    } else {
      alert('Could not generate quiz. Please check your Gemini API key or try again.');
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      const result = { subject: currentSubject || aiTopic, score, total: questions.length, date: new Date().toISOString() };
      addQuizResult(result);
      setMode('result');
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(30);
    }
  };

  const reset = () => {
    setMode(null);
    setQuestions([]);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
  };

  // Subject selection
  if (!mode) {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Zone</h1>
          <p className="text-gray-500 dark:text-slate-400 mb-8">Test your knowledge with practice questions or AI-generated quizzes</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Practice */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                <BiBrain size={24} className="text-primary-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Practice Quiz</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Hardcoded MCQs for quick revision</p>
              <button onClick={() => setMode('select')} className="w-full py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Choose Subject
              </button>
            </div>

            {/* AI */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                <FiZap size={24} className="text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">AI Quiz</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">AI-generated questions on any topic</p>
              <button onClick={() => setMode('ai-select')} className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors">
                Generate Quiz
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (mode === 'select') {
    return (
      <div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button onClick={reset} className="text-sm text-primary-600 hover:underline mb-4 inline-block">&larr; Back</button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select Subject</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizSubjects.map(s => (
              <button key={s.slug} onClick={() => startPractice(s.slug)}
                className="card-hover bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{quizData[s.slug].length} questions</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'ai-select') {
    return (
      <div>
        <div className="max-w-md mx-auto px-6 py-8">
          <button onClick={reset} className="text-sm text-primary-600 hover:underline mb-4 inline-block">&larr; Back</button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">AI Quiz Generator</h2>
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Enter a topic</label>
            <input value={aiTopic} onChange={e => setAiTopic(e.target.value)}
              placeholder="e.g., Binary Search Trees, Deadlocks, SQL Joins..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 mb-4" />
            <button onClick={startAI} disabled={!aiTopic.trim() || aiLoading}
              className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {aiLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</> : <>Generate Quiz <FiZap size={16} /></>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  if (mode === 'playing' && questions[currentQ]) {
    const q = questions[currentQ];
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Question {currentQ + 1} of {questions.length}
          </span>
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${timer <= 10 ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300'}`}>
            <FiClock size={14} /> {timer}s
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-8">
          <div className="bg-primary-600 h-1.5 rounded-full transition-all" style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 mb-6">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{q.q}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let cls = 'border-gray-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500';
              if (answered) {
                if (i === q.answer) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                else if (i === selected && i !== q.answer) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                else cls = 'border-gray-200 dark:border-slate-700 opacity-60';
              } else if (i === selected) {
                cls = 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                  className={`w-full text-left px-5 py-3.5 border-2 rounded-xl text-sm transition-all flex items-center gap-3 ${cls}`}>
                  <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {answered && i === q.answer ? <FiCheck size={14} /> : answered && i === selected ? <FiX size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <button onClick={nextQuestion}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
            {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'} <FiArrowRight size={16} />
          </button>
        )}
      </div>
    );
  }

  // Results
  if (mode === 'result') {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white
          ${percent >= 70 ? 'bg-green-500' : percent >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}>
          {percent}%
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {percent >= 70 ? 'Great Job! 🎉' : percent >= 40 ? 'Good Effort! 💪' : 'Keep Practicing! 📚'}
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mb-8">
          You scored {score} out of {questions.length}
        </p>

        {/* Review */}
        <div className="text-left space-y-3 mb-8">
          {answers.map((a, i) => (
            <div key={i} className={`p-4 rounded-xl border ${a.isCorrect ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'}`}>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{questions[i].q}</p>
              <p className="text-xs text-gray-500">
                Your answer: {a.selected !== null ? questions[i].options[a.selected] : 'Time up'} |
                Correct: {questions[i].options[a.correct]}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2">
            <FiRefreshCw size={16} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
