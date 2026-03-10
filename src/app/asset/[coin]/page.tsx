"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Cpu, 
  Terminal, 
  Activity, 
  BarChart2, 
  Zap,
  GlobeLock
} from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  link: string;
  ts: number;
  aiRating?: {
    score: number;
    signal: "long" | "short" | "neutral";
  };
}

export default function AssetDetail() {
  const params = useParams();
  const rawCoin = params.coin as string;
  const coin = rawCoin ? rawCoin.toUpperCase() : "UNKNOWN";

  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch data khusus untuk koin ini
  useEffect(() => {
    const fetchCoinData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/news?limit=20&coin=${coin}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (coin !== "UNKNOWN") {
      fetchCoinData();
    }
  }, [coin]);

  // Kalkulasi Sentimen Dasar dari Feed
  const bullishCount = news.filter(n => n.aiRating?.signal === "long").length;
  const bearishCount = news.filter(n => n.aiRating?.signal === "short").length;
  const neutralCount = news.length - bullishCount - bearishCount;

  // Simulasi Pemanggilan LLM (OpenRouter)
  // Di produksi nyata, ini akan menembak ke endpoint /api/ai/summary milik Anda
  const generateAIInsight = () => {
    setIsGenerating(true);
    setAiInsight("");
    
    // Teks mock hasil analisis AI (Copywriting dalam bahasa Inggris)
    const mockAnalysis = `[SYSTEM SYNTHESIS INITIALIZED] \n\nAnalyzing ${news.length} recent data nodes for ${coin}... \n\nSENTIMENT OVERVIEW: The current market narrative indicates a ${bullishCount > bearishCount ? 'BULLISH' : 'BEARISH'} tilt. Institutional chatter is rising. \n\nKEY DRIVERS: Recent developments suggest impending volatility. Smart money is positioning for a breakout within the next 48 hours. Watch critical resistance levels closely. \n\nALPHA SIGNAL: Accumulation phase detected. Proceed with calculated risk sizing.`;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= mockAnalysis.length) {
        setAiInsight(mockAnalysis.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsGenerating(false);
      }
    }, 20); // Kecepatan ketik AI
  };

  return (
    <main className="scanlines min-h-screen bg-black text-white font-mono selection:bg-[#ff0000] selection:text-black pb-20">
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[#333] bg-black/90 px-6 py-4 backdrop-blur-sm">
        <Link 
          href="/terminal" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#ff0000] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm tracking-widest">RETURN_TO_COMMAND</span>
        </Link>
        <div className="flex items-center gap-2 text-[#ff0000] text-sm">
          <GlobeLock className="h-4 w-4" />
          <span>SECURE_CHANNEL</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl p-6 md:p-8 mt-4 space-y-8">
        
        {/* Header Asset */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#ff0000] pb-6">
          <div>
            <h2 className="text-xs text-[#ff0000] tracking-[0.3em] mb-1">// ASSET INTEL DOSSIER</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white glitch-text" data-text={coin}>
              {coin}
            </h1>
          </div>
          <div className="flex gap-4 text-sm bg-[#111] border border-[#333] p-3">
            <div className="flex flex-col items-center px-4 border-r border-[#333]">
              <span className="text-gray-500 text-xs">BULLISH</span>
              <span className="text-green-500 font-bold">{bullishCount}</span>
            </div>
            <div className="flex flex-col items-center px-4 border-r border-[#333]">
              <span className="text-gray-500 text-xs">BEARISH</span>
              <span className="text-[#ff0000] font-bold">{bearishCount}</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-gray-500 text-xs">NEUTRAL</span>
              <span className="text-gray-300 font-bold">{neutralCount}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* =========================================
              LEFT COLUMN: AI SYNTHESIS (OpenRouter Area)
              ========================================= */}
          <div className="md:col-span-7 space-y-6">
            <section className="border border-[#ff0000] bg-black relative overflow-hidden group">
              <div className="absolute inset-0 bg-dither opacity-30 pointer-events-none"></div>
              
              <div className="flex items-center gap-2 border-b border-[#ff0000] px-4 py-3 bg-[#110000]">
                <Cpu className="h-5 w-5 text-[#ff0000]" />
                <h2 className="font-bold tracking-widest text-[#ff0000]">NEURAL SYNTHESIS</h2>
              </div>
              
              <div className="p-6 min-h-[250px] flex flex-col">
                {!aiInsight && !isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <Activity className="h-12 w-12 text-gray-700 mb-2" />
                    <p className="text-gray-500 text-sm max-w-xs">
                      Engage LLM to analyze {news.length} recent data points and extract deep market context.
                    </p>
                    <button 
                      onClick={generateAIInsight}
                      className="border border-[#ff0000] bg-black px-6 py-3 text-sm text-[#ff0000] font-bold transition-all hover:bg-[#ff0000] hover:text-black tracking-widest shadow-[0_0_15px_rgba(255,0,0,0.2)]"
                    >
                      INITIALIZE AI ANALYSIS
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-300">
                      {aiInsight}
                      {isGenerating && <span className="animate-pulse text-[#ff0000] font-bold">_</span>}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {/* Quick Metrics */}
            <section className="grid grid-cols-2 gap-4">
              <div className="border border-[#333] bg-[#0a0a0a] p-4">
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                  <BarChart2 className="h-3 w-3" /> SIGNAL STRENGTH
                </div>
                <div className="text-2xl font-bold text-white">
                  {news.length > 0 ? ((bullishCount / news.length) * 100).toFixed(0) : 0}%
                </div>
              </div>
              <div className="border border-[#333] bg-[#0a0a0a] p-4">
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                  <Zap className="h-3 w-3" /> AVG IMPACT
                </div>
                <div className="text-2xl font-bold text-white">
                  {news.length > 0 ? (news.reduce((acc, curr) => acc + (curr.aiRating?.score || 0), 0) / news.length).toFixed(1) : 0}
                </div>
              </div>
            </section>
          </div>

          {/* =========================================
              RIGHT COLUMN: RAW FEED FILTERED BY COIN
              ========================================= */}
          <div className="md:col-span-5">
            <section className="flex flex-col h-[600px] border border-[#333] bg-black">
              <div className="flex items-center justify-between border-b border-[#333] px-4 py-3 bg-[#0a0a0a]">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-gray-400" />
                  <h2 className="font-bold tracking-widest text-sm">RAW_DATA_STREAM</h2>
                </div>
                <span className="text-[10px] text-gray-500 bg-[#111] px-2 py-1 border border-[#333]">FILTER: {coin}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto divide-y divide-[#222] p-4">
                {isLoading ? (
                  <div className="text-[#ff0000] text-center text-xs animate-pulse mt-10">
                    EXTRACTING TARGET DATA...
                  </div>
                ) : news.length === 0 ? (
                  <div className="text-gray-500 text-center text-xs mt-10">
                    NO ACTIVE SIGNALS FOR {coin}
                  </div>
                ) : (
                  news.map((item) => (
                    <article key={item.id} className="py-3 first:pt-0 group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-gray-500">{new Date(item.ts).toLocaleTimeString()}</span>
                        {item.aiRating?.signal && item.aiRating.signal !== 'neutral' && (
                          <span className={`text-[9px] border px-1 uppercase ${item.aiRating.signal === 'long' ? 'text-green-500 border-green-500' : 'text-[#ff0000] border-[#ff0000]'}`}>
                            {item.aiRating.signal}
                          </span>
                        )}
                      </div>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group-hover:text-white text-gray-300 transition-colors text-sm">
                        {item.text.split('\n')[0]}
                      </a>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}