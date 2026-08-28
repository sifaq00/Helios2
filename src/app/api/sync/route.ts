import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";
const SYNC_SECRET = "helios-admin-2026";

const RSS_FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cointelegraph.com/rss",
  "https://decrypt.co/feed",
];

function parseRSSItems(xml: string, source: string): any[] {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = (block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) || block.match(/<title>([\s\S]*?)<\/title>/i))?.[1]?.trim() || "";
    const description = (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || block.match(/<description>([\s\S]*?)<\/description>/i))?.[1]?.replace(/<[^>]+>/g, '').trim().slice(0, 200) || "";
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || new Date().toISOString();
    const text = `${title}. ${description}`.trim();
    if (!text || text.length < 10) continue;
    const coins = extractCoins(text);
    items.push({ text, coins, source, ts: new Date(pubDate).toISOString() });
  }
  return items;
}

function extractCoins(text: string): { symbol: string }[] {
  const symbols = ["BTC", "ETH", "SOL", "XRP", "ADA", "DOGE", "AVAX", "DOT", "LINK", "MATIC", "ARB", "OP", "SUI", "APT", "BNB", "USDT", "USDC"];
  const found = new Set<string>();
  const upper = text.toUpperCase();
  for (const sym of symbols) {
    if (upper.includes(`$${sym}`) || upper.includes(`${sym} `) || upper.includes(`${sym}/`) || upper.includes(`${sym},`) || upper.includes(`${sym}.`) || upper.match(new RegExp(`\\b${sym}\\b`))) {
      found.add(sym);
    }
  }
  return found.size > 0 ? [...found].map(s => ({ symbol: s })) : [{ symbol: "GENERIC" }];
}

async function fetchRSS(url: string): Promise<any[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "HELIOS/2.0 RSS Reader" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSSItems(xml, new URL(url).hostname);
  } catch { return []; }
}

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    if (secret !== SYNC_SECRET) {
      return NextResponse.json({ error: "UNAUTHORIZED_UPLINK" }, { status: 401 });
    }

    console.log("[SYNC_ENGINE] Initiating Protocol. Fetching RSS feeds...");

    // 1. FETCH RSS
    const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
    let articles = results.flat();
    console.log(`[SYNC_ENGINE] Fetched ${articles.length} articles from RSS`);

    // Filter English only, sort by date, take top 50
    articles = articles
      .filter((a: any) => !/[^\x00-\x7F]/.test(a.text.slice(0, 50)))
      .sort((a: any, b: any) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, 50);

    // Score each article (keyword-based)
    articles = articles.map((a: any) => {
      const t = a.text.toLowerCase();
      let score = 5;
      let signal = "neutral";
      if (t.match(/surge|rally|break|soar|pump|bull|ATH|record high/)) { score = 8; signal = "bullish"; }
      else if (t.match(/crash|dump|bear|plunge|drop|sell|hack|exploit|ban/)) { score = 8; signal = "bearish"; }
      else if (t.match(/SEC|regulat|ETF|law|bill|gov/)) { score = 7; signal = "neutral"; }
      else if (t.match(/AI|agent|model|GPT|LLM/)) { score = 7; signal = "bullish"; }
      else if (t.match(/DeFi|yield|staking|TVL/)) { score = 6; signal = "bullish"; }
      else if (t.match(/upgrade|launch|partnership|adoption/)) { score = 7; signal = "bullish"; }
      return { ...a, aiRating: { score, signal } };
    });

    // Fallback dummy jika semua RSS gagal
    if (articles.length === 0) {
      console.log("[SYNC_ENGINE] All RSS failed, using dummy");
      articles = [
        { text: "Bitcoin breaks $120k on institutional ETF inflows", coins: [{ symbol: "BTC" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date().toISOString() },
        { text: "Ethereum Dencun upgrade reduces L2 fees by 90%", coins: [{ symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now()-10*60*1000).toISOString() },
        { text: "Solana DEX volume flips Ethereum amid meme surge", coins: [{ symbol: "SOL" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date(Date.now()-15*60*1000).toISOString() },
        { text: "SEC delays altcoin ETF decisions, market neutral", coins: [{ symbol: "GENERIC" }], aiRating: { score: 5, signal: "neutral" }, ts: new Date(Date.now()-20*60*1000).toISOString() },
        { text: "Fed signals rate cut, risk assets rally", coins: [{ symbol: "BTC" }, { symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now()-25*60*1000).toISOString() },
      ];
    }

    // ==========================================
    // MODULE A: NEWS FEED
    // ==========================================
    const newsFeed = articles.slice(0, 30);

    // ==========================================
    // MODULE B: VIRAL RADAR (mention count based)
    // ==========================================
    const stats: Record<string, number> = {};
    articles.forEach((item: any) => {
      if (!item.coins) return;
      item.coins.forEach((coin: any) => {
        const sym = coin.symbol;
        stats[sym] = (stats[sym] || 0) + 1;
      });
    });

    const viralRadar = Object.entries(stats)
      .map(([symbol, count]) => ({
        symbol,
        currentPings: count,
        baselinePings: Math.round(count * 0.5),
        growth: count >= 2 ? Math.round((count / Math.max(count * 0.5, 1)) * 100) : 0,
        status: count >= 4 ? "VIRAL_ANOMALY" : "STABLE"
      }))
      .filter(a => a.currentPings >= 2)
      .sort((a, b) => b.currentPings - a.currentPings)
      .slice(0, 5);

    // ==========================================
    // MODULE C & D: AI SYNTHESIS
    // ==========================================
    console.log("[SYNC_ENGINE] Engaging Neural Network...");
    
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const hasOpenRouter = !!(openRouterKey && openRouterKey.trim().length > 10);
    const llmUrl = hasOpenRouter ? OPENROUTER_API_BASE : (process.env.LLM_API_URL || OPENROUTER_API_BASE);
    const llmKey = hasOpenRouter ? openRouterKey : (process.env.LLM_API_KEY || "");
    const llmModel = hasOpenRouter ? "meta-llama/llama-3.1-8b-instruct" : (process.env.LLM_MODEL || "mimo-v2.5");
    const isMimo = llmUrl.includes('xiaomimimo');
    
    const alphaContext = articles.slice(0, 10).map((s: any) => `[${s.coins?.[0]?.symbol || "GENERIC"} | info]: ${s.text}`).join("\n");
    const briefContext = articles.slice(0, 15).map((a: any) => `- ${a.text}`).join("\n");

    const [alphaRes, briefRes] = await Promise.all([
      fetch(llmUrl, {
        method: "POST",
        headers: { "Authorization": `Bearer ${llmKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: llmModel,
          messages: [{ role: "user", content: `Analyze these crypto news. For each, output one line as [SYMBOL | bullish/bearish/neutral]: headline\n\n${alphaContext}` }],
          max_tokens: isMimo ? 800 : 300, temperature: 0.1
        })
      }),
      fetch(llmUrl, {
        method: "POST",
        headers: { "Authorization": `Bearer ${llmKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: llmModel,
          messages: [{ role: "user", content: `Analyze these crypto news and output strictly 4 lines:\nTOP_NEWS: ...\nTOP_NARRATIVE: ...\nMOST_MENTIONED: ...\nMARKET_VIBE: ...\n\n${briefContext}` }],
          max_tokens: isMimo ? 800 : 200, temperature: 0.2
        })
      })
    ]);

    const alphaJson = await alphaRes.json();
    const briefJson = await briefRes.json();
    console.log("[SYNC_ENGINE] Alpha raw:", JSON.stringify(alphaJson).slice(0, 800));
    console.log("[SYNC_ENGINE] Brief raw:", JSON.stringify(briefJson).slice(0, 800));

    const alphaText = alphaJson.choices?.[0]?.message?.content || alphaJson.choices?.[0]?.message?.reasoning_content || "";
    const alphaSignals = alphaText.split('\n').filter((l: string) => l.includes('|') && !/[^\x00-\x7F]/.test(l));
    const finalAlpha = alphaSignals.length ? alphaSignals : alphaContext.split('\n').filter(Boolean);
    let dailyBrief = briefJson.choices?.[0]?.message?.content || briefJson.choices?.[0]?.message?.reasoning_content || "";
    if (!dailyBrief || dailyBrief.length < 20) dailyBrief = "TOP_NEWS: RSS feeds synced\nTOP_NARRATIVE: Crypto market active\nMOST_MENTIONED: BTC, ETH\nMARKET_VIBE: Bullish";

    // ==========================================
    // MODULE E: UPSERT TO SUPABASE
    // ==========================================
    console.log("[SYNC_ENGINE] Uploading to Supabase DB...");
    const { error: dbError } = await supabase.from('terminal_cache').upsert([
      { id: 'news_feed', payload: newsFeed },
      { id: 'viral_radar', payload: viralRadar },
      { id: 'alpha_signals', payload: finalAlpha },
      { id: 'daily_brief', payload: { brief: dailyBrief } }
    ]);

    if (dbError) throw new Error(`Supabase Error: ${dbError.message}`);
    console.log("[SYNC_ENGINE] Protocol Complete. DB Updated.");
    return NextResponse.json({ success: true, message: "CACHE_UPDATED", stats: { articles: newsFeed.length, viral: viralRadar.length, signals: finalAlpha.length } });

  } catch (error: any) {
    console.error("[SYNC_ENGINE] CRITICAL FAILURE:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
