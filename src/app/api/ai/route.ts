import { NextResponse } from "next/server";

const MAX_RETRIES = 2; // Mengikuti pola retry dari sistem 6551
const AI_TIMEOUT = 15000; // AI butuh waktu lebih lama (15 detik) untuk berpikir

export async function POST(request: Request) {
  try {
    const { coin, newsData } = await request.json();
    const llmUrl = process.env.LLM_API_URL || "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions";
    const llmKey = process.env.LLM_API_KEY;

    if (!llmKey) {
      console.error("[HELIOS_AI] Critical Error: LLM_API_KEY missing.");
      return NextResponse.json({ error: "API_KEY_NOT_FOUND" }, { status: 500 });
    }

    const newsContext = newsData.map((n: any) => `- ${n.text}`).join("\n");
    const prompt = `Analyze this for ${coin}: \n${newsContext} \nFormat: [SYSTEM SYNTHESIS INITIALIZED], SENTIMENT OVERVIEW, KEY DRIVERS, ALPHA SIGNAL. Professional hacker persona.`;

    let lastError: any;

    for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT);

      try {
        const aiResponse = await fetch(llmUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${llmKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mimo-v2-flash",
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