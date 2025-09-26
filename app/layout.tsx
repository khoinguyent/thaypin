import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast-provider"
import ZaloFloatingButton from "@/components/zalo-floating-button"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
          title: "thaypin.vn - Thay Pin iPhone Chuyên Nghiệp",
  description:
    "Dịch vụ thay pin iPhone chuyên nghiệp tại Việt Nam. Thay pin nhanh chóng, chất lượng cao cho tất cả các dòng iPhone.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-32x32.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="font-sans">
        <ToastProvider>
          {children}
        </ToastProvider>
        <ZaloFloatingButton />
        <Analytics />
      </body>
    </html>
  )
}
