import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Winter Arc 2026 — 90 Days. One Transformation.",
  description:
    "Stop starting over every Monday. Winter Arc is a 90-day accountability and transformation program built for young professionals who struggle to stay consistent.",
  keywords: ["90 day challenge", "accountability", "transformation", "fitness", "consistency", "winter arc"],
  openGraph: {
    title: "Winter Arc 2026 — 90 Days. One Transformation.",
    description: "Stop starting over every Monday. Build a 90-day goal, get a plan built around your life, stay accountable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
