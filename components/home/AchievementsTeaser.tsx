"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Achievement = {
  id: string;
  title: string;
  year: number;
  description: string;
  icon: string;
};

const IMAGES = [
  "/images/ben-25.jpg",
  "/images/ben-24.jpg",
  "/images/iame-winter-cup-2024.jpeg",
  "/images/fia-worlds-2025-forza.jpeg",
  "/images/iame-euro-r1-zuera-2024.jpeg",
  "/images/ben-09.jpg",
];

export default function AchievementsTeaser({
  achievements,
  locale,
}: {
  achievements: Achievement[];
  locale: string;
}) {
  const t = useTranslations("home");

  return (
    <section className="py-20 bg-[#0B0B0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
              Career
            </p>
            <h2 className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              {t("achievements")}
            </h2>
          </div>
          <Link
            href={`/${locale}/results`}
            className="hidden sm:flex items-center gap-2 text-[#8A9099] hover:text-white text-sm font-medium transition-colors"
          >
            {t("view_all")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#E10600]">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Asymmetric grid: 1 wide + 3 tall on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured — spans 2 cols on lg */}
          {achievements[0] && (
            <motion.div
              className="lg:col-span-2 relative group overflow-hidden rounded-xl bg-[#16181D] border border-white/5 hover:border-[#E10600]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={IMAGES[0]}
                  alt={achievements[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[#E10600] font-display font-bold text-xs tracking-widest uppercase">
                  {achievements[0].year}
                </span>
                <h3 className="text-white font-display font-black uppercase text-2xl leading-tight mt-1">
                  {achievements[0].title}
                </h3>
                <p className="text-[#8A9099] text-sm leading-relaxed mt-1 line-clamp-2">
                  {achievements[0].description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Secondary items */}
          {achievements.slice(1).map((item, i) => (
            <motion.div
              key={item.id}
              className="relative group overflow-hidden rounded-xl bg-[#16181D] border border-white/5 hover:border-[#E10600]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1, ease: "easeOut" }}
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src={IMAGES[i + 1] ?? "/images/ben-01.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[#E10600] font-display font-bold text-xs tracking-widest uppercase">
                  {item.year}
                </span>
                <h3 className="text-white font-display font-black uppercase text-lg leading-tight mt-1">
                  {item.title}
                </h3>
                <p className="text-[#8A9099] text-xs leading-relaxed mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href={`/${locale}/results`}
            className="flex items-center justify-center gap-2 border border-white/10 text-white text-sm font-medium py-3 rounded transition-colors hover:border-white/30"
          >
            {t("view_all")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
