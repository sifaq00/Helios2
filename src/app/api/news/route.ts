import { NextResponse } from "next/server";

const OPENNEWS_API_BASE = "https://ai.6551.io";
const MAX_RETRIES = 2; // Meniru best-practice dari klien Python bawaan

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Kita kembalikan limit default ke 30 agar lebih aman untuk server upstream
  const limit = parseInt(searchParams.get("limit") || "30", 10);
  const coin = searchParams.get("coin");
  const signal = searchParams.get("signal");

  const token = process.env.OPENNEWS_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "SYSTEM_ERROR: OPENNEWS_API_TOKEN is not configured in .env" },
      { status: 500 }
    );
  }

  try {
    const targetUrl = `${OPENNEWS_API_BASE}/open/news_search`;
    
    const body: any = {
      limit: limit,
      page: 1,
    };

    if (coin) {
      body.coins = [coin];
    }

    let response: Response | undefined;
    let lastError: any;

    // ==========================================
    // AUTO-RETRY MECHANISM (FAIL-SAFE)
    // ==========================================
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        response = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache", 
          },
          body: JSON.stringify(body),
          cache: "no-store" 
        });

        // Jika request sukses, keluar dari loop retry
        if (response.ok) {
          break; 
        }
        
        console.warn(`[MAIL_MAN_SYS] Upstream rejected (Attempt ${attempt + 1}/${MAX_RETRIES + 1}): Status ${response.status}`);
      } catch (error: any) {
        lastError = error;
        console.warn(`[MAIL_MAN_SYS] Connection drop (Attempt ${attempt + 1}/${MAX_RETRIES + 1}): ${error.message}`);
      }

      // Berikan jeda 1 detik sebelum mencoba lagi (mencegah rate-limit)
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Evaluasi hasil akhir setelah semua percobaan
    if (!response) {
      throw lastError || new Error("Failed to connect to upstream mainframe after multiple retries");
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[MAIL_MAN_SYS] Fatal Upstream API Error:", errorText);
      return NextResponse.json(
        { error: `UPSTREAM_ERROR: ${response.status}` },
        { status: response.status }
      );
    }

    const jsonResponse = await response.json();

    let newsArray = [];
    if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
        newsArray = jsonResponse.data;
    } else if (jsonResponse && jsonResponse.data && Array.isArray(jsonResponse.data.list)) {
         newsArray = jsonResponse.data.list;
    } else if (Array.isArray(jsonResponse)) {
         newsArray = jsonResponse;
    } else {
         newsArray = []; 
    }

    let processedData = newsArray;
    if (signal) {
      processedData = newsArray.filter((item: any) => item.aiRating?.signal === signal);
    }

    return NextResponse.json(processedData);

  } catch (error: any) {
    console.error("[MAIL_MAN_SYS] System Error:", error.message);
    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR", details: error.message },
      { status: 500 }
    );
  }
}