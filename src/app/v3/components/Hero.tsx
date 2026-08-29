"use client";
import Link from "next/link";
import { ArrowRight, Activity, Cpu, Radio, Zap, Globe, Sparkles } from "lucide-react";

const PILLARS = [
  {
    step: "01",
    tag: "FEED",
    icon: Activity,
    title: "Neural Feed • 50",
    metric: "2M+ Intercepts",
    desc: "Real-time RSS ingestion from primary crypto wires + Supabase edge cache. 50 freshest catalysts scored impact 9→5.",
    badge: "SUB-SECOND",
  },
  {
    step: "02",
    tag: "SYNTHESIS",
    icon: Cpu,
    title: "MIMO-V2.5 • 24ms",
    metric: "800-Token Synthesis",
    desc: "Quantitative catalyst distillation with OpenRouter neural fallback. Directional polarity tagging (Bullish / Neutral / Bearish).",
    badge: "24MS EDGE",
  },
  {
    step: "03",
    tag: "RADAR",
    icon: Radio,
    title: "Viral Radar • 190+",
    metric: "Global Mesh",
    desc: "Anomaly tracking (3h vs 24h baseline) across a 190+ node distributed edge mesh with 99.97% live telemetry uplink.",
    badge: "99.97% UPTIME",
  },
];

export default function Hero() {
  return (
    <section id="top" className="v3-hero relative overflow-hidden bg-[#FFFBF0] pt-20 md:pt-28 pb-14 md:pb-20">
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
            Quantifying crypto-driven structural dynamics. Ingests millions of subterranean data points daily → <span className="text-[#111] font-semibold">50 freshest catalysts</span> via MIMO-V2.5 + OpenRouter, 190+ nodes, 24ms edge. Zero noise, pure signal.
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

        {/* 3 Value Pillars Showcase (Replacing Carousel) */}
        <div className="v3-anim-stream mt-12 md:mt-16 mx-auto max-w-[1140px] grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.step}
                className="group relative rounded-[20px] bg-[#fdf8f0] border border-[#e8e0d5] p-6 flex flex-col justify-between hover:bg-[#faf3e6] hover:border-[#ff7a00]/40 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(255,122,0,0.08)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#e8e0d5] flex items-center justify-center shadow-sm group-hover:border-[#ff7a00]/50 transition-colors">
                      <Icon className="w-4 h-4 text-[#ff7a00]" />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#ff7a00] bg-[#f5ecdd] border border-[#e8e0d5] px-2.5 py-1 rounded-full">
                      {p.badge}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-[#8c827a] tracking-[0.16em] mb-1">
                    PHASE {p.step} // {p.tag}
                  </div>

                  <h3 className="font-bold text-[16px] text-[#111] mb-2" style={{ fontFamily: "var(--font-inter), Inter" }}>
                    {p.title}
                  </h3>

                  <p className="text-[12.5px] text-[#6b625c] leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#e8e0d5]/70 flex items-center justify-between text-[10px] font-mono text-[#8c827a]">
                  <span>METRIC</span>
                  <span className="font-bold text-[#111] group-hover:text-[#ff7a00] transition-colors">{p.metric}</span>
                </div>
              </div>
            );
          })}
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
        .v3-anim-stream { animation: v3-fade-up 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.40s both; }

        @media (prefers-reduced-motion: reduce) {
          .v3-anim-kicker, .v3-anim-title, .v3-anim-sub, .v3-anim-cta, .v3-anim-stream { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
