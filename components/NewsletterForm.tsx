'use client'

import { useState, FormEvent } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Une erreur est survenue.')
      }

      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
      >
        <p className="text-lg font-semibold mb-1" style={{ color: '#560E13' }}>
          Bienvenue !
        </p>
        <p style={{ color: 'rgba(10,10,10,0.6)' }}>
          Verifiez votre boite mail.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-8"
      style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          required
          className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
          style={{
            backgroundColor: '#FEFCF9',
            border: '1px solid rgba(86,14,19,0.15)',
            color: '#0A0A0A',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-lg font-semibold text-sm transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 cursor-pointer"
          style={{
            backgroundColor: '#F6C961',
            color: '#560E13',
          }}
        >
          {status === 'loading' ? 'Envoi...' : "S'inscrire"}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-3 text-sm" style={{ color: '#c0392b' }}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
