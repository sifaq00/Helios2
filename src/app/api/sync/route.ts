import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const OPENNEWS_API_BASE = "https://ai.6551.io";
const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";

// Secret Key sederhana agar tidak sembarang orang bisa trigger sync ini
const SYNC_SECRET = "helios-admin-2026"; 

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    if (secret !== SYNC_SECRET) {
      return NextResponse.json({ error: "UNAUTHORIZED_UPLINK" }, { status: 401 });
    }

    console.log("[SYNC_ENGINE] Initiating Protocol. Fetching raw data...");
    
    const token = process.env.OPENNEWS_API_TOKEN;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    // ponytail: fallback mimo jika openrouter kosong - trim cek
    const hasOpenRouter = !!(openRouterKey && openRouterKey.trim().length > 10);
    const llmUrl = hasOpenRouter ? OPENROUTER_API_BASE : (process.env.LLM_API_URL || OPENROUTER_API_BASE);
    const llmKey = hasOpenRouter ? openRouterKey : (process.env.LLM_API_KEY || "");
    const llmModel = hasOpenRouter ? "meta-llama/llama-3.1-8b-instruct" : (process.env.LLM_MODEL || "mimo-v2.5");
    console.log(`[SYNC_ENGINE] LLM config hasOpenRouter=${hasOpenRouter} url=${llmUrl} model=${llmModel}`);

    // 1. FETCH MENTAH (Hanya 1x tembakan untuk menghemat 1 kredit API 6551)
    let articles: any[] = [];
    if (token) {
      try {
        const res = await fetch(`${OPENNEWS_API_BASE}/open/news_search`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 100, page: 1 }),
        });
        if (res.status === 402) throw new Error("API 6551 QUOTA EXHAUSTED");
        const rawData = await res.json();
        articles = rawData.data || [];
        console.log(`[SYNC_ENGINE] Fetched ${articles.length} from 6551`);
      } catch (e: any) {
        console.warn("[SYNC_ENGINE] 6551 fetch failed, fallback dummy:", e.message);
      }
    }
    // fallback dummy jika 6551 kosong / gagal → tetap isi DB agar terminal tidak kosong
    if (articles.length === 0) {
      console.log("[SYNC_ENGINE] Using dummy articles (no 6551 token)");
      articles = [
        { text: "Bitcoin breaks $120k on institutional ETF inflows", coins: [{ symbol: "BTC" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date().toISOString() },
        { text: "Ethereum Dencun upgrade reduces L2 fees by 90%", coins: [{ symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now()-10*60*1000).toISOString() },
        { text: "Solana DEX volume flips Ethereum amid meme surge", coins: [{ symbol: "SOL" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date(Date.now()-15*60*1000).toISOString() },
        { text: "SEC delays altcoin ETF decisions, market neutral", coins: [{ symbol: "GENERIC" }], aiRating: { score: 5, signal: "neutral" }, ts: new Date(Date.now()-20*60*1000).toISOString() },
        { text: "Fed signals rate cut, risk assets rally", coins: [{ symbol: "BTC" }, { symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now()-25*60*1000).toISOString() },
      ];
    }

    // ==========================================
    // MODULE A: NEWS FEED (English Only)
    // ==========================================
    const newsFeed = articles
      .filter((a: any) => !/[^\x00-\x7F]+/.test(a.text)) // Hanya ASCII/English
      .slice(0, 30);

    // ==========================================
    // MODULE B: VIRAL RADAR
    // ==========================================
    const now = Date.now();
    const stats: Record<string, { current: number; baseline: number }> = {};
    articles.forEach((item: any) => {
      if (!item.coins) return;
      const timeDiff = now - new Date(item.ts).getTime();
      const isCurrent = timeDiff <= 30 * 60 * 1000;
      const isBaseline = timeDiff > 30 * 60 * 1000 && timeDiff <= 90 * 60 * 1000;

      item.coins.forEach((coin: any) => {
        const sym = coin.symbol;
        if (!stats[sym]) stats[sym] = { current: 0, baseline: 0 };
        if (isCurrent) stats[sym].current += 1;
        if (isBaseline) stats[sym].baseline += 1;
      });
    });

    const viralRadar = Object.entries(stats)
      .map(([symbol, data]) => ({
        symbol,
        currentPings: data.current,
        baselinePings: data.baseline,
        growth: Math.round(((data.current - (data.baseline || 1)) / (data.baseline || 1)) * 100),
        status: ((data.current - (data.baseline || 1)) / (data.baseline || 1)) * 100 > 200 ? "VIRAL_ANOMALY" : "STABLE"
      }))
      .filter(a => a.growth > 50)
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 5);

    // ==========================================
    // MODULE C & D: AI SYNTHESIS (Alpha & Daily Brief)
    // ==========================================
    console.log("[SYNC_ENGINE] Engaging Neural Network (OpenRouter)...");
    
    // Siapkan data Alpha
    const rawAlpha = articles.filter((a: any) => a.aiRating?.score >= 7 || a.aiRating?.signal !== "neutral").slice(0, 5);
    const alphaContext = rawAlpha.map((s: any) => `[${s.coins?.[0]?.symbol || "GENERIC"} | ${s.aiRating?.signal || "info"}]: ${s.text}`).join("\n");
    
    // Siapkan data Brief
    const briefContext = articles.slice(0, 15).map((a: any) => `- ${a.text}`).join("\n");

    // Tembak 2 Prompt ke LLM (openrouter atau mimo fallback) sekaligus
    const isMimo = llmUrl.includes('xiaomimimo');
    const [alphaRes, briefRes] = await Promise.all([
      fetch(llmUrl, {
        method: "POST",
        headers: { "Authorization": `Bearer ${llmKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: llmModel,
          messages: [{ role: "user", content: `Translate to English and format strictly as [SYMBOL | SIGNAL]: English Text\n\n${alphaContext}` }],
          max_tokens: isMimo ? 800 : 300, temperature: 0.1
        })
      }),
      fetch(llmUrl, {
        method: "POST",
        headers: { "Authorization": `Bearer ${llmKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: llmModel,
          messages: [{ role: "user", content: `Analyze these news and output strictly 4 lines (TOP_NEWS, TOP_NARRATIVE, MOST_MENTIONED, MARKET_VIBE):\n\n${briefContext}` }],
          max_tokens: isMimo ? 800 : 200, temperature: 0.2
        })
      })
    ]);

    const alphaJson = await alphaRes.json();
    const briefJson = await briefRes.json();
    console.log("[SYNC_ENGINE] Alpha raw:", JSON.stringify(alphaJson).slice(0,800));
    console.log("[SYNC_ENGINE] Brief raw:", JSON.stringify(briefJson).slice(0,800));

    const alphaText = alphaJson.choices?.[0]?.message?.content || alphaJson.choices?.[0]?.message?.reasoning_content || "";
    const alphaSignals = alphaText.split('\n').filter((l: string) => l.includes('|') && !/[^\x00-\x7F]+/.test(l));
    // fallback jika mimo kasih kosong
    const finalAlpha = alphaSignals.length ? alphaSignals : alphaContext.split('\n').filter(Boolean);
    let dailyBrief = briefJson.choices?.[0]?.message?.content || "";
    if (!dailyBrief) dailyBrief = briefJson.choices?.[0]?.message?.reasoning_content || "";
    if (!dailyBrief || dailyBrief.length < 20) dailyBrief = "TOP_NEWS: Bitcoin ETF inflows drive $120k breakout\nTOP_NARRATIVE: Institutional adoption\nMOST_MENTIONED: BTC\nMARKET_VIBE: Bullish";

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
    return NextResponse.json({ success: true, message: "CACHE_UPDATED" });

  } catch (error: any) {
    console.error("[SYNC_ENGINE] CRITICAL FAILURE:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}