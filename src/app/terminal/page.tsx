"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Terminal, 
  AlertTriangle, 
  Activity, 
  Zap, 
  TrendingUp, 
  Settings,
  RefreshCw,
  Crosshair,
  Github,
  Twitter,
  Video,
  Cpu
} from "lucide-react";

interface NewsItem {
  id: string;
  text: string;
  newsType: string;
  engineType: string;
  link: string;
  ts: string | number;
  coins?: { symbol: string; market_type: string }[];
  aiRating?: {
    score: number;
    signal: "long" | "short" | "neutral";
    summary?: string;
  };
}

export default function TerminalDashboard() {
  const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [viralAnomalies, setViralAnomalies] = useState<any[]>([]);
  const [isViralLoading, setIsViralLoading] = useState(true);
  
  const [dailyBrief, setDailyBrief] = useState<string>("");
  const [isBriefLoading, setIsBriefLoading] = useState(true);
  
  // ID YouTube Live 24/7 (Contoh: Al Jazeera English / Bloomberg / Sky News)
  // Anda bisa menggantinya nanti. gCNeDWCI0vo = Al Jazeera Live
  const LIVE_STREAM_ID = "gCNeDWCI0vo"; 

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/news?limit=50"); 
      if (!response.ok) throw new Error("SECURE CONNECTION FAILED");
      
      const data = await response.json();
      setNewsFeed(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchViralData = async () => {
    setIsViralLoading(true);
    try {
      const res = await fetch('/api/viral-radar');
      const data = await res.json();
      if (data.active_anomalies) {
        setViralAnomalies(data.active_anomalies);
      }
    } catch (err) {
      console.error("Viral Radar offline", err);
    } finally {
      setIsViralLoading(false);
    }
  };

  const fetchDailyBrief = async () => {
    setIsBriefLoading(true);
    try {
      const res = await fetch('/api/daily-brief');
      const data = await res.json();
      if (data.brief) {
        setDailyBrief(data.brief);
      }
    } catch (err) {
      console.error("Daily Brief generation failed", err);
    } finally {
      setIsBriefLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchViralData();
    fetchDailyBrief();
    const interval = setInterval(() => {
      fetchNews();
      fetchViralData();
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  // 1. Ekstraksi Top Mentions
  const getTopMentions = () => {
    const counts: Record<string, number> = {};
    newsFeed.forEach(item => {
      if (item.coins && Array.isArray(item.coins)) {
        item.coins.forEach(c => {
          counts[c.symbol] = (counts[c.symbol] || 0) + 1;
        });
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5) 
      .map(([symbol, count]) => ({ symbol, count }));
  };

  // 2. Ekstraksi Tren Narasi
  const getTrendingNarratives = () => {
    const narratives = {
      "MACRO / GEOPOLITICS": ["war", "fed", "rate", "sec", "inflation", "iran", "israel", "russia", "trump"],
      "AI / AGENTS": ["ai", "agent", "artificial intelligence", "gpt", "fetch"],
      "DEPIN / INFRA": ["depin", "infrastructure", "node", "compute"],
      "LAYER 2 / SCALING": ["l2", "rollup", "arbitrum", "optimism", "base"],
      "MEMECOINS": ["meme", "doge", "shib", "pepe", "wif", "pump"],
      "DEFI / YIELD": ["defi", "yield", "staking", "restaking", "tvl"]
    };

    const counts: Record<string, number> = {};
    newsFeed.forEach(item => {
      const text = item.text.toLowerCase();
      for (const [narrative, keywords] of Object.entries(narratives)) {
        if (keywords.some(kw => text.includes(kw))) {
          counts[narrative] = (counts[narrative] || 0) + 1;
        }
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4) 
      .map(([name, count]) => {
        const momentum = (count * 4.2).toFixed(1);
        return { name, count, momentum };
      });
  };

  const topMentions = getTopMentions();
  const trendingNarratives = getTrendingNarratives();

  const highImpactNews = newsFeed.filter(n => (n.aiRating?.score || 0) >= 70);
  const topNews = highImpactNews.length > 0 ? highImpactNews[0] : null;
  const actionSignals = newsFeed.filter(n => n.aiRating?.signal === "long" || n.aiRating?.signal === "short").slice(0, 3);

  return (
    <main className="scanlines min-h-screen bg-black text-white font-mono selection:bg-[#ff0000] selection:text-black">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[#ff0000] bg-black/90 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 text-[#ff0000] font-black tracking-widest text-xl crt-flicker group">
            <div className="relative h-8 w-8 overflow-hidden border border-[#ff0000] bg-black">
              <Image 
                src="/logo.jpeg" 
                alt="Logo" 
                fill 
                sizes="32px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <span>MAIL MAN</span>
          </Link>
          <span className="hidden text-xs text-gray-500 md:inline-block">
            // STATUS: {isLoading ? <span className="text-yellow-500 animate-pulse">INTERCEPTING DATA...</span> : <span className="text-green-500">SECURE UPLINK</span>}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchNews} className="text-gray-500 hover:text-[#ff0000] transition-colors" title="Force Refresh">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-[#ff0000]' : ''}`} />
          </button>
          
          <div className="flex items-center gap-3 border-l border-[#333] pl-4">
            <a href="https://x.com/mailmanonx" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff0000] transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com/omnicima/mail-man" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff0000] transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="hidden items-center gap-2 text-xs text-[#ff0000] md:flex animate-pulse">
            <Activity className="h-4 w-4" />
            LIVE FEED
          </div>
          <Link href="/settings" className="border border-[#333] p-2 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors">
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 p-6 md:grid-cols-12 md:p-8">
        
        {/* =========================================
            LEFT COLUMN: SYSTEM REPORT & AI SIGNALS 
            ========================================= */}
        <div className="flex flex-col gap-6 md:col-span-3">
          
          <section className="border border-[#ff0000] bg-[#110000] p-4 relative overflow-hidden group min-h-[100px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff000010] to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1.5 w-1.5 bg-[#ff0000] animate-ping"></div>
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                System_Report_{new Date().toLocaleDateString().replace(/\//g, '')}
              </h3>
            </div>
            <div className="relative z-10 text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-line border-l border-[#ff000040] pl-3 italic">
              {isBriefLoading ? (
                <span className="animate-pulse text-gray-500">Decrypting daily intel...</span>
              ) : dailyBrief ? (
                dailyBrief
              ) : (
                <span className="text-gray-600">No report available.</span>
              )}
            </div>
          </section>

          <section className="border border-[#ff0000] bg-[#110000]">
            <div className="flex items-center gap-2 border-b border-[#ff0000] bg-[#ff0000] px-3 py-2 text-black font-bold tracking-widest text-sm">
              <AlertTriangle className="h-4 w-4" />
              <h2>HIGH IMPACT ALERTS</h2>
            </div>
            <div className="p-4">
              {topNews ? (
                <>
                  <div className="mb-2 flex items-center justify-between text-[10px] text-gray-400">
                    <span>{new Date(topNews.ts).toLocaleTimeString()}</span>
                    <span className="text-[#ff0000]">IMPACT: {topNews.aiRating?.score || "N/A"}</span>
                  </div>
                  <h3 className="mb-3 text-sm font-bold leading-tight">{topNews.text.split('\n')[0]}</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-[#333] pb-1">
                      <span className="text-gray-400">AI Vector:</span>
                      <span className={`font-bold uppercase ${topNews.aiRating?.signal === 'long' ? 'text-green-500' : 'text-[#ff0000]'}`}>
                        {topNews.aiRating?.signal}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-xs italic">Awaiting high-impact anomalies...</div>
              )}
            </div>
          </section>

          <section className="border border-[#333] bg-black">
            <div className="flex items-center gap-2 border-b border-[#333] px-3 py-2 text-white bg-[#111] tracking-widest text-sm">
              <Zap className="h-4 w-4 text-[#ff0000]" />
              <h2>ALPHA SIGNALS</h2>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {actionSignals.length > 0 ? (
                actionSignals.map((signalItem) => (
                  <div key={signalItem.id} className={`border-l-2 ${signalItem.aiRating?.signal === 'long' ? 'border-green-500' : 'border-[#ff0000]'} pl-3`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-white uppercase text-sm">
                        {signalItem.coins && signalItem.coins.length > 0 ? signalItem.coins[0].symbol : "GLOBAL"}
                      </span>
                      <span className="text-[9px] border border-[#333] px-1 bg-[#111] uppercase text-gray-400">
                        {signalItem.aiRating?.signal}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 line-clamp-2">{signalItem.aiRating?.summary || signalItem.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-[10px]">Scanning market matrix...</div>
              )}
            </div>
          </section>
        </div>

        {/* =========================================
            CENTER COLUMN: RAW DATA STREAM & LIVE UPLINK
            ========================================= */}
        <div className="flex flex-col gap-6 md:col-span-6">
          {/* LIVE_UPLINK moved from Left to Center */}
          <section className="border border-[#333] bg-black shadow-[0_0_10px_rgba(255,0,0,0.05)]">
            <div className="flex items-center justify-between border-b border-[#333] px-3 py-2 text-white bg-[#111] tracking-widest text-sm">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-[#ff0000] animate-pulse" />
                <h2>LIVE_UPLINK (GLOBAL_MATRIX)</h2>
              </div>
              <span className="text-[9px] bg-[#ff0000] text-black px-1 font-bold animate-pulse">REC</span>
            </div>
            {/* Wrapper Video — padding-bottom trick gives ratio height, iframe wider than container to eliminate letterbox */}
            <div
              className="relative w-full overflow-hidden bg-[#050505] group"
              style={{ paddingBottom: '60%' }}
            >
              {/* Scanline & Red Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-dither opacity-10"></div>
              {/* HUD corner markers */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#ff0000] z-20 pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#ff0000] z-20 pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#ff0000] z-20 pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#ff0000] z-20 pointer-events-none"></div>
              {/* Centered wider iframe — width = 85 * 16/9 = 151% to fill height without black bars */}
              <iframe
                src={`https://www.youtube.com/embed/${LIVE_STREAM_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=1&playlist=${LIVE_STREAM_ID}&loop=1`}
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full opacity-90 contrast-125"
                style={{ width: '107%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-[#0a0a0a] p-2 flex justify-between items-center text-[9px] text-gray-500 border-t border-[#333]">
               <span className="flex items-center gap-1"><Activity className="h-3 w-3 text-green-500" /> SAT_LINK: STABLE</span>
               <span className="uppercase text-[#ff0000]">NET_LATENCY: 24MS</span>
            </div>
          </section>

          <section className="flex h-[600px] flex-col border border-[#333] bg-black">
            <div className="flex items-center justify-between border-b border-[#333] px-4 py-3 bg-[#0a0a0a]">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[#ff0000]" />
                <h1 className="font-bold text-sm tracking-widest text-[#ff0000]">RAW_DATA_STREAM</h1>
              </div>
            </div>

            <div className="flex-1 divide-y divide-[#222] overflow-y-auto p-4 custom-scrollbar">
              {isLoading && newsFeed.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#ff0000] space-y-4">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                  <span className="animate-pulse tracking-widest text-sm">DECRYPTING INCOMING TRANSMISSIONS...</span>
                </div>
              ) : error ? (
                <div className="text-[#ff0000] border border-[#ff0000] p-4 text-center text-sm">
                  [CRITICAL_FAILURE]: {error}
                </div>
              ) : (
                newsFeed.map((news) => (
                  <article key={news.id} className="py-4 first:pt-0 hover:bg-[#050505] transition-colors group">
                    <div className="mb-2 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className={`${news.aiRating?.score && news.aiRating.score > 70 ? 'text-[#ff0000]' : 'text-gray-300'} font-bold`}>
                          @{news.newsType ? news.newsType.toUpperCase() : 'NO DATA AVAILABLE AT THIS TIME'}
                        </span>
                        <span>• {news.ts ? new Date(news.ts).toLocaleTimeString() : 'No data available at this time'}</span>
                      </div>
                      {news.aiRating?.score && (
                        <span className="border border-[#ff0000] text-[#ff0000] px-1 font-bold">
                          IMPACT: {news.aiRating.score}
                        </span>
                      )}
                    </div>
                    
                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="block group-hover:text-white transition-colors">
                      <h3 className="mb-2 text-sm font-bold text-gray-200 leading-snug break-words">
                        {news.text ? news.text.split('\n')[0].replace(/<[^>]*>?/gm, '') : 'No data available at this time'}
                      </h3>
                      {news.aiRating?.summary && (
                        <p className="mb-3 text-[11px] text-gray-400 line-clamp-2 break-words">
                          {news.aiRating.summary}
                        </p>
                      )}
                    </a>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {news.aiRating?.signal && news.aiRating.signal !== 'neutral' && (
                        <span className={`bg-[#111] border border-[#333] px-1 py-0.5 text-[9px] uppercase ${news.aiRating.signal === 'long' ? 'text-green-500' : 'text-[#ff0000]'}`}>
                          {news.aiRating.signal}
                        </span>
                      )}
                      {news.coins?.map(coin => (
                        <Link href={`/asset/${coin.symbol.toLowerCase()}`} key={coin.symbol} className="bg-[#111] border border-[#ff0000] px-1 py-0.5 text-[9px] text-[#ff0000] font-bold hover:bg-[#ff0000] hover:text-black transition-colors cursor-pointer">
                          ${coin.symbol}
                        </Link>
                      ))}
                      <span className="bg-[#111] border border-[#ff0000] px-1 py-0.5 text-[9px] text-[#ff0000] font-bold">
                        {news.engineType ? news.engineType.toUpperCase() : 'NEWS'}
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        {/* =========================================
            RIGHT COLUMN: DYNAMIC NARRATIVES & MENTIONS
            ========================================= */}
        <div className="flex flex-col gap-6 md:col-span-3">
          
          <section className="border border-[#333] bg-black">
            <div className="flex items-center gap-2 border-b border-[#333] px-3 py-2 text-white bg-[#111] tracking-widest text-sm">
              <Crosshair className="h-4 w-4 text-[#ff0000]" />
              <h2>VIRAL RADAR</h2>
            </div>
            <div className="p-4 space-y-4">
              {isViralLoading ? (
                <div className="text-[10px] text-gray-500 flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Scanning signal patterns...
                </div>
              ) : viralAnomalies.length > 0 ? (
                viralAnomalies.map((anomaly, idx) => (
                  <Link 
                    href={`/asset/${anomaly.symbol.toLowerCase()}`}
                    key={idx} 
                    className="flex items-center justify-between border-b border-[#222] pb-3 last:border-0 last:pb-0 hover:bg-[#050505] transition-colors p-1"
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm tracking-wider">${anomaly.symbol}</span>
                      <span className="text-[10px] text-gray-500 uppercase">Growth Multiplier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 font-bold bg-[#0a1a0a] px-1 border border-green-900">
                        +{anomaly.growth}%
                      </span>
                      {anomaly.status === "VIRAL_ANOMALY" && (
                        <span className="bg-[#ff0000] text-black text-[9px] font-black px-1 animate-pulse">
                          ANOMALY
                        </span>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-[10px] text-gray-500 italic">No viral anomalies detected.</div>
              )}
            </div>
          </section>

          <section className="border border-[#333] bg-black">
            <div className="flex items-center gap-2 border-b border-[#333] px-3 py-2 text-white bg-[#111] tracking-widest text-sm">
              <TrendingUp className="h-4 w-4 text-[#ff0000]" />
              <h2>NARRATIVE INTERCEPTS</h2>
            </div>
            <div className="p-4 space-y-3">
              {trendingNarratives.length > 0 ? trendingNarratives.map((narrative, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-[#222] pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-300">{narrative.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{narrative.count} pings</span>
                    <span className="text-green-500 font-bold bg-[#0a1a0a] px-1 border border-green-900">+{narrative.momentum}%</span>
                  </div>
                </div>
              )) : (
                <div className="text-[10px] text-gray-500">No strong narratives detected...</div>
              )}
            </div>
          </section>

          <section className="border border-[#333] bg-black">
            <div className="flex items-center gap-2 border-b border-[#333] px-3 py-2 text-white bg-[#111] tracking-widest text-sm">
              <Crosshair className="h-4 w-4 text-[#ff0000]" />
              <h2>TOP TARGET MENTIONS</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3 font-mono text-xs">
                {topMentions.length > 0 ? topMentions.map((mention, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b border-[#222] pb-2 last:border-0 last:pb-0 group">
                    <Link href={`/asset/${mention.symbol.toLowerCase()}`} className="flex items-center gap-2 hover:text-[#ff0000] transition-colors">
                      <span className="text-[#ff0000] opacity-50 text-[10px]">0{idx + 1}</span>
                      <span className="font-bold tracking-wider">${mention.symbol}</span>
                    </Link>
                    <span className="text-[10px] text-gray-500 bg-[#111] px-1 border border-[#333]">{mention.count} INTERCEPTS</span>
                  </li>
                )) : (
                  <li className="text-[10px] text-gray-500">Tracking matrix empty...</li>
                )}
              </ul>
            </div>
          </section>

          <div className="flex-1 border border-[#333] bg-dither p-4 flex items-end justify-end opacity-50 hidden md:flex min-h-[100px]">
             <div className="text-right">
                <div className="text-[#ff0000] text-[10px] tracking-widest">SYS.OP.NORMAL</div>
                <div className="text-gray-600 text-[10px] tracking-widest mt-1">AWAITING_INPUT_</div>
             </div>
          </div>
        </div>

      </div>

      {/* =========================================
          HOW IT WORKS SECTION
          ========================================= */}
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <section className="border border-[#333] bg-black overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.05)]">
          <div className="flex items-center gap-2 border-b border-[#333] px-4 py-3 text-white bg-[#0a0a0a] tracking-[0.3em] text-sm font-bold border-l-4 border-l-[#ff0000]">
            <Cpu className="h-4 w-4 text-[#ff0000]" />
            <h2>SYSTEM_CORE_MANIFEST // PROTOCOL_V2</h2>
          </div>
          
          <div className="p-8 space-y-16">
            {/* Top: Architecture Diagram (Full Width styled) */}
            <div className="relative">
              <div className="absolute -top-4 left-6 bg-black px-3 py-1 border border-[#ff0000] text-[10px] text-[#ff0000] font-black z-10 tracking-[0.2em]">
                SYSTEM_ARCHITECTURE_TOPOLOGY
              </div>
              <div className="border border-[#333] p-10 bg-[#020202] relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* UI Layer */}
                  <div className="w-full max-w-2xl border border-[#ff0000] bg-black p-4 mb-12 relative shadow-[0_0_15px_rgba(255,0,0,0.1)]">
                    <div className="text-[10px] text-[#ff0000] font-bold mb-3 border-b border-[#ff000020] pb-1 uppercase tracking-widest">USER_INTERFACE [MM_SYS]</div>
                    <div className="flex justify-around gap-4 text-[11px] font-mono text-white">
                      <div className="px-3 py-1 bg-[#111] border border-[#333]">Terminal Dashboard</div>
                      <div className="px-3 py-1 bg-[#111] border border-[#333]">Viral Radar</div>
                      <div className="px-3 py-1 bg-[#111] border border-[#333]">Alpha Signals Panel</div>
                    </div>
                  </div>

                  {/* Connectors to API */}
                  <div className="flex justify-around w-full max-w-2xl px-10 -mt-12 mb-4">
                    <div className="h-8 w-px bg-gradient-to-b from-[#ff0000] to-[#333]"></div>
                    <div className="h-8 w-px bg-gradient-to-b from-[#ff0000] to-[#333]"></div>
                    <div className="h-8 w-px bg-gradient-to-b from-[#ff0000] to-[#333]"></div>
                  </div>

                  {/* API Layer - Enhanced Aesthetic */}
                  <div className="w-full max-w-4xl grid grid-cols-4 gap-6 mb-12 uppercase">
                    {[
                      { path: "/api/news", label: "DATA_FEED" },
                      { path: "/api/ai", label: "NEURAL_INF" },
                      { path: "/api/daily-brief", label: "INTEL_GEN" },
                      { path: "/api/viral-radar", label: "ANOMALY_DET" }
                    ].map(api => (
                      <div key={api.path} className="group relative border border-[#333] bg-[#050505] p-3 text-center hover:border-[#ff0000] transition-all duration-300">
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#ff0000] opacity-20 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-[7px] text-gray-600 mb-1 tracking-[0.2em] group-hover:text-[#ff0000]">REST_ENDPOINT</div>
                        <div className="text-[11px] text-white font-black font-mono mb-1">{api.label}</div>
                        <div className="text-[8px] text-gray-500 font-mono italic">{api.path}</div>
                      </div>
                    ))}
                  </div>

                  {/* Connectors to Neural Core */}
                  <div className="flex justify-center w-full max-w-4xl -mt-12 mb-6">
                    <div className="h-12 w-px bg-gradient-to-b from-[#333] via-[#ff0000] to-[#ff0000]"></div>
                  </div>

                  {/* Neural Core Layer - Pulsing High-End Core */}
                  <div className="w-full max-w-2xl border-2 border-[#ff0000] p-1 bg-black relative group shadow-[0_0_30px_rgba(255,0,0,0.1)]">
                    <div className="border border-[#ff000040] p-6 bg-[#0a0000] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_0%,transparent_70%)] animate-pulse"></div>
                      <div className="relative z-10">
                        <div className="text-[12px] text-[#ff0000] font-black tracking-[0.6em] mb-6 text-center uppercase crt-flicker">NEURAL_INFRASTRUCTURE_V1</div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="group/node border border-[#ff000040] p-4 text-center bg-black/50 hover:bg-[#110000] transition-colors relative">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0000]"></div>
                            <div className="text-[11px] text-white font-black mb-1 tracking-widest">OPENROUTER</div>
                            <div className="text-[8px] text-gray-500 font-mono uppercase">MISTRAL_SMALL_CORE</div>
                          </div>
                          <div className="group/node border border-[#ff000040] p-4 text-center bg-black/50 hover:bg-[#110000] transition-colors relative">
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0000]"></div>
                            <div className="text-[11px] text-white font-black mb-1 tracking-widest">OPENNEWS</div>
                            <div className="text-[8px] text-gray-500 font-mono uppercase">REALTIME_INGESTION</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: The Mission — aesthetic terminal layout */}
            <div className="border-t border-[#333] pt-12 space-y-12">

              {/* Header with glitch effect */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff000030] to-transparent blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative flex items-end justify-between border-b border-[#ff0000] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-1 w-8 bg-[#ff0000]"></span>
                      <span className="text-[10px] text-[#ff0000] font-black tracking-[0.5em] uppercase">SYSTEM_MANIFESTO</span>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
                      THE <span className="text-[#ff0000]">MISSION</span>
                    </h3>
                  </div>
                </div>
              </div>

              {/* Aesthetic Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left: Narrative & Signal */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="relative">
                    <p className="text-lg md:text-xl font-bold text-white leading-relaxed tracking-tight border-l-4 border-[#ff0000] pl-6 py-2 uppercase">
                      MAIL MAN is an <span className="text-[#ff0000]">autonomous neural system</span> quantifying market uncertainty by mapping the structural dynamics of crypto-driven markets.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-[#050505] border border-[#111] p-4 hover:border-[#ff000030] transition-colors">
                          <span className="text-[#ff0000] text-[10px] font-black block mb-2 tracking-widest">// RAW_DATA_INTERCEPT</span>
                          <p className="text-xs text-gray-400 leading-relaxed italic">
                            Constructing actionable signals through real-time news aggregation, anomaly detection, and advanced AI analysis.
                          </p>
                       </div>
                       <div className="bg-[#050505] border border-[#111] p-4 hover:border-[#ff000030] transition-colors">
                          <span className="text-[#ff0000] text-[10px] font-black block mb-2 tracking-widest">// REGIME_SHIFT_DETECTION</span>
                          <p className="text-xs text-gray-400 leading-relaxed italic">
                            Modeling volatility and mapping behavioral signal dynamics through proprietary simulation engines.
                          </p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Matrix (Non-table approach) */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-dither opacity-10 pointer-events-none"></div>
                  <div className="space-y-4">
                    <div className="text-[11px] font-black text-[#ff0000] mb-6 tracking-[0.3em] flex items-center gap-2">
                       <Activity className="h-3 w-3" /> SYSTEM_SPECIFICATIONS
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "KERNEL", val: "v4.21.0-MM", color: "text-[#ff0000]" },
                        { label: "LATENCY", val: "24MS / NOMINAL", color: "text-white" },
                        { label: "NEURAL", val: "MISTRAL-SM", color: "text-white" },
                        { label: "UPTIME", val: "99.97% LIVE", color: "text-green-500" },
                        { label: "REGION", val: "GLOBAL_MESH", color: "text-white" },
                        { label: "THREAD", val: "X-64_PARALLEL", color: "text-white" }
                      ].map((spec, i) => (
                        <div key={i} className="group relative bg-[#080808] border border-[#111] p-3 hover:border-[#ff000040] transition-colors">
                          <div className="text-[8px] text-gray-600 font-mono mb-1 uppercase tracking-tighter">{spec.label}</div>
                          <div className={`text-xs font-black font-mono transition-transform group-hover:translate-x-1 ${spec.color}`}>{spec.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-[#111] pt-6 flex flex-wrap gap-2">
                      {["RL_MODELS", "GPU_ACCEL", "REALTIME_TX", "SENTIMENT_v2"].map(tag => (
                        <span key={tag} className="text-[8px] border border-[#222] px-2 py-0.5 text-gray-500 font-mono tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
