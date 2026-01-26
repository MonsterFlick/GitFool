import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomePopup } from "@/components/welcome-popup"
import { GoogleAdSense } from "@/components/google-adsense"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://gitfool.vercel.app"),
  title: {
    default: "GitFool - Tech Blog",
    template: "%s | GitFool",
  },
  description:
    "High-quality tech blogs sourced directly from GitHub. Stay updated with the latest in technology, development, and engineering.",
  keywords: [
    "tech blog",
    "programming",
    "development",
    "engineering",
    "github",
    "software development",
    "web development",
    "coding tutorials",
    "developer resources",
    "technology articles",
  ],
  authors: [{ name: "Om Thakur", url: "https://omthakur.in" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GitFool - Tech Blog",
    description: "High-quality tech blogs sourced directly from GitHub",
    type: "website",
    siteName: "GitFool",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitFool - Tech Blog",
    description: "High-quality tech blogs sourced directly from GitHub",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} ${dancingScript.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WelcomePopup />
        </ThemeProvider>
        <Analytics />
        <GoogleAdSense />
      </body>
    </html>
  )
}
