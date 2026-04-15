'use client'

import { useEffect } from 'react'

interface CalendlyEmbedProps {
  url: string
  primaryColor?: string
}

export default function CalendlyEmbed({ url, primaryColor = '560E13' }: CalendlyEmbedProps) {
  useEffect(() => {
    // Charger le script Calendly dynamiquement
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const fullUrl = `${url}?hide_gdpr_banner=1&primary_color=${primaryColor}`

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <div
        className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
        data-url={fullUrl}
        style={{ minWidth: 320, height: 700 }}
      />
    </>
  )
}
