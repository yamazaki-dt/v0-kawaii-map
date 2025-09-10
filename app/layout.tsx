import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kawaii Map - かわいいマップ",
  description:
    "Plan your perfect Japan trip with our cute and interactive travel map. Discover amazing spots, create itineraries, and explore Japan like never before!",
  generator: "v0.app",
  keywords: ["Japan travel", "travel planning", "interactive map", "kawaii", "tourism", "itinerary"],
  authors: [{ name: "Kawaii Map Team" }],
  openGraph: {
    title: "Kawaii Map - かわいいマップ",
    description: "Plan your perfect Japan trip with our cute and interactive travel map",
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
