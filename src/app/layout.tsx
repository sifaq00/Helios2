import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HELIOS",
  description: "AI-powered global intelligence platform. Real-time news aggregation, sentiment analysis, and strategic signals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
