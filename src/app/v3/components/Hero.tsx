"use client";
import Link from "next/link";
import { ArrowRight, Activity, Cpu, Radio } from "lucide-react";

const BELOW = [
  { icon: Activity, title: "Neural Feed • 50", desc: "Real-time RSS (CoinDesk/CT/Decrypt) + Supabase cache. 50 freshest, scored impact 9→5." },
  { icon: Cpu, title: "MIMO-V2.5 • 24ms", desc: "800-token synthesis, temp 0.75, OpenRouter fallback. Bullish/bearish/neutral." },
  { icon: Radio, title: "Viral Radar • 190+", desc: "Anomaly 3h vs 24h, 99.97% uptime, global mesh. Live uplink." },
];

export default function Hero() {
  return (
    <section id="top" className="v3-hero relative overflow-hidden bg-[#FFFBF0] pt-20 md:pt-28 pb-10 md:pb-14">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-[800px]">
          <p className="v3-hero-kicker v3-anim-kicker mb-3.5 inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] text-[#ff3b30] font-mono uppercase font-bold">
            <span className="h-1.5 w-1.5 bg-[#ff3b30] animate-pulse rounded-full" /> HELIOS // INTELLIGENCE MATRIX
          </p>

          <h1 className="v3-hero-title v3-anim-title leading-[0.92] tracking-tight">
            <span className="block text-[38px] sm:text-[48px] md:text-[60px] font-normal italic" style={{ fontFamily: "var(--font-instrument-serif), Instrument Serif", letterSpacing: "-0.02em" }}>
              Autonomous Neural System,
            </span>
            <span className="block text-[38px] sm:text-[48px] md:text-[60px] font-black mt-1" style={{ fontFamily: "var(--font-inter), Inter", letterSpacing: "-0.04em" }}>
              Mapping Market Uncertainty
            </span>
          </h1>

          <p className="v3-hero-sub v3-anim-sub mt-5 text-[13px] md:text-[14px] leading-relaxed text-[#6b625c] max-w-[560px] mx-auto font-sans">
            Quantifying crypto-driven structural dynamics. Ingests millions of subterranean data points daily → <span className="text-[#111] font-semibold">50 freshest</span> via MIMO-V2.5 + OpenRouter, 190+ nodes, 24ms edge. Zero noise, pure signal.
          </p>

          {/* CTA Buttons */}
          <div className="v3-hero-cta v3-anim-cta mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link 
              href="/terminal" 
              className="inline-flex items-center gap-2.5 bg-[#111] text-white pl-5 pr-2 py-2 rounded-full text-[13px] font-bold hover:bg-[#ff7a00] hover:text-black transition-all duration-200 shadow-md group/btn cursor-pointer"
            >
              Launch Terminal for Free
              <span className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </span>
            </Link>
            <a 
              href="#pipeline" 
              className="text-[12.5px] font-mono tracking-wide text-[#111] hover:text-[#ff7a00] border border-[#e8e0d5] bg-white px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm"
            >
              View Pipeline Specs →
            </a>
          </div>
        </div>

        {/* Exact Original 3-Column Divided Below Section */}
        <div className="v3-anim-stream mt-12 md:mt-16 pt-4 pb-2">
          <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e0d5]">
            {BELOW.map((f, idx) => (
              <div key={f.title} className="v3-below-col px-0 md:px-8 py-6 md:py-3 text-center flex flex-col items-center">
                <span className="text-[8px] font-mono tracking-[0.18em] text-[#8c827a] mb-1.5">
                  0{idx + 1} — {idx === 0 ? "FEED" : idx === 1 ? "SYNTHESIS" : "RADAR"}
                </span>
                <span className="w-7 h-7 rounded-full border border-[#e8e0d5] bg-white flex items-center justify-center mb-2 shadow-sm">
                  <f.icon className="w-3.5 h-3.5 text-[#111]" />
                </span>
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "var(--font-inter), Inter" }}>{f.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes v3-fade-up {
          0% { opacity: 0; transform: translate3d(0, 18px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes v3-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .v3-anim-kicker { animation: v3-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .v3-anim-title { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        .v3-anim-sub { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
        .v3-anim-cta { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }
        .v3-anim-stream { animation: v3-fade-up 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both; }

        @media (prefers-reduced-motion: reduce) {
          .v3-anim-kicker, .v3-anim-title, .v3-anim-sub, .v3-anim-cta, .v3-anim-stream { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
