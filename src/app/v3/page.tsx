"use client";

import Image from "next/image";
import Link from "next/link";

const CURVE_IMAGES = [
  "/v2/img/hero.webp",
  "/v2/img/neural-feed.webp",
  "/v2/img/global-matrix.webp",
  "/v2/img/alpha-shield.webp",
  "/v2/img/viral-radar.webp",
  "/logo.webp",
  "/v2/img/mascot-about.webp",
  "/v2/img/neural-feed.webp",
  "/v2/img/global-matrix.webp",
  "/v2/img/viral-radar.webp",
  "/v2/img/hero.webp",
];

const BELOW_HERO = [
  {
    title: "Real-Time Intel",
    desc: "Ingest 50 fresh signals every 5 minutes from CoinDesk, CoinTelegraph, Decrypt. Zero noise, pure feed.",
  },
  {
    title: "AI Synthesis",
    desc: "MIMO-V2.5 scores impact 9→5 in 100ms. Bullish/bearish/neutral with OpenRouter fallback.",
  },
  {
    title: "Global Matrix",
    desc: "190+ nodes, 99.97% uptime, 24ms edge. Viral radar 3h vs 24h, top mentions, narratives live.",
  },
];

export default function LandingV3() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#111] selection:bg-[#ff7a00]/20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;900&display=swap');`}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FFFBF0]/80 backdrop-blur-md border-b border-[#e8e0d5]">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-black tracking-widest">H</div>
              <span className="font-black tracking-[0.2em] text-sm" style={{ fontFamily: "Inter" }}>HELIOS</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-[12px] text-[#6b625c] font-medium">
              <a href="#features" className="hover:text-[#111]">Features</a>
              <a href="/terminal" className="hover:text-[#111]">Terminal</a>
              <a href="#system" className="hover:text-[#111]">System</a>
              <span className="text-[#e8e0d5]">•</span>
              <span className="text-[#ff7a00] text-[11px] tracking-widest">v4.21.0-MM LIVE</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[12px] font-medium">
            <a href="#pricing" className="text-[#6b625c] hover:text-[#111]">Pricing</a>
            <a href="/terminal" className="text-[#6b625c] hover:text-[#111]">Contact</a>
            <Link href="/terminal" className="bg-[#111] text-white px-5 py-2.5 rounded-full text-[12px] font-semibold flex items-center gap-2 hover:bg-[#222] transition-colors">
              Launch Terminal <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[10px]">→</span>
            </Link>
          </div>
          <Link href="/terminal" className="md:hidden bg-[#111] text-white px-4 py-2 rounded-full text-xs">Launch</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-14 pb-6 overflow-hidden">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h1 className="text-[40px] md:text-[56px] leading-[0.95] tracking-tight" style={{ fontFamily: "Instrument Serif" }}>
            <span className="font-normal italic">Decode Market Chaos,</span>
            <br />
            <span className="font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>Supercharge Your Alpha</span>
          </h1>
          <p className="mt-4 text-[13px] md:text-[14px] text-[#6b625c] max-w-[520px] mx-auto leading-relaxed">
            All-in-one intel to track, synthesize, and execute — faster and smarter. 50 fresh signals, 24ms edge, zero noise.
          </p>
          <Link href="/terminal" className="mt-6 inline-flex items-center gap-2 bg-[#111] text-white px-6 py-3 rounded-full text-[13px] font-semibold hover:bg-[#222] transition-colors">
            Launch Terminal for Free <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs">→</span>
          </Link>
        </div>

        {/* CURVED STRIP */}
        <div className="relative mt-10 md:mt-14">
          <div className="absolute inset-x-0 top-0 h-[55%] bg-[#FFFBF0]" />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[#F7EFE6] rounded-t-[32px] md:rounded-t-[48px]" />
          <div className="relative mx-auto max-w-[1400px] px-2 md:px-6">
            <div className="flex items-end justify-center gap-2 md:gap-3 overflow-hidden pt-2 pb-8">
              {CURVE_IMAGES.map((src, i) => {
                const center = 5;
                const dist = Math.abs(i - center);
                const y = dist * 10 + (i % 2 === 0 ? 6 : 0);
                const h = 220 - dist * 12;
                return (
                  <div
                    key={i}
                    className="shrink-0 rounded-[16px] md:rounded-[20px] overflow-hidden bg-[#e8e0d5] shadow-sm"
                    style={{
                      width: i === 5 ? "86px" : "72px",
                      height: `${h}px`,
                      transform: `translateY(${y}px)`,
                      opacity: 1 - dist * 0.06,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 3 columns below curve */}
          <div className="relative bg-[#F7EFE6] pb-10">
            <div className="mx-auto max-w-[1100px] px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#e8e0d5]/60">
              {BELOW_HERO.map((f) => (
                <div key={f.title} className="text-center md:text-left">
                  <h3 className="font-bold text-sm tracking-tight" style={{ fontFamily: "Inter" }}>{f.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#6b625c]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVERYTHING */}
      <section id="features" className="bg-[#F7EFE6] pt-14 pb-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="text-center max-w-[560px] mx-auto">
            <h2 className="text-[32px] md:text-[38px] leading-tight tracking-tight" style={{ fontFamily: "Inter", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Everything Your Desk Needs
              <br />
              To Trade Smarter
            </h2>
            <p className="mt-3 text-[13px] text-[#6b625c] leading-relaxed">
              From feed to execution, our modules keep your desk connected, hedged, and moving forward — together.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Built-In Terminal */}
            <div className="md:col-span-8 rounded-[20px] overflow-hidden bg-black text-white relative min-h-[280px] flex">
              <img src="/v2/img/neural-feed.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative p-7 flex flex-col justify-end max-w-[360px]">
                <h3 className="font-bold" style={{ fontFamily: "Inter" }}>Built-In Terminal</h3>
                <p className="mt-2 text-[12px] text-white/70 leading-relaxed">8-panel command center: System Report, Raw Stream 50, Viral Radar. No app switching.</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/20 rounded-full px-3 py-1.5 text-[10px] tracking-widest">LIVE 24MS ●</div>
            </div>
            {/* Task Assignment */}
            <div className="md:col-span-4 rounded-[20px] bg-[#fdf8f0] border border-[#e8e0d5] p-6 flex flex-col justify-between min-h-[280px]">
              <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-xs">◧</div>
              <div>
                <h3 className="font-bold text-sm" style={{ fontFamily: "Inter" }}>Signal Assignment</h3>
                <p className="mt-2 text-[12px] text-[#6b625c] leading-relaxed">Auto-tag every intercept with coin, impact 9→5, and bullish/bearish. No manual triage.</p>
                <div className="mt-4 flex gap-2 text-[10px]">
                  <span className="bg-[#ff7a00] text-white px-2 py-1 rounded-full">BTC 18</span>
                  <span className="bg-[#111] text-white px-2 py-1 rounded-full">ENA 3</span>
                </div>
              </div>
            </div>

            {/* Real-Time Scheduling */}
            <div className="md:col-span-4 rounded-[20px] bg-[#d8cbb8] p-6 flex flex-col justify-between min-h-[260px]">
              <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center">◷</div>
              <div>
                <h3 className="font-bold text-sm text-[#111]" style={{ fontFamily: "Inter" }}>Viral Scheduling</h3>
                <p className="mt-2 text-[12px] text-[#5a524c] leading-relaxed">5-min cron → 60s poll. Anomaly 3h vs 24h, growth {">"}50% auto-flagged.</p>
                <div className="mt-4 h-2 bg-white/40 rounded-full overflow-hidden"><div className="h-full w-[68%] bg-[#111] rounded-full" /></div>
              </div>
            </div>
            {/* Progress Tracking */}
            <div className="md:col-span-8 rounded-[20px] overflow-hidden bg-[#6b7c5e] text-white relative min-h-[260px] flex items-end">
              <div className="absolute inset-0">
                <img src="/v2/img/mascot-about.webp" alt="" className="w-full h-full object-cover opacity-30" />
              </div>
              <div className="relative p-7 flex gap-6 w-full">
                <div className="flex-1">
                  <h3 className="font-bold" style={{ fontFamily: "Inter" }}>Progress Tracking</h3>
                  <p className="mt-2 text-[12px] text-white/80 leading-relaxed">Visualize narrative momentum with Top Mentions and Narrative Intercepts. See what&apos;s pumping before CT.</p>
                </div>
                <div className="hidden md:block w-[220px] shrink-0 bg-white rounded-2xl p-4 text-[#111]">
                  <div className="text-[10px] tracking-widest text-[#6b625c]">TOP MENTIONS</div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="flex justify-between"><span>BTC</span><span className="font-bold">18</span></div>
                    <div className="w-full h-1 bg-[#f0e8dc] rounded-full"><div className="h-full w-[90%] bg-[#ff7a00] rounded-full" /></div>
                    <div className="flex justify-between"><span>ENA</span><span className="font-bold">3</span></div>
                    <div className="w-full h-1 bg-[#f0e8dc] rounded-full"><div className="h-full w-[45%] bg-[#6b7c5e] rounded-full" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVEN RESULTS */}
      <section className="bg-[#FFFBF0] pt-16 pb-10">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="text-center max-w-[560px] mx-auto">
            <h2 className="text-[32px] md:text-[38px] leading-tight" style={{ fontFamily: "Inter", fontWeight: 900 }}>Proven Results, Real Impact</h2>
            <p className="mt-3 text-[13px] text-[#6b625c]">See how desks around the world are faster, more hedged, and more profitable with Helios.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[20px] bg-[#fdf8f0] border border-[#e8e0d5] p-6">
              <div className="text-[10px] tracking-widest text-[#6b625c]">TRUSTED BY</div>
              <div className="mt-3 text-2xl font-black" style={{ fontFamily: "Inter" }}>2,400+</div>
              <div className="text-[12px] text-[#6b625c]">desks & funds</div>
              <div className="mt-6 flex -space-x-2">
                {[1,2,3,4].map((i)=> <div key={i} className="w-8 h-8 rounded-full bg-[#e8e0d5] border-2 border-white" />)}
              </div>
            </div>
            <div className="rounded-[20px] overflow-hidden bg-black relative min-h-[220px]">
              <img src="/v2/img/global-matrix.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="text-2xl font-black">24ms</div>
                <div className="text-[12px] text-white/70">avg latency, edge cached</div>
              </div>
            </div>
            <div className="rounded-[20px] bg-[#d8cbb8] p-6 flex flex-col justify-between min-h-[220px]">
              <div className="text-[10px] tracking-widest">UPTIME</div>
              <div className="text-4xl font-black" style={{ fontFamily: "Inter" }}>99.97%</div>
              <div className="text-[12px] text-[#5a524c]">5-min cron, 60s poll, zero downtime</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/terminal" className="bg-[#111] text-white px-8 py-3.5 rounded-full text-sm font-semibold flex items-center gap-3 hover:bg-[#222]">
              Launch Terminal <span className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#FFFBF0] border-t border-[#e8e0d5] py-8">
        <div className="mx-auto max-w-[1100px] px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6b625c]">
          <span className="tracking-[0.2em] font-black">HELIOS SYS v4.21.0-MM</span>
          <span>© 2026 HELIOS • /terminal • 50 fresh • MIMO-V2.5</span>
        </div>
      </footer>
    </div>
  );
}
