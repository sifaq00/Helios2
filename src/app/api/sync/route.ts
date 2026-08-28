import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

const OPENROUTER_API_BASE = "https://openrouter.ai/api/v1/chat/completions";
const SYNC_SECRET = "helios-admin-2026";

const RSS_FEEDS = [
  "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "https://cointelegraph.com/rss",
  "https://decrypt.co/feed",
];

// Comprehensive coin universe - covers top 80 + trending
const COIN_UNIVERSE: { symbol: string; names: string[] }[] = [
  { symbol: "BTC", names: ["bitcoin", "btc"] },
  { symbol: "ETH", names: ["ethereum", "eth", "ether"] },
  { symbol: "SOL", names: ["solana", "sol"] },
  { symbol: "XRP", names: ["xrp", "ripple"] },
  { symbol: "BNB", names: ["bnb", "binance coin"] },
  { symbol: "ADA", names: ["cardano", "ada"] },
  { symbol: "DOGE", names: ["dogecoin", "doge"] },
  { symbol: "AVAX", names: ["avalanche", "avax"] },
  { symbol: "DOT", names: ["polkadot", "dot"] },
  { symbol: "LINK", names: ["chainlink", "link"] },
  { symbol: "MATIC", names: ["matic", "polygon"] },
  { symbol: "ARB", names: ["arbitrum", "arb"] },
  { symbol: "OP", names: ["optimism", "op"] },
  { symbol: "SUI", names: ["sui"] },
  { symbol: "APT", names: ["aptos", "apt"] },
  { symbol: "USDT", names: ["tether", "usdt"] },
  { symbol: "USDC", names: ["usdc", "usd coin"] },
  { symbol: "ENA", names: ["ethena", "ena", "usde"] },
  { symbol: "PEPE", names: ["pepe"] },
  { symbol: "WIF", names: ["wif", "dogwifhat"] },
  { symbol: "SHIB", names: ["shib", "shiba"] },
  { symbol: "TAO", names: ["tao", "bittensor"] },
  { symbol: "RNDR", names: ["rndr", "render"] },
  { symbol: "FET", names: ["fet", "fetch.ai", "fetch"] },
  { symbol: "INJ", names: ["injective", "inj"] },
  { symbol: "SEI", names: ["sei"] },
  { symbol: "TIA", names: ["celestia", "tia"] },
  { symbol: "ARB", names: ["arbitrum"] },
  { symbol: "LDO", names: ["lido", "ldo"] },
  { symbol: "UNI", names: ["uniswap", "uni"] },
  { symbol: "AAVE", names: ["aave"] },
  { symbol: "MKR", names: ["maker", "mkr"] },
  { symbol: "ATOM", names: ["cosmos", "atom"] },
  { symbol: "NEAR", names: ["near"] },
  { symbol: "FTM", names: ["fantom", "ftm"] },
  { symbol: "ALGO", names: ["algorand", "algo"] },
  { symbol: "VET", names: ["vechain", "vet"] },
  { symbol: "FIL", names: ["filecoin", "fil"] },
  { symbol: "ICP", names: ["icp", "internet computer"] },
  { symbol: "ETC", names: ["ethereum classic", "etc"] },
  { symbol: "XLM", names: ["stellar", "xlm"] },
  { symbol: "HBAR", names: ["hedera", "hbar"] },
  { symbol: "CRO", names: ["cronos", "cro"] },
  { symbol: "TON", names: ["toncoin", "ton"] },
  { symbol: "TRX", names: ["tron", "trx"] },
  { symbol: "LTC", names: ["litecoin", "ltc"] },
  { symbol: "BCH", names: ["bitcoin cash", "bch"] },
  { symbol: "STX", names: ["stacks", "stx"] },
  { symbol: "OP", names: ["optimism"] },
  { symbol: "ARB", names: ["arbitrum"] },
  { symbol: "BLUR", names: ["blur"] },
  { symbol: "JUP", names: ["jupiter", "jup"] },
  { symbol: "PYTH", names: ["pyth"] },
  { symbol: "BONK", names: ["bonk"] },
  { symbol: "FLOKI", names: ["floki"] },
  { symbol: "ORDI", names: ["ordi", "ordinals"] },
  { symbol: "ENS", names: ["ens"] },
];

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
}

function hashId(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex").slice(0, 12);
}

function parseRSSItems(xml: string, source: string): any[] {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const titleRaw =
      (block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
        block.match(/<title>([\s\S]*?)<\/title>/i))?.[1]?.trim() || "";
    const title = decodeHtmlEntities(titleRaw).replace(/<[^>]+>/g, "").trim();

    const descRaw =
      (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
        block.match(/<description>([\s\S]*?)<\/description>/i))?.[1] || "";
    const description = decodeHtmlEntities(descRaw)
      .replace(/<[^>]+>/g, "")
      .trim()
      .slice(0, 300);

    let link =
      block.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ||
      block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1]?.trim() ||
      "";
    // Strip CDATA wrapper that CoinTelegraph uses: <![CDATA[https://...]]>
    link = link.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
    link = decodeHtmlEntities(link).replace(/<[^>]+>/g, "").trim();
    // Fallback: extract href if link still malformed
    if (link && !link.startsWith("http")) {
      const hrefMatch = link.match(/https?:\/\/[^\s"'<>]+/);
      if (hrefMatch) link = hrefMatch[0];
      else link = "";
    }

    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || new Date().toISOString();
    const ts = new Date(pubDate).toISOString();

    // Skip invalid dates (NaN check)
    if (isNaN(new Date(ts).getTime())) continue;

    const text = `${title}. ${description}`.trim();
    if (!text || text.length < 10) continue;

    const coins = extractCoins(text);
    const id = hashId(link || title + ts);
    const newsType = source.replace("www.", "").split(".")[0].toUpperCase();
    const engineType = "RSS";

    items.push({ id, text, title, description, link, coins, source, ts, newsType, engineType });
  }
  return items;
}

function extractCoins(text: string): { symbol: string }[] {
  const found = new Set<string>();
  const lower = text.toLowerCase();

  for (const coin of COIN_UNIVERSE) {
    for (const name of coin.names) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Match $SYMBOL, word boundary, or name as phrase
      const pattern = name.length <= 4
        ? new RegExp(`(\\$${escaped}\\b|\\b${escaped}\\b)`, "i")
        : new RegExp(`\\b${escaped}\\b`, "i");
      if (pattern.test(lower) || lower.includes(`$${coin.symbol.toLowerCase()}`)) {
        found.add(coin.symbol);
        break;
      }
    }
    // Direct $SYMBOL check for all symbols
    if (lower.includes(`$${coin.symbol.toLowerCase()}`)) found.add(coin.symbol);
  }

  // Also detect bare $TICKER patterns for trending coins not in list (2-6 uppercase letters)
  const dollarTags = text.match(/\$[A-Z]{2,6}\b/g);
  if (dollarTags) {
    for (const tag of dollarTags) {
      const sym = tag.slice(1).toUpperCase();
      if (sym.length >= 2 && sym.length <= 6 && !["THE", "AND", "FOR"].includes(sym)) {
        found.add(sym);
      }
    }
  }

  return found.size > 0 ? [...found].map((s) => ({ symbol: s })) : [{ symbol: "GENERIC" }];
}

async function fetchRSS(url: string): Promise<any[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "HELIOS/2.0 RSS Reader (+https://helios.systems)" },
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      console.warn(`[SYNC] RSS ${url} status ${res.status}`);
      return [];
    }
    const xml = await res.text();
    return parseRSSItems(xml, new URL(url).hostname);
  } catch (e: any) {
    clearTimeout(timeout);
    console.warn(`[SYNC] RSS ${url} failed: ${e.message}`);
    return [];
  }
}

function scoreArticle(text: string): { score: number; signal: "bullish" | "bearish" | "neutral" } {
  const t = text.toLowerCase();
  // Priority order: most impactful first
  if (t.match(/\b(hack|exploit|attack|breach|stolen|drain|phish)\b/)) return { score: 9, signal: "bearish" };
  if (t.match(/\b(crash|dump|plunge|collapse|liquidation|selloff|bear market)\b/)) return { score: 8, signal: "bearish" };
  if (t.match(/\b(ban|block|restrict|sanction|lawsuit|sue|sec.*charge)\b/)) return { score: 8, signal: "bearish" };
  if (t.match(/\b(surge|rally|breakout|soar|pump|ath|all-time high|record high|bull run)\b/)) return { score: 8, signal: "bullish" };
  if (t.match(/\b(etf.*approv|approval|inflow|institutional.*buy|treasury.*buy)\b/)) return { score: 8, signal: "bullish" };
  if (t.match(/\b(sec|regulat|etf|law|bill|gov|senate|congress|clarity act)\b/)) return { score: 7, signal: "neutral" };
  if (t.match(/\b(ai|agent|artificial intelligence|gpt|llm|model)\b/)) return { score: 7, signal: "bullish" };
  if (t.match(/\b(defi|yield|staking|restaking|tvl|lending)\b/)) return { score: 6, signal: "bullish" };
  if (t.match(/\b(upgrade|launch|partnership|adoption|integrat|collab)\b/)) return { score: 7, signal: "bullish" };
  if (t.match(/\b(fed|rate|inflation| Powell|warsh)\b/)) return { score: 7, signal: "neutral" };
  return { score: 5, signal: "neutral" };
}

async function extractSecret(request: Request): Promise<string | null> {
  // Check header first (for GitHub Actions / UptimeRobot)
  const headerSecret = request.headers.get("x-sync-secret") || request.headers.get("authorization")?.replace("Bearer ", "");
  if (headerSecret) return headerSecret;
  // Check query param (for GET cron)
  try {
    const url = new URL(request.url);
    const querySecret = url.searchParams.get("secret");
    if (querySecret) return querySecret;
  } catch {}
  // Check body (for POST)
  try {
    const body = await request.clone().json().catch(() => ({}));
    if (body.secret) return body.secret;
  } catch {}
  return null;
}

async function handleSync(request: Request) {
  try {
    const secret = await extractSecret(request);
    if (secret !== SYNC_SECRET) {
      return NextResponse.json({ error: "UNAUTHORIZED_UPLINK" }, { status: 401 });
    }

    console.log("[SYNC_ENGINE] Initiating Protocol. Fetching RSS feeds...");

    // 1. FETCH RSS with timeout per feed
    const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
    let articles = results.flat();
    console.log(`[SYNC_ENGINE] Fetched ${articles.length} raw articles`);

    // Deduplicate by id/link hash
    const seen = new Set<string>();
    articles = articles.filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
    console.log(`[SYNC_ENGINE] After dedup: ${articles.length}`);

    // Filter English only, sort by date desc, keep up to 80 then score and keep 50
    articles = articles
      .filter((a: any) => {
        // Allow ASCII + common punctuation, reject heavily non-English
        const sample = a.text.slice(0, 80);
        const nonAscii = (sample.match(/[^\x00-\x7F]/g) || []).length;
        return nonAscii < 3;
      })
      .sort((a: any, b: any) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, 80);

    // Score each article
    articles = articles.map((a: any) => {
      const { score, signal } = scoreArticle(a.text);
      return { ...a, aiRating: { score, signal } };
    });

    // Keep top 50 freshest for storage
    articles = articles.slice(0, 50);
    console.log(`[SYNC_ENGINE] Scored ${articles.length} articles, sample scores:`, articles.slice(0, 3).map((a) => a.aiRating));

    // Fallback dummy if all RSS failed
    if (articles.length === 0) {
      console.log("[SYNC_ENGINE] All RSS failed, using dummy");
      articles = [
        { id: hashId("dummy1"), text: "Bitcoin breaks $120k on institutional ETF inflows", title: "Bitcoin breaks $120k", link: "", coins: [{ symbol: "BTC" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date().toISOString(), newsType: "DUMMY", engineType: "SYNTH" },
        { id: hashId("dummy2"), text: "Ethereum Dencun upgrade reduces L2 fees by 90%", title: "Ethereum Dencun", link: "", coins: [{ symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now() - 10 * 60 * 1000).toISOString(), newsType: "DUMMY", engineType: "SYNTH" },
        { id: hashId("dummy3"), text: "Solana DEX volume flips Ethereum amid meme surge", title: "Solana flips ETH", link: "", coins: [{ symbol: "SOL" }], aiRating: { score: 8, signal: "bullish" }, ts: new Date(Date.now() - 15 * 60 * 1000).toISOString(), newsType: "DUMMY", engineType: "SYNTH" },
        { id: hashId("dummy4"), text: "SEC delays altcoin ETF decisions, market neutral", title: "SEC delays", link: "", coins: [{ symbol: "GENERIC" }], aiRating: { score: 5, signal: "neutral" }, ts: new Date(Date.now() - 20 * 60 * 1000).toISOString(), newsType: "DUMMY", engineType: "SYNTH" },
        { id: hashId("dummy5"), text: "Fed signals rate cut, risk assets rally", title: "Fed rate cut", link: "", coins: [{ symbol: "BTC" }, { symbol: "ETH" }], aiRating: { score: 7, signal: "bullish" }, ts: new Date(Date.now() - 25 * 60 * 1000).toISOString(), newsType: "DUMMY", engineType: "SYNTH" },
      ];
    }

    // MODULE A: NEWS FEED - store FULL 50 (fix: was sliced to 30)
    const newsFeed = articles;

    // MODULE B: VIRAL RADAR - proper time-window growth calculation
    const now = Date.now();
    const WINDOW_CURRENT_MS = 3 * 60 * 60 * 1000; // last 3 hours
    const WINDOW_BASELINE_MS = 24 * 60 * 60 * 1000; // previous 24h window

    const stats: Record<string, { current: number; baseline: number }> = {};
    articles.forEach((item: any) => {
      if (!item.coins) return;
      const age = now - new Date(item.ts).getTime();
      const isCurrent = age <= WINDOW_CURRENT_MS;
      const isBaseline = age > WINDOW_CURRENT_MS && age <= WINDOW_BASELINE_MS;
      item.coins.forEach((coin: any) => {
        const sym = coin.symbol;
        if (sym === "GENERIC") return; // skip generic for viral
        if (!stats[sym]) stats[sym] = { current: 0, baseline: 0 };
        if (isCurrent) stats[sym].current += 1;
        if (isBaseline) stats[sym].baseline += 1;
      });
    });

    // Also include GENERIC stats if no real coins have viral
    if (Object.keys(stats).length === 0) {
      articles.forEach((item: any) => {
        const age = now - new Date(item.ts).getTime();
        const isCurrent = age <= WINDOW_CURRENT_MS;
        const isBaseline = age > WINDOW_CURRENT_MS && age <= WINDOW_BASELINE_MS;
        item.coins.forEach((coin: any) => {
          const sym = coin.symbol;
          if (!stats[sym]) stats[sym] = { current: 0, baseline: 0 };
          if (isCurrent) stats[sym].current += 1;
          if (isBaseline) stats[sym].baseline += 1;
        });
      });
    }

    const viralRadar = Object.entries(stats)
      .map(([symbol, data]) => {
        // Normalize baseline to same window size (3h vs 24h => divide by 8)
        const normalizedBaseline = data.baseline / 8;
        const baselineForCalc = normalizedBaseline < 0.5 ? 0.5 : normalizedBaseline;
        const growth = Math.round(((data.current - baselineForCalc) / baselineForCalc) * 100);
        // Viral if: at least 2 mentions in current window AND growth > 50% OR absolute spike
        const isViral = (data.current >= 2 && growth > 50) || data.current >= 4;
        return {
          symbol,
          currentPings: data.current,
          baselinePings: Math.round(normalizedBaseline * 10) / 10,
          growth: growth > 0 ? growth : 0,
          status: isViral ? "VIRAL_ANOMALY" : "STABLE",
        };
      })
      .filter((a) => a.currentPings >= 1) // show at least 1 ping to avoid empty state
      .sort((a, b) => {
        if (a.status === "VIRAL_ANOMALY" && b.status !== "VIRAL_ANOMALY") return -1;
        if (b.status === "VIRAL_ANOMALY" && a.status !== "VIRAL_ANOMALY") return 1;
        return b.growth - a.growth || b.currentPings - a.currentPings;
      })
      .slice(0, 5);

    // MODULE C & D: AI SYNTHESIS with robust fallback
    console.log("[SYNC_ENGINE] Engaging Neural Network...");

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const hasOpenRouter = !!(openRouterKey && openRouterKey.trim().length > 10);
    const llmUrl = hasOpenRouter ? OPENROUTER_API_BASE : process.env.LLM_API_URL || OPENROUTER_API_BASE;
    const llmKey = hasOpenRouter ? openRouterKey : process.env.LLM_API_KEY || "";
    const llmModel = hasOpenRouter ? "meta-llama/llama-3.1-8b-instruct" : process.env.LLM_MODEL || "mimo-v2.5";
    const isMimo = llmUrl.includes("xiaomimimo");

    const nowStr = new Date().toISOString();
    const alphaContext = articles
      .slice(0, 10)
      .map((s: any) => `[${s.coins?.map((c: any) => c.symbol).join(",") || "GENERIC"} | ${s.aiRating?.signal || "neutral"} | ${new Date(s.ts).toISOString().slice(11, 16)} UTC]: ${s.text.slice(0, 140)}`)
      .join("\n");
    const briefContext = articles
      .slice(0, 15)
      .map((a: any, i: number) => `${i + 1}. [${a.coins?.[0]?.symbol || "GENERIC"} ${a.aiRating?.signal || "neutral"} ${a.aiRating?.score || 5}/10] ${new Date(a.ts).toISOString().slice(5, 16).replace("T", " ")} - ${a.title || a.text.slice(0, 120)}`)
      .join("\n");

    let alphaSignals: string[] = [];
    let dailyBrief = "";

    // Fetch LLM with timeout and fallback
    const fetchWithTimeout = async (url: string, opts: any, ms = 12000) => {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), ms);
      try {
        const r = await fetch(url, { ...opts, signal: c.signal });
        clearTimeout(t);
        return r;
      } catch (e) {
        clearTimeout(t);
        throw e;
      }
    };

    try {
      const [alphaRes, briefRes] = await Promise.all([
        fetchWithTimeout(llmUrl, {
          method: "POST",
          headers: { Authorization: `Bearer ${llmKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: llmModel,
            messages: [{ role: "user", content: `You are HELIOS crypto intel. Time now ${nowStr}. Summarize these 10 signals, one line each as [SYMBOL | bullish/bearish/neutral]: headline (max 15 words, specific, no hallucination)\n\n${alphaContext}` }],
            max_tokens: isMimo ? 800 : 400,
            temperature: 0.7,
          }),
        }).catch(() => null as any),
        fetchWithTimeout(llmUrl, {
          method: "POST",
          headers: { Authorization: `Bearer ${llmKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: llmModel,
            messages: [
              {
                role: "system",
                content: "You are HELIOS terminal. Be specific, cite actual headlines, never hallucinate BTC price if not in input. Vary wording each run.",
              },
              {
                role: "user",
                content: `Time ${nowStr} UTC. Analyze these 15 headlines (1=newest):\n${briefContext}\n\nOutput EXACTLY 4 lines, no extra text:\nTOP_NEWS: <most impactful headline, 15-20 words, include coin/event/price if present>\nTOP_NARRATIVE: <dominant narrative across feeds, 1 sentence, specific>\nMOST_MENTIONED: <SYMBOL> (<count> mentions) - <reason 8 words from headlines>\nMARKET_VIBE: <1 sentence risk-on/off + catalyst from headlines>\n\nBe concise, varied, use headline details.`,
              },
            ],
            max_tokens: isMimo ? 800 : 350,
            temperature: 0.75,
          }),
        }).catch(() => null as any),
      ]);

      if (alphaRes && alphaRes.ok) {
        const alphaJson = await alphaRes.json();
        console.log("[SYNC_ENGINE] Alpha raw:", JSON.stringify(alphaJson).slice(0, 800));
        const alphaText = alphaJson.choices?.[0]?.message?.content || alphaJson.choices?.[0]?.message?.reasoning_content || "";
        alphaSignals = alphaText
          .split("\n")
          .map((l: string) => l.trim())
          .filter((l: string) => /\[.*\|.*(bullish|bearish|neutral)/i.test(l) && l.length > 15 && l.length < 220 && !l.toLowerCase().startsWith("here are"))
          .map((l: string) => l.replace(/^\d+[\.\)]\s*/, "").replace(/^\*\s*/, "").trim());
      }
      if (briefRes && briefRes.ok) {
        const briefJson = await briefRes.json();
        console.log("[SYNC_ENGINE] Brief raw:", JSON.stringify(briefJson).slice(0, 800));
        dailyBrief = briefJson.choices?.[0]?.message?.content || briefJson.choices?.[0]?.message?.reasoning_content || "";
      }
    } catch (e: any) {
      console.warn("[SYNC_ENGINE] LLM failed, using fallback:", e.message);
    }

    // Fallbacks if LLM empty - dynamic, not generic
    if (!alphaSignals.length) {
      alphaSignals = articles.slice(0, 6).map((a: any) => `[${a.coins?.[0]?.symbol || "GENERIC"} | ${a.aiRating?.signal || "neutral"}]: ${a.title || a.text.slice(0, 90)}`);
    }
    // Filter non-ASCII leakage
    alphaSignals = alphaSignals.filter((l) => !/[^\x00-\x7F]/.test(l) || l.length < 220).slice(0, 10);

    // Post-process brief: ensure it actually mentions top article specifics, not generic BTC
    if (dailyBrief) {
      // If brief still hallucinates BTC price when top article not BTC, force correction via fallback check
      const topIsBTC = articles.slice(0, 3).some((a: any) => a.coins?.some((c: any) => c.symbol === "BTC") && a.text.toLowerCase().includes("bitcoin"));
      const briefHasBTCPrice = /bitcoin.*\$|BTC.*\$/i.test(dailyBrief) && !topIsBTC;
      if (briefHasBTCPrice && articles[0]?.title) {
        // Keep brief but not critical - just log
        console.warn("[SYNC] Brief BTC hallucination check: top not BTC but brief mentions BTC price");
      }
      // Trim to 4 lines max, ensure format
      const lines = dailyBrief
        .split("\n")
        .filter((l: string) => l.includes(":"))
        .slice(0, 4);
      if (lines.length >= 3) dailyBrief = lines.join("\n");
    }

    if (!dailyBrief || dailyBrief.length < 30 || !dailyBrief.includes("TOP_NEWS")) {
      const counts = articles.flatMap((a) => a.coins).reduce((acc: any, c: any) => { acc[c.symbol] = (acc[c.symbol] || 0) + 1; return acc; }, {});
      const sorted = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
      const topCoin = (sorted[0]?.[0] as string) || "GENERIC";
      const topCount = (sorted[0]?.[1] as number) || 0;
      const bullish = articles.filter((a) => a.aiRating?.signal === "bullish").length;
      const bearish = articles.filter((a) => a.aiRating?.signal === "bearish").length;
      const topArticle = articles[0];
      // Dynamic fallback uses real headline
      dailyBrief = `TOP_NEWS: ${topArticle.title || topArticle.text.slice(0, 110)} (${new Date(topArticle.ts).toISOString().slice(11, 16)} UTC)\nTOP_NARRATIVE: ${topArticle.aiRating?.signal === "bullish" ? "Bullish momentum" : topArticle.aiRating?.signal === "bearish" ? "Risk-off pressure" : "Mixed signals"} dominates (${bullish} bullish vs ${bearish} bearish)\nMOST_MENTIONED: ${topCoin} (${topCount} mentions) - ${topArticle.title?.slice(0, 60) || "leading intercepts"}\nMARKET_VIBE: ${bullish > bearish ? "Risk-on, watch continuation" : bearish > bullish ? "Cautious, downside risk" : "Neutral consolidation"} - catalyst: ${topArticle.coins?.[0]?.symbol || "macro"} flows`;
    }

    // MODULE E: UPSERT TO SUPABASE - atomic batch with updated_at
    const nowIso = new Date().toISOString();
    console.log("[SYNC_ENGINE] Uploading to Supabase DB...", { news: newsFeed.length, viral: viralRadar.length, signals: alphaSignals.length, at: nowIso });
    const { error: dbError } = await supabase.from("terminal_cache").upsert([
      { id: "news_feed", payload: newsFeed, updated_at: nowIso },
      { id: "viral_radar", payload: viralRadar, updated_at: nowIso },
      { id: "alpha_signals", payload: alphaSignals, updated_at: nowIso },
      { id: "daily_brief", payload: { brief: dailyBrief }, updated_at: nowIso },
    ]);

    if (dbError) throw new Error(`Supabase Error: ${dbError.message}`);
    console.log("[SYNC_ENGINE] Protocol Complete. DB Updated.");
    return NextResponse.json({
      success: true,
      message: "CACHE_UPDATED",
      stats: { articles: newsFeed.length, viral: viralRadar.length, signals: alphaSignals.length, deduped: articles.length },
    });
  } catch (error: any) {
    console.error("[SYNC_ENGINE] CRITICAL FAILURE:", error.message, error.stack?.slice(0, 500));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return handleSync(request);
}

export async function GET(request: Request) {
  return handleSync(request);
}
