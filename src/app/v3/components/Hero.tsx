"use client";
import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const CURVE = [
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

const BELOW = [
  { title: "Real-Time Intel", desc: "Ingest 50 fresh signals every 5m from CoinDesk, CoinTelegraph, Decrypt. Zero noise." },
  { title: "AI Synthesis", desc: "MIMO-V2.5 scores impact 9→5 in 100ms. Bullish/bearish/neutral with fallback." },
  { title: "Global Matrix", desc: "190+ nodes, 99.97% live, 24ms edge. Viral 3h vs 24h, top mentions live." },
];

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.12 });
    tl.from(".v3-hero-title", { y: 36, opacity: 0, duration: 0.7, ease: "power4.out" })
      .from(".v3-hero-sub", { y: 14, opacity: 0, duration: 0.45 }, "-=0.35")
      .from(".v3-hero-cta", { y: 10, opacity: 0, duration: 0.4 }, "-=0.25")
      .from(".v3-curve-wrap", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .from(".v3-below-col", { y: 16, opacity: 0, duration: 0.45, stagger: 0.07 }, "-=0.2");
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

      <style>{`.v3-curve .swiper-slide{transition:transform 0.45s ease} .v3-curve .swiper-slide-active{transform:scale(0.84) !important} .v3-curve .swiper-slide-prev,.v3-curve .swiper-slide-next{transform:scale(0.94) !important} .v3-curve .swiper-slide-prev-prev,.v3-curve .swiper-slide-next-next{transform:scale(1.04) !important}`}</style>
      {/* 3D Circular Coverflow - pakai Swiper library */}
      <div className="v3-curve-wrap relative mt-10 md:mt-12">
        <div className="relative mx-auto max-w-[1500px]">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={6500}
            coverflowEffect={{
              rotate: 32,
              stretch: -14,
              depth: -140,
              modifier: 1.4,
              slideShadows: false,
            }}
            className="!pb-10 !pt-2"
            style={{ paddingBottom: "40px" } as React.CSSProperties}
          >
            {CURVE.map((src, i) => (
              <SwiperSlide
                key={i}
                className="!w-[72px] md:!w-[92px]"
                style={{ height: "260px" } as React.CSSProperties}
              >
                <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#e8e0d5] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-[#FFFBF0] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#FFFBF0] to-transparent z-10" />
        </div>

        <div className="bg-[#FFFBF0] pt-6 pb-8">
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
