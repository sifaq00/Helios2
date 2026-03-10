import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get("coin");

    const { data, error } = await supabase
      .from('terminal_cache')
      .select('payload')
      .eq('id', 'news_feed')
      .single();

    if (error || !data) throw error;

    let news = data.payload || [];

    // Local filtering: Jika user mencari koin spesifik di Search Bar
    if (coin) {
      const query = coin.toUpperCase();
      news = news.filter((item: any) => 
        item.coins?.some((c: any) => c.symbol.toUpperCase() === query) ||
        (item.text && item.text.toUpperCase().includes(query))
      );
    }

    return NextResponse.json(news);
  } catch (e: any) {
    console.error("[DB_UPLINK_ERROR]", e.message);
    return NextResponse.json({ error: "DB_OFFLINE", msg: e.message }, { status: 500 });
  }
}