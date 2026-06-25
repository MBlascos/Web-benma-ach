import Image from "next/image";
import { useTranslations } from "next-intl";

const TIMELINE = [
  { year: "2015", event: "First KTM motocross bike at summer camp, age 4" },
  { year: "2020", event: "Sits in a go-kart for the first time, age 9 — decides this is his career" },
  { year: "2022", event: "National debut — double win at Zuera, P3 Spanish Championship" },
  { year: "2023", event: "Steps up to European competition — 4th in European general classification" },
  { year: "2024", event: "IAME Winter Cup Champion — breaks through on the international stage" },
  { year: "2025", event: "FIA Karting World Championship — P12 in the World Final from P5 on the grid" },
  { year: "2026", event: "OK category with Ward Racing — WSK Super Master Series Final Win, P3 overall" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] mb-20">
        <Image
          src="/images/ben-06.jpg"
          alt="Benjamin Mañach"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            {t("title")}
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Benjamin<br />Mañach
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Bio */}
            <section>
              <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-6">
                {t("bio_title")}
              </h2>
              <div className="space-y-4 text-[#8A9099] leading-relaxed">
                <p>
                  I&apos;m Benjamin Mañach, a 15-year-old racing driver from Barcelona with Spanish and British nationality.
                  I started motorsport on a KTM motocross bike at four years old during a summer camp, tried everything
                  from water sports to skiing, but the moment I sat in a go-kart at nine, I knew exactly what I wanted to do with my life.
                </p>
                <p>
                  Since then, every year has been about improving, stepping up the competition level, and proving I belong
                  at the top of the sport. Karting is not a stepping stone for me — it is where champions are built.
                  Every tenth of a second matters. Every setup decision, every tyre management call, every overtake.
                </p>
                <p>
                  In 2026 I stepped up to the OK category with Ward Racing — the top direct-drive senior class —
                  and immediately won the WSK Super Master Series OK Final at Lonato.
                  That result, alongside finishing P3 in the overall championship, confirms I&apos;m ready to fight for world honours.
                </p>
                <p>
                  My goal is simple: Formula 1 World Champion. The trajectory is clear. The work is done every single day.
                </p>
              </div>
            </section>

            {/* Team */}
            <section>
              <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-6">
                {t("team_title")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { role: "Family Team", name: "Mañach Family", desc: "Mum and Dad are at every race. They handle logistics, data, and motivation — a fully professional support structure built around me." },
                  { role: "Race Team", name: "Ward Racing", desc: "One of the most respected OK outfits in European karting. Professional engineering support, data analysis, and setup expertise." },
                  { role: "Chassis", name: "Parolin", desc: "Parolin chassis — precision-engineered for the highest levels of karting competition." },
                  { role: "Engine / Tyres", name: "TM Kart / LeCont", desc: "TM Kart engine paired with LeCont control tyres — the same package across the top-level OK field." },
                ].map((item) => (
                  <div key={item.role} className="bg-[#16181D] border border-white/5 rounded-lg p-5">
                    <p className="text-[#E10600] font-display font-bold text-xs tracking-widest uppercase mb-1">{item.role}</p>
                    <p className="text-white font-semibold mb-2">{item.name}</p>
                    <p className="text-[#8A9099] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Machinery */}
            <section>
              <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-6">
                {t("machinery_title")} — 2026 Season
              </h2>
              <div className="bg-[#16181D] border border-white/5 rounded-lg p-6">
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { label: "Chassis", value: "Parolin", note: "Italian-built, top OK specification" },
                    { label: "Engine", value: "TM Kart", note: "Category-legal direct-drive unit" },
                    { label: "Tyres", value: "LeCont", note: "Control tyre — equal across the field" },
                  ].map(({ label, value, note }) => (
                    <div key={label}>
                      <p className="text-[#8A9099] text-xs tracking-widest uppercase mb-1">{label}</p>
                      <p className="text-white font-display font-black text-xl">{value}</p>
                      <p className="text-[#8A9099] text-xs mt-1">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar — timeline */}
          <div>
            <h2 className="font-display font-bold uppercase text-white text-2xl tracking-wide mb-6">
              {t("journey_title")}
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-8">
                {TIMELINE.map(({ year, event }) => (
                  <div key={year} className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#E10600] rounded-full flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="pb-8">
                      <p className="font-display font-black text-[#E10600] text-sm tracking-widest uppercase mb-1">
                        {year}
                      </p>
                      <p className="text-[#8A9099] text-sm leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
