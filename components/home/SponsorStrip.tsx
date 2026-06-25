import Link from "next/link";
import { useTranslations } from "next-intl";

type Sponsor = { id: string; name: string; tier: string; url?: string; active: boolean };

export default function SponsorStrip({ sponsors, locale }: { sponsors: Sponsor[]; locale: string }) {
  const t = useTranslations("home");

  return (
    <section className="py-16 bg-[#0B0B0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#8A9099] text-xs tracking-[0.2em] uppercase mb-8">
          {t("partners")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-12 mb-12">
          {sponsors.map((s) =>
            s.url ? (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/10 hover:border-white/30 rounded-md flex items-center justify-center min-w-[140px] transition-colors group"
              >
                <span className="font-display font-black text-white text-xl tracking-wider uppercase group-hover:text-[#E10600] transition-colors">
                  {s.name}
                </span>
              </a>
            ) : (
              <div
                key={s.id}
                className="px-6 py-3 border border-white/10 rounded-md flex items-center justify-center min-w-[140px]"
              >
                <span className="font-display font-black text-white text-xl tracking-wider uppercase">
                  {s.name}
                </span>
              </div>
            )
          )}
        </div>

        <Link
          href={`/${locale}/partners`}
          className="inline-flex items-center gap-2 border border-[#E10600]/50 hover:border-[#E10600] text-[#E10600] font-semibold text-sm tracking-widest uppercase px-8 py-3 rounded transition-all duration-200 hover:bg-[#E10600]/5"
        >
          {t("become_partner")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
