"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const FLAG_EMOJIS: Record<string, string> = {
  IT: "🇮🇹", ES: "🇪🇸", BE: "🇧🇪", SE: "🇸🇪", EU: "🇪🇺", GB: "🇬🇧", FR: "🇫🇷", PT: "🇵🇹", DK: "🇩🇰",
};

type CalendarEvent = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  circuit: string;
  city: string;
  country: string;
  championship: string;
  round: string;
  status: "upcoming" | "completed" | "live";
};

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function NextRace({ event }: { event: CalendarEvent }) {
  const t = useTranslations("home");
  const countdown = useCountdown(event.startDate);
  const flag = FLAG_EMOJIS[event.country] ?? "🏁";

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-20 bg-[#16181D] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
              {t("next_race")}
            </p>
            <h2 className="font-display font-black uppercase text-white leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {event.title}
            </h2>
            <p className="text-[#8A9099] text-sm mb-1">
              {flag} {event.circuit}, {event.city}
            </p>
            <p className="text-[#8A9099] text-sm mb-6">
              {event.championship} · {event.round}
            </p>
            <p className="text-white font-medium">
              {new Date(event.startDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" "}–{" "}
              {new Date(event.endDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { val: countdown.days, label: t("countdown_days") },
              { val: countdown.hours, label: t("countdown_hours") },
              { val: countdown.mins, label: t("countdown_mins") },
              { val: countdown.secs, label: t("countdown_secs") },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="bg-[#0B0B0D] border border-white/5 rounded-lg p-4 flex flex-col items-center gap-1"
              >
                <span className="font-display font-black text-3xl sm:text-5xl text-white leading-none tabular-nums">
                  {pad(val)}
                </span>
                <span className="text-[#8A9099] text-xs tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
