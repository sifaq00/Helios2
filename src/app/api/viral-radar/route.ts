import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('terminal_cache')
      .select('payload')
      .eq('id', 'viral_radar')
      .single();

    if (error || !data) {
      return NextResponse.json({ active_anomalies: [] });
    }
    
    return NextResponse.json({ active_anomalies: data.payload });
  } catch (e: any) {
    console.error("[RADAR_DB_ERROR]", e.message);
    return NextResponse.json({ active_anomalies: [] });
  }
}