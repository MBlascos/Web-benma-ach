"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[100dvh] flex items-end pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Benjamin Mañach leading the pack — Ward Racing kart #213"
          fill
          className="object-cover"
          style={{ objectPosition: "center 65%" }}
          priority
          quality={85}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Season badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase">
              2026 Season · Ward Racing · OK Category
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display font-black uppercase leading-none tracking-tight text-white mb-4"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            Benjamin<br />
            <span className="text-[#E10600]">Mañach</span>
          </h1>

          {/* Tagline */}
          <p className="text-[#F5F6F8]/80 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-8">
            {t("tagline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/partners`}
              className="inline-flex items-center justify-center gap-2 bg-[#E10600] hover:bg-[#c00500] text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-all duration-200 hover:scale-[1.02]"
            >
              {t("cta_primary")}
            </Link>
            <Link
              href={`/${locale}/results`}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-all duration-200 hover:bg-white/5"
            >
              {t("cta_secondary")}
            </Link>
          </div>
        </div>

        {/* Key stat */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8">
          {[
            { num: "P1", label: "WSK Super Master Series Final — Lonato 2026" },
            { num: "P1", label: "IAME Winter Cup — 2024" },
            { num: "P1", label: "IAME Euro Series Round 1 — Zuera 2024" },
            { num: "15", label: "Years old — racing at the top of European karting" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="font-display font-black text-3xl sm:text-4xl text-white leading-none">
                {num}
              </span>
              <span className="text-[#8A9099] text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-2 text-[#8A9099]">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8A9099] to-transparent" />
      </div>
    </section>
  );
}
