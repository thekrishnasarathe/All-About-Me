import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "SARATHE.AI Cognitive System Interface",
    version: "3.0.0",
    timestamp: new Date().toISOString()
  });
}
