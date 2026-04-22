// app/api/code-review/route.js
// Gemini-powered code review: complexity analysis + optimization suggestions.

import { NextResponse } from "next/server";
import { askJSON } from "@/lib/gemini-helpers";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { code, language, problemTitle, problemDescription } = await req.json();
    if (!code || !language) {
      return NextResponse.json({ error: "Missing code or language" }, { status: 400 });
    }

    const prompt = `You are a senior DSA coach reviewing a student's solution.

Problem: ${problemTitle}
Description: ${problemDescription || "N/A"}
Language: ${language}

Student's code:
\`\`\`${language}
${code}
\`\`\`

Analyze and return strict JSON with this shape:
{
  "correctness": "correct" | "likely_correct" | "buggy",
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "bugs": [string],
  "strengths": [string],
  "optimizations": [string],
  "idealApproach": "1–2 sentence description",
  "verdict": "1-line overall feedback"
}

Be specific. Reference actual variable names from the code. Do not be generic.`;

    const review = await askJSON(prompt);
    return NextResponse.json(review);
  } catch (err) {
    console.error("Code review error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
