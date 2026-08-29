"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowRight, Activity, Cpu, Radio } from "lucide-react";
import "swiper/css";

const SEVEN_HERO_IMAGES = [
  "/v3/hero/1.webp",
  "/v3/hero/2.webp",
  "/v3/hero/3.webp",
  "/v3/hero/4.webp",
  "/v3/hero/5.webp",
  "/v3/hero/6.webp",
  "/v3/hero/7.webp",
];

// Repeat 8 times (56 slides) for infinite, seamless circular loop
const CURVE = Array.from({ length: 8 }, () => SEVEN_HERO_IMAGES).flat();

const BELOW = [
  { icon: Activity, title: "Neural Feed • 50", desc: "Real-time RSS (CoinDesk/CT/Decrypt) + Supabase cache. 50 freshest, scored impact 9→5." },
  { icon: Cpu, title: "MIMO-V2.5 • 24ms", desc: "800-token synthesis, temp 0.75, OpenRouter fallback. Bullish/bearish/neutral." },
  { icon: Radio, title: "Viral Radar • 190+", desc: "Anomaly 3h vs 24h, 99.97% uptime, global mesh. Live uplink." },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<any>(null);
  const baseTranslate = useRef<number | null>(null);
  const startScrollY = useRef(0);
  const scrollStopTimer = useRef<NodeJS.Timeout | null>(null);
  const rafPending = useRef(false);
  const isHeroVisible = useRef(true);

  useEffect(() => {
    setMounted(true);

    const el = sectionRef.current;
    if (el && typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        ([entry]) => {
          isHeroVisible.current = entry.isIntersecting;
          if (swiperRef.current && swiperRef.current.swiper) {
            const sw = swiperRef.current.swiper;
            if (!entry.isIntersecting) {
              if (sw.autoplay && sw.autoplay.running) {
                sw.autoplay.stop();
              }
              if (scrollStopTimer.current) {
                clearTimeout(scrollStopTimer.current);
              }
            } else if (window.scrollY < 200) {
              if (sw.autoplay && !sw.autoplay.running) {
                sw.autoplay.start();
              }
            }
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;

      requestAnimationFrame(() => {
        rafPending.current = false;
        const scrollY = window.scrollY;

        // If user already scrolled past Hero, freeze all operations
        if (!isHeroVisible.current || scrollY > 650) {
          if (swiperRef.current && swiperRef.current.swiper) {
            const sw = swiperRef.current.swiper;
            if (sw.autoplay && sw.autoplay.running) {
              sw.autoplay.stop();
            }
          }
          if (scrollStopTimer.current) {
            clearTimeout(scrollStopTimer.current);
          }
          return;
        }

        if (swiperRef.current && swiperRef.current.swiper) {
          const swiper = swiperRef.current.swiper;
          
          // Pause autoplay while actively scrolling
          if (swiper.autoplay && swiper.autoplay.running) {
            swiper.autoplay.stop();
          }

          // Anchor base translate to current live slider coordinate when scrolling starts
          if (baseTranslate.current === null) {
            baseTranslate.current = swiper.getTranslate();
            startScrollY.current = scrollY;
          }

          // Continuous analog translation: Pure fluid glide without discrete stepped jumps
          const currentBase = baseTranslate.current ?? swiper.getTranslate();
          const scrollDelta = scrollY - startScrollY.current;
          const newTranslate = currentBase - scrollDelta * 0.85;
          
          swiper.setTranslate(newTranslate);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();

          // Auto-resume autoplay ONLY if user is still viewing Hero section at top
          if (scrollStopTimer.current) {
            clearTimeout(scrollStopTimer.current);
          }
          scrollStopTimer.current = setTimeout(() => {
            if (isHeroVisible.current && window.scrollY < 350 && swiperRef.current && swiperRef.current.swiper) {
              const sw = swiperRef.current.swiper;
              // Smoothly align to nearest card center before resuming
              sw.slideTo(sw.activeIndex, 400);
              setTimeout(() => {
                if (isHeroVisible.current && window.scrollY < 350 && sw.autoplay && !sw.autoplay.running) {
                  sw.autoplay.start();
                }
              }, 450);
              baseTranslate.current = null;
            }
          }, 1200);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="v3-hero relative overflow-visible bg-[#FFFBF0] pt-20 md:pt-24 pb-0">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <div className="mx-auto max-w-[760px]">
          <p className="v3-hero-kicker v3-anim-kicker mb-3 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#ff3b30] font-mono">
            <span className="h-1.5 w-1.5 bg-[#ff3b30] animate-pulse rounded-full" /> HELIOS // INTELLIGENCE MATRIX
          </p>
          <h1 className="v3-hero-title v3-anim-title leading-[0.88] tracking-tight">
            <span className="block text-[36px] md:text-[52px] font-normal italic" style={{ fontFamily: "Instrument Serif", letterSpacing: "-0.02em" }}>
              Autonomous Neural System,
            </span>
            <span className="block text-[36px] md:text-[52px] font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.04em" }}>
              Mapping Market Uncertainty
            </span>
          </h1>
          <p className="v3-hero-sub v3-anim-sub mt-4 text-[12.5px] md:text-[13px] leading-relaxed text-[#6b625c] max-w-[520px] mx-auto">
            Quantifying crypto-driven structural dynamics. Ingests millions of data points daily → <span className="text-[#111] font-semibold">50 freshest</span> via MIMO-V2.5 + OpenRouter, 190+ nodes, 24ms edge. Zero noise, pure signal.
          </p>
          <div className="v3-hero-cta v3-anim-cta mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/terminal" className="inline-flex items-center gap-2 bg-[#111] text-white pl-5 pr-2 py-2 rounded-full text-[13px] font-semibold hover:bg-[#1a1a1a] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFBF0]">
              Launch Terminal for Free
              <span className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <a href="#pipeline" className="text-[12px] font-medium tracking-[0.02em] text-[#1a1a1a] hover:text-[#111] underline underline-offset-4 decoration-[#111]/20 hover:decoration-[#111]/40 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111] rounded-sm px-1">View Pipeline →</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes v3-fade-up {
          0% { opacity: 0; transform: translate3d(0, 16px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes v3-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .v3-anim-kicker { animation: v3-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
        .v3-anim-title { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        .v3-anim-sub { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
        .v3-anim-cta { animation: v3-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both; }
        .v3-anim-stream { animation: v3-fade-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both; }

        .v3-curve.swiper{overflow:hidden !important; width:100%}
        .v3-curve .swiper-wrapper{align-items:center; will-change:transform}
        .v3-curve .swiper-slide{display:flex; align-items:center; justify-content:center}
        .v3-curve .swiper-slide .slide-inner{transition:transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; transform:scale(0.85); opacity:0.55; border:1px solid #e8e0d5; border-radius:14px; background:#fff; overflow:hidden}
        .v3-curve .swiper-slide-active .slide-inner{transform:scale(1.10); opacity:1; border-color:#ff7a00; box-shadow:0 10px 30px rgba(255,122,0,0.18), 0 4px 14px rgba(0,0,0,0.08)}
        .v3-curve .swiper-slide-prev .slide-inner, .v3-curve .swiper-slide-next .slide-inner{transform:scale(0.94); opacity:0.85; border-color:#d8cfc4}
        @media (prefers-reduced-motion: reduce) {
          .v3-anim-kicker, .v3-anim-title, .v3-anim-sub, .v3-anim-cta, .v3-anim-stream { animation: none !important; }
          .v3-curve .swiper-slide .slide-inner{transition:none}
        }
      `}</style>
      {/* Full width edge-to-edge stream */}
      <div className="v3-curve-wrap v3-anim-stream relative mt-8 md:mt-10 w-full overflow-hidden min-h-[340px]">
        <div className="relative w-full overflow-hidden">
          {mounted && (
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              centeredSlides
              loop={true}
              initialSlide={14}
              loopAdditionalSlides={14}
              slidesPerView={7}
              spaceBetween={14}
              breakpoints={{
                0: { slidesPerView: 3, spaceBetween: 10 },
                640: { slidesPerView: 5, spaceBetween: 12 },
                1024: { slidesPerView: 7, spaceBetween: 14 },
                1440: { slidesPerView: 7.5, spaceBetween: 16 },
              }}
              autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: false }}
              speed={600}
              allowTouchMove={true}
              simulateTouch={false}
              resistanceRatio={0}
              touchReleaseOnEdges={true}
              observer={true}
              observeParents={true}
              watchSlidesProgress={true}
              className="v3-curve !pb-10 !pt-6 w-full"
              style={{ paddingTop:"18px", paddingBottom:"40px" } as React.CSSProperties}
            >
              {CURVE.map((src, i) => {
                const frame = String((i % 7) + 1).padStart(2, "0");
                return (
                  <SwiperSlide
                    key={`${src}-${i}`}
                    className="!h-[320px] flex items-start justify-center pt-1"
                    style={{ height: "320px" } as React.CSSProperties}
                  >
                    <div className="slide-inner w-full h-[280px] flex flex-col overflow-hidden -translate-y-8">
                      <div className="flex items-center justify-between px-2 py-1 bg-[#111] text-white text-[7px] font-mono tracking-[0.14em] shrink-0">
                        <span>CURVE {frame} / 07</span><span className="text-white/60">HELIOS</span>
                      </div>
                      <img src={src} alt={`Helios curve ${frame} of 7`} className="w-full flex-1 object-cover" draggable={false} loading="eager" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-[#FFFBF0] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-[#FFFBF0] to-transparent z-10" />
        </div>

        <div className="bg-[#FFFBF0] pt-6 pb-8">
          <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8e0d5]">
            {BELOW.map((f, idx) => (
              <div key={f.title} className="v3-below-col px-0 md:px-8 py-6 md:py-3 text-center flex flex-col items-center">
                <span className="text-[8px] font-mono tracking-[0.18em] text-[#8c827a] mb-1.5">0{idx + 1} — {idx === 0 ? "FEED" : idx === 1 ? "SYNTHESIS" : "RADAR"}</span>
                <span className="w-7 h-7 rounded-full border border-[#e8e0d5] bg-white flex items-center justify-center mb-2 shadow-sm">
                  <f.icon className="w-3.5 h-3.5 text-[#111]" />
                </span>
                <h3 className="font-bold text-[13px]" style={{ fontFamily: "Inter" }}>{f.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#6b625c] max-w-[280px] mx-auto">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
