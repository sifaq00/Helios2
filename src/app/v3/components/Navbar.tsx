"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="v3-nav sticky top-0 z-50 bg-[#FFFBF0]/85 backdrop-blur-md border-b border-[#e8e0d5]">
      <div className="mx-auto max-w-[1280px] px-6 py-3.5 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-5 text-[12px] font-medium text-[#1a1a1a]">
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <a href="/terminal" className="hover:opacity-60 transition-opacity">Terminal</a>
          <a href="#system" className="hover:opacity-60 transition-opacity">System</a>
          <a href="#docs" className="hover:opacity-60 transition-opacity">Docs</a>
        </div>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="font-black tracking-[0.18em] text-[15px]" style={{ fontFamily: "Inter" }}>HELIOS</span>
          <span className="hidden md:inline text-[10px] tracking-[0.2em] text-[#ff7a00] border border-[#ff7a00]/30 px-2 py-0.5 rounded-full">v4.21.0</span>
        </Link>
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
  );
}
