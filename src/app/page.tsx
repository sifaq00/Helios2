"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SplashScreen from "@/components/SplashScreen";
import { Terminal, Cpu, Activity, Github, Twitter } from "lucide-react";

// ==========================================
// KOMPONEN INTERAKTIF BACKGROUND (RETRO PARTICLES)
// ==========================================
const InteractiveBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string; color: string }>>([]);

  useEffect(() => {
    // Generate 60 partikel acak dengan warna retro: putih, abu-abu, dan merah tema
    const colors = ['#ffffff', '#888888', '#aaaaaa', '#ff0000'];
    const generatedParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 15 + 15}s`,
      size: `${Math.random() * 4 + 2}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      <style>{`
        @keyframes floatUpRetro {
          0% { transform: translateY(100vh) scale(0.3); opacity: 0; }
          10% { opacity: 0.8; transform: translateY(90vh) scale(0.5); }
          50% { opacity: 0.6; transform: translateY(50vh) scale(1); }
          90% { opacity: 0.2; transform: translateY(10vh) scale(1.2); }
          100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '0',
            boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}40, 0 0 24px ${p.color}20`,
            animation: `floatUpRetro ${p.duration} linear ${p.delay} infinite, flicker ${Math.random() * 2 + 1}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// HALAMAN LANDING UTAMA
// ==========================================
export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasVisited = localStorage.getItem("hasVisitedMailMan");
    
    if (!hasVisited) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("hasVisitedMailMan", "true");
  };

  if (!isMounted) return null;

  return (
    <main className="scanlines min-h-screen bg-black text-white selection:bg-[#ff0000] selection:text-black font-mono relative overflow-hidden">
      
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          {/* Interactive Background Particles diletakkan di belakang konten */}
          <InteractiveBackground />
          
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-24">
            
            {/* Header / Nav minimalis */}
            <nav className="flex items-center justify-between border-b border-[#333] pb-6 mb-16 relative z-20">
              <div className="flex items-center gap-6">
                <div className="text-[#ff0000] font-bold tracking-widest text-xl crt-flicker">MM_SYS</div>
                <div className="hidden md:flex items-center gap-4 border-l border-[#333] pl-6 h-4">
                  <a href="https://x.com/mailmanonx" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff0000] transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="https://github.com/omnicima/mail-man" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff0000] transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <Link 
                href="/terminal" 
                className="border border-[#ff0000] bg-black px-4 py-2 text-xs text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-black uppercase tracking-widest backdrop-blur-sm"
              >
                [ Access Terminal ]
              </Link>
            </nav>

          {/* Hero Section */}
          <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row relative z-20">
            
            {/* Kiri: Teks & CTA */}
            <div className="flex-1 space-y-8 text-left">
              <div>
                <h2 className="text-xs tracking-[0.3em] text-gray-500 mb-2 flex items-center gap-2">
                  <Activity className="h-3 w-3 text-[#ff0000] animate-pulse" />
                  SECURE CRYPTO INTELLIGENCE
                </h2>
                <h1 
                  className="glitch-text text-6xl font-black uppercase tracking-tighter md:text-8xl" 
                  data-text="MAIL MAN"
                >
                  MAIL MAN
                </h1>
              </div>
              
              <p className="max-w-md text-sm leading-relaxed text-gray-400">
                AI-powered crypto intelligence platform. Real-time news aggregation, sentiment analysis, and underground alpha signals. <span className="text-white bg-[#ff0000] px-1 font-bold">Zero noise.</span>
              </p>

              <div className="pt-4">
                <Link 
                  href="/terminal" 
                  className="group relative inline-flex items-center gap-4 border border-[#ff0000] bg-black/80 px-8 py-4 text-sm text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-black shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] backdrop-blur-md"
                >
                  <span className="font-bold tracking-widest">INITIALIZE CONNECTION</span>
                  <Terminal className="h-4 w-4 group-hover:animate-pulse" />
                </Link>
              </div>
            </div>

            {/* Kanan: Frame & Logo Image */}
            <div className="relative flex-1 flex justify-center items-center">
              {/* Efek Glitch Halo Merah di belakang gambar */}
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff0000] shadow-[0_0_50px_rgba(255,0,0,0.4)] animate-pulse mix-blend-screen glitch-anim"></div>
              <div className="absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ff0000] opacity-30 animate-[spin_15s_linear_infinite]"></div>
              
              {/* Kotak Frame Gambar Utama */}
              <div className="relative z-10 h-[420px] w-[320px] bg-[#050505] border border-[#ff0000] flex flex-col items-center justify-end overflow-hidden group shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                
                {/* Efek Dithering overlay di atas gambar agar lebih menyatu dengan tema retro */}
                <div className="absolute inset-0 bg-dither opacity-20 z-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 pointer-events-none"></div>
                
                {/* IMPLEMENTASI LOGO/GAMBAR */}
                <div className="absolute inset-0 z-10">
                  <Image 
                    src="/logo.jpeg" 
                    alt="Mail Man Character Profile" 
                    fill
                    priority
                    className="object-cover object-center grayscale opacity-80 mix-blend-lighten transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>

                {/* Typography bawah sesuai deskripsi */}
                <h3 className="relative z-30 mb-8 text-4xl font-black italic text-white drop-shadow-[3px_0_0_#ff0000] uppercase tracking-tighter">
                  MAIL MAN
                </h3>

                {/* Dekorasi HUD Sudut */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff0000] z-30"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff0000] z-30"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff0000] z-30"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff0000] z-30"></div>
              </div>
            </div>

          </div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3 relative z-20">
            <div className="border border-[#333] bg-black/60 backdrop-blur-sm p-6 transition-colors hover:border-[#ff0000] group">
              <Terminal className="mb-4 h-8 w-8 text-[#ff0000] group-hover:animate-bounce" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase tracking-widest">Terminal Berita</h3>
              <p className="text-xs leading-relaxed text-gray-400">Agregasi berita real-time dari berbagai sumber underground. Bebas noise.</p>
            </div>
            <div className="border border-[#333] bg-black/60 backdrop-blur-sm p-6 transition-colors hover:border-[#ff0000] group">
              <Cpu className="mb-4 h-8 w-8 text-[#ff0000] group-hover:animate-pulse" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase tracking-widest">AI Analysis</h3>
              <p className="text-xs leading-relaxed text-gray-400">Impact Score dan pendeteksi narasi cerdas. Mengetahui arah pasar sebelum yang lain.</p>
            </div>
            <div className="border border-[#333] bg-black/60 backdrop-blur-sm p-6 transition-colors hover:border-[#ff0000] group">
              <Activity className="mb-4 h-8 w-8 text-[#ff0000] group-hover:animate-pulse" />
              <h3 className="mb-2 text-lg font-bold text-white uppercase tracking-widest">Sinyal Alpha</h3>
              <p className="text-xs leading-relaxed text-gray-400">Insight kontekstual untuk trading. Bullish, neutral, bearish dengan persentase akurasi.</p>
            </div>
          </div>

          </div>
        </>
      )}
    </main>
  );
}