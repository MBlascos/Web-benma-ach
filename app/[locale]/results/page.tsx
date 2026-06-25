import { useTranslations } from "next-intl";
import { RESULTS } from "@/lib/data";
import ResultsClient from "@/components/results/ResultsClient";

export default function ResultsPage() {
  const t = useTranslations("results");
  return (
    <div className="pt-24 pb-20 min-h-[100dvh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            {t("title")}
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Race Record
          </h1>
          <p className="text-[#8A9099] max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
        <ResultsClient results={RESULTS} />
      </div>
    </div>
  );
}
