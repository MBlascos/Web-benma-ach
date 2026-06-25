"use client";

import { useState, useEffect, useCallback } from "react";
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

  const prev = useCallback(() => {
    setLightbox((n) => (n !== null ? (n - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox((n) => (n !== null ? (n + 1) % filtered.length : null));
  }, [filtered.length]);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next, close]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

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

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 flex flex-col items-center gap-3 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8A9099]">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <p className="text-[#8A9099] text-sm">No photos for this season yet.</p>
        </div>
      )}

      {/* Masonry grid */}
      {filtered.length > 0 && (
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
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={close}
            aria-label="Close lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
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
