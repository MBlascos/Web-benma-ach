import { useTranslations } from "next-intl";
import { CALENDAR_EVENTS } from "@/lib/data";

const COUNTRY_NAMES: Record<string, string> = {
  IT: "Italy", ES: "Spain", BE: "Belgium", SE: "Sweden", EU: "Europe",
  GB: "Great Britain", FR: "France", PT: "Portugal", DK: "Denmark", DE: "Germany",
};

const STATUS_STYLES = {
  upcoming: "bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/20",
  live: "bg-green-500/10 text-green-400 border border-green-500/20",
  completed: "bg-white/5 text-[#8A9099] border border-white/10",
};

export default function CalendarPage() {
  const t = useTranslations("calendar");

  const upcoming = CALENDAR_EVENTS.filter((e) => (e.status as string) === "upcoming" || (e.status as string) === "live");
  const completed = CALENDAR_EVENTS.filter((e) => e.status === "completed");

  return (
    <div className="pt-24 pb-20 min-h-[100dvh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            2026
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {t("title")}
          </h1>
          <p className="text-[#8A9099]">{t("subtitle")}</p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-12">
            <h2 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">{t("upcoming")}</h2>
            <div className="space-y-3">
              {upcoming.map((e) => (
                <div key={e.id} className="bg-[#16181D] border border-[#E10600]/20 rounded-lg p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[e.status]}`}>
                          {t(e.status)}
                        </span>
                        <span className="text-[#8A9099] text-xs">{t("round")} {e.round}</span>
                      </div>
                      <h3 className="text-white font-display font-bold text-xl">{e.title}</h3>
                      <p className="text-[#8A9099] text-sm mt-1">
                        {e.circuit}, {e.city}{COUNTRY_NAMES[e.country] ? ` — ${COUNTRY_NAMES[e.country]}` : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">
                        {new Date(e.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        {" – "}
                        {new Date(e.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-[#8A9099] text-xs mt-1">{e.championship}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        <div>
          <h2 className="text-white font-semibold text-xs tracking-widest uppercase mb-4">{t("completed")}</h2>
          <div className="space-y-3">
            {completed.map((e) => (
              <div key={e.id} className="bg-[#16181D] border border-white/5 rounded-lg p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES.completed}`}>
                        {t("completed")}
                      </span>
                      <span className="text-[#8A9099] text-xs">{t("round")} {e.round}</span>
                    </div>
                    <h3 className="text-white font-display font-bold text-xl">{e.title}</h3>
                    <p className="text-[#8A9099] text-sm mt-1">
                      {e.circuit}, {e.city}{COUNTRY_NAMES[e.country] ? ` — ${COUNTRY_NAMES[e.country]}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#8A9099] font-medium text-sm">
                      {new Date(e.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      {" – "}
                      {new Date(e.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-[#8A9099] text-xs mt-1">{e.championship}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
