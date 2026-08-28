import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get("coin");
    const search = searchParams.get("search") || searchParams.get("q");
    const signal = searchParams.get("signal");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");
    const sort = searchParams.get("sort") || "desc"; // desc | asc

    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 50, 1), 100) : 50;
    const offset = offsetParam ? Math.max(parseInt(offsetParam, 10) || 0, 0) : 0;

    const { data, error } = await supabase
      .from("terminal_cache")
      .select("payload, updated_at")
      .eq("id", "news_feed")
      .single();

    if (error || !data) {
      console.warn("[NEWS_API] DB miss:", error?.message);
      return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
    }

    let news: any[] = Array.isArray(data.payload) ? data.payload : [];

    // Sort by ts desc by default (freshest first)
    news = [...news].sort((a, b) => {
      const ta = new Date(a.ts).getTime() || 0;
      const tb = new Date(b.ts).getTime() || 0;
      return sort === "asc" ? ta - tb : tb - ta;
    });

    const totalBeforeFilter = news.length;

    // Coin filter - matches coins array OR text contains symbol
    if (coin) {
      const query = coin.toUpperCase().trim();
      if (query && query !== "ALL" && query !== "GENERIC") {
        news = news.filter(
          (item: any) =>
            item.coins?.some((c: any) => c.symbol.toUpperCase() === query) ||
            item.text?.toUpperCase().includes(query) ||
            item.title?.toUpperCase().includes(query)
        );
      } else if (query === "GENERIC") {
        // explicitly filter generic only if requested
        news = news.filter((item: any) => item.coins?.some((c: any) => c.symbol === "GENERIC"));
      }
    }

    // Signal filter
    if (signal) {
      const s = signal.toLowerCase();
      if (["bullish", "bearish", "neutral", "long", "short"].includes(s)) {
        news = news.filter((item: any) => item.aiRating?.signal?.toLowerCase() === s);
      }
    }

    // Text search
    if (search) {
      const q = search.toLowerCase();
      news = news.filter(
        (item: any) =>
          item.text?.toLowerCase().includes(q) ||
          item.title?.toLowerCase().includes(q) ||
          item.coins?.some((c: any) => c.symbol.toLowerCase().includes(q))
      );
    }

    const totalAfterFilter = news.length;

    // Pagination slice
    const paginated = news.slice(offset, offset + limit);
    const hasMore = offset + limit < totalAfterFilter;

    // Only return envelope if explicitly requested via ?meta=1 (asset/[coin] expects plain array)
    const wantsMeta = searchParams.get("meta") === "1";

    if (wantsMeta) {
      return NextResponse.json(
        {
          data: paginated,
          meta: {
            total: totalAfterFilter,
            totalBeforeFilter,
            limit,
            offset,
            hasMore,
            count: paginated.length,
            updatedAt: (data as any).updated_at || null,
          },
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
            "X-Total-Count": String(totalAfterFilter),
          },
        }
      );
    }

    // Legacy: return array directly (terminal/page.tsx expects array for /api/news?coin=BTC)
    // But still respect limit/offset slicing even in legacy mode
    return NextResponse.json(paginated, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "X-Total-Count": String(totalAfterFilter),
        "X-Has-More": String(hasMore),
      },
    });
  } catch (e: any) {
    console.error("[DB_UPLINK_ERROR]", e.message);
    // Fail soft - return empty array so UI not crash
    return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
