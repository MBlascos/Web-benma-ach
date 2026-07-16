import { NextResponse } from "next/server";

const IP_MAP = new Map<string, number>();
const EMAIL_MAP = new Map<string, number>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = new Set(["sponsorship", "media", "other"]);

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 10_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();

  if (now - (IP_MAP.get(ip) ?? 0) < 60_000) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message, _hp, _ts } = body;

  // Honeypot — silent drop
  if (_hp) return NextResponse.json({ ok: true });

  // Timing check — bots submit instantly, real users take at least 2 seconds
  if (!_ts || now - parseInt(_ts) < 2_000) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!VALID_SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }
  if (message.length > 5_000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  // Per-email cooldown: same address can't submit again for 5 minutes
  if (now - (EMAIL_MAP.get(email) ?? 0) < 300_000) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  IP_MAP.set(ip, now);
  EMAIL_MAP.set(email, now);

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const to = (process.env.CONTACT_EMAIL ?? "miquelblascos@gmail.com")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      await resend.emails.send({
        from: "contact@benjaminmanach.com",
        to,
        subject: `[Benjamin Mañach] ${subject} — ${name}`,
        text: `From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      });
    } catch (err) {
      console.error("Resend error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
