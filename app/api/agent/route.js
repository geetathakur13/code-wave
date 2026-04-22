// app/api/agent/route.js
// Runs the agentic loop server-side. Gemini plans + calls tools until done.

import { NextResponse } from "next/server";
import { runAgent, askJSON } from "@/lib/gemini-helpers";
import { agentTools, buildToolHandlers } from "@/lib/agent-tools";

export const runtime = "nodejs";

const SYSTEM_INSTRUCTION = `You are StudyBot-Agent — an autonomous AI tutor for RGPV CSE students.
You plan study schedules, generate quizzes, analyze weaknesses, and reschedule when students fall behind.

Rules:
- Always start by calling createStudyPlan when given a new exam/subject.
- After creating a plan, call createDailyQuiz for TODAY'S unit.
- If the student mentions past quiz scores, call analyzeWeakness.
- If the student says they're "behind" or missed days, call rescheduleIfBehind.
- Always call scheduleReminder once at the end to set up a daily nudge.
- After all tool calls, give the student a concise, motivating summary (≤120 words).
- Use Indian English. Be encouraging but realistic.`;

export async function POST(req) {
  try {
    const { message, context } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const userPrompt = context
      ? `Context: ${JSON.stringify(context)}\n\nStudent says: ${message}`
      : message;

    const handlers = buildToolHandlers({ askJSON });
    const { finalText, trace } = await runAgent(
      userPrompt,
      agentTools,
      handlers,
      { systemInstruction: SYSTEM_INSTRUCTION, maxIterations: 8 }
    );

    return NextResponse.json({ reply: finalText, trace });
  } catch (err) {
    console.error("Agent error:", err);
    return NextResponse.json(
      { error: err.message || "Agent failed" },
      { status: 500 }
    );
  }
}
