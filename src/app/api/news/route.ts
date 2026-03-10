import { NextResponse } from "next/server";

const OPENNEWS_API_BASE = "https://ai.6551.io";
const MAX_RETRIES = 3; // Increased to 3 for better stability
const FETCH_TIMEOUT = 8000; // 8 seconds timeout per attempt

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Lowering limit slightly to 25 to reduce payload weight and prevent timeouts
  const limit = parseInt(searchParams.get("limit") || "25", 10);
  const coin = searchParams.get("coin");
  const signal = searchParams.get("signal");

  const token = process.env.OPENNEWS_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "SYSTEM_ERROR: AUTH_TOKEN_MISSING" },
      { status: 500 }
    );
  }

  const targetUrl = `${OPENNEWS_API_BASE}/open/news_search`;
  const body = JSON.stringify({
    limit: limit,
    page: 1,
    ...(coin && { coins: [coin] })
  });

  let lastError: any;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
        body: body,
        signal: controller.signal, // Attaching timeout signal
        cache: "no-store" 
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const jsonResponse = await response.json();
        let newsArray = jsonResponse.success && Array.isArray(jsonResponse.data) 
          ? jsonResponse.data 
          : [];

        if (signal) {
          newsArray = newsArray.filter((item: any) => item.aiRating?.signal === signal);
        }

        return NextResponse.json(newsArray);
      }
      
      console.warn(`[MAIL_MAN_SYS] Attempt ${attempt} failed with status: ${response.status}`);
    } catch (error: any) {
      clearTimeout(timeoutId);
      lastError = error;
      console.warn(`[MAIL_MAN_SYS] Attempt ${attempt} connection drop: ${error.name === 'AbortError' ? 'Timeout' : error.message}`);
    }

    // Exponential backoff: Wait longer after each failure (2s, 4s)
    if (attempt < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, attempt * 2000));
    }
  }

  return NextResponse.json(
    { error: "CONNECTION_FAILED", detail: "All uplink attempts exhausted." },
    { status: 503 }
  );
}