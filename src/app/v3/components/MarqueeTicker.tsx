"use client";
import { useState, useEffect } from "react";
import { Zap, Radio, Globe, Activity, Cpu, ShieldCheck, Database, Pause, Play } from "lucide-react";

const ITEMS = [
  { icon: Cpu, text: "MIMO-V2.5 INFERENCE — 24MS NOMINAL" },
  { icon: Activity, text: "RADAR ANOMALY — BTC +142% 3H VELOCITY" },
  { icon: Database, text: "LIVE UPLINK — COINDESK • COINTELEGRAPH • DECRYPT" },
  { icon: Globe, text: "190+ GLOBAL EDGE NODES — 99.97% UPTIME" },
  { icon: ShieldCheck, text: "ACCURACY INDEX — 94.2% POLARITY" },
  { icon: Zap, text: "SUPABASE CACHE — 50 FRESHEST" },
  { icon: Radio, text: "ZERO NOISE • PURE SIGNAL — STRUCTURED ALPHA" },
];

export default function MarqueeTicker() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const h = () => setReducedMotion(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  const isPaused = paused || reducedMotion;

  return (
    <div
      role="region"
      aria-label="System status ticker"
      className="w-full bg-[#111] text-[#FFFBF0] overflow-hidden border-y border-[#222] relative group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{`
        @keyframes v3-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .v3-marquee-track {
          display: flex;
          width: max-content;
          animation: v3-marquee 42s linear infinite;
        }
        .v3-marquee-track[data-paused="true"] {
          animation-play-state: paused;
        }
        .v3-marquee-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-marquee-track {
            animation: none;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0;
            padding: 6px 0;
          }
        }
      `}</style>

      {/* semantic list, duplicated for seamless loop */}
      <ul
        className="v3-marquee-track flex items-center"
        data-paused={isPaused ? "true" : "false"}
        aria-hidden={reducedMotion ? "false" : undefined}
        tabIndex={0}
        aria-label={isPaused ? "Ticker paused" : "Ticker scrolling"}
      >
        {[...ITEMS, ...ITEMS].map((item, idx) => {
          const Icon = item.icon;
          const isDuplicate = idx >= ITEMS.length;
          return (
            <li
              key={idx}
              aria-hidden={isDuplicate ? true : undefined}
              className="flex items-center gap-2.5 px-5 py-3.5 text-[10px] font-mono tracking-[0.16em] uppercase whitespace-nowrap border-r border-white/[0.06] last:border-0"
            >
              <Icon className="w-3 h-3 text-white/70 shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <span className="font-medium text-[#f0ebe1] tracking-[0.14em]">{item.text}</span>
              <span className="ml-2 text-white/20 select-none" aria-hidden="true">—</span>
            </li>
          );
        })}
      </ul>

      {/* pause control — keyboard accessible, Swiss hard edge */}
      <button
        type="button"
        aria-label={isPaused ? "Resume ticker" : "Pause ticker"}
        aria-pressed={isPaused}
        onClick={() => setPaused((v) => !v)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 items-center justify-center text-white/80 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
      >
        {isPaused ? <Play className="w-3 h-3 ml-0.5" aria-hidden="true" /> : <Pause className="w-3 h-3" aria-hidden="true" />}
      </button>

      {/* Swiss hard top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/[0.07]" aria-hidden="true" />
    </div>
  );
}
