'use client'

import { useState } from 'react'

export default function CommentForm({ slug }: { slug: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMsg('')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          author_name: name,
          author_email: email,
          content,
          website, // honeypot
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || 'Erreur lors de l\'envoi')
      } else {
        setStatus('success')
        setName('')
        setEmail('')
        setContent('')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erreur réseau, réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{
          backgroundColor: 'rgba(86,14,19,0.04)',
          border: '1px solid rgba(86,14,19,0.15)',
        }}
      >
        <div className="text-2xl mb-2">🙏</div>
        <p
          className="text-base font-semibold mb-1"
          style={{ color: '#560E13' }}
        >
          Merci pour votre commentaire
        </p>
        <p className="text-sm" style={{ color: 'rgba(10,10,10,0.65)' }}>
          Il sera publié après validation par Roseline. Comptez quelques heures.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-6"
      style={{
        backgroundColor: '#FEFCF9',
        border: '1px solid rgba(86,14,19,0.12)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="c-name"
            className="block text-xs font-semibold mb-1"
            style={{ color: '#560E13' }}
          >
            Votre prénom ou pseudo *
          </label>
          <input
            id="c-name"
            type="text"
            required
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{
              border: '1px solid rgba(86,14,19,0.2)',
              backgroundColor: '#FFFFFF',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="c-email"
            className="block text-xs font-semibold mb-1"
            style={{ color: '#560E13' }}
          >
            Email * <span style={{ color: 'rgba(10,10,10,0.5)', fontWeight: 400 }}>(non publié)</span>
          </label>
          <input
            id="c-email"
            type="email"
            required
            maxLength={150}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{
              border: '1px solid rgba(86,14,19,0.2)',
              backgroundColor: '#FFFFFF',
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="c-content"
          className="block text-xs font-semibold mb-1"
          style={{ color: '#560E13' }}
        >
          Votre commentaire * <span style={{ color: 'rgba(10,10,10,0.5)', fontWeight: 400 }}>(20 à 2000 caractères)</span>
        </label>
        <textarea
          id="c-content"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm resize-y"
          style={{
            border: '1px solid rgba(86,14,19,0.2)',
            backgroundColor: '#FFFFFF',
          }}
        />
        <p
          className="text-xs mt-1"
          style={{ color: 'rgba(10,10,10,0.5)' }}
        >
          {content.length} / 2000
        </p>
      </div>

      {/* Honeypot : caché aux humains, rempli par les bots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="c-website">Site web (ne pas remplir)</label>
        <input
          id="c-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p
          className="text-sm mb-3"
          style={{ color: '#b91c1c' }}
        >
          {errorMsg}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p
          className="text-xs"
          style={{ color: 'rgba(10,10,10,0.55)' }}
        >
          Votre commentaire sera relu et validé par Roseline avant publication.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-full font-semibold text-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
        >
          {loading ? 'Envoi...' : 'Publier mon commentaire'}
        </button>
      </div>
    </form>
  )
}
