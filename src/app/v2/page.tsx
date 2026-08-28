"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { Terminal, Cpu, Activity, Globe, Shield, Zap, ChevronDown, ArrowRight, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Terminal, title: "Neural Feed", desc: "Real-time news aggregation from underground sources. Zero noise, pure signal.", tag: "DATA_INGEST", stat: "2M+" },
  { icon: Cpu, title: "AI Analysis", desc: "Impact scoring and narrative detection. Know market direction before others.", tag: "NEURAL_INF", stat: "100ms" },
  { icon: Globe, title: "Global Matrix", desc: "Cross-market intelligence. Track narratives across 190+ countries simultaneously.", tag: "GLOBAL_MESH", stat: "190+" },
  { icon: Shield, title: "Alpha Shield", desc: "Contextual trading insights. Bullish, neutral, bearish with accuracy percentages.", tag: "RISK_CTRL", stat: "94%" },
  { icon: Activity, title: "Viral Radar", desc: "Anomaly detection on viral trends. Catch momentum shifts in real-time.", tag: "ANOMALY_DET", stat: "24/7" },
  { icon: Zap, title: "Flash Signals", desc: "Instant alerts when market conditions trigger your custom protocols.", tag: "ALERT_SYS", stat: "<1s" },
];

const TECH_STACK = [
  { label: "Kernel", val: "v2.0.0-HELIOS" },
  { label: "Neural", val: "MIMO-V2-FLASH" },
  { label: "Latency", val: "24ms NOMINAL" },
  { label: "Uptime", val: "99.97% LIVE" },
  { label: "Region", val: "GLOBAL_MESH" },
  { label: "Thread", val: "X-64_PARALLEL" },
];

const RINGS = [
  { size: 500, speed: 30, opacity: 0.2, direction: 1 },
  { size: 420, speed: 20, opacity: 0.1, direction: -1 },
  { size: 340, speed: 40, opacity: 0.05, direction: 1 },
  { size: 260, speed: 25, opacity: 0.03, direction: -1 },
];

function TextScramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let frame = 0;
    const interval = setInterval(() => {
      el.textContent = text
        .split("")
        .map((c, i) => (i < frame ? c : chars[Math.floor(Math.random() * chars.length)]))
        .join("");
      frame += 1 / 2;
      if (frame > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span ref={ref} className={className}>{text}</span>;
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const num = parseInt(target.replace(/[^0-9]/g, ""));
        if (isNaN(num)) { setDisplay(target); return; }
        let start = 0;
        const step = Math.ceil(num / 40);
        const interval = setInterval(() => {
          start += step;
          if (start >= num) { setDisplay(target); clearInterval(interval); }
          else setDisplay(`${start}${suffix}`);
        }, 30);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);

  return <div ref={ref} className="text-4xl lg:text-6xl font-black text-[#ff7a00]" style={{ fontFamily: "'Olive 101', monospace" }}>{display}</div>;
}

function FeatureCard({ f, index }: { f: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width * 10;
    const y = (e.clientY - r.top - r.height / 2) / r.height * 10;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  };

  return (
    <div
      ref={ref}
      className="group border border-white/5 bg-white/[0.02] p-8 hover:border-[#ff7a00]/30 transition-all duration-300 relative overflow-hidden"
      style={{ animationDelay: `${index * 120}ms` }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)"; }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${hovered ? "from-[#ff7a00]/10 to-[#ff7a00]/2" : "from-transparent to-transparent"} transition-all duration-500`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <f.icon className="w-8 h-8 text-[#ff7a00]" />
            {hovered && <div className="absolute -inset-2 bg-[#ff7a00]/10 rounded-full blur-md" />}
          </div>
          <div className="text-right">
            <div className="text-[#ff7a00] text-xl font-black" style={{ fontFamily: "'Olive 101', monospace" }}>{f.stat}</div>
            <span className="text-[7px] text-gray-600 tracking-[0.3em]">{f.tag}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold tracking-widest mb-3 uppercase" style={{ fontFamily: "'Olive 101', monospace" }}>{f.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
        <div className={`mt-4 flex items-center gap-2 text-[#ff7a00] text-xs opacity-0 ${hovered ? "opacity-100" : ""} transition-opacity duration-300`}>
          <span className="tracking-widest">EXPLORE</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#ff7a00] to-transparent transition-all duration-700" style={{ width: hovered ? "100%" : "0%" }} />
      <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-30 transition-opacity">
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#ff7a00]" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
    if (cursorDotRef.current) gsap.to(cursorDotRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 2 });
    lenis.on("scroll", () => setScrollY(lenis.scroll));
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Hero
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(".hero-tag", { opacity: 0, x: -30, duration: 0.6 })
      .from(".hero-title", { opacity: 0, y: 80, skewX: -3, duration: 1, ease: "power4.out" }, "-=0.3")
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.5 }, "-=0.5")
      .from(".hero-cta", { opacity: 0, y: 15, duration: 0.4, stagger: 0.1 }, "-=0.3")
      .from(".hero-vis", { opacity: 0, scale: 0.7, rotate: -5, duration: 1.2, ease: "power3.out" }, "-=0.9")
      .from(".hud-corner", { opacity: 0, scale: 0, duration: 0.3, stagger: 0.05 }, "-=0.6");

    // Magnetic
    document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.05, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }));
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3 });
      });
    });

    // Cursor text change
    document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => setCursorText(el.dataset.cursor || ""));
      el.addEventListener("mouseleave", () => setCursorText(""));
    });

    const title = document.querySelector(".glitch-title");
    const gi = title ? setInterval(() => {
      if (Math.random() > 0.92) {
        gsap.to(title, { skewX: gsap.utils.random(-3, 3), x: gsap.utils.random(-2, 2), duration: 0.05, onComplete: () => gsap.set(title, { skewX: 0, x: 0 }) });
      }
    }, 100) : null;

    return () => { window.removeEventListener("mousemove", handleMouseMove); lenis.destroy(); if (gi) clearInterval(gi); };
  }, [handleMouseMove]);

  if (!mounted) return null;

  return (
    <div className="relative">
      <style>{`
        @keyframes particle-float{0%{transform:translateY(100vh);opacity:0}10%{opacity:.3}90%{opacity:.05}100%{transform:translateY(-10vh);opacity:0}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.3}50%{transform:scale(1.5);opacity:0}100%{transform:scale(1);opacity:0}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
        .grid-bg{background-image:linear-gradient(rgba(255,122,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,122,0,.04) 1px,transparent 1px);background-size:60px 60px}
        .text-gradient{background:linear-gradient(135deg,#ff7a00,#ff9500,#ffb347);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[#ff7a00]/60 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-all duration-300" style={{ transform: cursorText ? "scale(2)" : "scale(1)" }}>
        {cursorText && <span className="text-[8px] text-[#ff7a00] font-bold tracking-wider whitespace-nowrap">{cursorText}</span>}
      </div>
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#ff7a00] pointer-events-none z-[9999]" />

      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,122,0,.06)_0%,transparent_50%)]" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)" }} />
      </div>

      {/* Particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="absolute" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 1}px`, height: `${Math.random() * 4 + 1}px`, backgroundColor: i % 4 === 0 ? "#ff7a00" : "#444", opacity: Math.random() * 0.4 + 0.05, animation: `particle-float ${Math.random() * 25 + 15}s linear infinite`, animationDelay: `${Math.random() * -25}s` }} />
        ))}
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-[#ff7a00] flex items-center justify-center relative">
              <span className="text-[#ff7a00] text-sm font-black" style={{ fontFamily: "'Olive 101', monospace" }}>H</span>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ff7a00] rounded-full animate-pulse" />
            </div>
            <span className="text-[#ff7a00] font-black tracking-[0.35em] text-base" style={{ fontFamily: "'Olive 101', monospace" }}>HELIOS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] text-gray-500 tracking-[0.25em]">
            <a href="#features" data-cursor="VIEW" className="hover:text-[#ff7a00] transition-colors">FEATURES</a>
            <a href="#tech" data-cursor="SPEC" className="hover:text-[#ff7a00] transition-colors">TECH</a>
            <a href="#stats" data-cursor="DATA" className="hover:text-[#ff7a00] transition-colors">SPECS</a>
            <a href="#access" data-cursor="ENTER" className="hover:text-[#ff7a00] transition-colors">ACCESS</a>
          </div>
          <a href="/terminal" data-cursor="LAUNCH" className="magnetic border border-[#ff7a00] px-6 py-2.5 text-[11px] text-[#ff7a00] tracking-[0.25em] font-bold hover:bg-[#ff7a00] hover:text-black transition-all">LAUNCH</a>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full pt-24 pb-16">
          <div>
            <div className="hero-tag text-[10px] text-[#ff7a00] tracking-[0.6em] mb-8 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-[#ff7a00] to-transparent" />
              <TextScramble text="SECURE INTELLIGENCE SYSTEM" className="opacity-100" />
            </div>
            <h1 className="hero-title leading-[0.85]" style={{ fontFamily: "'Olive 101', monospace" }}>
              <span className="text-white block text-7xl lg:text-[130px] font-black glitch-title relative">
                HELIOS
                <span className="absolute inset-0 text-[#ff7a00]/10 blur-sm" aria-hidden>HELIOS</span>
              </span>
              <span className="text-gradient block text-3xl lg:text-6xl mt-3 tracking-[0.4em] font-black">NEURAL NETWORK</span>
            </h1>
            <p className="hero-sub text-gray-400 mt-8 max-w-lg text-sm leading-relaxed" style={{ fontFamily: "'Olive 101', monospace" }}>
              AI-powered crypto intelligence platform. Real-time news aggregation, sentiment analysis, and underground alpha signals. <span className="text-[#ff7a00] font-bold">Zero noise.</span>
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="/terminal" data-cursor="GO" className="hero-cta magnetic group relative inline-flex items-center gap-4 border-2 border-[#ff7a00] px-10 py-5 text-sm text-[#ff7a00] tracking-[0.25em] font-bold hover:bg-[#ff7a00] hover:text-black transition-all duration-300 overflow-hidden">
                <span className="relative z-10">INITIALIZE</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-[#ff7a00]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a href="#features" className="hero-cta magnetic border border-white/10 px-10 py-5 text-sm text-gray-400 tracking-[0.25em] hover:border-[#ff7a00]/40 hover:text-[#ff7a00] transition-all">EXPLORE</a>
            </div>
            {/* Mini stats */}
            <div className="flex gap-8 mt-10 text-[10px] text-gray-600 tracking-widest">
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse" /> LIVE INTEL</div>
              <div>|</div>
              <div>190+ COUNTRIES</div>
              <div>|</div>
              <div>99.97% UPTIME</div>
            </div>
          </div>

          <div className="hero-vis relative flex justify-center" style={{ transform: `translateY(${scrollY * -0.15}px)` }}>
            {RINGS.map((ring, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff7a00]" style={{ width: ring.size, height: ring.size, opacity: ring.opacity, animation: `spin ${ring.speed}s linear infinite${ring.direction < 0 ? " reverse" : ""}` }} />
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ff7a00]/8 rounded-full blur-[100px] animate-pulse" />
            <div className="relative z-10 w-80 h-80 border border-[#ff7a00]/25 bg-black/60 backdrop-blur-xl overflow-hidden group hover:border-[#ff7a00]/60 transition-all duration-700">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,.1)_0%,transparent_60%)]" />
              {/* Logo */}
              <Image src="/logo.webp" alt="HELIOS" fill className="object-cover opacity-80 mix-blend-lighten group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              {/* Scanline */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute w-full h-[2px] bg-[#ff7a00]/30" style={{ animation: "scanline 4s linear infinite" }} />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <span className="text-[#ff7a00] text-sm tracking-[0.6em] font-black drop-shadow-lg" style={{ fontFamily: "'Olive 101', monospace" }}>LIVE NOW</span>
                <div className="flex gap-1 justify-center mt-2">
                  {[0,1,2,3,4].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#ff7a00] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>
              {/* HUD */}
              {["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"].map((p, i) => (
                <div key={i} className={`hud-corner absolute ${p} w-5 h-5 border-[#ff7a00]/50`} />
              ))}
              <div className="absolute top-3 right-3 flex gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
              </div>
            </div>
            {/* Pulsing outer ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#ff7a00]/10" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#ff7a00]/30" />
          <span className="text-[8px] tracking-[0.4em]">SCROLL</span>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <div className="relative py-6 border-y border-white/5 overflow-hidden z-10">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[10px] text-gray-700 tracking-[0.5em] mx-8" style={{ fontFamily: "'Olive 101', monospace" }}>
              NEURAL_FEED ✦ AI_ANALYSIS ✦ GLOBAL_MATRIX ✦ ALPHA_SIGNALS ✦ VIRAL_RADAR ✦ FLASH_ALERTS ✦
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ FEATURES ═══════ */}
      <div id="features" className="relative py-32 z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 text-[10px] text-[#ff7a00] tracking-[0.5em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>// SYSTEM CAPABILITIES</span>
              <Sparkles className="w-3 h-3" />
            </div>
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight" style={{ fontFamily: "'Olive 101', monospace" }}>
              CORE <span className="text-gradient">MODULES</span>
            </h2>
            <p className="text-gray-500 mt-4 text-sm max-w-md mx-auto">Six neural subsystems powering real-time intelligence extraction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} index={i} />)}
          </div>
        </div>
      </div>

      {/* ═══════ TECH STACK ═══════ */}
      <div id="tech" className="relative py-24 z-10 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] text-[#ff7a00] tracking-[0.5em]">// TECHNICAL SPECIFICATIONS</span>
            <h2 className="text-3xl lg:text-5xl font-black mt-4 tracking-tight" style={{ fontFamily: "'Olive 101', monospace" }}>
              SYSTEM <span className="text-gradient">CORE</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_STACK.map((t, i) => (
              <div key={i} className="border border-white/5 bg-white/[0.02] p-5 text-center hover:border-[#ff7a00]/20 transition-all group">
                <div className="text-[9px] text-gray-600 mb-2 tracking-[0.2em] uppercase group-hover:text-[#ff7a00] transition-colors">{t.label}</div>
                <div className="text-xs font-black text-white tracking-wider" style={{ fontFamily: "'Olive 101', monospace" }}>{t.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ STATS ═══════ */}
      <div id="stats" className="relative py-32 z-10">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { target: "190", suffix: "+", label: "Countries Tracked" },
            { target: "24", suffix: "ms", label: "Avg Latency" },
            { target: "99.97", suffix: "%", label: "Uptime" },
            { target: "24", suffix: "/7", label: "Live Feed" },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <AnimatedCounter target={s.target} suffix={s.suffix} />
              <div className="text-[10px] text-gray-500 tracking-[0.3em] mt-3 uppercase group-hover:text-[#ff7a00] transition-colors">{s.label}</div>
              <div className="w-8 h-[2px] bg-[#ff7a00]/20 mx-auto mt-3 group-hover:w-16 group-hover:bg-[#ff7a00] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ CTA ═══════ */}
      <div id="access" className="relative py-32 z-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-[#ff7a00] tracking-[0.5em] mb-6">
            <div className="w-2 h-2 bg-[#ff7a00] rounded-full animate-pulse" />
            // ACCESS GRANTED
          </div>
          <h2 className="text-5xl lg:text-8xl font-black tracking-tight leading-[0.9]" style={{ fontFamily: "'Olive 101', monospace" }}>
            ENTER THE<br /><span className="text-gradient">MATRIX</span>
          </h2>
          <p className="text-gray-500 mt-8 text-sm max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'Olive 101', monospace" }}>
            Full access to real-time intelligence, AI analysis, and underground alpha signals.
          </p>
          <div className="mt-12">
            <a href="/terminal" data-cursor="GO" className="magnetic inline-flex items-center gap-4 border-2 border-[#ff7a00] px-14 py-6 text-sm text-[#ff7a00] tracking-[0.3em] font-bold hover:bg-[#ff7a00] hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(255,122,0,.15)] hover:shadow-[0_0_60px_rgba(255,122,0,.5)]">
              <Terminal className="w-5 h-5" />
              LAUNCH TERMINAL
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 z-10 relative">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#ff7a00]/50 flex items-center justify-center"><span className="text-[#ff7a00] text-[8px] font-bold">H</span></div>
            <span className="text-gray-600 text-[10px] tracking-[0.3em]" style={{ fontFamily: "'Olive 101', monospace" }}>HELIOS SYS v2.0</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-gray-600 tracking-[0.2em]">
            <span>© {new Date().getFullYear()} HELIOS</span>
            <span className="text-gray-700">•</span>
            <span>BUILD {new Date().toISOString().split("T")[0]}</span>
            <span className="text-gray-700">•</span>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-[#ff7a00] rounded-full animate-pulse" /> ONLINE</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
