"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#proven", label: "Proven" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let prevY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - prevY;

      setIsAtTop(currentY < 15);

      if (currentY <= 5) {
        setVisible(true);
      } else if (diff > 1) {
        // Instant hide on any downward scroll
        setVisible(false);
        setOpen(false);
      } else if (diff < -1) {
        // Instant reveal on any upward scroll
        setVisible(true);
      }

      prevY = currentY;
    };

    const onWheel = (e: WheelEvent) => {
      const currentY = window.scrollY;
      setIsAtTop(currentY < 15);

      if (e.deltaY > 1 && currentY > 5) {
        setVisible(false);
        setOpen(false);
      } else if (e.deltaY < -1) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`v3-nav fixed top-0 left-0 right-0 z-[100] bg-[#FFFBF0]/95 backdrop-blur-md transition-all duration-300 will-change-transform ${isAtTop ? "border-b border-transparent shadow-none" : "border-b border-[#e8e0d5]/70 shadow-sm"} ${visible ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}>
      <div className="mx-auto max-w-[1280px] px-6 py-4 flex items-center justify-between">
        {/* Left desktop links */}
        <div className="hidden md:flex items-center gap-7 text-[12.5px] font-medium text-[#111]">
          {NAV_LINKS.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#ff7a00] transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-3">
          <img 
            src="/v3-logo.webp" 
            alt="HELIOS" 
            className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] border border-[#ff7a00] object-contain shrink-0" 
          />
          <span className="font-black tracking-[0.20em] text-[18.5px] md:text-[19.5px] text-[#111]" style={{ fontFamily: "Inter" }}>
            HELIOS
          </span>
        </Link>

        {/* Right desktop controls */}
        <div className="hidden md:flex items-center gap-6 text-[12.5px] font-medium">
          <a href="#faq" className="text-[#111] hover:text-[#ff7a00] transition-colors">
            FAQ
          </a>
          <Link href="/terminal" className="text-[#111] hover:text-[#ff7a00] transition-colors">
            Terminal
          </Link>
          <Link
            href="/terminal"
            className="bg-[#111] text-white hover:bg-[#ff7a00] hover:text-black transition-all pl-4 pr-1.5 py-1.5 rounded-full text-[12px] font-bold inline-flex items-center gap-2.5 shadow-sm group/btn cursor-pointer"
          >
            Launch Terminal
            <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center group-hover/btn:bg-black group-hover/btn:text-white transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <Link
            href="/terminal"
            className="bg-[#111] text-white hover:bg-[#ff7a00] hover:text-black px-4 py-2 rounded-full text-xs font-bold transition-colors"
          >
            Launch
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full border border-[#e8e0d5] bg-white flex items-center justify-center text-[#111] hover:bg-[#fdf8f0] transition-colors cursor-pointer"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#FFFBF0]/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border-b border-[#e8e0d5]/60 animate-in">
          <div className="px-6 py-5 flex flex-col gap-3.5 text-[13px] font-medium">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="py-2 border-b border-[#e8e0d5]/40 text-[#111] hover:text-[#ff7a00] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link href="/terminal" onClick={close} className="py-2 text-[#111] hover:text-[#ff7a00] transition-colors border-b border-[#e8e0d5]/40">
              Terminal
            </Link>
            <Link
              href="/terminal"
              onClick={close}
              className="mt-2 bg-[#111] text-white hover:bg-[#ff7a00] hover:text-black px-5 py-3 rounded-full text-[13px] font-bold inline-flex items-center justify-center gap-2 transition-all"
            >
              Launch Terminal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

