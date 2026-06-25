"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  season: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const seasons = ["all", ...new Set(images.map((i) => i.season))];
  const filtered = filter === "all" ? images : images.filter((i) => i.season === filter);

  const prev = () => setLightbox((n) => (n !== null ? (n - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox((n) => (n !== null ? (n + 1) % filtered.length : null));

  return (
    <>
      {/* Filter buttons */}
      <div className="flex gap-2 mb-8">
        {seasons.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs rounded border transition-colors capitalize ${
              filter === s
                ? "border-[#E10600] text-[#E10600]"
                : "border-white/10 text-[#8A9099] hover:text-white"
            }`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((img, i) => (
          <div
            key={img.id}
            className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setLightbox(i)}
          >
            <div className="relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0B0B0D]/0 group-hover:bg-[#0B0B0D]/20 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl z-10"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-10 p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-10 p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>

          <div
            className="max-w-5xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#8A9099] text-xs">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  );
}
