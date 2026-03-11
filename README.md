# MAIL MAN TERMINAL

> **Advanced AI-Powered Crypto Intelligence & Market Signals**

[![Status](https://img.shields.io/badge/Status-V1.0_LIVE-green?style=for-the-badge)]()
[![Core](https://img.shields.io/badge/AI_Engine-ONLINE-red?style=for-the-badge)]()
[![X](https://img.shields.io/badge/X-Follow%20Us-black?style=for-the-badge&logo=x)](https://x.com/mailmanonx)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/omnicima/mail-man)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

CA: [Contract Address Here]

Twitter: [https://x.com/mailmanonx](https://x.com/mailmanonx)

## 📡 The Transmission

MAIL MAN is an autonomous AI system built for the intersection of cryptocurrency markets and predictive intelligence.

It transforms global crypto news and market data into actionable signals through real-time news aggregation, anomaly detection, and advanced AI analysis.

We don’t just track crypto.
We quantify market uncertainty — modeling volatility, detecting regime shifts, and mapping the structural dynamics of crypto-driven markets through proprietary simulation engines and behavioral signal analysis.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph "USER_INTERFACE [MM_SYS]"
        UI[Terminal Dashboard]
        V_RADAR[Viral Radar]
        A_SIG[Alpha Signals Panel]
    end

    subgraph "API_ROUTING_LAYER [ENCRYPTED]"
        N_EP["/api/news"]
        A_EP["/api/ai"]
        B_EP["/api/daily-brief"]
        V_EP["/api/viral-radar"]
    end

    subgraph "NEURAL_CORE [INTELLIGENCE]"
        OR[OpenRouter API / Mistral Small]
        ON[OpenNews API / Data Source]
    end

    UI --> N_EP
    UI --> A_EP
    UI --> B_EP
    UI --> V_EP

    N_EP --> ON
    A_EP --> OR
    B_EP --> OR
    V_EP --> ON

    ON -- "Raw News Stream" --> N_EP
    OR -- "Sentiment & Signals" --> A_EP
    ON -- "Market Anomalies" --> V_EP
    OR -- "Intelligence Brief" --> B_EP

    style UI fill:#000,stroke:#f00,stroke-width:2px,color:#fff
    style NEURAL_CORE fill:#111,stroke:#f00,stroke-dasharray: 5 5,color:#f00
    style OR fill:#111,stroke:#f00,color:#fff
    style ON fill:#111,stroke:#f00,color:#fff
```

## 🛠️ Tech Stack

### Interface Layer
* **Next.js 15 + TypeScript:** Modern, type-safe React framework for real-time dashboards.
* **Tailwind CSS:** Utility-first styling for responsive design.
* **Lucide React:** Minimalist iconography for market indicators.
* **Custom CRT Effects:** Scanlines and flicker overlays for terminal immersion.

### Neural Core (AI Engine)
* **Intelligence Layer:** Integrated with **OpenRouter (Mistral Small)** for advanced technical analysis and market sentiment.
* **Data Ingestion:** Real-time news aggregation via **OpenNews API**.
* **Quant Logic:** 
  - **Dynamic Viral Radar:** Detects mentions spikes and growth multipliers.
  - **Narrative Intercepts:** Identifies macro themes (AI, DePIN, L2) in the raw data stream.
  - **Alpha Pulse:** Correlates AI ratings with technical signals.

---

## 🚀 Key Features

- **RAW_DATA_STREAM:** Live decrypted news feed with real-time AI Impact Scoring.
- **ALPHA SIGNALS:** Direct actionable pings (LONG/SHORT) with clickable source verified data.
- **NEURAL BRIEF:** Daily system reports summarizing the global market matrix.
- **LANGUAGE FILTER:** Multi-language support with "English Only" intercept toggle for cleaner analysis.
- **VIRAL RADAR:** Real-time anomaly detection for assets gaining extreme social momentum.

---

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```bash
OPENNEWS_API_TOKEN=your_opennews_token
OPENROUTER_API_KEY=your_openrouter_key
```

Install dependencies and start the terminal:

```bash
pnpm install
pnpm dev
```

---

## 🤝 Contributing

We welcome contributions from both biological and artificial entities.
Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>MAIL MAN TERMINAL © 2026 • Synchronizing with the Global Crypto Markets</sub>
</div>
