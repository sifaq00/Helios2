import { NextResponse } from "next/server";

const MAX_RETRIES = 2;
const AI_TIMEOUT = 15000;
const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";

function buildFallbackSynthesis(coin: string, newsData: any[]): string {
  const bullish = newsData.filter((n) => n.aiRating?.signal === "bullish" || n.aiRating?.signal === "long").length;
  const bearish = newsData.filter((n) => n.aiRating?.signal === "bearish" || n.aiRating?.signal === "short").length;
  const avgScore =
    newsData.length > 0 ? (newsData.reduce((a: number, c: any) => a + (c.aiRating?.score || 5), 0) / newsData.length).toFixed(1) : "5.0";
  const sentiment = bullish > bearish ? "Bullish" : bearish > bullish ? "Bearish" : "Neutral";
  const topText = newsData[0]?.text?.slice(0, 120) || "Market active, no dominant catalyst";
  return `[SYSTEM SYNTHESIS INITIALIZED]\n\n### SENTIMENT OVERVIEW\n${sentiment} lean for $${coin}. ${bullish} bullish vs ${bearish} bearish of ${newsData.length} signals. Avg impact ${avgScore}/10. ${sentiment === "Bullish" ? "Momentum building, institutional flow uptick." : sentiment === "Bearish" ? "Risk-off pressure, watch breakdown." : "Consolidation phase, wait for catalyst."}\n\n### KEY DRIVERS\n- **Primary:** ${topText}\n- **Flow:** ${bullish > 2 ? "Accumulation detected across multiple feeds" : bearish > 2 ? "Distribution pressure noted" : "Mixed flow, no clear directional bias"}\n- **Risk:** ${bearish > 0 ? "Downside headlines present, manage position size" : "No immediate red flags in sampled news"}\n\n### ALPHA SIGNAL\n${sentiment === "Bullish" ? `Bias LONG $${coin} on continuation, invalidation if bearish headline spikes. Track volume confirmation.` : sentiment === "Bearish" ? `Bias SHORT/CAUTION $${coin}, avoid chasing. Wait for support reclaim.` : `Neutral range for $${coin}. Scalp within levels, avoid breakout FOMO until volume confirms.`}\n\n*Fallback synthesis - LLM offline, generated from keyword scoring.*`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { coin, newsData } = body;

    if (!coin || !Array.isArray(newsData) || newsData.length === 0) {
      return NextResponse.json({ error: "INVALID_PAYLOAD", details: "coin and newsData[] required" }, { status: 400 });
    }

    // Validate newsData has text
    const validNews = newsData.filter((n: any) => n && typeof n.text === "string" && n.text.trim().length > 5);
    if (validNews.length === 0) {
      return NextResponse.json({ error: "NO_VALID_NEWS", details: "No valid news text provided" }, { status: 400 });
    }

    const newsContext = validNews
      .slice(0, 10)
      .map((n: any) => `- ${n.text.slice(0, 250)} [${n.aiRating?.signal || "neutral"}|${n.aiRating?.score || 5}]`)
      .join("\n");

    const prompt = `You are HELIOS Neural Engine, a crypto intelligence synthesizer. Analyze these ${validNews.length} news for $${coin}:\n${newsContext}\n\nOutput strictly in this format:\n[SYSTEM SYNTHESIS INITIALIZED]\n\n### SENTIMENT OVERVIEW\n(one paragraph, 2-3 sentences: overall bullish/bearish/neutral + why)\n\n### KEY DRIVERS\n- **Driver 1:** ...\n- **Driver 2:** ...\n- **Driver 3:** ...\n\n### ALPHA SIGNAL\n(one actionable paragraph: bias long/short/neutral, entry/invalidation, what to monitor)\n\nBe concise, hacker terminal style, no disclaimer, no financial advice footer.`;

    // Resolve LLM config with fallback chain: LLM_API_* -> OpenRouter -> fallback
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const hasOpenRouter = !!(openRouterKey && openRouterKey.trim().length > 10);
    const llmUrlPrimary = process.env.LLM_API_URL || "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions";
    const llmKeyPrimary = process.env.LLM_API_KEY || "";
    const llmModelPrimary = process.env.LLM_MODEL || "mimo-v2.5";

    // Build ordered attempt list
    const attempts: { url: string; key: string; model: string; name: string }[] = [];
    if (llmKeyPrimary) attempts.push({ url: llmUrlPrimary, key: llmKeyPrimary, model: llmModelPrimary, name: "MIMO" });
    if (hasOpenRouter) attempts.push({ url: OPENROUTER_API_BASE, key: openRouterKey!, model: "meta-llama/llama-3.1-8b-instruct", name: "OpenRouter" });

    if (attempts.length === 0) {
      console.warn("[HELIOS_AI] No LLM keys, returning fallback synthesis");
      return NextResponse.json({ result: buildFallbackSynthesis(coin, validNews), fallback: true });
    }

    let lastError: any = null;
    let lastErrorText = "";

    for (const target of attempts) {
      for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT);
        try {
          const res = await fetch(target.url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${target.key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: target.model,
              messages: [{ role: "user", content: prompt }],
              max_tokens: target.name === "MIMO" ? 800 : 600,
              temperature: 0.3,
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning_content;
            if (content && content.trim().length > 30) {
              return NextResponse.json({ result: content });
            }
            lastErrorText = `Empty content from ${target.name}`;
            console.warn(`[HELIOS_AI] ${target.name} empty content`);
          } else {
            const txt = await res.text();
            lastErrorText = txt.slice(0, 500);
            console.warn(`[HELIOS_AI] ${target.name} attempt ${attempt} rejected ${res.status}:`, lastErrorText);
            lastError = new Error(`${target.name} ${res.status}: ${lastErrorText}`);
            // Don't retry on 400/401/402 (auth/model error) - switch target
            if (res.status === 401 || res.status === 402 || res.status === 400) break;
          }
        } catch (e: any) {
          clearTimeout(timeoutId);
          lastError = e;
          lastErrorText = e.message;
          console.warn(`[HELIOS_AI] ${target.name} attempt ${attempt} drop:`, e.message);
          if (e.name === "AbortError") lastErrorText = "Timeout 15s";
        }
        if (attempt <= MAX_RETRIES) await new Promise((r) => setTimeout(r, 1500));
      }
    }

    // All LLM attempts failed -> return fallback synthesis with 200 so UI still shows data
    console.warn("[HELIOS_AI] All LLM failed, returning fallback. Last:", lastErrorText);
    return NextResponse.json({
      result: buildFallbackSynthesis(coin, validNews),
      fallback: true,
      warning: `LLM offline (${lastErrorText?.slice(0, 100) || "timeout"}), showing cached synthesis`,
    });
  } catch (error: any) {
    console.error("[HELIOS_AI] Final failure:", error.message);
    // Try to still return fallback if we have coin/newsData
    try {
      const body = await request.clone().json().catch(() => ({}));
      if (body.coin && Array.isArray(body.newsData) && body.newsData.length) {
        return NextResponse.json({
          result: buildFallbackSynthesis(body.coin, body.newsData),
          fallback: true,
          warning: "Neural link error, fallback synthesis",
        });
      }
    } catch {}
    return NextResponse.json({ error: "AI_UPLINK_FAILED", details: error.message }, { status: 500 });
  }
}
