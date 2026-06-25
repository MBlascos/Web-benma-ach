import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const NEWS_ITEMS = [
  {
    slug: "wsk-super-master-lonato-win",
    title: "Benjamin Wins the WSK Super Master Series Final at Lonato",
    excerpt: "In a stunning performance at Lonato del Garda, Benjamin Mañach took victory in the OK Final — his biggest career win to date.",
    date: "2026-03-03",
    category: "Race Report",
    image: "/images/ben-02.jpg",
  },
  {
    slug: "wsk-p3-overall-championship",
    title: "P3 in the WSK Super Master Series Overall Championship",
    excerpt: "Benjamin ends the WSK Super Master Series in 3rd place overall with 308 points — a remarkable result in his first senior OK season with Ward Racing.",
    date: "2026-04-07",
    category: "Season Review",
    image: "/images/ben-05.jpg",
  },
  {
    slug: "ward-racing-2026",
    title: "Benjamin Joins Ward Racing for the 2026 OK Campaign",
    excerpt: "The Mañach family announces a partnership with Ward Racing for the 2026 season — Benjamin's first year competing in the top OK category on Parolin / TM Kart / LeCont.",
    date: "2026-01-15",
    category: "Team News",
    image: "/images/ben-08.jpg",
  },
  {
    slug: "fia-worlds-2025-sweden",
    title: "12th at the FIA Karting World Championship in Sweden",
    excerpt: "Benjamin qualifies 5th for the FIA Karting World Championship OK-Junior Final at the Åsum Ring — the youngest in his class — and fights through to 12th.",
    date: "2025-09-29",
    category: "Race Report",
    image: "/images/ben-11.jpg",
  },
];

export default function NewsPage() {
  const t = useTranslations("news");

  return (
    <div className="pt-24 pb-20 min-h-[100dvh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            Updates
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {t("title")}
          </h1>
          <p className="text-[#8A9099]">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {NEWS_ITEMS.map((item, i) => (
            <article
              key={item.slug}
              className={`group bg-[#16181D] border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "h-72 sm:h-80" : "h-48"}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#E10600] text-white text-xs font-bold px-2 py-1 rounded tracking-wide">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[#8A9099] text-xs mb-2">
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="text-white font-display font-bold text-xl leading-tight mb-3 group-hover:text-[#F5F6F8]">
                  {item.title}
                </h2>
                <p className="text-[#8A9099] text-sm leading-relaxed mb-4">{item.excerpt}</p>
                <span className="text-[#E10600] text-sm font-medium inline-flex items-center gap-1">
                  {t("read_more")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
