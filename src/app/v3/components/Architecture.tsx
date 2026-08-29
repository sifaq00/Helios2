"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles,
  Database,
  Cpu,
  Radio,
  Zap,
  Activity,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Globe,
  Terminal,
  Bitcoin,
  Flame,
  ArrowUpRight
} from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  category: string;
  frequency: string;
  headline: string;
  summary: string;
  icon: any;
  metric: string;
  metricLabel: string;
  spec: {
    protocol: string;
    latency: string;
    throughput: string;
    retention: string;
  };
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "ingest",
    step: "01",
    name: "Subterranean Feed Ingestion",
    category: "INGESTION & SCRAPING",
    frequency: "60s Polling",
    headline: "Parallel Scraping of 50+ Primary Wire Feeds",
    summary: "Ingests raw articles, press releases, and on-chain announcements from CoinDesk, Cointelegraph, Decrypt, and subterranean RSS feeds without intermediaries.",
    icon: Database,
    metric: "2M+ pts",
    metricLabel: "Daily Intercepts",
    spec: {
      protocol: "HTTPS / TLS 1.3",
      latency: "18ms",
      throughput: "2.4M pts/day",
      retention: "50 Rolling Active",
    },
  },
  {
    id: "synthesis",
    step: "02",
    name: "MIMO-V2.5 Neural Scoring",
    category: "AI QUANT DISTILLATION",
    frequency: "Sub-Second",
    headline: "LLM Catalysts Scoring & Polarity Tagging",
    summary: "Distills full article text into an actionable 800-token quant summary, assigns an impact score (9 to 5), and classifies directional polarity (Bullish / Neutral / Bearish).",
    icon: Cpu,
    metric: "24ms",
    metricLabel: "Inference Speed",
    spec: {
      protocol: "MIMO-V2.5 API",
      latency: "24ms",
      throughput: "50 Catalysts/cycle",
      retention: "Realtime Edge",
    },
  },
  {
    id: "radar",
    step: "03",
    name: "Viral Radar Anomaly Engine",
    category: "NARRATIVE VELOCITY",
    frequency: "Continuous Scan",
    headline: "3-Hour vs 24-Hour Velocity Divergence",
    summary: "Calculates statistical momentum surges across coin mentions. Coins registering anomalous surges (>50% above baseline) are auto-flagged before crowd discovery.",
    icon: Radio,
    metric: "+142%",
    metricLabel: "Peak Velocity",
    spec: {
      protocol: "Z-Score Engine",
      latency: "12ms",
      throughput: "190+ Edge Nodes",
      retention: "Rolling 24 Hours",
    },
  },
  {
    id: "dispatch",
    step: "04",
    name: "Terminal & API Dispatch",
    category: "CLIENT EXECUTION",
    frequency: "Instant Sync",
    headline: "Zero-Latency Delivery to Trader Desks",
    summary: "Dispatches scored catalysts, radar alerts, and daily briefs directly into the Helios 8-panel browser terminal and programmatic developer endpoints.",
    icon: Zap,
    metric: "99.97%",
    metricLabel: "System Uptime",
    spec: {
      protocol: "Edge HTTP / JSON",
      latency: "24ms",
      throughput: "Instant Sync",
      retention: "Persistent DB",
    },
  },
];

const INGEST_FEED = [
  { source: "COINTELEGRAPH", tag: "MACRO", time: "14:05:12", title: "Fed Chair: 'Work to do' on core inflation", status: "PARSED • IMPACT 9" },
  { source: "COINDESK", tag: "LEGAL", time: "14:05:08", title: "Liability framework for autonomous trading agents", status: "PARSED • IMPACT 8" },
  { source: "DECRYPT", tag: "PROBE", time: "14:05:02", title: "Exchange misappropriation probe expands in EU", status: "PARSED • IMPACT 8" },
];

export default function Architecture() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Real-time animated telemetry metrics
  const [packetCount, setPacketCount] = useState(1482);
  const [latencyJitter, setLatencyJitter] = useState(24);
  const [anomalyVal, setAnomalyVal] = useState(142);
  const [tokenCounter, setTokenCounter] = useState(742);
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

  // Auto-cycle timer with fluid progress bar (Only runs when visible on screen)
  useEffect(() => {
    if (!autoPlay || !inView) {
      setProgress(0);
      return;
    }
    const interval = 60; // ms
    const duration = 4500; // 4.5s per stage
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setProgress(0);
        setActiveIdx((prev) => (prev + 1) % PIPELINE_STAGES.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, activeIdx, inView]);

  // Jitter telemetry interval (Only runs when visible on screen)
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 8) - 3);
      setLatencyJitter(22 + Math.floor(Math.random() * 5));
      setAnomalyVal(138 + Math.floor(Math.random() * 9));
      setTokenCounter(735 + Math.floor(Math.random() * 18));
    }, 1400);
    return () => clearInterval(t);
  }, [inView]);

  const active = PIPELINE_STAGES[activeIdx];
  const ActiveIcon = active.icon;

  return (
    <section ref={sectionRef} id="pipeline" className="bg-[#FFFBF0] py-12 md:py-18 scroll-mt-[64px]">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="v3-section-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#ff7a00] font-bold uppercase mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              THE PIPELINE // SYSTEM ARCHITECTURE
            </p>
            <h2 className="text-[30px] md:text-[40px] leading-[1.05] tracking-tight font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>
              How Raw Telemetry Becomes
              <br />
              <span className="font-normal italic" style={{ fontFamily: "Instrument Serif" }}>High-Conviction Trading Signal</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-[12px] text-[#6b625c] leading-relaxed max-w-[380px]">
              Subterranean telemetry ingested, scored, and dispatched to your terminal in sub-second cycles.
            </p>
            <button
              onClick={() => {
                setAutoPlay((v) => !v);
                setProgress(0);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                autoPlay 
                  ? "bg-[#111] text-white border-[#111]" 
                  : "bg-white text-[#6b625c] border-[#e8e0d5] hover:border-[#111]"
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${autoPlay ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
              {autoPlay ? "AUTORUN: ON" : "AUTORUN: PAUSED"}
            </button>
          </div>
        </div>

        {/* 4 Pipeline Step Navigation Cards with Animated Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
          {PIPELINE_STAGES.map((s, idx) => {
            const isSelected = activeIdx === idx;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setProgress(0);
                  setAutoPlay(false);
                }}
                className={`text-left p-3.5 sm:p-4 rounded-[14px] transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-[#111] text-white border-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.12)] -translate-y-0.5"
                    : "bg-[#fdf8f0] border-[#e8e0d5] text-[#111] hover:bg-[#f6eee2] hover:border-[#111]/30"
                }`}
              >
                {/* Active progress bar top indicator */}
                {isSelected && (
                  <div 
                    className="absolute top-0 left-0 h-[2.5px] bg-[#ff7a00] transition-all duration-75 ease-linear"
                    style={{ width: `${autoPlay ? progress : 100}%` }}
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#ff7a00]" : "text-[#8c827a]"}`} />
                    <span className={`text-[9.5px] font-mono font-bold tracking-widest ${isSelected ? "text-[#ff7a00]" : "text-[#8c827a]"}`}>
                      PHASE {s.step}
                    </span>
                  </div>
                  <span className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${
                    isSelected ? "bg-white/10 text-white/90 border-white/15" : "bg-[#e8e0d5]/60 text-[#666] border-transparent"
                  }`}>
                    {s.frequency}
                  </span>
                </div>
                <div className="font-bold text-[13px] leading-snug mb-0.5" style={{ fontFamily: "Inter" }}>
                  {s.name}
                </div>
                <div className={`text-[10px] font-mono ${isSelected ? "text-white/60" : "text-[#8c827a]"}`}>
                  {s.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Telemetry Console & Deep Stage Inspector */}
        <div className="rounded-[18px] bg-[#fdf8f0] border border-[#e8e0d5] overflow-hidden shadow-sm">
          {/* Top Bar */}
          <div className="px-5 py-2.5 bg-[#111] text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#222]">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-[#ff7a00] text-black font-mono text-[9px] font-black tracking-widest">
                STAGE {active.step}
              </span>
              <span className="font-bold text-[13.5px]" style={{ fontFamily: "Inter" }}>
                {active.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10.5px] font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c950] animate-pulse" />
                EDGE: <strong className="text-white">{latencyJitter}MS</strong>
              </span>
              <span>•</span>
              <span>PROTOCOL: <strong className="text-white">{active.spec.protocol}</strong></span>
              <span>•</span>
              <Link href="/terminal" className="text-[#ff7a00] hover:underline flex items-center gap-1 font-bold">
                Terminal <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stage Content Grid (Persistent stable DOM container) */}
          <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[310px]">
            {/* Left: Headline, Summary & Spec Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-[9.5px] font-mono tracking-[0.16em] text-[#ff7a00] font-bold uppercase">
                  {active.category}
                </span>
                <h3 className="text-[18px] md:text-[21px] font-bold text-[#111] mt-1 mb-2 leading-tight" style={{ fontFamily: "Inter" }}>
                  {active.headline}
                </h3>
                <p className="text-[12px] text-[#6b625c] leading-relaxed mb-4">
                  {active.summary}
                </p>
              </div>

              {/* Spec Table */}
              <div className="border border-[#e8e0d5] rounded-[12px] bg-[#FFFBF0] overflow-hidden font-mono text-[10.5px]">
                <div className="px-3.5 py-2 bg-[#f5ecdd] border-b border-[#e8e0d5] font-bold text-[#111] text-[9.5px] tracking-wider uppercase flex items-center justify-between">
                  <span>STAGE SPECIFICATIONS</span>
                  <span className="text-[#ff7a00]">{active.metric}</span>
                </div>
                <div className="divide-y divide-[#e8e0d5]">
                  <div className="px-3.5 py-1.5 flex justify-between">
                    <span className="text-[#8c827a]">Execution Protocol</span>
                    <span className="font-bold text-[#111]">{active.spec.protocol}</span>
                  </div>
                  <div className="px-3.5 py-1.5 flex justify-between">
                    <span className="text-[#8c827a]">Processing Latency</span>
                    <span className="font-bold text-[#00c950]">{latencyJitter}ms nominal</span>
                  </div>
                  <div className="px-3.5 py-1.5 flex justify-between">
                    <span className="text-[#8c827a]">Cycle Capacity</span>
                    <span className="font-bold text-[#111]">{active.spec.throughput}</span>
                  </div>
                  <div className="px-3.5 py-1.5 flex justify-between">
                    <span className="text-[#8c827a]">State Retention</span>
                    <span className="font-bold text-[#111]">{active.spec.retention}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Telemetry Console (Dynamic for each Stage) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="rounded-[14px] bg-[#0c0c0c] border border-[#222] p-4 text-white flex-1 flex flex-col justify-between font-mono">
                {/* Console Top Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#222] text-[9.5px] text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-ping" />
                    <span className="text-white font-bold tracking-wider">LIVE TELEMETRY STREAM</span>
                  </div>
                  <span>UPLINK: ACTIVE • {packetCount} PKTS/S</span>
                </div>

                {/* Stage 01: Ingestion Live Wire Stream */}
                {activeIdx === 0 && (
                  <div className="py-2.5 space-y-2">
                    <div className="text-[8.5px] text-[#ff7a00] tracking-widest uppercase">
                      ● INCOMING RAW CATALYSTS (60S INGEST CYCLE)
                    </div>
                    {INGEST_FEED.map((feed, i) => (
                      <div key={i} className="p-2 rounded-[7px] bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[10.5px]">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="text-[7.5px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded font-bold">{feed.source}</span>
                          <span className="text-white/90 truncate">{feed.title}</span>
                        </div>
                        <span className="text-[8.5px] text-[#00c950] shrink-0 font-bold">{feed.status}</span>
                      </div>
                    ))}
                    <div className="text-[9px] text-white/40 flex items-center justify-between pt-0.5">
                      <span>Deduplication: SHA-256 Verified</span>
                      <span className="text-white/70">Buffer: 50/50 Full</span>
                    </div>
                  </div>
                )}

                {/* Stage 02: Synthesis LLM Scoring Console */}
                {activeIdx === 1 && (
                  <div className="py-2.5 space-y-2.5">
                    <div className="text-[8.5px] text-[#ff7a00] tracking-widest uppercase">
                      ● MIMO-V2.5 NEURAL QUANT DISTILLATION
                    </div>
                    <div className="p-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="text-white/70">Token Inference Context:</span>
                        <span className="text-[#ff7a00] font-bold">{tokenCounter} / 800 Tokens</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff7a00] rounded-full transition-all duration-500" style={{ width: `${(tokenCounter / 800) * 100}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <div className="p-2.5 rounded-[7px] bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[8.5px] text-white/40 mb-0.5">DIRECTIONAL POLARITY</div>
                        <div className="text-[13px] font-bold text-[#00c950] flex items-center gap-1.5">
                          <span>BULLISH</span>
                          <span className="text-[9.5px] text-white/60">(94.2%)</span>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-[7px] bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[8.5px] text-white/40 mb-0.5">IMPACT RATING</div>
                        <div className="text-[13px] font-bold text-[#ff7a00]">SCORE 9 / 10</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 03: Radar Anomaly Waveform */}
                {activeIdx === 2 && (
                  <div className="py-2.5 space-y-2.5">
                    <div className="flex items-center justify-between text-[8.5px] text-[#ff7a00] tracking-widest uppercase">
                      <span>● Z-SCORE ANOMALY DETECTOR</span>
                      <span className="text-white/70">3H vs 24H BASELINE</span>
                    </div>

                    <div className="p-2.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-[8.5px] text-white/40">ANOMALOUS SURGE DETECTED</div>
                        <div className="text-[18px] font-black text-[#ff7a00] mt-0.5 flex items-center gap-1.5">
                          <span>+{anomalyVal}%</span>
                          <TrendingUp className="w-3.5 h-3.5 text-[#ff7a00]" />
                        </div>
                        <div className="text-[8.5px] text-[#00c950] mt-0.5 font-bold">● AUTO-FLAGGED ON RADAR</div>
                      </div>

                      {/* Mini Sparkline */}
                      <div className="w-[100px] h-[40px]">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <path d="M0 32 L20 28 L40 30 L60 22 L80 14 L100 4" fill="none" stroke="#ff7a00" strokeWidth="2" strokeLinecap="round" />
                          <path d="M0 32 L20 28 L40 30 L60 22 L80 14 L100 4 L100 40 L0 40 Z" fill="rgba(255,122,0,0.12)" />
                          <circle cx="100" cy="4" r="2.5" fill="#ff7a00" className="animate-pulse" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[8.5px] text-white/50">
                      <span>Mesh Nodes Active: 190+ Global</span>
                      <span>Confidence: 99.4%</span>
                    </div>
                  </div>
                )}

                {/* Stage 04: Terminal & Dispatch Matrix */}
                {activeIdx === 3 && (
                  <div className="py-2.5 space-y-2.5">
                    <div className="text-[8.5px] text-[#ff7a00] tracking-widest uppercase">
                      ● CLIENT COCKPIT &amp; API DISPATCH
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-[7px] bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[7.5px] text-white/40">SINGAPORE</div>
                        <div className="text-[11px] font-bold text-[#00c950] mt-0.5">24ms</div>
                      </div>
                      <div className="p-2 rounded-[7px] bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[7.5px] text-white/40">FRANKFURT</div>
                        <div className="text-[11px] font-bold text-[#00c950] mt-0.5">22ms</div>
                      </div>
                      <div className="p-2 rounded-[7px] bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[7.5px] text-white/40">VIRGINIA</div>
                        <div className="text-[11px] font-bold text-[#00c950] mt-0.5">18ms</div>
                      </div>
                    </div>

                    <div className="p-2 rounded-[7px] bg-[#ff7a00]/10 border border-[#ff7a00]/30 flex items-center justify-between text-[10.5px] text-white">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#ff7a00]" />
                        <span>Ready in Terminal: 8 Live Panels</span>
                      </div>
                      <Link href="/terminal" className="text-[#ff7a00] font-bold flex items-center gap-1 hover:underline text-[9.5px]">
                        ENTER <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Console Footer */}
                <div className="pt-2.5 border-t border-[#222] flex items-center justify-between text-[8.5px] text-white/40">
                  <span className="flex items-center gap-1 text-[#00c950]">
                    <CheckCircle2 className="w-3 h-3" /> PIPELINE SYNCHRONIZED
                  </span>
                  <span>STEP {activeIdx + 1} OF 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


