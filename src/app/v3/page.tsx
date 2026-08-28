"use client";

import { useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CURVE = [
  { src: "/v2/img/hero.webp", label: "HELIOS" },
  { src: "/v2/img/neural-feed.webp", label: "FEED" },
  { src: "/v2/img/global-matrix.webp", label: "MATRIX" },
  { src: "/v2/img/alpha-shield.webp", label: "ALPHA" },
  { src: "/v2/img/viral-radar.webp", label: "VIRAL" },
  { src: "/logo.webp", label: "CORE" },
  { src: "/v2/img/mascot-about.webp", label: "NEURAL" },
  { src: "/v2/img/neural-feed.webp", label: "FEED" },
  { src: "/v2/img/global-matrix.webp", label: "MATRIX" },
  { src: "/v2/img/viral-radar.webp", label: "VIRAL" },
  { src: "/v2/img/hero.webp", label: "HELIOS" },
];

export default function LandingV3() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    // Hero entrance
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(".v3-nav", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".v3-hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.2")
      .from(".v3-hero-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".v3-hero-cta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(".v3-curve-item", { y: 60, opacity: 0, duration: 0.7, stagger: 0.04, ease: "power3.out" }, "-=0.4")
      .from(".v3-below-col", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

    // Parallax for curve on scroll
    gsap.to(".v3-curve", {
      y: -30,
      scrollTrigger: { trigger: ".v3-hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".v3-hero-title", {
      y: -20,
      scrollTrigger: { trigger: ".v3-hero", start: "top top", end: "bottom 60%", scrub: 1 },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#111] selection:bg-[#ff7a00]/20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600;700;900&display=swap');`}</style>

      {/* NAV - persis Flowblox: left Services Features Blog Services / center Flowblox / right About Pricing Contact Get started */}
      <nav className="v3-nav sticky top-0 z-50 bg-[#FFFBF0]/85 backdrop-blur-md border-b border-[#e8e0d5]">
        <div className="mx-auto max-w-[1280px] px-6 py-3.5 flex items-center justify-between">
          {/* Left - 4 links like Services Features Blog Services */}
          <div className="hidden md:flex items-center gap-5 text-[12px] font-medium text-[#1a1a1a]">
            <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
            <a href="/terminal" className="hover:opacity-60 transition-opacity">Terminal</a>
            <a href="#system" className="hover:opacity-60 transition-opacity">System</a>
            <a href="#docs" className="hover:opacity-60 transition-opacity">Docs</a>
          </div>
          {/* Center - HELIOS like Flowblox */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="font-black tracking-[0.18em] text-[15px]" style={{ fontFamily: "Inter" }}>HELIOS</span>
            <span className="hidden md:inline text-[10px] tracking-[0.2em] text-[#ff7a00] border border-[#ff7a00]/30 px-2 py-0.5 rounded-full">v4.21.0</span>
          </Link>
          {/* Right - About Pricing Contact Get started */}
          <div className="hidden md:flex items-center gap-5 text-[12px] font-medium">
            <a href="#about" className="text-[#1a1a1a] hover:opacity-60">About</a>
            <a href="#pricing" className="text-[#1a1a1a] hover:opacity-60">Pricing</a>
            <a href="/terminal" className="text-[#1a1a1a] hover:opacity-60">Contact</a>
            <Link href="/terminal" className="bg-[#111] text-white px-4 py-2 rounded-full text-[12px] font-semibold inline-flex items-center gap-1.5 hover:bg-[#222] transition-colors">
              Launch Terminal <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-[11px] leading-none">→</span>
            </Link>
          </div>
          <Link href="/terminal" className="md:hidden bg-[#111] text-white px-4 py-2 rounded-full text-xs font-semibold">Launch</Link>
        </div>
      </nav>

      {/* HERO - persis Flowblox layout */}
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

        {/* CURVED STRIP - persis Flowblox: 11 images in arc with perspective */}
        <div className="v3-curve relative mt-10 md:mt-12">
          <div className="relative mx-auto max-w-[1480px] overflow-visible">
            <div className="flex items-end justify-center gap-2 md:gap-[10px] px-2" style={{ perspective: "1200px" }}>
              {CURVE.map((c, i) => {
                const center = 5;
                const dist = Math.abs(i - center);
                // Flowblox curve: sides taller, middle shorter, with rotateY for 3D
                const isSide = dist >= 4;
                const h = isSide ? 280 : 220 - dist * 10;
                const w = isSide ? 110 : i === 5 ? 88 : 76;
                const rotate = (i - center) * 4.5; // -22 to 22 deg
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
                    <img src={c.src} alt={c.label} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
            {/* soft fade on sides like Flowblox */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-[#FFFBF0] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#FFFBF0] to-transparent" />
          </div>

          {/* 3 columns below curve - persis Flowblox with dividers */}
          <div className="bg-[#FFFBF0] pt-10 pb-8">
            <div className="mx-auto max-w-[1060px] px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e0d5]">
              <div className="v3-below-col px-0 md:px-8 py-6 md:py-2 text-center">
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "Inter" }}>Real-Time Intel</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto">Ingest 50 fresh signals every 5m from CoinDesk, CoinTelegraph, Decrypt. Zero noise.</p>
              </div>
              <div className="v3-below-col px-0 md:px-8 py-6 md:py-2 text-center">
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "Inter" }}>AI Synthesis</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto">MIMO-V2.5 scores impact 9→5 in 100ms. Bullish/bearish/neutral with fallback.</p>
              </div>
              <div className="v3-below-col px-0 md:px-8 py-6 md:py-2 text-center">
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "Inter" }}>Global Matrix</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto">190+ nodes, 99.97% live, 24ms edge. Viral 3h vs 24h, top mentions live.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep existing sections below - will continue next */}
      <section id="features" className="bg-[#F7EFE6] py-14">
        <div className="mx-auto max-w-[1060px] px-6 text-center">
          <p className="text-[11px] tracking-[0.35em] text-[#9a8e85]">HELIOS v4.21.0-MM • HERO DONE — NEXT SECTIONS KEEP V3 EXISTING</p>
        </div>
      </section>
    </div>
  );
}
