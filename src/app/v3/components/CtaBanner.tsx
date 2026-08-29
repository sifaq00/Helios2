"use client";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Terminal, Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="bg-[#FFFBF0] py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="v3-section-reveal group rounded-[24px] bg-[#fdf8f0] text-[#111] p-7 md:p-12 relative overflow-hidden border border-[#e8e0d5] shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          {/* Right Side Illustration Blend (Full Height Edge-to-Edge with Smooth Left Gradient) */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[58%] pointer-events-none overflow-hidden flex items-center justify-end">
            <img
              src="/v2/img/hero.webp"
              alt=""
              className="v3-cta-archer h-full w-auto max-w-none object-cover md:object-contain mix-blend-multiply opacity-[0.80] md:opacity-[0.92] pointer-events-none"
            />
            {/* Smooth left-to-right gradient blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f0] via-[#fdf8f0]/75 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f0]/30 via-transparent to-[#fdf8f0]/30 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#f5ecdd] border border-[#e8e0d5] text-[10px] font-mono text-[#ff7a00] font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-pulse" />
              HELIOS SYS // ZERO-CONFIG DESK
            </div>

            <h2 className="text-[32px] md:text-[48px] leading-[1.04] tracking-tight font-black text-[#111]" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>
              Eliminate Noise.
              <br />
              <span className="font-normal italic text-[#111]" style={{ fontFamily: "Instrument Serif" }}>
                Execute on Pure Alpha.
              </span>
            </h2>

            <p className="mt-4 text-[13px] md:text-[14px] text-[#555] leading-relaxed max-w-[500px] font-sans">
              Deploy the autonomous intelligence matrix to your desk in seconds. 50 freshest subterranean news streams, MIMO-V2.5 neural scoring, and live Viral Radar anomaly detection.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/terminal"
                className="bg-[#111] text-white hover:bg-[#ff7a00] hover:text-black transition-all pl-6 pr-2.5 py-2.5 rounded-full text-[13px] font-bold inline-flex items-center gap-3 shadow-md group/btn cursor-pointer"
              >
                Launch Terminal Free
                <span className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <a
                href="#pipeline"
                className="border border-[#e8e0d5] bg-white text-[#111] hover:border-[#111] px-5 py-3 rounded-full text-[12.5px] font-mono tracking-wide transition-all inline-flex items-center gap-1.5"
              >
                View Pipeline Specs <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7a00]" />
              </a>
            </div>

            {/* Technical Verification Footer */}
            <div className="mt-10 pt-5 border-t border-[#e8e0d5] flex flex-wrap items-center gap-6 text-[10.5px] font-mono text-[#8c827a]">
              <span className="flex items-center gap-1.5 text-[#111] font-semibold">
                <Globe className="w-3.5 h-3.5 text-[#00a843]" />
                190+ Global Edge Nodes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#111] font-semibold">
                <Zap className="w-3.5 h-3.5 text-[#ff7a00]" />
                24ms Edge Latency
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#111] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#111]" />
                REST / JSON Endpoints
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

