"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 4, suffix: "", label: "Race wins and podiums in the 2026 season" },
  { value: 3, suffix: "", label: "Seasons of European championship racing" },
  { value: 9, suffix: "", label: "Age when karting became his life's mission" },
  { value: 15, suffix: "", label: "Years old — with a full career ahead" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatBar() {
  return (
    <section className="bg-[#16181D] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-display font-black text-4xl sm:text-5xl text-white leading-none">
                <Counter target={value} suffix={suffix} />
              </span>
              <span className="text-[#8A9099] text-xs tracking-wide leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
