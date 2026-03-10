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
  GlobeLock,
  Share2
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

// Function to parse AI response and convert to React elements
const parseAIResponse = (text: string) => {
  const lines = text.split('\n');
  const elements: React.JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('### ')) {
      // Main headers
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-[#ff0000] mb-3 mt-4 tracking-widest">
          {line.replace('### ', '').toUpperCase()}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      // Sub headers
      elements.push(
        <h4 key={key++} className="text-md font-bold text-white mb-2 mt-3 tracking-wide">
          {line.replace('#### ', '')}
        </h4>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      // Bold text
      elements.push(
        <p key={key++} className="font-bold text-white mb-2">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- **') && line.includes('**:') && line.endsWith('**')) {
      // Bold list items with descriptions
      const parts = line.split('**:');
      if (parts.length === 2) {
        const title = parts[0].replace('- **', '').replace('**', '');
        const description = parts[1].replace('**', '');
        elements.push(
          <div key={key++} className="mb-3 pl-4 border-l border-[#333]">
            <div className="font-bold text-[#ff0000] mb-1">{title}:</div>
            <div className="text-gray-300 text-sm">{description}</div>
          </div>
        );
      }
    } else if (line.startsWith('- **')) {
      // Bold list items
      elements.push(
        <div key={key++} className="mb-2 pl-4 border-l border-[#333]">
          <span className="font-bold text-white">{line.replace('- **', '').replace('**', '')}</span>
        </div>
      );
    } else if (line.match(/^\d+\. \*\*/)) {
      // Numbered bold items
      const match = line.match(/^(\d+)\. \*\*(.*)\*\*/);
      if (match) {
        elements.push(
          <div key={key++} className="mb-2 pl-4 border-l border-[#333]">
            <span className="font-bold text-[#ff0000]">{match[1]}. </span>
            <span className="font-bold text-white">{match[2]}</span>
          </div>
        );
      }
    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
      // Numbered lists
      elements.push(
        <div key={key++} className="mb-2 pl-4 border-l border-[#333]">
          <span className="text-gray-300 text-sm">{line}</span>
        </div>
      );
    } else if (line === '') {
      // Empty lines for spacing
      elements.push(<div key={key++} className="h-2"></div>);
    } else if (line.length > 0) {
      // Regular paragraphs
      elements.push(
        <p key={key++} className="text-gray-300 text-sm leading-relaxed mb-2">
          {line}
        </p>
      );
    }
  }

  return elements;
};

// Function to clean up news text by removing HTML tags and unwanted metadata
const cleanNewsText = (text: string): string => {
  if (!text) return '';
  
  // Remove HTML tags
  let cleaned = text.replace(/<[^>]*>?/gm, '');
  
  // Remove common unwanted patterns
  cleaned = cleaned.replace(/Link: https?:\/\/[^\s]+/gi, '');
  cleaned = cleaned.replace(/Released at: [^\n]+/gi, '');
  cleaned = cleaned.replace(/Crawled at: [^\n]+/gi, '');
  cleaned = cleaned.replace(/#[A-Za-z0-9]+/g, ''); // Remove hashtags
  cleaned = cleaned.replace(/Binance Important Notice/gi, ''); // Remove specific prefixes
  
  // Clean up extra whitespace and newlines
  cleaned = cleaned.replace(/\n+/g, ' ').trim();
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  // Remove trailing punctuation if it's just metadata remnants
  cleaned = cleaned.replace(/[|•\-\s:]+$/g, '');
  
  // Capitalize first letter and ensure proper sentence structure
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  
  return cleaned.trim();
};

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
  const generateAIInsight = async () => {
    if (news.length === 0) return;
    
    setIsGenerating(true);
    setAiInsight("");
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coin: coin,
          newsData: news.slice(0, 10), // Kirim 10 berita terbaru saja agar hemat token
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Jalankan efek pengetikan untuk hasil dari AI asli
      let currentIndex = 0;
      const fullText = data.result;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setAiInsight(fullText.slice(0, currentIndex));
          currentIndex += 3; // Menambah 3 karakter per tick agar animasi terasa jauh lebih cepat
        } else {
          clearInterval(typingInterval);
          setIsGenerating(false);
        }
      }, 10); // Interval dipercepat ke 10ms (sebelumnya 15ms)

    } catch (error) {
      setAiInsight("[ERROR: AI_LINK_FAILURE] - Connection to Neural Network lost.");
      setIsGenerating(false);
    }
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
              
              <div className="p-6 h-[400px] flex flex-col relative">
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
                  <>
                    <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar mb-4">
                      <div className="space-y-1">
                        {parseAIResponse(aiInsight)}
                        {isGenerating && (
                          <div className="flex items-center gap-1 mt-4">
                            <span className="text-[#ff0000] font-bold animate-pulse">_</span>
                            <span className="text-[#ff0000] text-xs">PROCESSING NEURAL DATA...</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {aiInsight && !isGenerating && (
                      <div className="border-t border-[#ff000040] pt-4 mt-auto flex justify-end">
                        <button 
                          onClick={() => {
                            const tweetText = `Alpha Detected for $${coin}! 📡\n\n${aiInsight.split('\n')[0].replace(/### /g, '')}\n\nAnalyze with Mail Man:`;
                            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.href)}`;
                            window.open(shareUrl, '_blank');
                          }}
                          className="flex items-center gap-2 border border-[#ff0000] bg-[#ff000020] px-4 py-2 text-[10px] font-bold text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-black tracking-widest uppercase shadow-[0_0_10px_rgba(255,0,0,0.1)]"
                        >
                          <Share2 className="h-3 w-3" />
                          Broadcast Alpha
                        </button>
                      </div>
                    )}
                  </>
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
                        {cleanNewsText(item.text.split('\n')[0])}
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