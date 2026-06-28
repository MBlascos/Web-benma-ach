import { getTranslations } from "next-intl/server";
import { PARTNER_TIERS, SPONSORS } from "@/lib/data";
import Link from "next/link";

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#E10600] flex-shrink-0 mt-0.5">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("partners");

  return (
    <div className="pt-24 pb-20 min-h-[100dvh]">
      {/* Hero — left-aligned split layout */}
      <div className="bg-[#16181D] border-b border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Sponsorship
              </p>
              <h1 className="font-display font-black uppercase text-white leading-none mb-6"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                {t("title")}
              </h1>
              <p className="text-[#8A9099] text-lg leading-relaxed">
                {t("value_prop")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "800K+", label: "Video views per month" },
                { num: "P1", label: "WSK Super Master Series Final — 2026" },
                { num: "60", label: "Nations at Lonato 2026" },
                { num: "5+", label: "European countries per season" },
              ].map(({ num, label }) => (
                <div key={label} className="border-t border-white/10 pt-4">
                  <span className="font-display font-black text-3xl text-white block leading-none mb-1">{num}</span>
                  <span className="text-[#8A9099] text-xs leading-relaxed">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Reach — asymmetric grid */}
        <section>
          <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-8">
            {t("reach_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
            {[
              { num: "@benjamin_manach", label: "Instagram — race-day stories, onboard content, growing international following", link: "https://www.instagram.com/benjamin_manach" },
              { num: "Pan-European", label: "Race broadcasts reaching audiences across Spain, Italy, Belgium, Germany, Sweden and beyond", link: null },
              { num: "F1 trajectory", label: "A 15-year-old with a credible path to the top — years of brand exposure ahead", link: null },
            ].map(({ num, label, link }) => (
              <div key={num} className="bg-[#0B0B0D] p-6 flex flex-col gap-2">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="font-display font-bold text-lg text-[#E10600] hover:underline tracking-wide">
                    {num}
                  </a>
                ) : (
                  <span className="font-display font-bold text-lg text-white tracking-wide">{num}</span>
                )}
                <span className="text-[#8A9099] text-xs leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers — 2-col + 2-col stacked instead of 4-equal */}
        <section>
          <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-8">
            {t("tiers_title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PARTNER_TIERS.map((tier, i) => (
              <div
                key={tier.id}
                className={`rounded-xl p-6 border ${
                  i === 0
                    ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                    : i === 1
                    ? "border-[#E10600]/30 bg-[#E10600]/5"
                    : "border-white/5 bg-[#16181D]"
                }`}
              >
                {i === 0 && (
                  <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded mb-3 tracking-wide uppercase">
                    Premium
                  </span>
                )}
                <h3 className="font-display font-black text-white text-xl uppercase mb-2">{tier.name}</h3>
                <p className="text-[#8A9099] text-sm mb-4 leading-relaxed">{tier.blurb}</p>
                <ul className="space-y-1.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[#8A9099] text-xs">
                      <CheckIcon />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Current partners */}
        <section>
          <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-6">
            {t("current_partners")}
          </h2>
          <div className="flex flex-wrap gap-4">
            {SPONSORS.map((s) => (
              s.url ? (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#16181D] border border-white/5 hover:border-white/20 rounded-lg flex items-center transition-colors group"
                >
                  <span className="font-display font-black text-white text-2xl tracking-wider uppercase group-hover:text-[#E10600] transition-colors">{s.name}</span>
                </a>
              ) : (
                <div key={s.id} className="px-8 py-4 bg-[#16181D] border border-white/5 rounded-lg flex items-center">
                  <span className="font-display font-black text-white text-2xl tracking-wider uppercase">{s.name}</span>
                </div>
              )
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#16181D] border border-[#E10600]/20 rounded-xl p-8 sm:p-12">
          <div className="max-w-xl">
            <h2 className="font-display font-black uppercase text-white leading-none mb-4"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
              Ready to discuss a partnership?
            </h2>
            <p className="text-[#8A9099] mb-8">
              Contact us to receive a full media kit, discuss placement options, and talk through what a partnership with Benjamin looks like for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-[#E10600] hover:bg-[#c00500] text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors"
              >
                {t("contact_cta")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors"
              >
                Request media kit
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
