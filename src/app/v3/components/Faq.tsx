"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  category: "DATA" | "AI MODEL" | "RADAR" | "API" | "PRICING";
  q: string;
  a: string;
  spec?: { label: string; value: string };
}

const FAQS: FaqItem[] = [
  {
    id: "01",
    category: "DATA",
    q: "How fast is the news feed ingestion & edge caching cycle?",
    a: "Our subterranean ingestion pipeline polls CoinDesk, Decrypt, Cointelegraph, and raw RSS wires every 60 seconds. The 50 freshest news items are scored via MIMO-V2.5 and synchronized to Supabase edge cache with sub-30ms global retrieval.",
    spec: { label: "Ingest Frequency", value: "60s continuous polling" },
  },
  {
    id: "02",
    category: "AI MODEL",
    q: "What neural architecture powers the catalyst distillation & scoring?",
    a: "We run a dual-tier model pipeline: MIMO-V2.5 (800-token prompt context, temperature 0.75) computes an impact score (9 to 5) and directional polarity (Bullish / Neutral / Bearish), backed by OpenRouter auto-failover circuits.",
    spec: { label: "Inference SLA", value: "24ms nominal response" },
  },
  {
    id: "03",
    category: "RADAR",
    q: "How does the Viral Radar anomaly engine detect early narrative surges?",
    a: "Viral Radar calculates statistical Z-Scores by comparing 3-hour mention velocity against a 24-hour baseline. Coins registering anomalous velocity surges (>50% above baseline) are auto-flagged before crowd discovery on Twitter/CT.",
    spec: { label: "Surge Threshold", value: "Z-Score > 2.0σ anomaly" },
  },
  {
    id: "04",
    category: "API",
    q: "Can quantitative desks connect directly via programmatic API endpoints?",
    a: "Yes. Helios exposes clean REST API endpoints (/api/news, /api/viral-radar, /api/alpha-signals, and /api/daily-brief) allowing algorithmic execution desks and quant bots to ingest structured JSON alpha payloads directly.",
    spec: { label: "Available Routes", value: "REST / JSON Edge Endpoints" },
  },
  {
    id: "05",
    category: "PRICING",
    q: "Is there a subscription fee or API key required to launch the terminal?",
    a: "The core Helios Terminal is free to launch in your browser, granting instant real-time access to the 8-panel intelligence suite, 50 freshest catalysts stream, and live Viral Radar metrics.",
    spec: { label: "Access Level", value: "Instant Browser Access" },
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = ["ALL", "DATA", "AI MODEL", "RADAR", "API", "PRICING"];

  const filteredFaqs = activeCategory === "ALL" 
    ? FAQS 
    : FAQS.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="bg-[#FFFBF0] py-14 md:py-20 scroll-mt-[64px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="v3-section-reveal lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] text-[#ff7a00] font-bold uppercase mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                SYSTEM SPECIFICATIONS &amp; FAQ
              </p>
              <h2 className="text-[30px] md:text-[42px] leading-[1.05] tracking-tight font-black" style={{ fontFamily: "Inter", letterSpacing: "-0.03em" }}>
                Frequently Answered
                <br />
                <span className="font-normal italic" style={{ fontFamily: "Instrument Serif" }}>System Inquiries</span>
              </h2>
              <p className="mt-3 text-[12.5px] text-[#6b625c] leading-relaxed max-w-[400px]">
                Essential architectural specifications regarding data pipelines, neural scoring latency, and programmatic desk endpoints.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer border ${
                      activeCategory === cat
                        ? "bg-[#111] text-white border-[#111] font-bold shadow-sm"
                        : "bg-[#FFFBF0] text-[#6b625c] border-[#e8e0d5] hover:border-[#111]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-2.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.id}
                  className={`rounded-[14px] border transition-all duration-150 overflow-hidden ${
                    isOpen 
                      ? "bg-[#FFFBF0] border-[#111] shadow-sm" 
                      : "bg-[#FFFBF0]/70 border-[#e8e0d5] hover:bg-[#FFFBF0] hover:border-[#111]/30"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-[#ff7a00] shrink-0">
                        // {faq.id}
                      </span>
                      <span className="font-bold text-[14px] text-[#111] leading-snug" style={{ fontFamily: "Inter" }}>
                        {faq.q}
                      </span>
                    </div>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#ff7a00] text-black" : "bg-[#e8e0d5] text-[#555]"
                    }`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-[12.5px] leading-relaxed text-[#555] border-t border-[#e8e0d5] mt-1 pt-3.5">
                      <p className="mb-3">{faq.a}</p>
                      {faq.spec && (
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-[#f5ecdd] border border-[#e8e0d5] font-mono text-[10px] text-[#111]">
                          <span className="text-[#8c827a] uppercase">{faq.spec.label}:</span>
                          <strong className="text-[#111]">{faq.spec.value}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

