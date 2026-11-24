import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const portfolioContext = [
  "You are Sarathe.AI, the concise and highly knowledgeable portfolio assistant for Krishna Sarathe.",
  "Krishna is an Applied AI & Full-Stack Software Engineer and B.Tech CSE (AI & Data Science) student at SCOPE Global Skills University, Bhopal (CGPA: 8.26/10).",
  "Key Achievements & Certificates: 1st Place National Winner at BGI National Hackathon 2026 (600+ teams, 2,800+ participants, ₹25,000 cash prize) with GullyMart; Grand Finalist & Team Leader at AI-Manthan 2.0 (AITR Indore & IEEE CIS) with AEGIS-IoT; Pearson VUE & Certiport Certified in Python (ID: wMr3K-FaSQ) and HTML/CSS (ID: nA6Q-uTn8); Runner-Up in AI Prompt Writing on World Youth Skills Day 2026; Finalist in Number Quest? Season-1 (Hexaware).",
  "Experience: SDE Intern at QuantNexa.ai Pvt. Ltd. (Remote, Oct-Nov 2026), where he independently shipped three flagship systems backed by 220+ tests: 1) SmartEd Studio v3.0 (60/60 Pytest, multimodal vision AI answer evaluator), 2) Meet Intelligence (135+ tests, zero-echo Playwright Meet bot, live on Render), 3) Sentinelytics v3.0 (27/27 Pytest, dual-domain sentiment & sarcasm intelligence).",
  "Other Major Projects: AEGIS-IoT (7-stage deterministic verification ladder for C firmware), GullyMart (hyperlocal social commerce with MapLibre & Supabase), KhetLedger v1.0.0 (offline-first agricultural ledger, signed Android APK, 46/46 tests), MONEY v2.0 (offline-first private banking coach, Gemini+Groq failover, live web & APK), FRIDAY-X (trilingual voice assistant, live on Vercel & Render), JARVIS 2.0 (multi-agent swarms with 3D Spatial Memory Theater, 54/54 tests), LMS Like Never Before (Next.js 14, Groq AI, Razorpay, S3), and Clozr v2.0.",
  "Skills: Python, C++, JavaScript, TypeScript, React 19, Next.js 14, FastAPI, Flutter, SQLite, Supabase, Machine Learning, Scikit-Learn, Groq, Gemini, Playwright, Chrome Extensions (MV3), Pytest.",
  "Contact: thekrishnasarathe000@gmail.com, phone +91 9109483355, GitHub github.com/thekrishnasarathe, LinkedIn linkedin.com/in/krishna-sarathe-9a749a297.",
  "Only answer about Krishna's portfolio. Do not invent unverified claims. Keep replies crisp, technically accurate, and under 120 words."
].join(' ');
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured. Add GEMINI_API_KEY to .env.local, then restart the development server." },
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    if (
      !Array.isArray(body.messages) ||
      body.messages.length === 0 ||
      body.messages.length > 30 ||
      !body.messages.every(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0
      )
    ) {
      return NextResponse.json({ error: "Please send a valid chat message." }, { status: 400 });
    }
    messages = body.messages.slice(-10).map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000)
    }));
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!messages.length) {
    return NextResponse.json({ error: "Please send a message." }, { status: 400 });
  }

  const conversation = messages
    .map((message) => `${message.role === "assistant" ? "Assistant" : "Visitor"}: ${message.content}`)
    .join("\n\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: portfolioContext }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: conversation }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      }
    );

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
      error?: { message?: string };
    };

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!response.ok || !reply) {
      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "The AI is receiving too many requests. Please try again in a moment."
              : data.error?.message || "Gemini did not return a response."
        },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Gemini took too long to respond. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Could not reach Gemini. Check your internet connection and API key." },
      { status: 502 }
    );
  }
}
