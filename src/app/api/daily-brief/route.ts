import { NextResponse } from "next/server";

const OPENNEWS_API_BASE = "https://ai.6551.io";
const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";

export async function GET() {
  const token = process.env.OPENNEWS_API_TOKEN;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (!token || !openRouterKey) {
    return NextResponse.json({ error: "AUTH_KEYS_MISSING" }, { status: 500 });
  }

  try {
    // 1. Fetch data berita (limit dikurangi untuk stabilitas)
    const res = await fetch(`${OPENNEWS_API_BASE}/open/news_search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 40, page: 1 }),
    });

    if (!res.ok) throw new Error(`UPLINK_FAILURE: ${res.status}`);
    const newsData = await res.json();
    
    // 2. Ekstrak teks berita
    const articles = newsData.data || [];
    const context = articles.slice(0, 15).map((a: any) => `- [${a.newsType}] ${a.text}`).join("\n");

    const prompt = `Analyze these latest crypto news and generate a concise daily intelligence report:
    
    ${context}

    Strictly follow this output format (Cyberpunk/Professional tone):
    [DAILY CRYPTO BRIEF - ${new Date().toLocaleDateString()}]
    
    TOP_NEWS: (Focus on the most impactful headline)
    TOP_NARRATIVE: (The dominant market theme detected)
    MOST_MENTIONED: (The asset with highest mention count)
    MARKET_VIBE: (1-sentence cold sentiment analysis)
    
    DO NOT ask for more information. Just analyze the provided text above.`;

    // 3. Neural Synthesis dengan model yang lebih pintar (Gemini 2.0 Flash)
    const aiRes = await fetch(OPENROUTER_API_BASE, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mail Man Terminal"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001", 
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      }),
    });

    const aiJson = await aiRes.json();

    // PERBAIKAN: Cek apakah choices ada sebelum mengakses index [0]
    if (aiJson && aiJson.choices && aiJson.choices.length > 0) {
      const brief = aiJson.choices[0].message.content;
      return NextResponse.json({ success: true, brief });
    } else {
      // Jika OpenRouter kirim error (misal credit 402 atau rate limit)
      console.error("[MAIL_MAN_AI] OpenRouter Response Error:", aiJson);
      const errorMsg = aiJson.error?.message || "NEURAL_LINK_INVALID_RESPONSE";
      return NextResponse.json({ error: "AI_OFFLINE", detail: errorMsg }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[MAIL_MAN_BRIEF] Execution Failure:", error.message);
    return NextResponse.json({ error: "BRIEF_GENERATION_FAILED" }, { status: 500 });
  }
}