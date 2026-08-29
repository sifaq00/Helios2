"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeTicker from "./components/MarqueeTicker";
import Features from "./components/Features";
import Architecture from "./components/Architecture";
import Proven from "./components/Proven";
import Faq from "./components/Faq";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";

export default function LandingV3() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Optimize ScrollTrigger performance on modern and low-end hardware
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 30,
      ignoreMobileResize: true,
    });

    // Disable lag smoothing for instant 1:1 hardware glide without frame drops
    gsap.ticker.lagSmoothing(0);

    // Initialize smooth scroll via Lenis with isolated RAF loop
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Global smooth anchor click handler via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href === "#" || href === "#top") {
        e.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -7 * t)),
        });
      } else if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, {
            offset: -75,
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -7 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let reqId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    });

    // GSAP Scroll-Driven Parallax Engine (Horizontal image glides & multi-plane depth)
    const ctx = gsap.context(() => {
      // 1. Hero Section: Headline subtle float
      gsap.to(".v3-hero-title", {
        y: -30,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".v3-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      // 2. Features Cards: Responsive Parallax (Horizontal convergence on desktop, vertical on mobile)
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          gsap.fromTo(
            "#features .v3-col-left",
            { x: -30, opacity: 0.90 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: "#features",
                start: "top 88%",
                end: "center 55%",
                scrub: 0.45,
              },
            }
          );

          gsap.fromTo(
            "#features .v3-col-right",
            { x: 30, opacity: 0.90 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: "#features",
                start: "top 88%",
                end: "center 55%",
                scrub: 0.45,
              },
            }
          );
        },
        "(max-width: 767px)": function () {
          gsap.fromTo(
            "#features .feat-card",
            { y: 20, opacity: 0.88 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              force3D: true,
              stagger: 0.08,
              scrollTrigger: {
                trigger: "#features",
                start: "top 92%",
                end: "bottom 80%",
                scrub: 0.4,
              },
            }
          );
        },
      });

      // 3. Proven in Production: Inner Card Parallax Glide (Symmetric Grid with zero vertical offset)
      gsap.utils.toArray<HTMLElement>("#proven .v3-parallax-img").forEach((img, idx) => {
        const direction = idx % 2 === 0 ? -1 : 1;
        const cardParent = img.closest(".v3-card-item") || img;
        gsap.fromTo(
          img,
          { xPercent: direction * 5, yPercent: -6, scale: 1.20 },
          {
            xPercent: direction * -5,
            yPercent: 6,
            scale: 1.26,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: cardParent,
              start: "top 95%",
              end: "bottom 15%",
              scrub: 0.4,
            },
          }
        );
      });

      // 5. CTA Banner Archer: Instant Real-time Horizontal Glide on Card Entrance
      const ctaArcher = document.querySelector(".v3-cta-archer");
      if (ctaArcher) {
        const ctaCard = ctaArcher.closest(".v3-section-reveal") || ctaArcher.closest("section") || ctaArcher;
        gsap.fromTo(
          ctaArcher,
          { x: 50, scale: 0.98 },
          {
            x: -25,
            scale: 1.04,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: ctaCard,
              start: "top 96%",
              end: "bottom 15%",
              scrub: 0.4,
            },
          }
        );
      }

      // 6. Section Titles smooth entrance
      gsap.utils.toArray<HTMLElement>(".v3-section-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.85, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Refresh ScrollTrigger after DOM layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(reqId);
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#111] selection:bg-[#ff7a00]/20 antialiased overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;900&display=swap');
        html {
          scroll-behavior: auto !important;
        }
        .feat-card, .v3-parallax-img, .v3-cta-archer, .v3-hero-title {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Features />
      <Architecture />
      <Proven />
      <Faq />
      <CtaBanner />
      <Footer />
    </div>
  );
}

