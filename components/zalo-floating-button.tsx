"use client"

import { usePathname } from "next/navigation"

const ZALO_PHONE_NUMBER = "0969674679"
const ZALO_CHAT_URL = `https://zalo.me/${ZALO_PHONE_NUMBER}`

export default function ZaloFloatingButton() {
  const pathname = usePathname()

  if (pathname && pathname.startsWith("/admin")) {
    return null
  }

  return (
    <a
      href={ZALO_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6"
    >
      <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center">
        <img src="/zalo-logo.svg" alt="Zalo" className="h-8 w-8 md:h-9 md:w-9" />
      </div>
    </a>
  )
}


