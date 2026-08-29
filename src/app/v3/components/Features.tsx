"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, SlidersHorizontal, Clock, TrendingUp, Radio, Activity, Zap, ArrowUpRight, Bitcoin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LIVE_ITEMS = [
  { impact: 9, time: "14:05 UTC", source: "@COINTELEGRAPH", headline: "Fed Chair: 'We have work to do' on inflation", desc: "5.2% hawkish surge triggers risk-off — BTC $81k watch." },
  { impact: 8, time: "13:30 UTC", source: "@COINDESK", headline: "Who is liable when an AI agent goes rogue?", desc: "Legal vacuum as agents trade beyond human oversight." },
  { impact: 8, time: "13:16 UTC", source: "@DECRYPT", headline: "Polish Olympic chief charged in Zondacrypto probe", desc: "Funds misappropriation tied to exchange collapse." },
];

function CoinIcon({ coin, size = 18 }: { coin: string; size?: number }) {
  if (coin === "BTC") {
    return (
      <span className="rounded-full flex items-center justify-center shrink-0 bg-[#f7931a] border border-black/5 shadow-sm text-white" style={{ width: size, height: size }}>
        <Bitcoin style={{ width: size * 0.62, height: size * 0.62 }} />
      </span>
    );
  }
  const srcMap: Record<string, string> = {
    ENA: "https://assets.coingecko.com/coins/images/36530/small/ethena.png",
    SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  };
  const src = srcMap[coin];
  if (!src) return <span className="rounded-full bg-[#111] text-white flex items-center justify-center text-[8px] font-black" style={{ width: size, height: size }}>{coin[0]}</span>;
  return <img src={src} alt={coin} width={size} height={size} className="rounded-full object-cover shrink-0 bg-white border border-black/5 shadow-sm" style={{ width: size, height: size }} loading="lazy" />;
}

function BuiltInTerminalCard({ inView }: { inView: boolean }) {
  const [active, setActive] = useState(0);
  const [latency, setLatency] = useState(24);
  const [more, setMore] = useState(47);

  useEffect(() => {
    if (!inView) return;
    const a = setInterval(() => setActive((i) => (i + 1) % LIVE_ITEMS.length), 2000);
    const l = setInterval(() => setLatency(22 + Math.floor(Math.random() * 5)), 1200);
    const m = setInterval(() => setMore(47 + Math.floor(Math.random() * 4)), 2000);
    return () => { clearInterval(a); clearInterval(l); clearInterval(m); };
  }, [inView]);

  const scanTops = [72, 134, 196];
  return (
    <div className="feat-card v3-col-left group md:col-span-8 rounded-[20px] overflow-hidden bg-black text-white relative min-h-[300px] flex flex-col md:flex-row shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-shadow duration-300">
      <style>{`@keyframes v3-blink{0%,45%{opacity:1}50%,100%{opacity:0}} @keyframes v3-pulse{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}`}</style>
      <img src="/v2/img/neural-feed.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.38] scale-[1.12] group-hover:scale-[1.16] transition-transform duration-700 pointer-events-none" style={{ objectPosition: "50% 28%" }} loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a00]/10 to-transparent opacity-60 pointer-events-none" />
      <div className="relative z-10 p-6 md:p-7 flex flex-col justify-center md:justify-between flex-[0.95] md:max-w-[310px]">
        <div>
          <div className="flex items-center gap-2 mb-2"><Terminal className="w-5 h-5 text-[#ff7a00]" /><h3 className="font-bold text-[15px]" style={{ fontFamily: "Inter" }}>Built-In Terminal</h3></div>
          <p className="text-[12px] text-white/70 leading-relaxed">8-panel command center: System Report, Raw Stream 50, Viral Radar. No app switching.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 mt-4 text-[9px] font-mono text-white/45"><span className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse" /> 8-PANEL • LIVE SYNC</div>
      </div>
      <div className="relative z-10 flex-1 p-3 pt-0 md:p-4 md:pl-2 flex items-center justify-center md:justify-end">
        <div className="w-full max-w-[340px] relative border border-[#ff7a00]/40 bg-[#080808] rounded-[12px] overflow-hidden shadow-[0_0_20px_rgba(255,122,0,0.14)]">
          <div className="flex items-center justify-between px-2.5 py-2 bg-[#0f0f0f] border-b border-[#222] font-mono text-[8px] tracking-widest"><span className="text-[#ff7a00] font-bold">● RAW_STREAM — 50 • 20 SHOWN</span><span style={{ color: latency > 25 ? "#ff7a00" : "#00ff88", fontWeight: 700, transition: "color 0.3s" }}>● LIVE {latency}MS</span></div>
          <div className="relative px-2.5 pt-2.5 pb-3 font-mono bg-black">
            <div className="flex items-center gap-1.5 mb-2 text-[8px] tracking-[0.18em] text-[#ff7a00]/60"><span className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full" style={{ boxShadow: "0 0 6px #ff7a00", animation: "v3-pulse 1.5s infinite" }} />LIVE PREVIEW • 50 SIGNALS<span className="ml-auto text-[#3a3a3a] text-[7px]">/terminal</span></div>
            {LIVE_ITEMS.map((it, idx) => {
              const isActive = active === idx; const isNext = idx === (active + 1) % 3;
              return (<div key={idx} className="relative pl-2.5 pr-2 py-2 mb-1.5 rounded-r-[6px] transition-all duration-300" style={{ borderLeft: `2px solid ${isActive ? "#ff7a00" : "#2a2a2a"}`, opacity: isActive ? 1 : isNext ? 0.52 : 0.28, background: isActive ? "rgba(255,122,0,0.07)" : "transparent", transform: isActive ? "translateX(3px)" : "translateX(0)" }}><div className="text-[8px] tracking-wide leading-none" style={{ color: isActive ? "#ff7a00" : "#555" }}>IMPACT:{it.impact} • {it.time} • {it.source}</div><div className="mt-1 text-[11px] leading-[1.35] pr-1" style={{ color: isActive ? "#fff" : "#bbb", fontWeight: isActive ? 700 : 400 }}>{it.headline}{isActive && <span className="inline-block w-[6px] h-[10px] bg-[#ff7a00] ml-1 align-middle" style={{ animation: "v3-blink 0.9s infinite" }} />}</div>{isActive && <div className="text-[10px] mt-1 leading-snug text-[#8c847c]">{it.desc}</div>}</div>);
            })}
            <div className="text-center mt-1.5 text-[8px] tracking-[0.16em] font-bold text-[#ff7a00]" style={{ animation: "v3-pulse 0.9s" }}>+ {more} MORE • SCROLL →</div>
            <div className="absolute left-2.5 right-2.5 h-[1px] pointer-events-none hidden md:block" style={{ top: scanTops[active], background: "linear-gradient(90deg, transparent, #ff7a00, transparent)", opacity: 0.65, boxShadow: "0 0 6px #ff7a00", transition: "top 0.45s cubic-bezier(0.22,1,0.36,1)" }} />
          </div>
          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#ff7a00]/50 rounded-tr-[5px] pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#ff7a00]/50 rounded-bl-[5px] pointer-events-none" />
          <a href="/terminal" className="absolute inset-0 hidden md:flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100"><span className="border border-[#ff7a00] bg-[#ff7a00] text-black px-3 py-1.5 text-[9px] tracking-[0.18em] font-black font-mono">ENTER →</span></a>
        </div>
      </div>
      <div className="absolute top-3 right-3 md:hidden bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 text-[9px] tracking-widest font-mono flex items-center gap-1 z-20"><Radio className="w-3 h-3 text-[#ff7a00] animate-pulse" /><span style={{ color: latency > 25 ? "#ffb86b" : "#fff" }}>LIVE {latency}MS</span></div>
    </div>
  );
}

const SIGNAL_FEED = [
  { coin: "BTC", impact: 9, sig: "BULLISH", col: "#00c950", bg: "rgba(0,201,80,0.12)", border: "#00c950" },
  { coin: "ENA", impact: 7, sig: "NEUTRAL", col: "#9ca3af", bg: "rgba(156,163,175,0.12)", border: "#6b7280" },
  { coin: "SOL", impact: 6, sig: "BEARISH", col: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "#ef4444" },
];

function SignalAssignmentCard({ inView }: { inView: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const a = setInterval(() => setActive((i) => (i + 1) % SIGNAL_FEED.length), 1800);
    return () => clearInterval(a);
  }, [inView]);

  return (
    <div className="feat-card v3-col-right group md:col-span-4 rounded-[20px] bg-[#fdf8f0] border border-[#e8e0d5] overflow-hidden flex flex-col min-h-[300px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
      <div className="p-5 md:p-6 pb-2.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="w-9 h-9 rounded-full bg-[#111] text-white flex items-center justify-center shadow-sm"><SlidersHorizontal className="w-4 h-4 text-[#ff7a00]" /></div>
          <span className="text-[8px] font-mono tracking-[0.16em] text-[#ff7a00] bg-[#ff7a00]/10 border border-[#ff7a00]/20 px-2 py-1 rounded-full font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse" /> AUTO • 12/MIN</span>
        </div>
        <h3 className="font-bold text-[14px]" style={{ fontFamily: "Inter" }}>Signal Assignment</h3>
        <p className="mt-1 text-[11.5px] text-[#6b625c] leading-snug">Auto-tag every intercept with coin, impact 9→5, and signal.</p>
      </div>
      <div className="mx-3 bg-[#0a0a0a] border border-[#222] rounded-[12px] p-2 font-mono relative overflow-hidden">
        <div className="flex items-center justify-between text-[7px] tracking-widest text-[#666] mb-1.5"><span>TAG_ENGINE</span><span className="text-[#ff7a00] animate-pulse">● LIVE</span></div>
        {SIGNAL_FEED.map((s, idx) => {
          const isActive = active === idx;
          return (
            <div key={s.coin} className="flex items-center gap-1.5 py-1.5 px-2 rounded-[8px] mb-1 transition-all duration-300" style={{ background: isActive ? s.bg : "transparent", border: `1px solid ${isActive ? s.border : "transparent"}`, opacity: isActive ? 1 : 0.42, transform: isActive ? "scale(1.015)" : "scale(1)" }}>
              <CoinIcon coin={s.coin} size={18} />
              <span className="text-[10px] font-black tracking-widest" style={{ color: s.col }}>{s.coin}</span>
              <span className="text-[7px] bg-black text-[#ff7a00] border border-[#333] px-1 py-0.5 rounded-full">IMP {s.impact}</span>
              <span className="text-[7px] font-bold tracking-widest px-1.5 py-0.5 rounded-full text-white" style={{ background: s.col, opacity: isActive ? 1 : 0.9 }}>{s.sig}</span>
            </div>
          );
        })}
      </div>
      <div className="p-5 md:p-6 pt-3 flex items-center justify-between text-[11px] font-mono text-[#8c827a] mt-auto border-t border-[#e8e0d5]/60"><span>MODEL: MIMO-V2.5</span><span className="text-[#111] font-bold">99.2% ACC</span></div>
    </div>
  );
}

function ViralSchedulingCard({ inView }: { inView: boolean }) {
  const [anomaly, setAnomaly] = useState(142);
  const [growth, setGrowth] = useState(68);
  const [flagged, setFlagged] = useState(true);

  useEffect(() => {
    if (!inView) return;
    const a = setInterval(() => setAnomaly(138 + Math.floor(Math.random() * 12)), 1600);
    const g = setInterval(() => { const v = 60 + Math.floor(Math.random() * 20); setGrowth(v); setFlagged(v > 50); }, 2200);
    return () => { clearInterval(a); clearInterval(g); };
  }, [inView]);

  return (
    <div className="feat-card v3-col-left group md:col-span-4 rounded-[20px] bg-[#d8cbb8] overflow-hidden flex flex-col min-h-[280px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative">
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(#111 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
      <div className="p-5 md:p-6 pb-2.5 relative">
        <div className="flex items-center justify-between mb-2.5"><div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center shadow-sm"><Clock className="w-4 h-4 text-[#111]" /></div><span className="text-[7px] font-mono tracking-[0.14em] bg-[#111] text-white px-2 py-1 rounded-full">5M CRON → 60S POLL</span></div>
        <h3 className="font-bold text-[14px] text-[#111]" style={{ fontFamily: "Inter" }}>Viral Scheduling</h3>
        <p className="mt-1 text-[11.5px] text-[#5a524c] leading-snug">Anomaly 3h vs 24h, growth &gt;50% auto-flagged.</p>
      </div>
      <div className="mx-3 bg-[#111] rounded-[12px] p-2.5 text-white relative overflow-hidden shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#ff7a00]/10 rounded-full blur-[12px]" />
        <div className="flex items-start justify-between relative">
          <div>
            <div className="text-[7px] font-mono tracking-[0.14em] text-white/45">3H vs 24H</div>
            <div className="mt-1 flex items-center gap-1.5"><CoinIcon coin="BTC" size={18} /><span className="text-[15px] font-black text-[#ff7a00]" style={{ fontFamily: "Inter" }}>+{anomaly}%</span><TrendingUp className="w-3.5 h-3.5 text-[#ff7a00]" /></div>
            <div className={`mt-1 inline-flex items-center gap-1 text-[7px] font-mono tracking-widest px-1.5 py-1 rounded-full border ${flagged ? "bg-[#ff7a00] text-white border-[#ff7a00]" : "bg-white/10 text-white/60 border-white/15"}`}><Zap className="w-2.5 h-2.5" />{flagged ? "FLAGGED" : "SCANNING"}</div>
          </div>
          <div className="w-[72px] h-[36px] relative"><svg viewBox="0 0 72 36" className="w-full h-full"><path d={`M0 26 L12 22 L24 24 L36 ${32 - (growth - 60)} L48 ${26 - (anomaly - 138) * 0.16} L60 14 L72 5`} fill="none" stroke="#ff7a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d={`M0 26 L12 22 L24 24 L36 ${32 - (growth - 60)} L48 ${26 - (anomaly - 138) * 0.16} L60 14 L72 5 L72 36 L0 36 Z`} fill="rgba(255,122,0,0.12)" /><circle cx="72" cy="5" r="2" fill="#ff7a00" /></svg><div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-[#ff7a00] rounded-full animate-ping" /></div>
        </div>
        <div className="mt-2.5"><div className="flex justify-between text-[7px] font-mono text-white/40 mb-1"><span>BASELINE</span><span className="text-[#ff7a00] font-bold">{growth}%</span></div><div className="h-1 bg-white/15 rounded-full overflow-hidden"><div className="h-full bg-[#ff7a00] rounded-full transition-all duration-700" style={{ width: `${growth}%` }} /></div></div>
      </div>
      <div className="px-4 pb-3 pt-2.5 flex items-center justify-between text-[8px] font-mono text-[#5a524c] mt-auto relative"><span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 3H</span><span className="w-4 h-[1px] bg-[#111]/20" /><span>24H</span><span className={`px-1.5 py-0.5 rounded-full text-white text-[7px] ${growth > 50 ? "bg-[#111]" : "bg-[#111]/60"}`}>{growth > 50 ? "FLAGGED" : "WATCH"}</span></div>
    </div>
  );
}

function ProgressTrackingCard({ inView }: { inView: boolean }) {
  const [btc, setBtc] = useState(18);
  const [ena, setEna] = useState(3);
  const [sol, setSol] = useState(5);
  const [intercepts, setIntercepts] = useState(127);

  useEffect(() => {
    if (!inView) return;
    const b = setInterval(() => setBtc(17 + Math.floor(Math.random() * 5)), 1600);
    const e = setInterval(() => setEna(2 + Math.floor(Math.random() * 4)), 1800);
    const s = setInterval(() => setSol(4 + Math.floor(Math.random() * 4)), 1900);
    const i = setInterval(() => setIntercepts(124 + Math.floor(Math.random() * 8)), 1400);
    return () => { clearInterval(b); clearInterval(e); clearInterval(s); clearInterval(i); };
  }, [inView]);

  const btcW = Math.min(100, 62 + btc * 1.6);
  const enaW = Math.min(100, 22 + ena * 7);
  const solW = Math.min(100, 14 + sol * 6);
  return (
    <div className="feat-card v3-col-right group md:col-span-8 rounded-[20px] overflow-hidden bg-[#6b7c5e] text-white relative min-h-[260px] flex items-stretch shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-shadow duration-300">
      <div className="absolute inset-0"><img src="/v2/img/mascot-about.webp" alt="" className="w-full h-full object-cover opacity-[0.18] group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none" style={{ objectPosition: "50% 28%" }} loading="lazy" decoding="async" /><div className="absolute inset-0 bg-gradient-to-r from-[#6b7c5e] via-[#6b7c5e]/70 to-transparent pointer-events-none" /></div>
      <div className="relative p-5 md:p-6 flex flex-col md:flex-row gap-4 w-full items-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5"><TrendingUp className="w-5 h-5 text-white" /><h3 className="font-bold text-[15px]" style={{ fontFamily: "Inter" }}>Progress Tracking</h3><span className="ml-2 text-[7px] font-mono tracking-widest bg-white/15 border border-white/20 px-2 py-1 rounded-full hidden md:inline-flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse" /> LIVE</span></div>
            <p className="text-[11.5px] text-white/80 leading-snug max-w-[360px]">Visualize narrative momentum with Top Mentions. See what&apos;s pumping before CT.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 mt-3 text-[9px] font-mono text-white/60"><span className="bg-black/20 border border-white/15 px-2 py-1 rounded-full">{intercepts} INTERCEPTS</span><span className="w-1 h-1 bg-white/40 rounded-full" /><span className="flex items-center gap-1"><Activity className="w-3 h-3" /> MOMENTUM</span></div>
        </div>
        <div className="w-full md:w-[210px] shrink-0 bg-white rounded-[14px] p-3.5 text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#ff7a00]/08 rounded-full blur-[10px]" />
          <div className="flex items-center justify-between relative"><div className="text-[8px] font-mono tracking-[0.14em] text-[#6b625c] font-bold">TOP MENTIONS</div><span className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse shadow-[0_0_6px_rgba(255,122,0,0.6)]" /></div>
          <div className="mt-2.5 space-y-2.5 font-mono text-xs relative">
            <div><div className="flex justify-between items-center text-[10px]"><span className="font-bold tracking-widest flex items-center gap-1.5"><CoinIcon coin="BTC" size={16} /> BTC</span><span className="font-black" style={{ color: "#ff7a00" }}>{btc}</span></div><div className="w-full h-1 bg-[#f0e8dc] rounded-full overflow-hidden mt-1"><div className="h-full bg-[#ff7a00] rounded-full transition-all duration-700" style={{ width: `${btcW}%` }} /></div></div>
            <div><div className="flex justify-between items-center text-[10px]"><span className="font-bold tracking-widest flex items-center gap-1.5"><CoinIcon coin="ENA" size={16} /> ENA</span><span className="font-bold">{ena}</span></div><div className="w-full h-1 bg-[#f0e8dc] rounded-full overflow-hidden mt-1"><div className="h-full bg-[#6b7c5e] rounded-full transition-all duration-700" style={{ width: `${enaW}%` }} /></div></div>
            <div><div className="flex justify-between items-center text-[10px]"><span className="font-bold tracking-widest flex items-center gap-1.5"><CoinIcon coin="SOL" size={16} /> SOL</span><span className="font-bold">{sol}</span></div><div className="w-full h-1 bg-[#f0e8dc] rounded-full overflow-hidden mt-1"><div className="h-full bg-[#111] rounded-full transition-all duration-700" style={{ width: `${solW}%` }} /></div></div>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-[#e8e0d5] flex items-center justify-between text-[7px] font-mono text-[#8c827a]"><span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#ff7a00]" /> VELOCITY</span><span className="text-[#ff7a00] font-bold">+{intercepts - 100}</span></div>
        </div>
      </div>
      <div className="absolute top-2.5 right-2.5 md:hidden bg-white/90 backdrop-blur text-[#111] text-[8px] font-mono px-2 py-1 rounded-full font-bold shadow-sm">{intercepts} TOTAL</div>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="features" className="bg-[#FFFBF0] py-14 md:py-20 scroll-mt-[64px]">
      <div className="v3-section-reveal mx-auto max-w-[1280px] px-6 text-center">
        <h2 className="text-[30px] md:text-[42px] leading-[1.05] tracking-tight" style={{ fontFamily: "Inter", fontWeight: 900, letterSpacing: "-0.03em" }}>Everything Your Desk Needs<br /><span className="font-normal italic" style={{ fontFamily: "Instrument Serif" }}>To Trade Smarter</span></h2>
        <p className="mt-3 text-[13px] text-[#6b625c] leading-relaxed max-w-[560px] mx-auto">From feed to execution, our modules keep your desk connected, hedged, and moving forward — together.</p>
      </div>
      <div className="mx-auto max-w-[1280px] px-6 mt-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <BuiltInTerminalCard inView={inView} />
        <SignalAssignmentCard inView={inView} />
        <ViralSchedulingCard inView={inView} />
        <ProgressTrackingCard inView={inView} />
      </div>
    </section>
  );
}
