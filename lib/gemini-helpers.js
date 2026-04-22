// lib/gemini-helpers.js
// Shared Gemini utilities — safe for both client and server use.
// Client: uses NEXT_PUBLIC_GEMINI_API_KEY
// Server (API routes): uses GEMINI_API_KEY (non-public, safer)

import { GoogleGenerativeAI } from "@google/generative-ai";

function getKey() {
  // Prefer server-side key if available (in API routes), else fall back to public
  if (typeof window === "undefined") {
    return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
}

export function getGemini(modelName = "gemini-2.5-flash") {
  const key = getKey();
  if (!key) throw new Error("Missing Gemini API key");
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: modelName });
}

/**
 * Ask Gemini for a JSON response. Strips ```json fences and parses.
 */
export async function askJSON(prompt, { model = "gemini-2.5-flash", systemInstruction } = {}) {
  const key = getKey();
  if (!key) throw new Error("Missing Gemini API key");
  const genAI = new GoogleGenerativeAI(key);
  const m = genAI.getGenerativeModel({
    model,
    systemInstruction,
    generationConfig: { responseMimeType: "application/json" },
  });
  const res = await m.generateContent(prompt);
  const text = res.response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // fallback — strip fences if Gemini wrapped them despite the mime type
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
}

/**
 * Plain text Gemini call — for free-form answers.
 */
export async function askText(prompt, { model = "gemini-2.5-flash", systemInstruction } = {}) {
  const m = getGemini(model);
  const res = await m.generateContent(
    systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt
  );
  return res.response.text();
}

/**
 * Run a Gemini "agent" loop with function-calling tools.
 * Gemini decides which tool to call; we execute it and feed results back
 * until Gemini returns a final text response or hits maxIterations.
 *
 * @param {string} userPrompt
 * @param {Array} tools            — Gemini function declarations
 * @param {Object} toolHandlers    — { [toolName]: async (args) => result }
 * @param {Object} opts
 * @returns { finalText, trace }
 */
export async function runAgent(userPrompt, tools, toolHandlers, opts = {}) {
  const { model = "gemini-2.5-flash", systemInstruction, maxIterations = 6 } = opts;
  const genAI = new GoogleGenerativeAI(getKey());
  const m = genAI.getGenerativeModel({
    model,
    systemInstruction,
    tools: [{ functionDeclarations: tools }],
  });

  const chat = m.startChat();
  let result = await chat.sendMessage(userPrompt);
  const trace = [];

  for (let i = 0; i < maxIterations; i++) {
    const calls = result.response.functionCalls?.() || [];
    if (!calls.length) {
      return { finalText: result.response.text(), trace };
    }

    const functionResponses = [];
    for (const call of calls) {
      trace.push({ step: i + 1, tool: call.name, args: call.args });
      const handler = toolHandlers[call.name];
      let toolResult;
      try {
        toolResult = handler ? await handler(call.args) : { error: `No handler for ${call.name}` };
      } catch (err) {
        toolResult = { error: String(err?.message || err) };
      }
      functionResponses.push({
        functionResponse: { name: call.name, response: { result: toolResult } },
      });
    }

    result = await chat.sendMessage(functionResponses);
  }
  return { finalText: result.response.text() || "Agent reached max iterations.", trace };
}
