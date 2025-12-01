import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "katex/dist/katex.min.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.xfresh.id"), // Pastikan ini adalah domain Anda
  title: {
    default: "XFresh Blog",
    template: "%s | XFresh Blog",
  },
  description:
    "Selamat datang di Blog resmi XFresh. Dapatkan tips, berita, dan inovasi terbaru seputar kebersihan helm dan gaya hidup pengendara modern.",
  openGraph: {
    title: "XFresh Blog",
    description:
      "Selamat datang di Blog resmi XFresh. Dapatkan tips, berita, dan inovasi terbaru seputar kebersihan helm dan gaya hidup pengendara modern.",
    url: "https://blog.xfresh.id", // Pastikan ini adalah domain Anda
    siteName: "XFresh Blog",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XFresh Blog",
    description:
      "Selamat datang di Blog resmi XFresh. Dapatkan tips, berita, dan inovasi terbaru seputar kebersihan helm dan gaya hidup pengendara modern.",
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head></head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
