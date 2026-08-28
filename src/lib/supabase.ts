import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const databaseUrl = process.env.DATABASE_URL || '';

// ponytail: fallback pg pool when anon key missing, server API tetap jalan via DATABASE_URL
const hasSupabase = !!(supabaseUrl && supabaseKey && supabaseKey !== 'placeholder');

let pgPool: any = null;
function getPool() {
  if (pgPool) return pgPool;
  if (!databaseUrl) return null;
  // lazy require, pool hanya di server
  const { Pool } = require('pg');
  pgPool = new Pool({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  return pgPool;
}

function createPgMock() {
  return {
    from: (table: string) => ({
      select: (_cols?: string) => ({
        eq: (col: string, val: string) => ({
          single: async () => {
            const pool = getPool();
            if (!pool) return { data: null, error: { message: 'DB_OFFLINE' } };
            try {
              const res = await pool.query(`SELECT payload FROM ${table} WHERE id = $1`, [val]);
              if (res.rows[0]) return { data: { payload: res.rows[0].payload }, error: null };
              return { data: null, error: { message: 'not found' } };
            } catch (e: any) {
              return { data: null, error: { message: e.message } };
            }
          },
        }),
      }),
      upsert: async (rows: any[]) => {
        const pool = getPool();
        if (!pool) return { error: { message: 'DB_OFFLINE' } };
        try {
          for (const r of rows) {
            await pool.query(
              `INSERT INTO ${table} (id, payload, updated_at) VALUES ($1, $2, now()) ON CONFLICT (id) DO UPDATE SET payload = $2, updated_at = now()`,
              [r.id, JSON.stringify(r.payload)]
            );
          }
          return { error: null };
        } catch (e: any) {
          return { error: { message: e.message } };
        }
      },
    }),
  };
}

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseKey)
  : (createPgMock() as any);

if (!hasSupabase && databaseUrl) {
  console.warn("[SYSTEM] Supabase anon missing → fallback pg via DATABASE_URL");
} else if (!hasSupabase) {
  console.warn("[SYSTEM_WARNING] Supabase credentials missing. Client placeholder.");
}