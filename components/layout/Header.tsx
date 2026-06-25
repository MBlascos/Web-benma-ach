"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "results", href: "/results" },
  { key: "calendar", href: "/calendar" },
  { key: "news", href: "/news" },
  { key: "gallery", href: "/gallery" },
  { key: "partners", href: "/partners" },
  { key: "contact", href: "/contact" },
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (href: string) => `/${locale}${href}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0B0B0D]/95 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 relative flex-shrink-0">
              <Image src="/images/logo.png" alt="Benjamin Mañach logo" fill className="object-contain" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-wider uppercase hidden sm:block whitespace-nowrap">
              Benjamin Mañach
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const active = pathname.startsWith(navLink(href));
              return (
                <Link
                  key={key}
                  href={navLink(href)}
                  className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded-md whitespace-nowrap ${
                    active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(key as "about")}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/benjamin_manach"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-8 h-8 text-[#8A9099] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Partner CTA */}
            <Link
              href={navLink("/partners")}
              className="hidden sm:flex items-center gap-2 bg-[#E10600] hover:bg-[#c00500] text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded transition-colors whitespace-nowrap"
            >
              {t("partner_cta")}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#16181D] border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={navLink(href)}
                className="text-[#8A9099] hover:text-white py-2 text-sm font-medium tracking-wide transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t(key as "about")}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/5">
              <Link
                href={navLink("/partners")}
                className="block text-center bg-[#E10600] text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                {t("partner_cta")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
