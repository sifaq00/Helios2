"use client";

import { useEffect, useState } from "react";

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
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        if (isMounted) {
          setText(fullText.slice(0, currentIndex));
        }
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Tunggu 1.2 detik setelah teks selesai sebelum memanggil onComplete (menghilangkan layar)
        setTimeout(() => {
          if (isMounted) {
            onComplete();
          }
        }, 1200);
      }
    }, 40); // Kecepatan ketik (40ms per karakter)

    return () => {
      isMounted = false;
      clearInterval(typingInterval);
    };
  }, [fullText, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-start justify-center bg-black p-6 md:p-12 font-mono text-[var(--primary-red)] shadow-[inset_0_0_100px_rgba(255,0,0,0.1)]">
      {/* Additional scanlines overlay effect specifically for boot screen */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-3xl text-left">
        <pre className="whitespace-pre-wrap text-sm md:text-lg leading-relaxed md:leading-loose text-shadow-sm shadow-red-500/50">
          {text}
          <span className="animate-pulse font-bold">_</span>
        </pre>
      </div>
    </div>
  );
}