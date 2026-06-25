import { NextResponse } from "next/server";

const RATE_MAP = new Map<string, number>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const last = RATE_MAP.get(ip) ?? 0;

  if (now - last < 60_000) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }
  RATE_MAP.set(ip, now);

  const body = await req.json();
  const { name, email, org, subject, message, _hp } = body;

  if (_hp) return NextResponse.json({ ok: true }); // honeypot

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // If Resend is configured, send email
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "contact@benjaminmanach.com",
        to: process.env.CONTACT_EMAIL ?? "miquelblascos@gmail.com",
        subject: `[Benjamin Mañach] ${subject} — ${name}`,
        text: `From: ${name}\nOrg: ${org ?? "—"}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      });
    } catch (err) {
      console.error("Resend error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
