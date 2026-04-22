// app/agent/page.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Loader2, Sparkles, Wrench, Calendar, Target } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "My Data Structures exam is on May 15. I've only completed Unit 1. I can study 3 hours/day. Help!",
  "I scored 2/10 in Operating Systems quiz on Process Scheduling and 4/10 on Deadlocks. Plan my recovery.",
  "I'm 3 days behind on my DBMS plan. Exam is in 10 days. Reschedule for me.",
];

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [trace, setTrace] = useState([]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setConversation((c) => [...c, { role: "user", content: msg }]);
    setLoading(true);
    setTrace([]);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Agent failed");

      setConversation((c) => [...c, { role: "assistant", content: data.reply }]);
      setTrace(data.trace || []);
    } catch (err) {
      setConversation((c) => [
        ...c,
        { role: "assistant", content: `⚠️ ${err.message}`, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <Bot className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            AI Study Agent
            <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              AGENTIC
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Autonomous planning, quiz generation, weakness analysis & rescheduling — all via Gemini function-calling.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="grid md:grid-cols-4 gap-3 mt-6 mb-8">
        {[
          { icon: Calendar, label: "Plans your schedule", tool: "createStudyPlan" },
          { icon: Sparkles, label: "Generates daily quizzes", tool: "createDailyQuiz" },
          { icon: Target, label: "Finds weak spots", tool: "analyzeWeakness" },
          { icon: Wrench, label: "Re-plans if you slip", tool: "rescheduleIfBehind" },
        ].map(({ icon: Icon, label, tool }) => (
          <div
            key={tool}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <Icon className="w-5 h-5 text-primary-600 mb-2" />
            <div className="text-sm font-medium dark:text-white">{label}</div>
            <code className="text-xs text-slate-500 dark:text-slate-400">{tool}()</code>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="min-h-[400px] space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            {conversation.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
                  Try one of these to see the agent work:
                </p>
                <div className="mt-4 space-y-2">
                  {EXAMPLE_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="block w-full text-left text-sm px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-slate-700 transition dark:text-slate-300"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {conversation.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
                      m.role === "user"
                        ? "bg-primary-600 text-white rounded-br-sm"
                        : m.error
                        ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-bl-sm"
                        : "bg-slate-100 dark:bg-slate-700 dark:text-white rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Agent is thinking and calling tools…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Tell the agent about your exam, syllabus, and time available…"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>

        {/* Trace panel */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 h-fit sticky top-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
            <Wrench className="w-4 h-4" /> Agent Trace
          </h3>
          {trace.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tool calls made by the agent appear here — great for your viva demo.
            </p>
          ) : (
            <ol className="space-y-2">
              {trace.map((t, i) => (
                <li
                  key={i}
                  className="text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <div className="font-semibold text-primary-700 dark:text-primary-400">
                    Step {t.step}: {t.tool}()
                  </div>
                  <pre className="mt-1 text-slate-600 dark:text-slate-400 overflow-x-auto">
                    {JSON.stringify(t.args, null, 2)}
                  </pre>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
