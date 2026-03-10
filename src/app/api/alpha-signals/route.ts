import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from('terminal_cache')
    .select('payload')
    .eq('id', 'alpha_signals')
    .single();

  if (error || !data) return NextResponse.json([]);
  
  return NextResponse.json(data.payload);
}