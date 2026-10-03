import { NextResponse } from "next/server";
import { checkPassword, startSession } from "../../../lib/auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const password = String(body?.password ?? "");

  if (!checkPassword(password)) {
    const current = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
    current.count += 1;
    attempts.set(ip, current);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  attempts.delete(ip);
  await startSession();
  return NextResponse.json({ ok: true });
}