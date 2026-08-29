"use client";
import { useState, useEffect, useRef } from "react";
import { Users, Zap, ShieldCheck, CheckCircle2, ArrowUpRight, TrendingUp, Cpu, Globe, Terminal, Activity } from "lucide-react";

const DESK_CASES = [
  {
    fund: "Apex Capital Quant",
    desk: "Head of Quant Strategies",
    author: "Elena Rostova",
    badge: "MOMENTUM BOOK",
    metric: "+38 MIN LEAD",
    metricDesc: "Surfaced narrative surge before CT viral discovery",
    finding: "Helios caught the regulatory catalyst surge 38 minutes before Twitter algorithms flagged it. Our momentum models executed position rebalancing with zero slippage.",
  },
  {
    fund: "Parallax Arbitrage",
    desk: "Lead Systematic Trader",
    author: "Marcus Thorne",
    badge: "NOISE FILTER",
    metric: "85% REDUCTION",
    metricDesc: "In unstructured subterranean feed noise",
    finding: "The 50-item distilled stream with MIMO-V2.5 scoring replaced 4 manual RSS aggregators. Eliminated 85% of false-positive headline spikes from our daily morning brief.",
  },
  {
    fund: "BlockMesh Global",
    desk: "Partner, Algorithmic Execution",
    author: "Jin Woo",
    badge: "API PIPELINE",
    metric: "24MS EDGE",
    metricDesc: "Direct webhook ingest to automated execution book",
    finding: "Sub-30ms global edge latency allows our automated desk scripts to consume /api/news and /api/viral-radar payloads simultaneously across Singapore and Frankfurt nodes.",
  },
];

const COCKPIT_PANELS = ["RAW STREAM 50", "VIRAL RADAR", "SYSTEM REPORT", "ALPHA SIGNALS"];

export default function Proven() {
  // Live animated telemetry states
  const [rawCount, setRawCount] = useState(2148);
  const [leadSec, setLeadSec] = useState(14);
  const [panelIdx, setPanelIdx] = useState(0);
  const [discardPct, setDiscardPct] = useState(97.6);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const t1 = setInterval(() => {
      setRawCount((p) => p + Math.floor(Math.random() * 5) - 2);
      setDiscardPct(Number((97.4 + Math.random() * 0.4).toFixed(1)));
    }, 1500);

    const t2 = setInterval(() => {
      setLeadSec((s) => (s >= 59 ? 10 : s + 1));
    }, 1000);

    const t3 = setInterval(() => {
      setPanelIdx((curr) => (curr + 1) % COCKPIT_PANELS.length);
    }, 2200);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
    };
  }, [inView]);

  return (
    <section ref={sectionRef} id="proven" className="bg-[#FFFBF0] py-14 md:py-20 scroll-mt-[64px]">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="v3-section-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#ff7a00] font-bold uppercase mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PROVEN IN PRODUCTION // QUANT DESK VALIDATION
            </p>
            <h2 className="text-[30px] md:text-[42px] leading-[1.05] tracking-tight font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>
              Real Impact at the Edge,
              <br />
              <span className="font-normal italic" style={{ fontFamily: "Instrument Serif" }}>Validated by 2,400+ Desks</span>
            </h2>
          </div>
          <p className="text-[12.5px] text-[#6b625c] leading-relaxed max-w-[420px]">
            Quantitative funds, proprietary desks, and systematic researchers leverage Helios to eliminate noise and capture asymmetric narrative alpha.
          </p>
        </div>

        {/* 3 Concrete Quant Engine Proof Cards with Interactive Live Telemetry */}
        <div className="v3-cards-stagger grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 items-stretch">
          {/* Card 1: Noise Elimination Matrix */}
          <div className="v3-card-item group rounded-[16px] overflow-hidden bg-[#151413] text-[#f3eee6] relative h-full min-h-[220px] p-4 md:p-5 flex flex-col justify-between border border-[#2a2723] shadow-[0_10px_30px_rgba(0,0,0,0.10)] hover:border-[#ff7a00]/50 transition-colors duration-300">
            <img 
              src="/v2/img/neural-feed.webp" 
              alt="" 
              className="v3-parallax-img absolute inset-0 w-full h-full object-cover opacity-[0.28] scale-[1.2] pointer-events-none" 
              style={{ objectPosition: "50% 28%" }} 
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151413] via-[#151413]/70 to-transparent pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[9.5px] font-mono text-[#ff7a00] font-bold">
                  <span className="tracking-wider">01 // SIGNAL-TO-NOISE FILTER</span>
                  <Cpu className="w-3.5 h-3.5 text-[#ff7a00]" />
                </div>
                <div className="mt-2 text-[20px] md:text-[22px] font-black text-white leading-tight flex items-baseline gap-2" style={{ fontFamily: "Inter" }}>
                  <span>{rawCount.toLocaleString("en-US")} Raw</span>
                  <span className="text-[#ff7a00] text-[16px]">➔ 50 Scored</span>
                </div>
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#ff7a00] h-full transition-all duration-500" style={{ width: `${discardPct}%` }} />
                </div>
                <p className="text-[11.5px] text-[#a89f91] leading-snug font-sans">
                  Raw RSS wires compressed into 50 verified high-impact alpha events.
                </p>
              </div>
            </div>
            <div className="relative z-10 pt-3 border-t border-[#2a2723] mt-3 flex items-center justify-between text-[9.5px] font-mono text-[#8c827a]">
              <span className="flex items-center gap-1.5 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c950] animate-pulse" />
                Discard: <strong className="text-white">{discardPct}%</strong>
              </span>
              <span>•</span>
              <span className="text-[#ff7a00] font-bold">MIMO-V2.5 Neural</span>
            </div>
          </div>

          {/* Card 2: Intercept Timestamps & Momentum Lead */}
          <div className="v3-card-item group rounded-[16px] overflow-hidden bg-[#151413] text-[#f3eee6] relative h-full min-h-[220px] p-4 md:p-5 flex flex-col justify-between border border-[#2a2723] shadow-[0_10px_30px_rgba(0,0,0,0.10)] hover:border-[#ff7a00]/50 transition-colors duration-300">
            <img 
              src="/v2/img/viral-radar.webp" 
              alt="" 
              className="v3-parallax-img absolute inset-0 w-full h-full object-cover opacity-[0.32] scale-[1.22] pointer-events-none" 
              style={{ objectPosition: "50% 30%" }} 
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151413] via-[#151413]/70 to-transparent pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[9.5px] font-mono text-[#ff7a00] font-bold">
                  <span className="tracking-wider">02 // ASYMMETRIC LEAD TIME</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#ff7a00]" />
                </div>
                <div className="mt-2 text-[20px] md:text-[22px] font-black text-white leading-tight" style={{ fontFamily: "Inter" }}>
                  +38m {leadSec < 10 ? `0${leadSec}` : leadSec}s Intercept
                </div>
              </div>
              <div className="mt-2.5 space-y-0.5 text-[10.5px] font-mono bg-black/50 p-2 rounded-[7px] border border-white/10 flex flex-col justify-center">
                <div className="flex justify-between text-white font-bold">
                  <span className="text-[#00c950]">● Wire Ingest:</span>
                  <span>14:02:10 UTC</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span className="text-[#ff7a00]">● CT Discovery:</span>
                  <span>14:40:15 UTC</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 pt-3 border-t border-[#2a2723] mt-3 flex items-center justify-between text-[9.5px] font-mono text-white/80">
              <span className="text-[#8c827a]">MOMENTUM LEAD</span>
              <span className="font-bold text-[#00c950]">
                PRE-CROWD ENTRY
              </span>
            </div>
          </div>

          {/* Card 3: Execution Cockpit Architecture */}
          <div className="v3-card-item group rounded-[16px] overflow-hidden bg-[#151413] text-[#f3eee6] relative h-full min-h-[220px] p-4 md:p-5 flex flex-col justify-between border border-[#2a2723] shadow-[0_10px_30px_rgba(0,0,0,0.10)] hover:border-[#ff7a00]/50 transition-colors duration-300">
            <img 
              src="/v2/img/global-matrix.webp" 
              alt="" 
              className="v3-parallax-img absolute inset-0 w-full h-full object-cover opacity-[0.28] scale-[1.2] pointer-events-none" 
              style={{ objectPosition: "50% 30%" }} 
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151413] via-[#151413]/70 to-transparent pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[9.5px] font-mono text-[#ff7a00] font-bold">
                  <span className="tracking-wider">03 // ZERO-HOPS EXECUTION</span>
                  <Zap className="w-3.5 h-3.5 text-[#ff7a00]" />
                </div>
                <div className="mt-2 text-[20px] md:text-[22px] font-black text-white leading-tight" style={{ fontFamily: "Inter" }}>
                  8 Synchronized Panels
                </div>
              </div>
              <div className="mt-2.5 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-[9.5px] font-mono">
                  <span className="text-[#8c827a]">ACTIVE FOCUS:</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[#ff7a00] font-bold border border-white/10 transition-all duration-300">
                    {COCKPIT_PANELS[panelIdx]}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#a89f91] mt-1 leading-snug font-sans truncate">
                  Single browser terminal replaces noisy aggregators.
                </p>
              </div>
            </div>
            <div className="relative z-10 pt-3 border-t border-[#2a2723] mt-3 flex items-center justify-between text-[9.5px] font-mono text-[#8c827a]">
              <span>REST: /api/news</span>
              <span>•</span>
              <span className="text-[#00c950] font-bold">Zero Webhook Lag</span>
            </div>
          </div>
        </div>

        {/* 3 Institutional Case Logs */}
        <div className="v3-cards-stagger grid grid-cols-1 md:grid-cols-3 gap-3">
          {DESK_CASES.map((item, idx) => (
            <div key={idx} className="v3-card-item rounded-[16px] bg-[#fdf8f0] border border-[#e8e0d5] p-5 flex flex-col justify-between hover:bg-[#faf4e8] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[8.5px] font-mono tracking-widest px-2 py-0.5 rounded bg-[#111] text-white font-bold">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#ff7a00]">
                    {item.metric}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#8c827a] mb-2">
                  {item.metricDesc}
                </div>
                <p className="text-[12.5px] leading-relaxed text-[#222] italic mb-4">
                  &ldquo;{item.finding}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#e8e0d5]">
                <div className="font-bold text-[13px] text-[#111]" style={{ fontFamily: "Inter" }}>
                  {item.author}
                </div>
                <div className="text-[10.5px] text-[#6b625c] font-mono mt-0.5">
                  {item.desk} • <span className="text-[#111] font-semibold">{item.fund}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

