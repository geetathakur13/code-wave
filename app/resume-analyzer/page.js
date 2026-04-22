// app/resume-analyzer/page.js
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

const TARGET_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "ML Engineer",
];

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("resume", file);
      fd.append("targetRole", targetRole);
      const res = await fetch("/api/resume-analyze", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s) =>
    s >= 80 ? "from-green-500 to-emerald-600"
    : s >= 60 ? "from-blue-500 to-cyan-600"
    : s >= 40 ? "from-amber-500 to-orange-600"
    : "from-red-500 to-rose-600";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Resume Analyzer</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Get your ATS score + actionable fixes before you apply.
          </p>
        </div>
      </div>

      {/* Upload form */}
      {!result && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block dark:text-white">Target role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
            >
              {TARGET_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f?.type === "application/pdf") setFile(f);
            }}
            className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-12 text-center cursor-pointer hover:border-primary-500 transition"
          >
            <Upload className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            {file ? (
              <>
                <p className="font-semibold dark:text-white">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB · click to change</p>
              </>
            ) : (
              <>
                <p className="font-medium dark:text-white">Drop your resume PDF here</p>
                <p className="text-xs text-slate-500 mt-1">or click to browse</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* ATS Score */}
          <div className={`rounded-2xl bg-gradient-to-br ${scoreColor(result.analysis.atsScore)} text-white p-8 text-center`}>
            <div className="text-sm uppercase tracking-wider opacity-80">ATS Score</div>
            <div className="text-7xl font-bold mt-2">{result.analysis.atsScore}</div>
            <div className="text-sm opacity-80 mt-1">/ 100</div>
            <p className="mt-4 max-w-xl mx-auto italic">"{result.analysis.overallVerdict}"</p>
          </div>

          {/* Sections found */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <h3 className="font-semibold mb-3 dark:text-white">Sections detected</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {Object.entries(result.analysis.sectionsFound || {}).map(([s, found]) => (
                <div
                  key={s}
                  className={`p-2 rounded-lg text-center text-xs ${
                    found
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                  }`}
                >
                  {found ? <CheckCircle2 className="w-4 h-4 mx-auto mb-1" /> : <XCircle className="w-4 h-4 mx-auto mb-1" />}
                  <div className="capitalize">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Fixes */}
          {result.analysis.topPriorityFixes?.length > 0 && (
            <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
                <Target className="w-5 h-5" /> Top Priority Fixes
              </h3>
              <ol className="space-y-2">
                {result.analysis.topPriorityFixes.map((fix, i) => (
                  <li key={i} className="flex gap-3 text-sm dark:text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shrink-0 font-bold">
                      {i + 1}
                    </span>
                    {fix}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Strengths + Weaknesses */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-white dark:bg-slate-800 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" /> Strengths
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.analysis.strengths?.map((s, i) => <li key={i}>✅ {s}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-white dark:bg-slate-800 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" /> Weaknesses
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.analysis.weaknesses?.map((s, i) => <li key={i}>⚠️ {s}</li>)}
              </ul>
            </div>
          </div>

          {/* Missing Keywords */}
          {result.analysis.missingKeywords?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h3 className="font-semibold mb-3 dark:text-white">Missing keywords for {result.targetRole}</h3>
              <div className="flex flex-wrap gap-2">
                {result.analysis.missingKeywords.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Consider adding these to your skills section or weaving them into project descriptions.
              </p>
            </div>
          )}

          {/* Rewritten bullets */}
          {result.analysis.suggestedBullets?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
                <TrendingUp className="w-4 h-4" /> Rewrite These Bullets
              </h3>
              <div className="space-y-3">
                {result.analysis.suggestedBullets.map((b, i) => (
                  <div key={i} className="border-l-4 border-primary-500 pl-3">
                    <div className="text-xs text-red-600 dark:text-red-400 line-through">{b.original}</div>
                    <div className="text-sm text-green-700 dark:text-green-400 font-medium mt-1">→ {b.improved}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setResult(null);
              setFile(null);
              setError("");
            }}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
}
