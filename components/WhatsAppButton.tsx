'use client'

import { useState, useEffect } from 'react'

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/33650329808'
const DEFAULT_MESSAGE = 'Bonjour Roseline, je souhaite en savoir plus sur vos services.'

interface WhatsAppButtonProps {
  message?: string
}

export default function WhatsAppButton({ message = DEFAULT_MESSAGE }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez Roseline sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.5)',
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse-whatsapp"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="white"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.496.644 4.84 1.77 6.88L2 30l7.334-1.724A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12s-5.373 12-12 12a11.93 11.93 0 0 1-5.97-1.59l-.43-.26-4.355 1.024 1.067-4.22-.28-.45A11.94 11.94 0 0 1 4 16C4 9.373 9.373 4 16 4zm-3.18 5.5c-.27 0-.7.1-.96.38-.26.28-1 .97-1 2.36s1.02 2.74 1.16 2.93c.14.19 1.97 3.12 4.84 4.25 2.39.96 2.87.77 3.39.72.52-.05 1.68-.68 1.92-1.34.24-.66.24-1.23.17-1.34-.07-.11-.26-.18-.55-.31-.29-.13-1.68-.83-1.94-.93-.26-.1-.45-.15-.64.15-.19.3-.73.93-.9 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.3-.02-.46.13-.6.13-.13.29-.34.43-.51.14-.17.19-.3.29-.5.1-.2.05-.37-.02-.52-.07-.15-.6-1.46-.83-2-.22-.52-.45-.45-.63-.46-.17-.01-.36-.01-.55-.01z" />
        </svg>
      </div>
    </a>
  )
}
