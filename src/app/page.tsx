"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SplashScreen from "@/components/SplashScreen";
import { Terminal, Cpu, Activity } from "lucide-react";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check visit history in localStorage
    const hasVisited = localStorage.getItem("hasVisitedMailMan");
    
    if (!hasVisited) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("hasVisitedMailMan", "true");
  };

  // Prevent hydration error in Next.js
  if (!isMounted) return null;

  return (
    <main className="scanlines min-h-screen bg-black text-white selection:bg-[#ff0000] selection:text-black font-mono">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-24">
          
          {/* Header / Nav minimalis */}
          <nav className="flex items-center justify-between border-b border-[#333] pb-6 mb-16">
            <div className="text-[#ff0000] font-bold tracking-widest text-xl crt-flicker">MM_SYS</div>
            <Link 
              href="/terminal" 
              className="border border-[#ff0000] bg-black px-4 py-2 text-xs text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-black uppercase tracking-widest"
            >
              [ Access Terminal ]
            </Link>
          </nav>

          {/* Hero Section */}
          <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row">
            
            {/* Kiri: Teks & CTA */}
            <div className="flex-1 space-y-8 text-left">
              <div>
                <h2 className="text-xs tracking-[0.3em] text-gray-500 mb-2">// SECURE CRYPTO INTELLIGENCE</h2>
                <h1 
                  className="glitch-text text-6xl font-black uppercase tracking-tighter md:text-8xl" 
                  data-text="MAIL MAN"
                >
                  MAIL MAN
                </h1>
              </div>
              
              <p className="max-w-md text-sm leading-relaxed text-gray-400">
                AI-powered crypto intelligence platform. Real-time news aggregation, sentiment analysis, and underground alpha signals. <span className="text-white bg-[#ff0000] px-1">Zero noise.</span>
              </p>

              <div className="pt-4">
                <Link 
                  href="/terminal" 
                  className="group relative inline-flex items-center gap-4 border border-[#ff0000] bg-black px-8 py-4 text-sm text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-black shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                >
                  <span className="font-bold tracking-widest">INITIALIZE CONNECTION</span>
                  <Terminal className="h-4 w-4 group-hover:animate-pulse" />
                </Link>
              </div>
            </div>

            {/* Kanan: Placeholder untuk Pixel Art (sesuai deskripsi prompt Anda) */}
            <div className="relative flex-1 flex justify-center items-center">
              {/* Efek Glitch Halo Merah di belakang gambar */}
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff0000] shadow-[0_0_50px_rgba(255,0,0,0.5)] animate-pulse mix-blend-screen glitch-anim"></div>
              <div className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ff0000] opacity-50 animate-[spin_10s_linear_infinite]"></div>
              
              {/* Kotak Placeholder Gambar */}
              <div className="relative z-10 h-[400px] w-[300px] bg-black border border-[#333] bg-dither flex flex-col items-center justify-end pb-8 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                
                {/* Later, place your <img src="/pixel-art-profile.png" /> tag here.
                  Make sure the image background is transparent to blend with the dithering.
                */}
                <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-[#ff0000] mb-2 crt-flicker">[ INSERT AVATAR HERE ]</div>
                </div>

                {/* Typography bawah sesuai deskripsi */}
                <h3 className="relative z-20 mt-auto text-4xl font-black italic text-white drop-shadow-[2px_0_0_#ff0000] uppercase tracking-tighter">
                  MAIL MAN
                </h3>
              </div>
            </div>

          </div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-[#333] bg-black/50 p-6 transition-colors hover:border-[#ff0000]">
              <Terminal className="mb-4 h-8 w-8 text-[#ff0000]" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase">News Terminal</h3>
              <p className="text-xs leading-relaxed text-gray-400">Real-time news aggregation from various underground sources. Noise-free.</p>
            </div>
            <div className="border border-[#333] bg-black/50 p-6 transition-colors hover:border-[#ff0000]">
              <Cpu className="mb-4 h-8 w-8 text-[#ff0000]" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase">AI Analysis</h3>
              <p className="text-xs leading-relaxed text-gray-400">Smart impact scoring and narrative detection. Know market direction before others.</p>
            </div>
            <div className="border border-[#333] bg-black/50 p-6 transition-colors hover:border-[#ff0000]">
              <Activity className="mb-4 h-8 w-8 text-[#ff0000]" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase">Alpha Signals</h3>
              <p className="text-xs leading-relaxed text-gray-400">Contextual insights for trading. Bullish, neutral, bearish with accuracy percentages.</p>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}