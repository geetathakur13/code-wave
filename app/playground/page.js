// app/playground/page.js
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Code2,
  Play,
  Sparkles,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  Box,
} from "lucide-react";
import { dsaProblems, languageConfig } from "@/lib/dsa-problems";

// Monaco is heavy — load client-side only
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function PlaygroundPage() {
  const [activeProblem, setActiveProblem] = useState(dsaProblems[0]);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(dsaProblems[0].starter.python);
  const [stdin, setStdin] = useState(dsaProblems[0].testCases[0].input);
  const [output, setOutput] = useState("");
  const [stderr, setStderr] = useState("");
  const [running, setRunning] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [review, setReview] = useState(null);
  const [testResults, setTestResults] = useState([]);

  const pickProblem = (p) => {
    setActiveProblem(p);
    setCode(p.starter[language] || p.starter.python);
    setStdin(p.testCases[0]?.input || "");
    setOutput("");
    setStderr("");
    setReview(null);
    setTestResults([]);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setCode(activeProblem.starter[lang] || "");
  };

  const run = async () => {
    setRunning(true);
    setOutput("");
    setStderr("");
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...languageConfig[language], code, stdin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOutput(data.stdout);
      setStderr(data.stderr || data.compileError || "");
    } catch (err) {
      setStderr(err.message);
    } finally {
      setRunning(false);
    }
  };

  const runAllTests = async () => {
    setRunning(true);
    setTestResults([]);
    const results = [];
    for (const tc of activeProblem.testCases) {
      try {
        const res = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...languageConfig[language], code, stdin: tc.input }),
        });
        const data = await res.json();
        const actual = (data.stdout || "").trim();
        const expected = tc.expected.trim();
        results.push({
          input: tc.input,
          expected,
          actual,
          passed: actual === expected,
          error: data.stderr || data.compileError,
        });
      } catch (e) {
        results.push({ input: tc.input, expected: tc.expected, actual: "", passed: false, error: e.message });
      }
    }
    setTestResults(results);
    setRunning(false);
  };

  const aiReview = async () => {
    setReviewing(true);
    setReview(null);
    try {
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemTitle: activeProblem.title,
          problemDescription: activeProblem.description,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReview(data);
    } catch (err) {
      setReview({ error: err.message });
    } finally {
      setReviewing(false);
    }
  };

  const passedCount = useMemo(() => testResults.filter((t) => t.passed).length, [testResults]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white">
          <Code2 className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">DSA Playground</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Run code in 4 languages. Get AI complexity analysis. No switching to LeetCode.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Problem list */}
        <aside className="col-span-12 md:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 h-fit">
          <h3 className="font-semibold mb-3 px-2 dark:text-white">Problems</h3>
          <ul className="space-y-1">
            {dsaProblems.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => pickProblem(p)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeProblem.id === p.id
                      ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-300"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <div className="text-sm font-medium dark:text-white">{p.title}</div>
                  <div className="flex gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.difficulty === "Easy"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : p.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{p.topic}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Problem description + editor */}
        <div className="col-span-12 md:col-span-9 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h2 className="text-xl font-bold dark:text-white">{activeProblem.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{activeProblem.description}</p>
            <div className="mt-3 space-y-2">
              {activeProblem.examples.map((ex, i) => (
                <div key={i} className="text-xs bg-slate-50 dark:bg-slate-900 rounded-lg p-3 font-mono">
                  <div><span className="text-slate-500">Input:</span> {ex.input}</div>
                  <div><span className="text-slate-500">Output:</span> {ex.output}</div>
                  {ex.explanation && <div className="text-slate-500">{ex.explanation}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-2">
                {Object.keys(languageConfig).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      language === lang
                        ? "bg-primary-600 text-white"
                        : "bg-slate-100 dark:bg-slate-700 dark:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={run}
                  disabled={running}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 text-white hover:bg-slate-800 disabled:opacity-50 text-sm flex items-center gap-1"
                >
                  {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  Run
                </button>
                <button
                  onClick={runAllTests}
                  disabled={running}
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 text-sm"
                >
                  Run Tests
                </button>
                <button
                  onClick={aiReview}
                  disabled={reviewing}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 disabled:opacity-50 text-sm flex items-center gap-1"
                >
                  {reviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  AI Review
                </button>
              </div>
            </div>

            <MonacoEditor
              height="400px"
              language={language === "cpp" ? "cpp" : language}
              value={code}
              onChange={(v) => setCode(v || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Output + Tests + Review */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <h4 className="font-semibold mb-2 dark:text-white text-sm">Custom Input (stdin)</h4>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white"
              />
              <h4 className="font-semibold mt-3 mb-2 dark:text-white text-sm">Output</h4>
              <pre className="text-xs font-mono p-3 rounded-lg bg-slate-900 text-green-400 min-h-[80px] whitespace-pre-wrap overflow-x-auto">
                {output || (stderr && <span className="text-red-400">{stderr}</span>) || "Run your code to see output…"}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold dark:text-white text-sm">Test Cases</h4>
                {testResults.length > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      passedCount === testResults.length
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {passedCount}/{testResults.length} passed
                  </span>
                )}
              </div>
              {testResults.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">Click "Run Tests" to validate.</p>
              ) : (
                <ul className="space-y-2">
                  {testResults.map((t, i) => (
                    <li
                      key={i}
                      className={`text-xs p-2 rounded-lg border ${
                        t.passed
                          ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                          : "border-red-200 bg-red-50 dark:bg-red-900/20"
                      }`}
                    >
                      <div className="flex items-center gap-1 font-semibold">
                        {t.passed ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        Test {i + 1}
                      </div>
                      {!t.passed && (
                        <div className="mt-1 text-slate-600 dark:text-slate-400 font-mono">
                          <div>Expected: {t.expected}</div>
                          <div>Got: {t.actual || "(empty)"}</div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* AI Review */}
          {review && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5"
            >
              <h3 className="font-bold mb-3 flex items-center gap-2 dark:text-white">
                <Sparkles className="w-5 h-5 text-purple-600" /> AI Code Review
              </h3>
              {review.error ? (
                <p className="text-sm text-red-600">{review.error}</p>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1 dark:text-white">
                      <Clock className="w-4 h-4" /> <b>Time:</b> {review.timeComplexity}
                    </div>
                    <div className="flex items-center gap-1 dark:text-white">
                      <Box className="w-4 h-4" /> <b>Space:</b> {review.spaceComplexity}
                    </div>
                    <div className="dark:text-white">
                      <b>Correctness:</b> {review.correctness}
                    </div>
                  </div>
                  <p className="italic dark:text-slate-300">"{review.verdict}"</p>
                  {review.bugs?.length > 0 && (
                    <div>
                      <b className="dark:text-white">🐛 Bugs:</b>
                      <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                        {review.bugs.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                  {review.optimizations?.length > 0 && (
                    <div>
                      <b className="dark:text-white">⚡ Optimizations:</b>
                      <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
                        {review.optimizations.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                  {review.idealApproach && (
                    <div className="dark:text-slate-300">
                      <b className="dark:text-white">💡 Ideal approach:</b> {review.idealApproach}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
