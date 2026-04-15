'use client'

import { useState, useEffect } from 'react'

export default function LeadPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Ne pas afficher si déjà vu cette session
    const seen = sessionStorage.getItem('lead_popup_seen')
    if (seen) return

    const timer = setTimeout(() => setShow(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('lead_popup_seen', '1')
    setShow(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      })
      setDone(true)
      sessionStorage.setItem('lead_popup_seen', '1')
      setTimeout(handleClose, 3000)
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl p-8"
        style={{ backgroundColor: '#FEFCF9' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl font-light opacity-40 hover:opacity-70"
        >
          ×
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="font-playfair text-xl font-bold mb-2" style={{ color: '#560E13' }}>
              C'est parti !
            </h3>
            <p className="text-sm opacity-70">Vérifiez votre boîte email.</p>
          </div>
        ) : (
          <>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#F6C961' }}
            >
              Offre gratuite
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: '#560E13' }}>
              Téléchargez votre guide gratuit
            </h3>
            <p className="text-sm mb-6 opacity-70">
              Les 10 expériences secrètes au Sénégal que même les locaux ne connaissent pas.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[#560E13]"
                style={{ borderColor: '#e0d8d0' }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-opacity"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                {loading ? 'Envoi...' : 'Recevoir le guide gratuitement'}
              </button>
            </form>

            <p className="text-xs text-center mt-3 opacity-40">
              Gratuit, sans spam. Désinscription en 1 clic.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
