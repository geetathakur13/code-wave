// app/api/interview-feedback/route.js
// Two modes:
//   1. POST { mode: 'question', topic, difficulty, previousQuestions }
//      → Generates the next interview question
//   2. POST { mode: 'feedback', question, answer, topic }
//      → Analyzes the student's verbal answer

import { NextResponse } from "next/server";
import { askJSON } from "@/lib/gemini-helpers";

export const runtime = "nodejs";

const FILLER_WORDS = [
  "um", "uh", "umm", "uhh", "er", "ah", "like", "you know",
  "basically", "actually", "literally", "sort of", "kind of",
  "i mean", "so yeah", "right",
];

function countFillers(text) {
  const lower = " " + text.toLowerCase() + " ";
  const counts = {};
  let total = 0;
  for (const f of FILLER_WORDS) {
    const re = new RegExp(`\\b${f.replace(/ /g, "\\s+")}\\b`, "g");
    const matches = lower.match(re);
    if (matches) {
      counts[f] = matches.length;
      total += matches.length;
    }
  }
  return { counts, total };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { mode } = body;

    if (mode === "question") {
      const { topic, difficulty = "medium", previousQuestions = [] } = body;
      const data = await askJSON(
        `You are a technical interviewer for campus placements at an Indian engineering college.
Generate ONE interview question on "${topic}" at ${difficulty} difficulty.

Avoid repeating these previously asked questions:
${previousQuestions.map((q) => `- ${q}`).join("\n") || "(none)"}

Return strict JSON:
{
  "question": "the question text",
  "expectedKeyPoints": ["point1", "point2", "point3"],
  "idealAnswerOutline": "2-3 sentence outline of a great answer"
}

Keep the question concise (1-2 sentences). Typical CS interview style.`
      );
      return NextResponse.json(data);
    }

    if (mode === "feedback") {
      const { question, answer, topic, expectedKeyPoints = [] } = body;
      if (!answer?.trim()) {
        return NextResponse.json({ error: "Empty answer" }, { status: 400 });
      }

      // Local filler analysis (no Gemini call needed)
      const fillers = countFillers(answer);
      const wordCount = answer.trim().split(/\s+/).length;
      const fillerRate = wordCount > 0 ? (fillers.total / wordCount) * 100 : 0;

      // Gemini for content analysis
      const analysis = await askJSON(
        `A student answered an interview question verbally (transcribed below).
Evaluate their answer on CORRECTNESS and DEPTH.

Topic: ${topic}
Question: ${question}
Expected key points: ${expectedKeyPoints.join(", ") || "N/A"}

Student's answer (transcribed):
"""${answer}"""

Return strict JSON:
{
  "correctnessScore": 0-10,
  "depthScore": 0-10,
  "keyPointsCovered": [string],
  "keyPointsMissed": [string],
  "factualErrors": [string],
  "strengths": [string],
  "improvements": [string],
  "oneLinerFeedback": "single encouraging sentence"
}`
      );

      // Confidence score = inverse of filler rate + answer length factor
      const confidenceScore = Math.max(
        0,
        Math.min(10, 10 - fillerRate * 0.5 - (wordCount < 30 ? 2 : 0))
      );

      return NextResponse.json({
        ...analysis,
        confidenceScore: Math.round(confidenceScore * 10) / 10,
        delivery: {
          wordCount,
          fillerWordCount: fillers.total,
          fillerRate: Math.round(fillerRate * 10) / 10,
          fillers: fillers.counts,
        },
      });
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (err) {
    console.error("Interview API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
