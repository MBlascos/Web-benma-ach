"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const honeypot = useRef<HTMLInputElement>(null);

  function validate(data: Record<string, FormDataEntryValue>): FieldErrors {
    const errors: FieldErrors = {};
    if (!String(data.name || "").trim()) errors.name = "Name is required.";
    if (!String(data.email || "").trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) errors.email = "Enter a valid email address.";
    if (!String(data.subject || "").trim()) errors.subject = "Please select a subject.";
    if (!String(data.message || "").trim()) errors.message = "Message is required.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot.current?.value) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStatus("sending");

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

  const inputClass = (hasError: boolean) =>
    `w-full bg-[#0B0B0D] border ${hasError ? "border-[#E10600]/70" : "border-white/10 focus:border-[#E10600]/50"} rounded-lg px-4 py-3 text-white text-sm placeholder-[#8A9099] outline-none transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input ref={honeypot} name="_hp" type="text" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#8A9099] text-xs tracking-wide">{t("name")} *</label>
          <input name="name" type="text" placeholder="Marco Rossi" className={inputClass(!!fieldErrors.name)} />
          {fieldErrors.name && <p className="text-[#E10600] text-xs">{fieldErrors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#8A9099] text-xs tracking-wide">{t("org")}</label>
          <input name="org" type="text" placeholder="Red Bull Racing Ltd" className={inputClass(false)} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[#8A9099] text-xs tracking-wide">{t("email")} *</label>
        <input name="email" type="email" placeholder="marco@example.com" className={inputClass(!!fieldErrors.email)} />
        {fieldErrors.email && <p className="text-[#E10600] text-xs">{fieldErrors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[#8A9099] text-xs tracking-wide">{t("subject")} *</label>
        <select name="subject" className={`${inputClass(!!fieldErrors.subject)} cursor-pointer`}>
          <option value="">{t("subject")}…</option>
          <option value="sponsorship">{t("subject_sponsorship")}</option>
          <option value="media">{t("subject_media")}</option>
          <option value="other">{t("subject_other")}</option>
        </select>
        {fieldErrors.subject && <p className="text-[#E10600] text-xs">{fieldErrors.subject}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[#8A9099] text-xs tracking-wide">{t("message")} *</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your enquiry…"
          className={`${inputClass(!!fieldErrors.message)} resize-none`}
        />
        {fieldErrors.message && <p className="text-[#E10600] text-xs">{fieldErrors.message}</p>}
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
        className="w-full bg-[#E10600] hover:bg-[#c00500] disabled:opacity-60 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-colors active:scale-[0.98]"
      >
        {status === "sending" ? "Sending…" : t("send")}
      </button>
    </form>
  );
}
