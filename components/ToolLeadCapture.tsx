'use client'

import { useState } from 'react'

type Props = {
  /**
   * Source interne qui conditionne la séquence Brevo.
   * Doit matcher une clé de TOOL_SEQUENCES (lib/brevo/sequences.ts).
   */
  source: string
  /** Titre court affiché au-dessus du formulaire. */
  title?: string
  /** Sous-titre / promesse. */
  subtitle?: string
  /** Texte du bouton principal. */
  ctaLabel?: string
  /** Contexte additionnel à joindre au lead (ex: résultat du calculateur). */
  extraAttributes?: Record<string, string>
  /** Callback appelé après succès (pour afficher un autre CTA, par ex). */
  onSuccess?: () => void
}

/**
 * Formulaire email réutilisable pour les outils IA.
 * Poste sur /api/tools/lead qui :
 *  - crée/upsert le lead Supabase
 *  - ajoute le contact à la liste Brevo mappée via TOOL_SEQUENCES
 */
export default function ToolLeadCapture({
  source,
  title = 'Recevoir ce rapport par email',
  subtitle = "On vous envoie un récapitulatif personnalisé + des pistes d'action.",
  ctaLabel = 'Recevoir le rapport',
  extraAttributes = {},
  onSuccess,
}: Props) {
  const [email, setEmail] = useState('')
  const [prenom, setPrenom] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Merci de saisir un email valide.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tools/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, prenom, source, extraAttributes }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || 'Erreur, réessayez dans un instant.')
      }
      setSent(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-lg p-6 text-center"
        style={{ backgroundColor: '#F8F5F0', border: '1px solid #560E13' }}
      >
        <p className="text-lg font-medium" style={{ color: '#560E13' }}>
          Merci {prenom || ''} ! Votre rapport arrive dans votre boîte mail.
        </p>
        <p className="mt-2 text-sm opacity-80">
          Pensez à vérifier vos spams si vous ne le recevez pas sous 2 minutes.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg p-6"
      style={{ backgroundColor: '#F8F5F0', border: '1px solid #E5E0D6' }}
    >
      <h3 className="text-xl font-medium mb-1" style={{ color: '#560E13' }}>
        {title}
      </h3>
      <p className="text-sm mb-4 opacity-80">{subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Prénom (facultatif)"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full px-4 py-3 rounded-md border text-sm"
          style={{ borderColor: '#D4CFC2', backgroundColor: '#FEFCF9' }}
        />
        <input
          type="email"
          required
          placeholder="Votre email pro"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md border text-sm"
          style={{ borderColor: '#D4CFC2', backgroundColor: '#FEFCF9' }}
        />
      </div>
      {error && (
        <p className="mt-3 text-sm" style={{ color: '#B91C1C' }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full md:w-auto px-6 py-3 rounded-md text-sm font-medium disabled:opacity-60 transition-opacity"
        style={{ backgroundColor: '#560E13', color: '#F6C961' }}
      >
        {loading ? 'Envoi…' : ctaLabel}
      </button>
      <p className="mt-3 text-xs opacity-60">
        Vos données ne sont pas stockées au-delà de 30 jours. Pas de spam, désabonnement en 1 clic.
      </p>
    </form>
  )
}
