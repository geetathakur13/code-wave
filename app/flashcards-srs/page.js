// app/flashcards-srs/page.js
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Frown, Smile, Meh, TrendingUp, RotateCcw } from "lucide-react";
import { createInitialState, review, isDue, sortByDue, getDeckStats } from "@/lib/sm2";

const SAMPLE_DECK = [
  { id: "ds1", subject: "Data Structures", front: "Time complexity of inserting at the beginning of a singly linked list?", back: "O(1) — just update the head pointer." },
  { id: "ds2", subject: "Data Structures", front: "Difference between Stack and Queue?", back: "Stack is LIFO. Queue is FIFO." },
  { id: "os1", subject: "Operating Systems", front: "What is a deadlock? Name the 4 conditions.", back: "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait." },
  { id: "os2", subject: "Operating Systems", front: "What is thrashing?", back: "When a process spends more time paging than executing." },
  { id: "dbms1", subject: "DBMS", front: "State the ACID properties.", back: "Atomicity, Consistency, Isolation, Durability." },
  { id: "dbms2", subject: "DBMS", front: "What is normalization?", back: "Organizing tables to reduce redundancy." },
  { id: "cn1", subject: "Computer Networks", front: "TCP vs UDP?", back: "TCP: reliable, connection-oriented. UDP: faster, connectionless." },
  { id: "oop1", subject: "OOP", front: "4 pillars of OOP?", back: "Encapsulation, Inheritance, Polymorphism, Abstraction." },
];

const STORAGE_KEY = "studyhouse_srs_v1";

export default function SRSFlashcardsPage() {
  const [progress, setProgress] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [reviewedThisSession, setReviewedThisSession] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setProgress(saved);
    } catch {}
    setMounted(true);
  }, []);

  const deck = useMemo(
    () => SAMPLE_DECK.map((c) => ({ ...c, state: progress[c.id] || createInitialState() })),
    [progress]
  );
  const dueCards = useMemo(() => sortByDue(deck.filter((c) => isDue(c.state))), [deck]);
  const stats = useMemo(() => getDeckStats(deck), [deck]);

  const currentCard = dueCards[index];
  const sessionDone = !currentCard;
  const safeState = currentCard?.state || createInitialState();

  const handleReview = (q) => {
    if (!currentCard) return;
    const newState = review(safeState, q);
    const np = { ...progress, [currentCard.id]: newState };
    setProgress(np);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(np)); } catch {}
    setReviewedThisSession((n) => n + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const resetAll = () => {
    if (!confirm("Reset all SRS progress?")) return;
    setProgress({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setIndex(0);
    setReviewedThisSession(0);
    setFlipped(false);
  };

  if (!mounted) return <div className="p-8 dark:text-white">Loading…</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
              SRS Flashcards
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">SM-2</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Spaced repetition with SuperMemo SM-2 algorithm.
            </p>
          </div>
        </div>
        <button onClick={resetAll} className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-500">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-slate-500" },
          { label: "New", value: stats.new, color: "bg-blue-500" },
          { label: "Due", value: stats.due + stats.learning, color: "bg-amber-500" },
          { label: "Scheduled", value: stats.future, color: "bg-green-500" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className={`w-2 h-2 rounded-full ${s.color} mb-2`} />
            <div className="text-2xl font-bold dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {sessionDone ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold dark:text-white">All caught up!</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {reviewedThisSession > 0
              ? `You reviewed ${reviewedThisSession} card${reviewedThisSession === 1 ? "" : "s"} this session.`
              : "No cards are due right now."}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Come back tomorrow for the next batch.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3 text-sm text-slate-500 dark:text-slate-400">
            <span>Card {index + 1} of {dueCards.length}</span>
            <span className="flex items-center gap-3">
              <span>EF: {Number(safeState.easeFactor || 2.5).toFixed(2)}</span>
              <span>Reps: {safeState.repetitions || 0}</span>
              <span>Interval: {safeState.interval || 0}d</span>
            </span>
          </div>

          <div onClick={() => setFlipped(!flipped)} className="relative cursor-pointer select-none h-80 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id + (flipped ? "-back" : "-front")}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center ${
                  flipped
                    ? "bg-gradient-to-br from-primary-600 to-primary-800 text-white"
                    : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className={`text-xs uppercase tracking-wider mb-4 ${flipped ? "text-primary-200" : "text-slate-500 dark:text-slate-400"}`}>
                  {currentCard.subject} · {flipped ? "ANSWER" : "QUESTION"}
                </div>
                <div className={`text-xl md:text-2xl font-medium ${flipped ? "text-white" : "dark:text-white"}`}>
                  {flipped ? currentCard.back : currentCard.front}
                </div>
                <div className={`mt-6 text-xs ${flipped ? "text-primary-200" : "text-slate-400"}`}>
                  Click to {flipped ? "see question" : "reveal answer"}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {flipped && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
              {[
                { q: 0, label: "Again", hint: "Forgot", color: "bg-red-500 hover:bg-red-600", icon: X },
                { q: 3, label: "Hard", hint: "Struggled", color: "bg-orange-500 hover:bg-orange-600", icon: Frown },
                { q: 4, label: "Good", hint: "Some effort", color: "bg-blue-500 hover:bg-blue-600", icon: Meh },
                { q: 5, label: "Easy", hint: "Perfect", color: "bg-green-500 hover:bg-green-600", icon: Smile },
              ].map(({ q, label, hint, color, icon: Icon }) => {
                const sim = review(safeState, q);
                return (
                  <button key={q} onClick={() => handleReview(q)} className={`${color} text-white rounded-xl p-4 flex flex-col items-center transition`}>
                    <Icon className="w-6 h-6 mb-1" />
                    <div className="font-semibold">{label}</div>
                    <div className="text-xs opacity-80 mt-1">{hint}</div>
                    <div className="text-xs mt-2 bg-black/20 px-2 py-0.5 rounded-full">+{sim.interval}d</div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {!flipped && (
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
              💡 Try to recall before flipping.
            </div>
          )}
        </>
      )}
    </div>
  );
}