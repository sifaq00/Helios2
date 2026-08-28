"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const CURVE = [
  { src: "/v2/img/hero.webp" },
  { src: "/v2/img/neural-feed.webp" },
  { src: "/v2/img/global-matrix.webp" },
  { src: "/v2/img/alpha-shield.webp" },
  { src: "/v2/img/viral-radar.webp" },
  { src: "/logo.webp" },
  { src: "/v2/img/mascot-about.webp" },
  { src: "/v2/img/neural-feed.webp" },
  { src: "/v2/img/global-matrix.webp" },
  { src: "/v2/img/viral-radar.webp" },
  { src: "/v2/img/hero.webp" },
];

const BELOW = [
  { title: "Real-Time Intel", desc: "Ingest 50 fresh signals every 5m from CoinDesk, CoinTelegraph, Decrypt. Zero noise." },
  { title: "AI Synthesis", desc: "MIMO-V2.5 scores impact 9→5 in 100ms. Bullish/bearish/neutral with fallback." },
  { title: "Global Matrix", desc: "190+ nodes, 99.97% live, 24ms edge. Viral 3h vs 24h, top mentions live." },
];

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance
    const tl = gsap.timeline({ delay: 0.12 });
    tl.from(".v3-hero-title", { y: 36, opacity: 0, duration: 0.7, ease: "power4.out" })
      .from(".v3-hero-sub", { y: 14, opacity: 0, duration: 0.45 }, "-=0.35")
      .from(".v3-hero-cta", { y: 10, opacity: 0, duration: 0.4 }, "-=0.25")
      .from(".v3-curve-item", { y: 50, opacity: 0, duration: 0.6, stagger: 0.035, ease: "power3.out" }, "-=0.35")
      .from(".v3-below-col", { y: 16, opacity: 0, duration: 0.45, stagger: 0.07 }, "-=0.25");

    // Infinity loop - duplicate track
    const track = trackRef.current;
    if (track) {
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: 28,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % totalWidth}px`,
        },
      });
      // Pause on hover
      const wrap = track.parentElement;
      if (wrap) {
        wrap.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
        wrap.addEventListener("mouseleave", () => gsap.globalTimeline.resume());
        // Use specific tween pause
        const tween = gsap.getTweensOf(track)[0];
        wrap.addEventListener("mouseenter", () => tween?.pause());
        wrap.addEventListener("mouseleave", () => tween?.resume());
      }
    }
  }, []);

  // Build doubled array for seamless loop
  const loop = [...CURVE, ...CURVE];

  return (
    <section className="v3-hero relative overflow-hidden bg-[#FFFBF0] pt-10 md:pt-14 pb-0">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h1 className="v3-hero-title leading-[0.92] tracking-tight">
          <span className="block text-[36px] md:text-[52px] font-normal italic" style={{ fontFamily: "Instrument Serif" }}>
            Decode Market Chaos,
          </span>
          <span className="block text-[36px] md:text-[52px] font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>
            Supercharge Your Alpha
          </span>
        </h1>
        <p className="v3-hero-sub mt-4 text-[12.5px] md:text-[13px] leading-relaxed text-[#6b625c] max-w-[460px] mx-auto">
          All-in-one intel to track, synthesize, and execute — faster and smarter. 50 fresh signals, 24ms edge, zero noise.
        </p>
        <Link href="/terminal" className="v3-hero-cta mt-6 inline-flex items-center gap-2 bg-[#111] text-white pl-5 pr-2 py-2 rounded-full text-[13px] font-semibold hover:bg-[#1a1a1a] transition-colors">
          Launch Terminal for Free
          <span className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-[12px]">→</span>
        </Link>
      </div>

      {/* CURVED STRIP - tengah kecil, samping gede 3D, infinity */}
      <div className="relative mt-10 md:mt-12 overflow-hidden">
        <div className="relative mx-auto max-w-[1600px]">
          <div ref={trackRef} className="flex items-end gap-2 md:gap-3 w-max px-2" style={{ perspective: "1000px" }}>
            {loop.map((c, i) => {
              const origIdx = i % CURVE.length;
              const center = 5;
              const dist = Math.abs(origIdx - center);
              // tengah kecil (76px/180h) -> samping gede (112px/300h) 3D
              const isCenter = dist === 0;
              const isNear = dist === 1;
              const h = isCenter ? 176 : isNear ? 200 : dist === 2 ? 236 : dist === 3 ? 268 : 300;
              const w = isCenter ? 72 : isNear ? 80 : dist === 2 ? 92 : dist === 3 ? 102 : 112;
              const rotate = (origIdx - center) * 5.5;
              const y = dist * 10;
              return (
                <div
                  key={i}
                  className="v3-curve-item shrink-0 overflow-hidden bg-[#e8e0d5] shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                  style={{
                    width: `${w}px`,
                    height: `${h}px`,
                    borderRadius: "18px",
                    transform: `translateY(${y}px) perspective(800px) rotateY(${rotate}deg)`,
                    transformOrigin: origIdx < center ? "right center" : "left center",
                  }}
                >
                  <img src={c.src} alt="" className="w-full h-full object-cover" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-[#FFFBF0] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#FFFBF0] to-transparent" />
        </div>

        <div className="bg-[#FFFBF0] pt-10 pb-8">
          <div className="mx-auto max-w-[1060px] px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e0d5]">
            {BELOW.map((f) => (
              <div key={f.title} className="v3-below-col px-0 md:px-8 py-6 md:py-2 text-center">
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "Inter" }}>{f.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
