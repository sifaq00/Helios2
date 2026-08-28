"use client";
import { useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(".v3-nav", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".v3-hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.2")
      .from(".v3-hero-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".v3-hero-cta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".v3-curve-item", { y: 60, opacity: 0, duration: 0.7, stagger: 0.04, ease: "power3.out" }, "-=0.4")
      .from(".v3-below-col", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

    gsap.to(".v3-curve", { y: -30, scrollTrigger: { trigger: ".v3-hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".v3-hero-title", { y: -20, scrollTrigger: { trigger: ".v3-hero", start: "top top", end: "bottom 60%", scrub: 1 } });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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

      <div className="v3-curve relative mt-10 md:mt-12">
        <div className="relative mx-auto max-w-[1480px] overflow-visible">
          <div className="flex items-end justify-center gap-2 md:gap-[10px] px-2" style={{ perspective: "1200px" }}>
            {CURVE.map((c, i) => {
              const center = 5;
              const dist = Math.abs(i - center);
              const isSide = dist >= 4;
              const h = isSide ? 280 : 220 - dist * 10;
              const w = isSide ? 110 : i === 5 ? 88 : 76;
              const rotate = (i - center) * 4.5;
              const y = dist * 8;
              return (
                <div
                  key={i}
                  className="v3-curve-item shrink-0 overflow-hidden bg-[#e8e0d5] shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  style={{
                    width: `${w}px`,
                    height: `${h}px`,
                    borderRadius: "18px",
                    transform: `translateY(${y}px) perspective(800px) rotateY(${rotate}deg)`,
                    transformOrigin: i < center ? "right center" : "left center",
                    opacity: 1 - dist * 0.04,
                  }}
                >
                  <img src={c.src} alt="" className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-[#FFFBF0] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#FFFBF0] to-transparent" />
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
