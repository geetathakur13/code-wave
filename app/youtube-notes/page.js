// app/youtube-notes/page.js
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Youtube,
  Link as LinkIcon,
  Loader2,
  FileText,
  ListChecks,
  BookOpen,
  Sparkles,
  Download,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function YoutubeNotesPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("notes"); // 'notes' | 'quiz'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setQuizAnswers({});
    setShowResults(false);
    try {
      const res = await fetch("/api/youtube-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadNotes = () => {
    if (!result?.notes) return;
    const n = result.notes;
    let md = `# ${n.title}\n\n## Summary\n${n.summary}\n\n## Key Topics\n`;
    (n.keyTopics || []).forEach((t) => (md += `- ${t}\n`));
    md += `\n## Sections\n\n`;
    (n.sections || []).forEach((s) => {
      md += `### [${s.timestamp}] ${s.heading}\n\n`;
      (s.bullets || []).forEach((b) => (md += `- ${b}\n`));
      md += `\n`;
    });
    if (n.definitions?.length) {
      md += `## Definitions\n\n`;
      n.definitions.forEach((d) => (md += `**${d.term}**: ${d.definition}\n\n`));
    }
    if (n.formulas?.length) {
      md += `## Formulas\n\n`;
      n.formulas.forEach((f) => (md += `- ${f}\n`));
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${n.title.replace(/[^a-z0-9]/gi, "_")}.md`;
    a.click();
  };

  const quizScore = result?.quiz
    ? result.quiz.filter((q, i) => quizAnswers[i] === q.answer).length
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white">
          <Youtube className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">YouTube → Notes</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Paste any lecture link. Get structured notes + auto quiz in seconds.
          </p>
        </div>
      </div>

      {/* URL input */}
      <div className="flex gap-2 mb-8">
        <div className="flex-1 relative">
          <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        <button
          onClick={generate}
          disabled={loading || !url.trim()}
          className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 font-medium"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-red-500" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Fetching transcript → Structuring notes → Generating quiz…
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <>
          {/* Video embed + meta */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${result.videoId}`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h2 className="text-xl font-bold dark:text-white">{result.notes.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{result.notes.summary}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {(result.notes.keyTopics || []).map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex gap-4">
                <span>Duration: {result.duration}</span>
                <span>{result.segmentCount} transcript segments</span>
              </div>
              <button
                onClick={downloadNotes}
                className="mt-4 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white"
              >
                <Download className="w-4 h-4" /> Download Markdown
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("notes")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                tab === "notes"
                  ? "bg-primary-600 text-white"
                  : "bg-slate-100 dark:bg-slate-700 dark:text-white"
              }`}
            >
              <FileText className="w-4 h-4" /> Notes
            </button>
            <button
              onClick={() => setTab("quiz")}
              className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                tab === "quiz"
                  ? "bg-primary-600 text-white"
                  : "bg-slate-100 dark:bg-slate-700 dark:text-white"
              }`}
            >
              <ListChecks className="w-4 h-4" /> Quiz ({result.quiz.length})
            </button>
          </div>

          {/* Notes tab */}
          {tab === "notes" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 space-y-5"
            >
              {(result.notes.sections || []).map((s, i) => (
                <div key={i} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 dark:text-white">
                      {s.timestamp}
                    </span>
                    <h3 className="font-semibold dark:text-white">{s.heading}</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300 ml-2">
                    {(s.bullets || []).map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-primary-500">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {result.notes.definitions?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 dark:text-white">
                    <BookOpen className="w-4 h-4" /> Key Definitions
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {result.notes.definitions.map((d, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-sm">
                        <div className="font-semibold text-primary-700 dark:text-primary-400">{d.term}</div>
                        <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">{d.definition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.notes.formulas?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 dark:text-white">📐 Formulas</h3>
                  <ul className="space-y-1">
                    {result.notes.formulas.map((f, i) => (
                      <li key={i} className="font-mono text-sm p-2 bg-slate-50 dark:bg-slate-900 rounded dark:text-white">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Quiz tab */}
          {tab === "quiz" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {result.quiz.map((q, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
                >
                  <div className="font-semibold dark:text-white mb-3">
                    Q{i + 1}. {q.q}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, j) => {
                      const selected = quizAnswers[i] === j;
                      const correct = showResults && j === q.answer;
                      const wrong = showResults && selected && j !== q.answer;
                      return (
                        <button
                          key={j}
                          onClick={() =>
                            !showResults && setQuizAnswers({ ...quizAnswers, [i]: j })
                          }
                          disabled={showResults}
                          className={`w-full text-left p-3 rounded-lg border text-sm transition ${
                            correct
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : wrong
                              ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                              : selected
                              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:text-white"
                              : "border-slate-200 dark:border-slate-700 dark:text-white hover:border-primary-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {correct && <CheckCircle2 className="w-4 h-4" />}
                            {wrong && <XCircle className="w-4 h-4" />}
                            {String.fromCharCode(65 + j)}. {opt}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              ))}
              {!showResults ? (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(quizAnswers).length < result.quiz.length}
                  className="w-full py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 font-medium"
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center">
                  You scored <b>{quizScore}/{result.quiz.length}</b> (
                  {Math.round((quizScore / result.quiz.length) * 100)}%)
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
