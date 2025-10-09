import type React from "react"
import type { Metadata, Viewport } from "next"
import { Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CF Legal - Estudio Jurídico",
  description: "Asesoría legal de excelencia para empresas y patrimonios",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: false,
    statusBarStyle: "default",
    title: "CF Legal",
  },
  mobileWebApp: {
    capable: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0F1822",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${raleway.variable}`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
