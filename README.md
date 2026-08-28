# HELIOS

> **AI-Powered Crypto Intelligence & Market Signals**

[![Status](https://img.shields.io/badge/Status-V2.0_LIVE-green?style=for-the-badge)]()
[![Core](https://img.shields.io/badge/AI_Engine-MIMO--v2.5-blue?style=for-the-badge)]()
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/sifaq00/Helios-2)

## Overview

HELIOS is an autonomous AI system built for the intersection of cryptocurrency markets and predictive intelligence.

It transforms global crypto news and market data into actionable signals through real-time news aggregation, anomaly detection, and advanced AI analysis powered by **Mimo-v2.5**.

We don't just track crypto. We quantify market uncertainty — modeling volatility, detecting regime shifts, and mapping the structural dynamics of crypto-driven markets through behavioral signal analysis.

---

## System Architecture

```
USER_INTERFACE
    ├── Terminal Dashboard (3-column: System Report, Raw Stream, Viral Radar)
    ├── Landing Parallax (GSAP + Lenis smooth scroll)
    └── Asset Detail (AI Synthesis per coin)

API_LAYER
    ├── /api/news          → Supabase cache (6551 news feed)
    ├── /api/ai            → Mimo-v2.5 (asset synthesis)
    ├── /api/viral-radar   → Growth anomaly detection
    ├── /api/daily-brief   → AI market summary
    ├── /api/alpha-signals → Signal generation
    └── /api/sync          → Cron data ingestion

NEURAL_CORE
    ├── Mimo-v2.5 (LLM) via xiaomimimo API
    ├── OpenRouter (fallback LLM)
    └── 6551 API (news data source)
```

---

## Tech Stack

### Interface
- **Next.js 16 + TypeScript** — App Router, React 19
- **Tailwind CSS 4** — Utility-first styling
- **GSAP 3.15 + Lenis** — Parallax & smooth scroll
- **Lucide React** — Iconography
- **Custom CRT Effects** — Scanlines, flicker, dithering

### Neural Core
- **Mimo-v2.5** — Primary LLM for AI synthesis, alpha signals, daily brief
- **OpenRouter (LLaMA 3.1 8B)** — Fallback LLM engine
- **6551 API** — Real-time news data source
- **Supabase** — PostgreSQL cache for terminal data

---

## Key Features

- **Terminal Dashboard:** 3-column command center — System Report, Raw Data Stream, Viral Radar
- **Alpha Signals:** AI-generated [SYMBOL | SIGNAL] format signals
- **Viral Radar:** Anomaly detection on viral momentum (30min vs 90min baseline, >50% threshold)
- **Daily Brief:** 4-line AI summary — Top News, Narrative, Most Mentioned, Market Vibe
- **AI Synthesis:** Per-coin analysis via Mimo-v2.5 with typing effect
- **Parallax Landing:** GSAP ScrollTrigger + Lenis smooth scroll with clipPath hero animation
- **Supabase Cache:** Offline-first DB with pg fallback when anon key missing

---

## Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=postgresql://your_db_url

# LLM (Mimo)
LLM_API_URL=https://token-plan-sgp.xiaomimimo.com/v1/chat/completions
LLM_API_KEY=your_mimo_api_key
LLM_MODEL=mimo-v2.5

# OpenRouter (fallback)
OPENROUTER_API_KEY=your_openrouter_key

# News API
OPENNEWS_API_TOKEN=your_6551_token
```

Install dependencies and start:

```bash
npm install
npm run dev
```

To sync data:

```bash
curl -X POST http://localhost:3000/api/sync -H "Content-Type: application/json" -d '{"secret":"helios-admin-2026"}'
```

---

## License

This project is licensed under the MIT License.

<div align="center">
  <sub>HELIOS &copy; 2026 &bull; Quantifying Market Uncertainty</sub>
</div>
