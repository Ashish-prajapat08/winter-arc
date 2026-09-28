import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: false,
  preload: true,
});

const BASE_URL = "https://winterarc.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Winter Arc — 90 Days. One Transformation.",
  description:
    "Winter Arc is a 90-day personal transformation and accountability system that helps you turn one meaningful goal into a realistic daily plan, track progress, recover from missed days, and adapt based on your actual behavior.",
  keywords: [
    "90 day challenge",
    "90 day goal",
    "90 day transformation",
    "personal accountability",
    "goal accountability",
    "habit consistency",
    "personal growth system",
    "goal tracking",
    "90 day goal planner",
    "accountability app",
    "habit building",
    "personal transformation",
    "AI habit coach",
    "adaptive goal planning",
    "goal tracking app",
    "90 day productivity challenge",
  ],
  authors: [{ name: "Winter Arc" }],
  creator: "Winter Arc",
  publisher: "Winter Arc",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Winter Arc",
    title: "Winter Arc — 90 Days. One Transformation.",
    description:
      "Turn one meaningful goal into a system you can actually stick to. Winter Arc is a 90-day personal transformation and accountability system.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Winter Arc — 90 Days. One Transformation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Winter Arc — 90 Days. One Transformation.",
    description: "Turn one meaningful goal into a system you can actually stick to.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@winterarc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#org`,
                  name: "Winter Arc",
                  url: BASE_URL,
                  sameAs: [
                    "https://twitter.com/winterarc",
                    "https://instagram.com/winterarc",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Winter Arc",
                  publisher: { "@id": `${BASE_URL}/#org` },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": `${BASE_URL}/#app`,
                  name: "Winter Arc",
                  applicationCategory: "LifestyleApplication",
                  operatingSystem: "Web",
                  description:
                    "Winter Arc is a 90-day personal transformation and accountability system that helps people turn one goal into a realistic daily plan, track progress, recover from missed days, and adapt their plan based on behavior.",
                  offers: {
                    "@type": "Offer",
                    price: "12.00",
                    priceCurrency: "USD",
                    description: "Founding cohort — 90 days",
                  },
                },
                {
                  "@type": "FAQPage",
                  "@id": `${BASE_URL}/#faq`,
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is Winter Arc?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Winter Arc is a 90-day personal transformation and accountability system.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What happens if I miss a day?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Your Arc does not reset. Recovery Mode activates and adjusts your plan for the next day.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How much does Winter Arc cost?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The founding cohort is $12 for your first 90-day Arc.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
