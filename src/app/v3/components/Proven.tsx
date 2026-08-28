"use client";
import Link from "next/link";

export default function Proven() {
  return (
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
  );
}
