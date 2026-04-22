// app/api/resume-analyze/route.js
// Uses pdf2json (works cleanly with Next.js, no import issues)

import { NextResponse } from "next/server";
import { askJSON } from "@/lib/gemini-helpers";
import PDFParser from "pdf2json";

export const runtime = "nodejs";
export const maxDuration = 60;

function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(null, true);
    parser.on("pdfParser_dataError", (err) => reject(err.parserError || err));
    parser.on("pdfParser_dataReady", () => {
      try {
        const text = parser.getRawTextContent();
        resolve(text);
      } catch (e) {
        reject(e);
      }
    });
    parser.parseBuffer(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");
    const targetRole = formData.get("targetRole") || "Software Engineer";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";
    try {
      text = await extractTextFromPDF(buffer);
    } catch (e) {
      console.error("PDF parse error:", e);
      return NextResponse.json(
        { error: "Could not parse PDF. Make sure it's a valid resume PDF (not image-only)." },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text too short. Is it a scanned/image-only PDF?" },
        { status: 400 }
      );
    }

    const analysis = await askJSON(
      `You are an expert ATS reviewer for Indian campus placements.
Analyze this resume for "${targetRole}" role.

Resume text:
"""${text.slice(0, 15000)}"""

Return strict JSON:
{
  "atsScore": 0-100,
  "overallVerdict": "1-sentence summary",
  "strengths": [string],
  "weaknesses": [string],
  "missingKeywords": [string],
  "actionVerbIssues": [string],
  "quantificationIssues": [string],
  "formatIssues": [string],
  "suggestedBullets": [{ "original": "...", "improved": "..." }],
  "sectionsFound": {
    "education": boolean, "experience": boolean, "projects": boolean,
    "skills": boolean, "achievements": boolean, "certifications": boolean
  },
  "topPriorityFixes": [string]
}

Be SPECIFIC. Reference actual content. Flag vague bullets, weak verbs, missing keywords, and lack of metrics.`
    );

    return NextResponse.json({ targetRole, textLength: text.length, analysis });
  } catch (err) {
    console.error("Resume analyze error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}