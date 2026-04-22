// app/api/youtube-notes/route.js
// Given a YouTube URL, fetch its transcript and use Gemini to produce
// structured timestamped notes + a 10-question MCQ quiz.

import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { askJSON } from "@/lib/gemini-helpers";

export const runtime = "nodejs";
export const maxDuration = 60;

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&?#\n]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // raw ID
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function formatTimestamp(seconds) {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}:${String(m % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

// Condense transcript into chunks with timestamps for Gemini
function buildTranscriptText(segments) {
  // Group into ~30 second chunks so Gemini can attach meaningful timestamps
  const chunks = [];
  let current = { start: 0, text: "" };
  const chunkSize = 30; // seconds

  for (const seg of segments) {
    const startSec = seg.offset / 1000;
    if (startSec - current.start >= chunkSize && current.text) {
      chunks.push({ ...current });
      current = { start: startSec, text: seg.text };
    } else {
      current.text += " " + seg.text;
    }
  }
  if (current.text) chunks.push(current);

  return chunks
    .map((c) => `[${formatTimestamp(c.start)}] ${c.text.trim()}`)
    .join("\n");
}

export async function POST(req) {
  try {
    const { url } = await req.json();
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    // 1. Fetch transcript
    let segments;
    try {
      segments = await YoutubeTranscript.fetchTranscript(videoId);
    } catch (e) {
      return NextResponse.json(
        { error: "Could not fetch transcript. Video may not have captions." },
        { status: 404 }
      );
    }

    if (!segments?.length) {
      return NextResponse.json({ error: "Empty transcript" }, { status: 404 });
    }

    const transcriptText = buildTranscriptText(segments);
    const totalDuration = formatTimestamp(
      (segments[segments.length - 1].offset + segments[segments.length - 1].duration) / 1000
    );

    // 2. Ask Gemini for structured notes
    const notes = await askJSON(
      `You are a CS tutor for RGPV students. Turn this YouTube lecture transcript into structured study notes.

Transcript (with timestamps):
${transcriptText.slice(0, 30000)}

Return strict JSON:
{
  "title": "inferred lecture title",
  "summary": "3-4 sentence TL;DR",
  "keyTopics": ["topic1", "topic2", ...],
  "sections": [
    {
      "timestamp": "MM:SS",
      "heading": "section title",
      "bullets": ["key point 1", "key point 2", "key point 3"]
    }
  ],
  "definitions": [
    { "term": "...", "definition": "..." }
  ],
  "formulas": ["..."]
}

Cover the whole video. 5-8 sections is ideal.`,
      { model: "gemini-2.0-flash" }
    );

    // 3. Generate 10 MCQs
    const quiz = await askJSON(
      `Based on this lecture content, create exactly 10 MCQs testing understanding.
Topics covered: ${(notes.keyTopics || []).join(", ")}
Summary: ${notes.summary}

Return strict JSON:
{
  "questions": [
    {
      "q": "question text",
      "options": ["A", "B", "C", "D"],
      "answer": 0,
      "explanation": "why this is correct"
    }
  ]
}`,
      { model: "gemini-2.0-flash" }
    );

    return NextResponse.json({
      videoId,
      duration: totalDuration,
      segmentCount: segments.length,
      notes,
      quiz: quiz.questions || [],
    });
  } catch (err) {
    console.error("YT notes error:", err);
    return NextResponse.json({ error: err.message || "Failed" }, { status: 500 });
  }
}
