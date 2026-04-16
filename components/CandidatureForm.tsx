'use client'

import { useState, FormEvent } from 'react'

const NATIONALITES = [
  'Francaise',
  'Senegalaise',
  'Belge',
  'Suisse',
  'Canadienne',
  'Ivoirienne',
  'Camerounaise',
  'Malienne',
  'Guineenne',
  'Autre',
]

export default function CandidatureForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    nationalite: '',
    lieuResidence: '',
    descriptionProjet: '',
    motivation: '',
    linkedinUrl: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Une erreur est survenue.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  const inputStyle = {
    backgroundColor: '#FEFCF9',
    border: '1px solid rgba(86,14,19,0.15)',
    color: '#0A0A0A',
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
      >
        <p
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            color: '#560E13',
          }}
        >
          Candidature envoyee !
        </p>
        <p style={{ color: 'rgba(10,10,10,0.6)' }}>
          Merci pour votre interet. Nous reviendrons vers vous dans les meilleurs delais.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-6 md:p-8"
      style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
              Nom complet *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
              Telephone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
              Nationalite *
            </label>
            <select
              name="nationalite"
              value={formData.nationalite}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-pointer"
              style={inputStyle}
            >
              <option value="">Selectionnez</option>
              {NATIONALITES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
            Lieu de residence *
          </label>
          <input
            type="text"
            name="lieuResidence"
            value={formData.lieuResidence}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
            Description du projet *
          </label>
          <textarea
            name="descriptionProjet"
            value={formData.descriptionProjet}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
            Motivation *
          </label>
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#0A0A0A' }}>
            Profil LinkedIn (optionnel)
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
        </div>

        {status === 'error' && (
          <p className="text-sm" style={{ color: '#c0392b' }}>
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3.5 rounded-lg font-semibold text-base transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 cursor-pointer"
          style={{
            backgroundColor: '#560E13',
            color: '#FEFCF9',
          }}
        >
          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
        </button>
      </form>
    </div>
  )
}
