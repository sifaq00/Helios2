"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFFBF0] pt-16 pb-12">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#e8e0d5]/80">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <img 
                src="/v3-logo.webp" 
                alt="HELIOS" 
                className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] border border-[#ff7a00] object-contain shrink-0" 
              />
              <span className="font-black tracking-[0.20em] text-[18.5px] md:text-[19.5px] text-[#111]" style={{ fontFamily: "Inter" }}>
                HELIOS
              </span>
            </Link>
            <p className="mt-3 text-[12.5px] text-[#6b625c] max-w-[320px] leading-relaxed font-sans">
              Autonomous neural intelligence matrix quantifying market uncertainty and narrative velocity for institutional desks.
            </p>
          </div>

          <div>
            <div className="text-[10.5px] font-mono font-bold tracking-widest text-[#111] uppercase mb-3.5">
              Product
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-[#6b625c]">
              <li>
                <Link href="/terminal" className="hover:text-[#111] transition-colors inline-flex items-center gap-1">
                  Terminal Cockpit <ArrowUpRight className="w-3 h-3 text-[#ff7a00]" />
                </Link>
              </li>
              <li><a href="#features" className="hover:text-[#111] transition-colors">Features</a></li>
              <li><a href="#pipeline" className="hover:text-[#111] transition-colors">Pipeline Spec</a></li>
              <li><a href="#proven" className="hover:text-[#111] transition-colors">Desk Validation</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10.5px] font-mono font-bold tracking-widest text-[#111] uppercase mb-3.5">
              Modules
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-[#6b625c]">
              <li><Link href="/terminal" className="hover:text-[#111] transition-colors">Neural Feed 50</Link></li>
              <li><Link href="/terminal" className="hover:text-[#111] transition-colors">Viral Radar</Link></li>
              <li><Link href="/terminal" className="hover:text-[#111] transition-colors">Alpha Shield</Link></li>
              <li><Link href="/terminal" className="hover:text-[#111] transition-colors">Daily Brief</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[10.5px] font-mono font-bold tracking-widest text-[#111] uppercase mb-3.5">
              Developers
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-[#6b625c]">
              <li><a href="#faq" className="hover:text-[#111] transition-colors">Architecture FAQ</a></li>
              <li><Link href="/api/news" className="hover:text-[#111] transition-colors font-mono text-[11px]">/api/news</Link></li>
              <li><Link href="/api/viral-radar" className="hover:text-[#111] transition-colors font-mono text-[11px]">/api/viral-radar</Link></li>
              <li><Link href="/api/alpha-signals" className="hover:text-[#111] transition-colors font-mono text-[11px]">/api/alpha-signals</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8c827a] font-mono">
          <span>HELIOS SYS // INTELLIGENCE MATRIX • ALL RIGHTS RESERVED</span>
          <span>© 2026 HELIOS • 50 FRESHEST • MIMO-V2.5 • 24MS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}
