import { useTranslations } from "next-intl";
import { PARTNER_TIERS, SPONSORS } from "@/lib/data";
import Link from "next/link";

export default function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("partners");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <div className="bg-[#16181D] border-b border-white/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-4">
            Sponsorship
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            {t("title")}
          </h1>
          <p className="text-[#8A9099] text-lg leading-relaxed max-w-2xl mx-auto">
            {t("value_prop")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Reach stats */}
        <section>
          <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-8 text-center">
            {t("reach_title")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              { num: "800K+", label: "Video views per month across social platforms" },
              { num: "P1", label: "WSK Super Master Series OK Final win at Lonato 2026" },
              { num: "60", label: "Nations represented at Lonato 2026" },
              { num: "5+", label: "European countries raced in per season" },
            ].map(({ num, label }) => (
              <div key={label} className="bg-[#16181D] border border-white/5 rounded-lg p-6 text-center">
                <span className="font-display font-black text-4xl text-white block mb-1">{num}</span>
                <span className="text-[#8A9099] text-xs leading-relaxed">{label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { num: "@benjamin_manach", label: "Instagram — growing international following, race-day stories and onboard content", link: "https://www.instagram.com/benjamin_manach" },
              { num: "Pan-European", label: "Race broadcasts reaching audiences across Spain, Italy, Belgium, Germany, Sweden and beyond", link: null },
              { num: "F1 trajectory", label: "A 15-year-old with a credible path to the top — years of brand exposure ahead", link: null },
            ].map(({ num, label, link }) => (
              <div key={num} className="bg-[#16181D] border border-white/5 rounded-lg p-5 flex flex-col gap-2">
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

        {/* Tiers */}
        <section>
          <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-8">
            {t("tiers_title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNER_TIERS.map((tier, i) => (
              <div
                key={tier.id}
                className={`rounded-lg p-6 border ${
                  i === 0
                    ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                    : i === 1
                    ? "border-[#E10600]/30 bg-[#E10600]/5"
                    : "border-white/5 bg-[#16181D]"
                }`}
              >
                {i === 0 && (
                  <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded mb-3 tracking-wide uppercase">
                    Recommended
                  </span>
                )}
                <h3 className="font-display font-black text-white text-xl uppercase mb-2">{tier.name}</h3>
                <p className="text-[#8A9099] text-sm mb-4 leading-relaxed">{tier.blurb}</p>
                <ul className="space-y-1.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[#8A9099] text-xs">
                      <span className="text-[#E10600] mt-0.5 flex-shrink-0">✓</span>
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
        <section className="bg-[#16181D] border border-[#E10600]/20 rounded-xl p-8 sm:p-12 text-center">
          <h2 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
            Ready to discuss a partnership?
          </h2>
          <p className="text-[#8A9099] mb-8 max-w-xl mx-auto">
            Contact us to receive a full media kit, discuss placement options, and talk through what a partnership with Benjamin looks like for your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#E10600] hover:bg-[#c00500] text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors"
            >
              {t("contact_cta")}
            </Link>
            <a
              href="/media-kit.pdf"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded transition-colors"
              download
            >
              {t("media_kit")} ↓
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
