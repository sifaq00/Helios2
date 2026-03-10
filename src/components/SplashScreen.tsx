"use client";

import { useEffect, useState } from "react";

// ==========================================
// KOMPONEN INTERAKTIF BACKGROUND (RETRO PARTICLES)
// ==========================================
const InteractiveBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string; color: string }>>([]);

  useEffect(() => {
    // Generate 40 partikel acak dengan warna retro: putih, abu-abu, dan merah tema
    const colors = ['#ffffff', '#888888', '#aaaaaa', '#ff0000'];
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
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

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [text, setText] = useState("");
  
  // Simulated hacker terminal text
  const fullText = `> INITIATING BOOT SEQUENCE...
> CONNECTING TO SECURE MAINFRAME...
> FETCHING LATEST CRYPTO NARRATIVES...
> DECRYPTING ALPHA SIGNALS...
> BYPASSING FIREWALL...
> ACCESS GRANTED.
> 
> WELCOME TO MAIL MAN TERMINAL.`;

  useEffect(() => {
    let currentIndex = 0;
    let isMounted = true;
    
    // Typing effect - dipercepat ke 10ms per karakter untuk total ~2 detik
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        if (isMounted) {
          setText(fullText.slice(0, currentIndex));
        }
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Tunggu 300ms setelah teks selesai sebelum memanggil onComplete (dipercepat dari 500ms)
        setTimeout(() => {
          if (isMounted) {
            onComplete();
          }
        }, 300);
      }
    }, 10); // Kecepatan ketik dipercepat (10ms per karakter)

    return () => {
      isMounted = false;
      clearInterval(typingInterval);
    };
  }, [fullText, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Interactive Background Particles di belakang */}
      <InteractiveBackground />
      
      {/* Terminal Card di tengah layar */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative max-w-2xl w-full">
          {/* Card Container dengan efek cyberpunk */}
          <div className="bg-black/90 border border-[#ff0000] shadow-[0_0_50px_rgba(255,0,0,0.3)] backdrop-blur-sm">
            {/* Header Terminal */}
            <div className="border-b border-[#ff0000] px-4 py-2 flex items-center justify-between bg-[#ff0000]/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-[#ff0000] font-mono ml-2">MAIL_MAN_TERMINAL.exe</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">SECURE CONNECTION</div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-[var(--primary-red)] min-h-[300px] relative">
              {/* Scanlines overlay effect */}
              <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed text-shadow-sm shadow-red-500/50">
                  {text}
                  <span className="animate-pulse font-bold">_</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}