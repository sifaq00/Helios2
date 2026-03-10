import { NextResponse } from "next/server";

const MAX_RETRIES = 2; // Mengikuti pola retry dari sistem 6551
const AI_TIMEOUT = 15000; // AI butuh waktu lebih lama (15 detik) untuk berpikir

export async function POST(request: Request) {
  try {
    const { coin, newsData } = await request.json();
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterKey) {
      console.error("[MAIL_MAN_AI] Critical Error: OPENROUTER_API_KEY missing.");
      return NextResponse.json({ error: "API_KEY_NOT_FOUND" }, { status: 500 });
    }

    const newsContext = newsData.map((n: any) => `- ${n.text}`).join("\n");
    const prompt = `Analyze this for ${coin}: \n${newsContext} \nFormat: [SYSTEM SYNTHESIS INITIALIZED], SENTIMENT OVERVIEW, KEY DRIVERS, ALPHA SIGNAL. Professional hacker persona.`;

    let lastError: any;

    // ==========================================
    // FAIL-SAFE NEURAL LINK (RETRY LOGIC)
    // ==========================================
    for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT);

      try {
        const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Mail Man Terminal",
          },
          body: JSON.stringify({
            model: "mistralai/mistral-small-24b-instruct-2501",
            messages: [{ role: "user", content: prompt }],
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          return NextResponse.json({ result: aiData.choices[0].message.content });
        }

        const errorText = await aiResponse.text();
        console.warn(`[MAIL_MAN_AI] Attempt ${attempt} rejected:`, errorText);
      } catch (error: any) {
        clearTimeout(timeoutId);
        lastError = error;
        console.warn(`[MAIL_MAN_AI] Attempt ${attempt} connection drop: ${error.message}`);
      }

      // Jeda sebelum mencoba lagi jika gagal
      if (attempt <= MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    throw lastError || new Error("NEURAL_LINK_EXHAUSTED");

  } catch (error: any) {
    console.error("[MAIL_MAN_AI] Final Synthesis Failure:", error.message);
    return NextResponse.json(
      { error: "AI_UPLINK_FAILED", details: "Neural link timeout. Check connection." }, 
      { status: 500 }
    );
  }
}