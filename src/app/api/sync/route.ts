import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const OPENNEWS_API_BASE = "https://ai.6551.io";
const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";

// Secret Key sederhana agar tidak sembarang orang bisa trigger sync ini
const SYNC_SECRET = "mailman-admin-2026"; 

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();
    if (secret !== SYNC_SECRET) {
      return NextResponse.json({ error: "UNAUTHORIZED_UPLINK" }, { status: 401 });
    }

    console.log("[SYNC_ENGINE] Initiating Protocol. Fetching raw data...");
    
    const token = process.env.OPENNEWS_API_TOKEN;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // 1. FETCH MENTAH (Hanya 1x tembakan untuk menghemat 1 kredit API 6551)
    const res = await fetch(`${OPENNEWS_API_BASE}/open/news_search`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 100, page: 1 }), // Ambil 100 berita sekaligus
    });

    if (res.status === 402) throw new Error("API 6551 QUOTA EXHAUSTED");
    const rawData = await res.json();
    const articles = rawData.data || [];

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

    // Tembak 2 Prompt ke OpenRouter sekaligus menggunakan Promise.all (Menghemat waktu render)
    const [alphaRes, briefRes] = await Promise.all([
      fetch(OPENROUTER_API_BASE, {
        method: "POST",
        headers: { "Authorization": `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [{ role: "user", content: `Translate to English and format strictly as [SYMBOL | SIGNAL]: English Text\n\n${alphaContext}` }],
          max_tokens: 300, temperature: 0.1
        })
      }),
      fetch(OPENROUTER_API_BASE, {
        method: "POST",
        headers: { "Authorization": `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [{ role: "user", content: `Analyze these news and output strictly 4 lines (TOP_NEWS, TOP_NARRATIVE, MOST_MENTIONED, MARKET_VIBE):\n\n${briefContext}` }],
          max_tokens: 200, temperature: 0.2
        })
      })
    ]);

    const alphaJson = await alphaRes.json();
    const briefJson = await briefRes.json();

    const alphaText = alphaJson.choices?.[0]?.message?.content || "";
    const alphaSignals = alphaText.split('\n').filter((l: string) => l.includes('|') && !/[^\x00-\x7F]+/.test(l));
    const dailyBrief = briefJson.choices?.[0]?.message?.content || "NEURAL_LINK_FAILED";

    // ==========================================
    // MODULE E: UPSERT TO SUPABASE
    // ==========================================
    console.log("[SYNC_ENGINE] Uploading to Supabase DB...");
    
    const { error: dbError } = await supabase.from('terminal_cache').upsert([
      { id: 'news_feed', payload: newsFeed },
      { id: 'viral_radar', payload: viralRadar },
      { id: 'alpha_signals', payload: alphaSignals },
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