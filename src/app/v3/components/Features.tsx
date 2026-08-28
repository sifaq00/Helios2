"use client";
import Link from "next/link";

export default function Features() {
  return (
    <section id="features" className="bg-[#F7EFE6] py-14">
      <div className="mx-auto max-w-[1060px] px-6 text-center">
        <h2 className="text-[32px] md:text-[38px] leading-tight tracking-tight" style={{ fontFamily: "Inter", fontWeight: 900, letterSpacing: "-0.02em" }}>
          Everything Your Desk Needs
          <br />
          To Trade Smarter
        </h2>
        <p className="mt-3 text-[13px] text-[#6b625c] leading-relaxed max-w-[560px] mx-auto">
          From feed to execution, our modules keep your desk connected, hedged, and moving forward — together.
        </p>
      </div>

      <div className="mx-auto max-w-[1060px] px-6 mt-10 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 rounded-[20px] overflow-hidden bg-black text-white relative min-h-[280px] flex">
          <img src="/v2/img/neural-feed.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative p-7 flex flex-col justify-end max-w-[360px]">
            <h3 className="font-bold" style={{ fontFamily: "Inter" }}>Built-In Terminal</h3>
            <p className="mt-2 text-[12px] text-white/70 leading-relaxed">8-panel command center: System Report, Raw Stream 50, Viral Radar. No app switching.</p>
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/20 rounded-full px-3 py-1.5 text-[10px] tracking-widest">LIVE 24MS ●</div>
        </div>

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

        <div className="md:col-span-4 rounded-[20px] bg-[#d8cbb8] p-6 flex flex-col justify-between min-h-[260px]">
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center">◷</div>
          <div>
            <h3 className="font-bold text-sm text-[#111]" style={{ fontFamily: "Inter" }}>Viral Scheduling</h3>
            <p className="mt-2 text-[12px] text-[#5a524c] leading-relaxed">5-min cron → 60s poll. Anomaly 3h vs 24h, growth &gt;50% auto-flagged.</p>
            <div className="mt-4 h-2 bg-white/40 rounded-full overflow-hidden"><div className="h-full w-[68%] bg-[#111] rounded-full" /></div>
          </div>
        </div>

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
    </section>
  );
}
