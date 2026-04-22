// app/api/execute/route.js
// Sandboxed code execution. Tries multiple Piston mirrors as fallbacks.

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PISTON_MIRRORS = [
  "https://piston.kasper.dev/api/v2/execute",
  "https://emkc.org/api/v2/piston/execute",
];

async function tryExecute(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export async function POST(req) {
  try {
    const { language, version, code, stdin } = await req.json();
    if (!language || !code) {
      return NextResponse.json({ error: "Missing language or code" }, { status: 400 });
    }

    const body = {
      language,
      version: version || "*",
      files: [{ content: code }],
      stdin: stdin || "",
      run_timeout: 5000,
      compile_timeout: 10000,
    };

    let data, lastErr;
    for (const url of PISTON_MIRRORS) {
      try {
        data = await tryExecute(url, body);
        break;
      } catch (e) {
        lastErr = e;
      }
    }

    if (!data) {
      return NextResponse.json(
        { error: `All execution servers failed. Last error: ${lastErr?.message}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      stdout: data.run?.stdout || "",
      stderr: data.run?.stderr || data.compile?.stderr || "",
      exitCode: data.run?.code,
      compileError: data.compile?.stderr || "",
      language: data.language,
      version: data.version,
    });
  } catch (err) {
    console.error("Execute error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}