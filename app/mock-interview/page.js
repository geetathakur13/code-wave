// app/mock-interview/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Loader2,
  Sparkles,
  Volume2,
  Play,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const TOPICS = [
  { id: "dsa", label: "DSA", emoji: "🧮" },
  { id: "oops", label: "OOPs", emoji: "🏛️" },
  { id: "dbms", label: "DBMS", emoji: "🗄️" },
  { id: "os", label: "OS", emoji: "⚙️" },
  { id: "cn", label: "Networks", emoji: "🌐" },
  { id: "system-design", label: "System Design", emoji: "🏗️" },
];

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function MockInterviewPage() {
  const [topic, setTopic] = useState("dsa");
  const [difficulty, setDifficulty] = useState("medium");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loadingQ, setLoadingQ] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loadingFb, setLoadingFb] = useState(false);
  const [history, setHistory] = useState([]);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSpeechSupported(false);
      return;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";

    rec.onresult = (e) => {
      let finalT = "";
      let interimT = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalT += t + " ";
        else interimT += t;
      }
      if (finalT) setTranscript((prev) => prev + finalT);
      setInterimTranscript(interimT);
    };

    rec.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = rec;
    synthRef.current = window.speechSynthesis;
  }, []);

  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 0.95;
    synthRef.current.speak(utter);
  };

  const fetchNextQuestion = async () => {
    setLoadingQ(true);
    setFeedback(null);
    setTranscript("");
    setInterimTranscript("");
    try {
      const res = await fetch("/api/interview-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "question",
          topic: TOPICS.find((t) => t.id === topic).label,
          difficulty,
          previousQuestions: history.map((h) => h.question),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCurrentQuestion(data);
      setTimeout(() => speak(data.question), 400);
    } catch (err) {
      alert("Failed to generate question: " + err.message);
    } finally {
      setLoadingQ(false);
    }
  };

  const startSession = async () => {
    setSessionStarted(true);
    setHistory([]);
    await fetchNextQuestion();
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim()) return;
    if (isListening) recognitionRef.current?.stop();
    setLoadingFb(true);
    try {
      const res = await fetch("/api/interview-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "feedback",
          question: currentQuestion.question,
          answer: transcript,
          topic: TOPICS.find((t) => t.id === topic).label,
          expectedKeyPoints: currentQuestion.expectedKeyPoints,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFeedback(data);
      setHistory((h) => [
        ...h,
        {
          question: currentQuestion.question,
          answer: transcript,
          scores: {
            correctness: data.correctnessScore,
            depth: data.depthScore,
            confidence: data.confidenceScore,
          },
        },
      ]);
    } catch (err) {
      alert("Feedback failed: " + err.message);
    } finally {
      setLoadingFb(false);
    }
  };

  if (!speechSupported && sessionStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-amber-500" />
        <h2 className="text-xl font-bold mt-4 dark:text-white">Speech recognition not supported</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          This feature needs Chrome, Edge, or Safari on desktop. You can still type your answer in the textbox below.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-700 text-white">
          <Mic className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Mock Interview</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Voice-based placement prep. AI evaluates correctness, confidence & filler words.
          </p>
        </div>
      </div>

      {!sessionStarted ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Set up your interview</h2>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block dark:text-white">Topic</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTopic(t.id)}
                  className={`p-3 rounded-xl border text-sm ${
                    topic === t.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-white"
                      : "border-slate-200 dark:border-slate-700 dark:text-white hover:border-primary-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block dark:text-white">Difficulty</label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize ${
                    difficulty === d
                      ? "bg-primary-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {!speechSupported && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm flex gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              Your browser doesn't support speech recognition. You can still type answers manually.
            </div>
          )}

          <button
            onClick={startSession}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90"
          >
            <Play className="w-5 h-5" /> Start Interview
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Question card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            {loadingQ ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
                <p className="mt-3 text-slate-500">Preparing your question…</p>
              </div>
            ) : currentQuestion ? (
              <>
                <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {TOPICS.find((t) => t.id === topic).label}
                  </span>
                  <span className="capitalize">· {difficulty}</span>
                  <button
                    onClick={() => speak(currentQuestion.question)}
                    className="ml-auto text-slate-400 hover:text-primary-500"
                    title="Replay question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold dark:text-white">
                  {currentQuestion.question}
                </h2>
              </>
            ) : null}
          </div>

          {/* Answer area */}
          {currentQuestion && !feedback && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold dark:text-white">Your answer</h3>
                <button
                  onClick={toggleListening}
                  disabled={!speechSupported}
                  className={`p-3 rounded-full transition ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  } disabled:opacity-50`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>

              <textarea
                value={transcript + (interimTranscript ? ` ${interimTranscript}` : "")}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={
                  speechSupported
                    ? "Click the mic and start speaking, or type your answer..."
                    : "Type your answer here..."
                }
                rows={6}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-white text-sm"
              />

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-500">
                  {transcript.trim().split(/\s+/).filter(Boolean).length} words
                  {isListening && <span className="ml-2 text-red-500">● recording</span>}
                </span>
                <button
                  onClick={submitAnswer}
                  disabled={!transcript.trim() || loadingFb}
                  className="px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 text-sm flex items-center gap-2"
                >
                  {loadingFb ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Get Feedback
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Correctness", value: feedback.correctnessScore, color: "from-blue-500 to-blue-700" },
                    { label: "Depth", value: feedback.depthScore, color: "from-purple-500 to-purple-700" },
                    { label: "Confidence", value: feedback.confidenceScore, color: "from-green-500 to-green-700" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`p-5 rounded-2xl bg-gradient-to-br ${s.color} text-white`}
                    >
                      <div className="text-xs uppercase opacity-80">{s.label}</div>
                      <div className="text-4xl font-bold mt-1">{s.value}</div>
                      <div className="text-xs opacity-80">/10</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 space-y-3">
                  <p className="italic text-primary-700 dark:text-primary-400">"{feedback.oneLinerFeedback}"</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {feedback.keyPointsCovered?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-1 flex items-center gap-1 text-green-700 dark:text-green-400">
                          <CheckCircle2 className="w-4 h-4" /> Points covered
                        </h4>
                        <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                          {feedback.keyPointsCovered.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                    {feedback.keyPointsMissed?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-1 flex items-center gap-1 text-amber-700 dark:text-amber-400">
                          <AlertCircle className="w-4 h-4" /> Missed points
                        </h4>
                        <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                          {feedback.keyPointsMissed.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>

                  {feedback.factualErrors?.length > 0 && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm">
                      <b className="text-red-700 dark:text-red-300">⚠️ Factual errors:</b>
                      <ul className="list-disc ml-5 text-red-700 dark:text-red-300 mt-1">
                        {feedback.factualErrors.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}

                  {feedback.improvements?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1 dark:text-white">💡 How to improve</h4>
                      <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300 text-sm">
                        {feedback.improvements.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Delivery metrics */}
                  <div className="mt-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs">
                    <div className="font-semibold dark:text-white mb-1">🎤 Delivery</div>
                    <div className="flex flex-wrap gap-3 text-slate-600 dark:text-slate-400">
                      <span>{feedback.delivery.wordCount} words</span>
                      <span>{feedback.delivery.fillerWordCount} fillers</span>
                      <span>{feedback.delivery.fillerRate}% filler rate</span>
                    </div>
                    {Object.keys(feedback.delivery.fillers).length > 0 && (
                      <div className="mt-1 text-slate-500">
                        Top fillers:{" "}
                        {Object.entries(feedback.delivery.fillers)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 3)
                          .map(([f, c]) => `"${f}" (${c})`)
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={fetchNextQuestion}
                  className="w-full py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 font-medium"
                >
                  Next Question →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session history */}
          {history.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
                <TrendingUp className="w-4 h-4" /> Session so far ({history.length} questions)
              </h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="text-xs flex items-center gap-2">
                    <span className="text-slate-500">Q{i + 1}:</span>
                    <span className="flex-1 truncate dark:text-white">{h.question}</span>
                    <span className="text-green-600">{h.scores.correctness}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
