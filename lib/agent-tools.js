// lib/agent-tools.js
// Tool/function declarations for the AI Study Agent, in Gemini's function-calling schema.
// The agent (Gemini) decides which tool to call and in what order.

export const agentTools = [
  {
    name: "createStudyPlan",
    description:
      "Create a day-by-day study plan from today until the exam date. " +
      "Use this ONCE at the start. Break the syllabus into daily tasks (unit-wise).",
    parameters: {
      type: "object",
      properties: {
        subject: { type: "string", description: "Subject name, e.g., 'Data Structures'" },
        examDate: { type: "string", description: "ISO date string YYYY-MM-DD" },
        unitsRemaining: {
          type: "array",
          items: { type: "string" },
          description: "List of unit names left to study",
        },
        dailyHours: { type: "number", description: "Hours/day the student can commit" },
      },
      required: ["subject", "examDate", "unitsRemaining", "dailyHours"],
    },
  },
  {
    name: "createDailyQuiz",
    description:
      "Generate a short 5-question MCQ quiz for a specific unit/topic. " +
      "Call after scheduling to give the student something to test themselves with.",
    parameters: {
      type: "object",
      properties: {
        unit: { type: "string" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
      },
      required: ["unit", "difficulty"],
    },
  },
  {
    name: "analyzeWeakness",
    description:
      "Analyze the student's recent quiz performance to identify weak topics. " +
      "Use this when the student mentions they struggled or failed a recent quiz.",
    parameters: {
      type: "object",
      properties: {
        recentScores: {
          type: "array",
          items: {
            type: "object",
            properties: {
              unit: { type: "string" },
              score: { type: "number" },
              total: { type: "number" },
            },
          },
        },
      },
      required: ["recentScores"],
    },
  },
  {
    name: "rescheduleIfBehind",
    description:
      "Re-plan remaining days if the student has fallen behind schedule. " +
      "Compresses or redistributes tasks so the syllabus still finishes before the exam.",
    parameters: {
      type: "object",
      properties: {
        daysBehind: { type: "number" },
        remainingUnits: { type: "array", items: { type: "string" } },
        daysUntilExam: { type: "number" },
      },
      required: ["daysBehind", "remainingUnits", "daysUntilExam"],
    },
  },
  {
    name: "scheduleReminder",
    description:
      "Schedule a daily reminder (email/WhatsApp). For this demo, stores it in Firestore; " +
      "in production this would hit a cron + Twilio/SendGrid integration.",
    parameters: {
      type: "object",
      properties: {
        time: { type: "string", description: "HH:MM 24-hour format" },
        channel: { type: "string", enum: ["email", "whatsapp", "push"] },
        message: { type: "string" },
      },
      required: ["time", "channel", "message"],
    },
  },
];

// ----------------------------------------------------------------------------
// Tool handlers — these are the actual implementations the agent calls.
// They run server-side when invoked from the API route.
// Keep them PURE-ish; persistence is done client-side after the agent returns.
// ----------------------------------------------------------------------------

export function buildToolHandlers({ askJSON }) {
  return {
    async createStudyPlan({ subject, examDate, unitsRemaining, dailyHours }) {
      const today = new Date();
      const exam = new Date(examDate);
      const daysUntilExam = Math.max(
        1,
        Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
      );

      // Ask Gemini to distribute units across days intelligently
      const plan = await askJSON(
        `Create a ${daysUntilExam}-day study plan for "${subject}".
Units to cover: ${unitsRemaining.join(", ")}.
Student has ${dailyHours} hours/day. Last 2 days before exam (${examDate}) must be REVISION only.
Return strict JSON with this shape:
{
  "days": [
    { "date": "YYYY-MM-DD", "focus": "unit or revision", "tasks": ["task1", "task2"], "hours": number }
  ]
}
Starting date: ${today.toISOString().slice(0, 10)}. Exam date: ${examDate}.`
      );
      return {
        subject,
        examDate,
        daysUntilExam,
        plan: plan.days || [],
      };
    },

    async createDailyQuiz({ unit, difficulty }) {
      const quiz = await askJSON(
        `Generate 5 MCQs on "${unit}" at ${difficulty} difficulty.
Return strict JSON:
{
  "questions": [
    { "q": "...", "options": ["A","B","C","D"], "answer": 0, "explanation": "..." }
  ]
}`
      );
      return { unit, difficulty, ...quiz };
    },

    async analyzeWeakness({ recentScores }) {
      const weak = recentScores
        .map((s) => ({ ...s, pct: (s.score / s.total) * 100 }))
        .filter((s) => s.pct < 60)
        .sort((a, b) => a.pct - b.pct);
      const advice = await askJSON(
        `A student scored low on these units: ${JSON.stringify(weak)}.
Identify common knowledge gaps and suggest 3 specific topics to revise. Return JSON:
{ "weakTopics": [string], "focusAreas": [string], "suggestedAction": string }`
      );
      return { weak, ...advice };
    },

    async rescheduleIfBehind({ daysBehind, remainingUnits, daysUntilExam }) {
      const effectiveDays = Math.max(1, daysUntilExam - 1); // keep last day for revision
      const unitsPerDay = Math.ceil(remainingUnits.length / effectiveDays);
      return {
        reschedule: true,
        daysBehind,
        newPlan: remainingUnits.map((u, i) => ({
          dayOffset: Math.floor(i / unitsPerDay),
          unit: u,
        })),
        advice:
          daysBehind >= 3
            ? "You're significantly behind. Skip lowest-weight topics and focus on high-yield ones."
            : "You can still catch up with 30 extra minutes/day.",
      };
    },

    async scheduleReminder({ time, channel, message }) {
      // In production this would write to a Cloud Scheduler + Firestore doc.
      // Here we return a confirmation the client can persist.
      return {
        scheduled: true,
        time,
        channel,
        message,
        note:
          channel === "whatsapp"
            ? "Connect Twilio WhatsApp API to deliver"
            : channel === "email"
            ? "Connect SendGrid/Resend to deliver"
            : "Browser push notifications work via service worker",
      };
    },
  };
}
