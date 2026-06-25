"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const COUNTRY_NAMES: Record<string, string> = {
  IT: "Italy", ES: "Spain", BE: "Belgium", SE: "Sweden", EU: "Europe",
  GB: "GB", FR: "France", PT: "Portugal", DK: "Denmark",
};

const POS_COLORS: Record<number, string> = {
  1: "text-[#D4AF37]",
  2: "text-[#C0C0C0]",
  3: "text-[#CD7F32]",
};

type Result = {
  id: string;
  date: string;
  year: number;
  championship: string;
  circuit: string;
  city: string;
  country: string;
  category: string;
  position: number;
  resultType: "win" | "podium" | "finish" | "dnf";
  notes: string;
  featured: boolean;
};

const SEASON_SUMMARIES: Record<number, string> = {
  2026: "WSK Super Master Series Final Win · P3 Overall · FIA European Championship contender",
  2025: "FIA Karting World Championship — P12 in the World Final from P5 on the grid",
  2024: "IAME Winter Cup Champion · IAME Euro Round 1 win · FIA 2nd in ranking",
  2023: "4th in European general classification · Multiple heat wins",
  2022: "Spanish Championship P3 · Double win at Zuera National",
};

export default function ResultsClient({ results }: { results: Result[] }) {
  const t = useTranslations("results");
  const years = [...new Set(results.map((r) => r.year))].sort((a, b) => b - a);
  const championships = [...new Set(results.map((r) => r.championship))];

  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterType, setFilterType] = useState<"all" | "win" | "podium">("all");
  const [openYears, setOpenYears] = useState<Set<number>>(new Set([2026]));

  const filtered = results.filter((r) => {
    if (filterYear !== "all" && r.year !== filterYear) return false;
    if (filterType === "win" && r.resultType !== "win") return false;
    if (filterType === "podium" && r.resultType !== "podium" && r.resultType !== "win") return false;
    return true;
  });

  const byYear = years.reduce((acc, year) => {
    acc[year] = filtered.filter((r) => r.year === year);
    return acc;
  }, {} as Record<number, Result[]>);

  const toggle = (year: number) => {
    setOpenYears((s) => {
      const next = new Set(s);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <div className="flex items-center gap-2">
          <span className="text-[#8A9099] text-xs tracking-wide">{t("filter_year")}:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterYear("all")}
              className={`px-3 py-1 text-xs rounded border transition-colors ${filterYear === "all" ? "border-[#E10600] text-[#E10600]" : "border-white/10 text-[#8A9099] hover:text-white"}`}
            >
              {t("all")}
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setFilterYear(y)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${filterYear === y ? "border-[#E10600] text-[#E10600]" : "border-white/10 text-[#8A9099] hover:text-white"}`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#8A9099] text-xs tracking-wide">{t("filter_type")}:</span>
          <div className="flex gap-1">
            {(["all", "win", "podium"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${filterType === type ? "border-[#E10600] text-[#E10600]" : "border-white/10 text-[#8A9099] hover:text-white"}`}
              >
                {type === "all" ? t("all") : type === "win" ? t("wins") : t("podiums")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 flex flex-col items-center gap-3 text-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8A9099]">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <p className="text-[#8A9099] text-sm">No results match the selected filters.</p>
        </div>
      )}

      {/* Season groups */}
      <div className="space-y-4">
        {years.map((year) => {
          const rows = byYear[year];
          if (!rows || rows.length === 0) return null;
          const isOpen = openYears.has(year);

          return (
            <div key={year} className="border border-white/5 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 bg-[#16181D] hover:bg-[#1c1e24] transition-colors text-left"
                onClick={() => toggle(year)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display font-black text-2xl text-white">{year}</span>
                  <span className="text-[#8A9099] text-sm hidden sm:block">
                    {SEASON_SUMMARIES[year]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8A9099] text-xs">{rows.length} results</span>
                  <svg
                    className={`w-4 h-4 text-[#8A9099] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="divide-y divide-white/5">
                  {/* Header row */}
                  <div className="grid grid-cols-12 gap-2 px-6 py-2 text-[#8A9099] text-xs tracking-wide uppercase">
                    <span className="col-span-1">{t("position")}</span>
                    <span className="col-span-4">{t("event")}</span>
                    <span className="col-span-3 hidden md:block">{t("circuit")}</span>
                    <span className="col-span-2 hidden sm:block">{t("category")}</span>
                    <span className="col-span-2 hidden lg:block">{t("date")}</span>
                  </div>

                  {rows.map((r) => (
                    <div
                      key={r.id}
                      className="grid grid-cols-12 gap-2 px-6 py-3 items-center hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="col-span-1 flex items-center gap-2">
                        <span className={`font-display font-black text-xl leading-none ${POS_COLORS[r.position] ?? "text-white"}`}>
                          {r.position === 1 ? "1st" : r.position === 2 ? "2nd" : r.position === 3 ? "3rd" : `P${r.position}`}
                        </span>
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <p className="text-white text-sm font-medium leading-tight">{r.championship}</p>
                        {r.notes && <p className="text-[#8A9099] text-xs mt-0.5 line-clamp-1">{r.notes}</p>}
                      </div>
                      <div className="col-span-3 hidden md:block">
                        <span className="text-[#8A9099] text-sm">
                          {r.circuit}{COUNTRY_NAMES[r.country] ? `, ${COUNTRY_NAMES[r.country]}` : ""}
                        </span>
                      </div>
                      <div className="col-span-2 hidden sm:block">
                        <span className="text-[#8A9099] text-xs font-mono">{r.category}</span>
                      </div>
                      <div className="col-span-2 hidden lg:block">
                        <span className="text-[#8A9099] text-xs">
                          {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
