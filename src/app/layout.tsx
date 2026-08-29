import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HELIOS",
  description: "AI-powered global intelligence platform. Real-time news aggregation, sentiment analysis, and strategic signals.",
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="preload" as="image" href="/v3/hero/1.webp" />
        <link rel="preload" as="image" href="/v3/hero/2.webp" />
        <link rel="preload" as="image" href="/v3/hero/3.webp" />
        <link rel="preload" as="image" href="/v3/hero/4.webp" />
        <link rel="preload" as="image" href="/v3/hero/5.webp" />
        <link rel="preload" as="image" href="/v3/hero/6.webp" />
        <link rel="preload" as="image" href="/v3/hero/7.webp" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
