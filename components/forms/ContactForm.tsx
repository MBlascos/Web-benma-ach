"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const honeypot = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot.current?.value) return; // honeypot triggered

    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#0B0B0D] border border-white/10 focus:border-[#E10600]/50 rounded-lg px-4 py-3 text-white text-sm placeholder-[#8A9099] outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input ref={honeypot} name="_hp" type="text" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#8A9099] text-xs tracking-wide mb-1.5">{t("name")} *</label>
          <input name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className="block text-[#8A9099] text-xs tracking-wide mb-1.5">{t("org")}</label>
          <input name="org" type="text" placeholder="Acme Corp" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-[#8A9099] text-xs tracking-wide mb-1.5">{t("email")} *</label>
        <input name="email" type="email" required placeholder="jane@example.com" className={inputClass} />
      </div>

      <div>
        <label className="block text-[#8A9099] text-xs tracking-wide mb-1.5">{t("subject")} *</label>
        <select name="subject" required className={`${inputClass} cursor-pointer`}>
          <option value="">{t("subject")}…</option>
          <option value="sponsorship">{t("subject_sponsorship")}</option>
          <option value="media">{t("subject_media")}</option>
          <option value="other">{t("subject_other")}</option>
        </select>
      </div>

      <div>
        <label className="block text-[#8A9099] text-xs tracking-wide mb-1.5">{t("message")} *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your enquiry…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "success" && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg">
          {t("success")}
        </div>
      )}
      {status === "error" && (
        <div className="bg-[#E10600]/10 border border-[#E10600]/20 text-[#E10600] text-sm px-4 py-3 rounded-lg">
          {t("error")}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#E10600] hover:bg-[#c00500] disabled:opacity-60 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-colors"
      >
        {status === "sending" ? "Sending…" : t("send")}
      </button>
    </form>
  );
}
