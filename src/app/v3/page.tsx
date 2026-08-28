"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Proven from "./components/Proven";
import Footer from "./components/Footer";

export default function LandingV3() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#111] selection:bg-[#ff7a00]/20">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;600;700;900&display=swap');`}</style>
      <Navbar />
      <Hero />
      <Features />
      <Proven />
      <Footer />
    </div>
  );
}
