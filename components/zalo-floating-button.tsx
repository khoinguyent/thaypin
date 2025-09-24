"use client"

import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const ZALO_PHONE_NUMBER = "0969674679"
const ZALO_CHAT_URL = `https://zalo.me/${ZALO_PHONE_NUMBER}`

export default function ZaloFloatingButton() {
  const pathname = usePathname()
  const [loadError, setLoadError] = useState(false)

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
      <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center overflow-hidden">
        {loadError ? (
          <span className="text-[#0068FF] font-bold text-base md:text-lg">Z</span>
        ) : (
          <Image
            src="/zalo-logo.svg"
            alt="Zalo"
            width={36}
            height={36}
            className="h-9 w-9 md:h-10 md:w-10"
            onError={() => setLoadError(true)}
            priority
          />
        )}
      </div>
    </a>
  )
}


