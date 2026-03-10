import { NextResponse } from "next/server";

const OPENNEWS_API_BASE = "https://ai.6551.io";

export async function GET() {
  const token = process.env.OPENNEWS_API_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "AUTH_TOKEN_MISSING" }, { status: 500 });
  }

  try {
    // 1. Fetch a large sample (100 items) to get enough data for time-series analysis
    const response = await fetch(`${OPENNEWS_API_BASE}/open/news_search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 100, page: 1 }),
    });

    const json = await response.json();
    const news = json.data || [];

    const now = Date.now();
    const windowMs = 30 * 60 * 1000; // 30 Minute Window for "Current"
    const baselineMs = 90 * 60 * 1000; // 90 Minute Window for "Baseline"

    const stats: Record<string, { current: number; baseline: number }> = {};

    // 2. Tally mentions based on timestamps
    news.forEach((item: any) => {
      if (!item.coins) return;
      
      const itemTime = new Date(item.ts).getTime();
      const isCurrent = now - itemTime <= windowMs;
      const isBaseline = now - itemTime > windowMs && now - itemTime <= baselineMs;

      item.coins.forEach((coin: any) => {
        const sym = coin.symbol;
        if (!stats[sym]) stats[sym] = { current: 0, baseline: 0 };
        
        if (isCurrent) stats[sym].current += 1;
        if (isBaseline) stats[sym].baseline += 1;
      });
    });

    // 3. Calculate Surge Percentage
    // Formula: ((Current - Baseline) / Baseline) * 100
    const anomalies = Object.entries(stats)
      .map(([symbol, data]) => {
        const baselineAdj = data.baseline || 1; // Prevent division by zero
        const growth = ((data.current - baselineAdj) / baselineAdj) * 100;
        
        return {
          symbol,
          currentPings: data.current,
          baselinePings: data.baseline,
          growth: Math.round(growth),
          status: growth > 200 ? "VIRAL_ANOMALY" : "STABLE"
        };
      })
      .filter(a => a.growth > 50) // Only show assets with > 50% growth
      .sort((a, b) => b.growth - a.growth);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      active_anomalies: anomalies.slice(0, 5), // Return top 5 viral spikes
      scan_depth: news.length
    });

  } catch (error: any) {
    return NextResponse.json({ error: "RADAR_OFFLINE", details: error.message }, { status: 500 });
  }
}