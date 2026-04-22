'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Msg = { role: 'user' | 'assistant'; content: string }

const STORAGE_KEY = 'tripafro_chat_v1'
const WELCOME: Msg = {
  role: 'assistant',
  content:
    "Salut ! Je suis l'assistant TripAfro 🌍 Pose-moi ta question sur le Sénégal, les voyages, la diaspora ou le consulting. Je suis là 24/7.",
}

const CTA_MAP: Record<string, { label: string; href: string; external?: boolean }> = {
  calendly: {
    label: 'Réserver un appel gratuit',
    href: 'https://calendly.com/roseline-ngom',
    external: true,
  },
  guide: { label: 'Télécharger le guide gratuit', href: '/ressources/guide-15-experiences' },
  voyage_rs: {
    label: 'Découvrir Retour aux Sources',
    href: '/voyages/retour-aux-sources',
  },
  voyage_signature: { label: 'Voir le Voyage Signature', href: '/voyages/voyage-signature' },
  bled_autrement: { label: 'Le Bled Autrement (diaspora)', href: '/liens' },
  consulting: { label: 'Découvrir le consulting', href: '/consulting' },
}

function renderMessage(content: string): React.ReactNode[] {
  // Parse **bold**; container has whitespace-pre-wrap so \n is preserved naturally
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>
    }
    return <span key={i}>{p}</span>
  })
}

function genSessionId(): string {
  try {
    return (
      (globalThis.crypto as Crypto)?.randomUUID?.() ||
      `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
    )
  } catch {
    return `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }
}

export default function ToolChatWidget() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cta, setCta] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const endRef = useRef<HTMLDivElement>(null)

  // Load session from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.messages)) setMessages(parsed.messages)
        if (typeof parsed?.sessionId === 'string') setSessionId(parsed.sessionId)
        if (parsed?.collapsed === true) setCollapsed(true)
      } else {
        setSessionId(genSessionId())
      }
    } catch {
      setSessionId(genSessionId())
    }
  }, [])

  // Persist session
  useEffect(() => {
    if (!sessionId) return
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages, sessionId, collapsed })
      )
    } catch {
      /* noop */
    }
  }, [messages, sessionId, collapsed])

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const newMsgs: Msg[] = [...messages, { role: 'user', content: text }]
    setMessages(newMsgs)
    setLoading(true)
    setCta(null)
    try {
      const res = await fetch('/api/tools/chatbot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, sessionId }),
      })
      const data = await res.json()
      setMessages([...newMsgs, { role: 'assistant', content: data?.reply || '…' }])
      if (data?.cta && CTA_MAP[data.cta]) setCta(data.cta)
    } catch {
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          content:
            "Désolé, souci réseau. Réessaie ou écris sur WhatsApp : +33 6 50 32 98 08.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Bubble */}
      {!open && collapsed && (
        <button
          type="button"
          aria-label="Ouvrir le chatbot TripAfro"
          onClick={() => setOpen(true)}
          className="fixed z-50 bottom-24 right-5 md:bottom-28 md:right-6 rounded-full shadow-xl transition-transform hover:scale-105"
          style={{
            width: '48px',
            height: '48px',
            backgroundImage: 'url(/images/roseline-portrait-1.jpg)',
            backgroundSize: '140%',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            border: '2px solid #560E13',
            boxShadow: '0 8px 20px rgba(86, 14, 19, 0.35)',
          }}
        >
          <span
            className="absolute block rounded-full"
            style={{
              bottom: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              backgroundColor: '#10B981',
              border: '2px solid #FEFCF9',
            }}
            aria-label="En ligne"
          />
        </button>
      )}
      {!open && !collapsed && (
        <div
          className="fixed z-50 bottom-24 right-5 md:bottom-28 md:right-6 flex items-stretch rounded-full shadow-xl transition-transform hover:scale-[1.02] group"
          style={{
            backgroundColor: '#560E13',
            boxShadow: '0 12px 30px rgba(86, 14, 19, 0.45)',
          }}
        >
          <button
            type="button"
            aria-label="Réduire"
            onClick={(e) => {
              e.stopPropagation()
              setCollapsed(true)
            }}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow"
            style={{
              backgroundColor: '#FEFCF9',
              color: '#560E13',
              border: '1px solid #560E13',
            }}
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Ouvrir le chatbot TripAfro"
            onClick={() => setOpen(true)}
            className="flex items-stretch"
          >
          {/* Avatar circle */}
          <span
            className="relative flex-shrink-0 flex items-center justify-center m-1.5"
            style={{
              width: '44px',
              height: '44px',
              backgroundImage: 'url(/images/roseline-portrait-1.jpg)',
              backgroundSize: '140%',
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat',
              borderRadius: '9999px',
              border: '2px solid #F6C961',
            }}
          >
            <span
              className="absolute block rounded-full"
              style={{
                bottom: '-1px',
                right: '-1px',
                width: '11px',
                height: '11px',
                backgroundColor: '#10B981',
                border: '2px solid #560E13',
              }}
              aria-label="En ligne"
            />
          </span>
          {/* Label */}
          <span className="flex flex-col justify-center items-start text-left pl-3 pr-5 py-2">
            <span
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: '#F6C961' }}
            >
              Assistant TripAfro
            </span>
            <span
              className="text-sm font-semibold whitespace-nowrap flex items-center gap-1.5"
              style={{ color: '#FEFCF9' }}
            >
              Posez votre question
              <span
                className="transition-transform group-hover:translate-x-0.5"
                style={{ color: '#F6C961' }}
              >
                →
              </span>
            </span>
          </span>
          </button>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed z-50 flex flex-col shadow-xl overflow-hidden"
          style={{
            bottom: '0',
            right: '0',
            width: '100%',
            height: '100dvh',
            maxWidth: '400px',
            maxHeight: '600px',
            backgroundColor: '#FEFCF9',
            border: '1px solid #560E13',
            borderRadius: '0',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: '#560E13', color: '#F6C961' }}
          >
            <div>
              <p className="text-sm font-semibold">Assistant TripAfro</p>
              <p className="text-xs opacity-80">Disponible 24/7 · Réponses instantanées</p>
            </div>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="text-xl px-2"
              style={{ color: '#F6C961' }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ backgroundColor: '#F8F5F0' }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap leading-relaxed"
                  style={
                    m.role === 'user'
                      ? { backgroundColor: '#560E13', color: '#F6C961' }
                      : { backgroundColor: '#FEFCF9', color: '#0A0A0A', border: '1px solid #E5E0D6' }
                  }
                >
                  {renderMessage(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: '#FEFCF9', border: '1px solid #E5E0D6' }}
                >
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#560E13] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#560E13] animate-bounce"
                      style={{ animationDelay: '120ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#560E13] animate-bounce"
                      style={{ animationDelay: '240ms' }}
                    />
                  </span>
                </div>
              </div>
            )}

            {/* Contextual CTA */}
            {cta && CTA_MAP[cta] && (
              <div className="flex justify-start">
                {CTA_MAP[cta].external ? (
                  <a
                    href={CTA_MAP[cta].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-md text-xs font-medium"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    {CTA_MAP[cta].label} →
                  </a>
                ) : (
                  <Link
                    href={CTA_MAP[cta].href}
                    className="inline-block px-4 py-2 rounded-md text-xs font-medium"
                    style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                  >
                    {CTA_MAP[cta].label} →
                  </Link>
                )}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            className="px-3 py-3 border-t"
            style={{ borderColor: '#E5E0D6', backgroundColor: '#FEFCF9' }}
          >
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ta question…"
                rows={1}
                className="flex-1 resize-none rounded-md px-3 py-2 text-sm"
                style={{ border: '1px solid #D4CFC2', backgroundColor: '#FEFCF9' }}
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="px-4 rounded-md text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: '#560E13', color: '#F6C961' }}
              >
                ↑
              </button>
            </div>
            <a
              href="https://wa.me/33650329808"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-xs text-center opacity-80 underline"
              style={{ color: '#560E13' }}
            >
              Parler directement à Roseline sur WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
