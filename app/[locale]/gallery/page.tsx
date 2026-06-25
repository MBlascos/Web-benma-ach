import { useTranslations } from "next-intl";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const ALL_IMAGES = Array.from({ length: 28 }, (_, i) => ({
  id: `ben-${String(i + 1).padStart(2, "0")}`,
  src: `/images/ben-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Benjamin Mañach — racing photo ${i + 1}`,
  season: i < 10 ? "2026" : i < 18 ? "2025" : "2024",
}));

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <div className="pt-24 pb-20 min-h-[100dvh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            Media
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {t("title")}
          </h1>
          <p className="text-[#8A9099]">{t("subtitle")}</p>
        </div>
        <GalleryGrid images={ALL_IMAGES} />
      </div>
    </div>
  );
}
