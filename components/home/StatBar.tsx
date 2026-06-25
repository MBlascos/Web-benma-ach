"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "4", label: "Race wins and podiums in the 2026 season" },
  { value: "3", label: "Seasons of European championship racing" },
  { value: "9", label: "Age when karting became his life's mission" },
  { value: "15", label: "Years old — with a full career ahead" },
];

export default function StatBar() {
  return (
    <section className="bg-[#16181D] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <span className="font-display font-black text-4xl sm:text-5xl text-white leading-none tabular-nums">
                {value}
              </span>
              <span className="text-[#8A9099] text-xs tracking-wide leading-snug">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
