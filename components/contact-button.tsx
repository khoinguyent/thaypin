"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ContactModal from "@/components/contact-modal"

interface ContactButtonProps {
  children?: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  className?: string
}

export default function ContactButton({ children = 'Đặt lịch', variant = 'default', className }: ContactButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        variant={variant}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <ContactModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}


