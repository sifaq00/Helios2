"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, Bell, Shield, Terminal } from "lucide-react";

export default function SettingsPage() {
  // Mock State untuk Watchlist sesuai dokumen PDF
  const [watchlist, setWatchlist] = useState(["BTC", "ETH", "SOL", "JUP"]);
  const [newCoin, setNewCoin] = useState("");

  // Mock State untuk Custom Alerts sesuai dokumen PDF
  const [alerts, setAlerts] = useState([
    { id: 1, coin: "SOL", condition: "Sentiment > 70% Bullish", impact: "> 7" }
  ]);

  const handleAddWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCoin.trim() && !watchlist.includes(newCoin.toUpperCase())) {
      setWatchlist([...watchlist, newCoin.toUpperCase()]);
      setNewCoin("");
    }
  };

  const removeWatchlist = (coinToRemove: string) => {
    setWatchlist(watchlist.filter(coin => coin !== coinToRemove));
  };

  return (
    <main className="scanlines min-h-screen bg-black text-white font-mono selection:bg-[#ff0000] selection:text-black pb-20">
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[#333] bg-black/90 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link 
            href="/terminal" 
            className="flex items-center gap-2 text-gray-400 hover:text-[#ff0000] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">BACK_TO_TERMINAL</span>
          </Link>
        </div>
        <div className="text-[#ff0000] font-black tracking-widest text-xl crt-flicker">
          SYS_CONFIG
        </div>
      </nav>

      <div className="mx-auto max-w-4xl p-6 md:p-8 space-y-12 mt-8">
        
        {/* Header Section */}
        <div className="border-b border-[#ff0000] pb-4">
          <h1 className="text-3xl font-black tracking-widest text-white flex items-center gap-3">
            <Terminal className="h-8 w-8 text-[#ff0000]" />
            PERSONALIZATION_PROTOCOLS
          </h1>
          <p className="text-gray-500 mt-2 text-sm">// CONFIGURE YOUR ALPHA RADAR PREFERENCES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* =========================================
              LEFT COLUMN: WATCHLIST CONFIGURATION
              ========================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-[#ff0000]">
              <Eye className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-widest border-b border-[#333] flex-1 pb-2">WATCHLIST</h2>
            </div>
            
            <p className="text-xs text-gray-400">
              Assets in this list will be prioritized by AI when filtering news and signals in your main feed.
            </p>

            {/* Form Tambah Watchlist */}
            <form onSubmit={handleAddWatchlist} className="flex gap-2">
              <input 
                type="text" 
                value={newCoin}
                onChange={(e) => setNewCoin(e.target.value)}
                placeholder="ENTER TICKER (e.g. TIA)" 
                className="flex-1 bg-black border border-[#333] px-4 py-2 text-white focus:outline-none focus:border-[#ff0000] focus:ring-1 focus:ring-[#ff0000] uppercase placeholder:text-gray-700 transition-colors"
                maxLength={10}
              />
              <button 
                type="submit"
                className="bg-[#111] border border-[#333] px-4 py-2 text-white hover:border-[#ff0000] hover:text-[#ff0000] transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </form>

            {/* List Watchlist Aktif */}
            <div className="border border-[#333] bg-[#050505] p-4 min-h-[200px]">
              <div className="text-xs text-gray-600 mb-4">// ACTIVE_TARGETS</div>
              <div className="flex flex-wrap gap-3">
                {watchlist.map((coin) => (
                  <div key={coin} className="group flex items-center gap-2 border border-[#ff0000] bg-[#110000] pl-3 pr-1 py-1">
                    <span className="font-bold text-white">{coin}</span>
                    <button 
                      onClick={() => removeWatchlist(coin)}
                      className="p-1 text-gray-500 hover:text-[#ff0000] transition-colors"
                      title="Remove target"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {watchlist.length === 0 && (
                  <span className="text-gray-600 text-sm italic">No active targets.</span>
                )}
              </div>
            </div>
          </section>

          {/* =========================================
              RIGHT COLUMN: CUSTOM ALERTS CONFIGURATION
              ========================================= */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-[#ff0000]">
              <Bell className="h-5 w-5" />
              <h2 className="text-xl font-bold tracking-widest border-b border-[#333] flex-1 pb-2">CUSTOM ALERTS</h2>
            </div>

            <p className="text-xs text-gray-400">
              Create custom trigger rules. The system will send real-time alerts when market metric conditions are met.
            </p>

            {/* Placeholder Form Alert */}
            <div className="border border-[#333] bg-black p-4 space-y-4 relative overflow-hidden group">
              <div className="text-xs text-[#ff0000] mb-2 font-bold">// NEW_ALERT_RULE</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500">TARGET ASSET</label>
                  <select className="w-full bg-black border border-[#333] p-2 text-sm text-white focus:border-[#ff0000] outline-none appearance-none cursor-pointer">
                    <option>SELECT...</option>
                    {watchlist.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500">MIN. IMPACT SCORE</label>
                  <select className="w-full bg-black border border-[#333] p-2 text-sm text-white focus:border-[#ff0000] outline-none appearance-none cursor-pointer">
                    <option>&gt; 7 (HIGH)</option>
                    <option>&gt; 4 (MEDIUM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500">SENTIMENT CONDITION</label>
                <select className="w-full bg-black border border-[#333] p-2 text-sm text-white focus:border-[#ff0000] outline-none appearance-none cursor-pointer">
                  <option>&gt; 70% BULLISH</option>
                  <option>&gt; 70% BEARISH</option>
                  <option>ANY EXTREME</option>
                </select>
              </div>

              <button className="w-full border border-[#ff0000] bg-[#110000] text-[#ff0000] py-2 text-sm font-bold hover:bg-[#ff0000] hover:text-black transition-colors">
                DEPLOY ALERT PROTOCOL
              </button>
            </div>

            {/* List Active Alerts */}
            <div className="space-y-3">
              <div className="text-xs text-gray-600">// DEPLOYED_PROTOCOLS</div>
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between border-l-2 border-[#ff0000] bg-[#0a0a0a] p-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold">{alert.coin}</span>
                      <span className="text-[10px] bg-[#111] px-1 border border-[#333] text-gray-400">ACTIVE</span>
                    </div>
                    <div className="text-xs text-gray-400 flex flex-col gap-1">
                      <span>• {alert.condition}</span>
                      <span>• Impact Score {alert.impact}</span>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-[#ff0000] transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

          </section>
        </div>

        {/* Security / System status footer */}
        <div className="pt-12 border-t border-[#222] flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>DATA ENCRYPTED & SECURED LOCAL</span>
          </div>
          <button className="text-[#ff0000] hover:underline underline-offset-4">
            [ CLEAR SYSTEM CACHE ]
          </button>
        </div>

      </div>
    </main>
  );
}