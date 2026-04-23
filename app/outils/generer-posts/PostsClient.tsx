'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * Générateur de posts IA — 1 étape de saisie + résultat triple format.
 * Focus SEO local : GBP + Instagram + LinkedIn.
 */

type PostTopic =
  | 'offre_promo'
  | 'evenement_local'
  | 'coin_secret'
  | 'gastronomie'
  | 'temoignage_client'
  | 'saison_voyage'

type Tone = 'chaleureux' | 'premium' | 'jeune'

interface FormData {
  hotelName: string
  city: string
  country: string
  topic: PostTopic | ''
  keyInfo: string
  tone: Tone
  email: string
}

interface GeneratedPost {
  gbpPost: {
    title: string
    body: string
    ctaLabel: 'RESERVER' | 'EN_SAVOIR_PLUS' | 'APPELER' | 'OBTENIR_OFFRE'
    seoKeywords: string[]
  }
  instagramPost: {
    caption: string
    hashtags: string[]
    firstComment: string
  }
  linkedinPost: {
    body: string
    hashtags: string[]
  }
  publishingTips: {
    bestTime: string
    frequencyAdvice: string
    seoAdvice: string
  }
}

const BRAND = '#560E13'
const GOLD = '#F6C961'
const BG = '#F8F5F0'

const TOPICS: Array<{ value: PostTopic; label: string; desc: string }> = [
  { value: 'offre_promo', label: 'Offre / package', desc: 'Promo week-end, early booking, long séjour' },
  { value: 'evenement_local', label: 'Événement local', desc: 'Festival, concert, actualité de ta ville' },
  { value: 'coin_secret', label: 'Coin secret', desc: 'Spot méconnu, expérience insolite autour de l’hôtel' },
  { value: 'gastronomie', label: 'Gastronomie', desc: 'Plat du chef, cuisine locale, soirée thématique' },
  { value: 'temoignage_client', label: 'Témoignage client', desc: 'Retour positif d’un client récent (avec accord)' },
  { value: 'saison_voyage', label: 'Saison', desc: 'Haute saison, basse saison, météo, ambiance' },
]

const TONES: Array<{ value: Tone; label: string }> = [
  { value: 'chaleureux', label: 'Chaleureux' },
  { value: 'premium', label: 'Premium' },
  { value: 'jeune', label: 'Jeune / lifestyle' },
]

const CTA_LABELS_FR: Record<GeneratedPost['gbpPost']['ctaLabel'], string> = {
  RESERVER: 'Réserver',
  EN_SAVOIR_PLUS: 'En savoir plus',
  APPELER: 'Appeler',
  OBTENIR_OFFRE: 'Obtenir l’offre',
}

const initialForm: FormData = {
  hotelName: '',
  city: '',
  country: 'Sénégal',
  topic: '',
  keyInfo: '',
  tone: 'chaleureux',
  email: '',
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* noop */
        }
      }}
      className="text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
      style={{
        backgroundColor: copied ? '#15803D' : BRAND,
        color: copied ? '#fff' : GOLD,
      }}
    >
      {copied ? '✓ Copié' : label || 'Copier'}
    </button>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-medium px-2 py-1 rounded-full mr-1.5 mb-1.5"
      style={{
        backgroundColor: 'rgba(86, 14, 19, 0.08)',
        color: BRAND,
      }}
    >
      {children}
    </span>
  )
}

function PostCard({
  platform,
  accent,
  icon,
  children,
}: {
  platform: string
  accent: string
  icon: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: `1px solid rgba(86, 14, 19, 0.1)`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: '0.75rem',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            color: BRAND,
            fontSize: '1.25rem',
            margin: 0,
          }}
        >
          {platform}
        </h3>
      </div>
      {children}
    </div>
  )
}

export default function PostsClient() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedPost | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canSubmit =
    form.hotelName.trim().length > 1 &&
    form.city.trim().length > 1 &&
    form.topic !== '' &&
    form.keyInfo.trim().length > 10

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || loading) return
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/tools/generate-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erreur inconnue')
      } else {
        setResult(data.posts)
      }
    } catch {
      setError('Connexion impossible. Réessaye dans un instant.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setResult(null)
    setError(null)
  }

  // RÉSULTAT
  if (result) {
    return (
      <div>
        <div
          style={{
            backgroundColor: '#fff',
            border: `1px solid rgba(86, 14, 19, 0.1)`,
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full"
              style={{ backgroundColor: BRAND, color: GOLD }}
            >
              Posts · {form.hotelName}
            </span>
            <button
              type="button"
              onClick={reset}
              className="text-xs opacity-60 hover:opacity-100"
              style={{ color: BRAND }}
            >
              ↻ Nouveau post
            </button>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: BRAND,
              fontSize: '1.6rem',
              marginTop: '0.75rem',
              marginBottom: '0.5rem',
            }}
          >
            3 posts prêts à publier
          </h2>
          <p className="text-sm opacity-70">
            {result.publishingTips.seoAdvice}
          </p>
        </div>

        {/* GBP POST — le plus important SEO */}
        <PostCard platform="Google Business Profile" icon="📍" accent="#1a73e8">
          <div
            style={{
              backgroundColor: BG,
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: BRAND,
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: 0,
                marginBottom: '0.4rem',
              }}
            >
              {result.gbpPost.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
              {result.gbpPost.body}
            </p>
            <div
              className="inline-block mt-3 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: BRAND, color: GOLD }}
            >
              Bouton : {CTA_LABELS_FR[result.gbpPost.ctaLabel]}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-xs uppercase tracking-wider mb-1.5 opacity-60">
              Mots-clés SEO ciblés
            </p>
            <div>
              {result.gbpPost.seoKeywords.map((k) => (
                <Chip key={k}>{k}</Chip>
              ))}
            </div>
          </div>
          <CopyButton
            text={`${result.gbpPost.title}\n\n${result.gbpPost.body}`}
            label="Copier le post GBP"
          />
          <p className="text-xs opacity-60 mt-2 italic">
            ⭐ Post le plus important : Google l’indexe et renforce ton SEO local.
          </p>
        </PostCard>

        {/* INSTAGRAM */}
        <PostCard platform="Instagram / Facebook" icon="📸" accent="#E4405F">
          <div
            style={{
              backgroundColor: BG,
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#2d2d2d',
            }}
          >
            {result.instagramPost.caption}
          </div>
          <div className="mb-2">
            <p className="text-xs uppercase tracking-wider mb-1.5 opacity-60">
              Hashtags principaux ({result.instagramPost.hashtags.length})
            </p>
            <div>
              {result.instagramPost.hashtags.map((h) => (
                <Chip key={h}>{h}</Chip>
              ))}
            </div>
          </div>
          <details className="mb-3">
            <summary
              className="text-xs cursor-pointer opacity-70"
              style={{ color: BRAND }}
            >
              1er commentaire (hashtags secondaires pour booster la portée)
            </summary>
            <div
              className="mt-2 text-sm p-3 rounded"
              style={{ backgroundColor: BG, whiteSpace: 'pre-wrap' }}
            >
              {result.instagramPost.firstComment}
            </div>
          </details>
          <div className="flex gap-2 flex-wrap">
            <CopyButton
              text={`${result.instagramPost.caption}\n\n${result.instagramPost.hashtags.join(' ')}`}
              label="Copier caption + hashtags"
            />
            <CopyButton
              text={result.instagramPost.firstComment}
              label="Copier 1er commentaire"
            />
          </div>
        </PostCard>

        {/* LINKEDIN */}
        <PostCard platform="LinkedIn" icon="💼" accent="#0A66C2">
          <div
            style={{
              backgroundColor: BG,
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#2d2d2d',
            }}
          >
            {result.linkedinPost.body}
          </div>
          <div className="mb-3">
            {result.linkedinPost.hashtags.map((h) => (
              <Chip key={h}>{h}</Chip>
            ))}
          </div>
          <CopyButton
            text={`${result.linkedinPost.body}\n\n${result.linkedinPost.hashtags.join(' ')}`}
            label="Copier post LinkedIn"
          />
        </PostCard>

        {/* PUBLISHING TIPS */}
        <div
          style={{
            backgroundColor: BRAND,
            color: '#fff',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: GOLD, letterSpacing: '0.15em' }}
          >
            Conseils de publication
          </p>
          <p className="mb-2">
            <strong style={{ color: GOLD }}>Meilleur moment :</strong>{' '}
            {result.publishingTips.bestTime}
          </p>
          <p className="text-sm opacity-90">
            {result.publishingTips.frequencyAdvice}
          </p>
        </div>

        {/* CTA CONSULTING */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: `1px solid rgba(86, 14, 19, 0.1)`,
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
        >
          <p className="text-sm opacity-80 mb-3">
            Besoin d’une vraie stratégie de contenu sur 3 mois ?
          </p>
          <Link
            href="/digital-ia/presence-digitale"
            className="inline-block px-5 py-2.5 rounded-md text-sm font-medium"
            style={{ backgroundColor: BRAND, color: GOLD }}
          >
            Parler stratégie avec Roseline →
          </Link>
        </div>
      </div>
    )
  }

  // LOADING
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: `1px solid rgba(86, 14, 19, 0.1)`,
          borderRadius: '1rem',
          padding: '3rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            margin: '0 auto 1rem',
            border: `3px solid rgba(86, 14, 19, 0.15)`,
            borderTop: `3px solid ${BRAND}`,
            borderRadius: '50%',
            animation: 'posts-spin 1s linear infinite',
          }}
        />
        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            color: BRAND,
            fontSize: '1.4rem',
            marginBottom: '0.5rem',
          }}
        >
          L&apos;IA rédige tes 3 posts…
        </h3>
        <p className="text-sm opacity-70">Mots-clés SEO, hashtags, storytelling — 15 à 20 secondes.</p>
        <style>{`
          @keyframes posts-spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  // FORMULAIRE
  return (
    <form
      onSubmit={submit}
      style={{
        backgroundColor: '#fff',
        border: `1px solid rgba(86, 14, 19, 0.1)`,
        borderRadius: '1rem',
        padding: '1.5rem',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          color: BRAND,
          fontSize: '1.6rem',
          marginBottom: '0.3rem',
        }}
      >
        Ton post en 30 secondes
      </h2>
      <p className="text-sm opacity-70 mb-5">
        Remplis les infos, l&apos;IA te sort 3 posts optimisés SEO local.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: BRAND }}>
            Nom de l&apos;hôtel *
          </label>
          <input
            type="text"
            required
            value={form.hotelName}
            onChange={(e) => setForm({ ...form, hotelName: e.target.value })}
            placeholder="Hôtel Le Djoloff"
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{ border: `1px solid rgba(86, 14, 19, 0.2)`, backgroundColor: BG }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: BRAND }}>
            Ville *
          </label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Dakar"
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{ border: `1px solid rgba(86, 14, 19, 0.2)`, backgroundColor: BG }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium mb-1" style={{ color: BRAND }}>
          Pays
        </label>
        <input
          type="text"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="w-full px-3 py-2 rounded-md text-sm"
          style={{ border: `1px solid rgba(86, 14, 19, 0.2)`, backgroundColor: BG }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium mb-2" style={{ color: BRAND }}>
          Thème du post *
        </label>
        <div className="grid grid-cols-1 gap-2">
          {TOPICS.map((t) => (
            <label
              key={t.value}
              className="flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors"
              style={{
                backgroundColor: form.topic === t.value ? BG : '#fff',
                border:
                  form.topic === t.value
                    ? `1.5px solid ${BRAND}`
                    : `1px solid rgba(86, 14, 19, 0.15)`,
              }}
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={form.topic === t.value}
                onChange={() => setForm({ ...form, topic: t.value })}
                className="mt-1"
                style={{ accentColor: BRAND }}
              />
              <div>
                <div className="text-sm font-medium" style={{ color: BRAND }}>
                  {t.label}
                </div>
                <div className="text-xs opacity-70">{t.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium mb-1" style={{ color: BRAND }}>
          Qu&apos;est-ce que tu veux mettre en avant ? * (10-800 caractères)
        </label>
        <textarea
          required
          rows={4}
          value={form.keyInfo}
          onChange={(e) => setForm({ ...form, keyInfo: e.target.value })}
          placeholder="Ex : Nous lançons un package week-end romantique à 65 000 FCFA avec petit-déjeuner en chambre, bouteille de vin et check-out tardif. Valable mai-juin."
          className="w-full px-3 py-2 rounded-md text-sm"
          style={{ border: `1px solid rgba(86, 14, 19, 0.2)`, backgroundColor: BG }}
        />
        <p className="text-xs opacity-60 mt-1">
          {form.keyInfo.length} / 800 caractères
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium mb-2" style={{ color: BRAND }}>
          Ton
        </label>
        <div className="flex gap-2 flex-wrap">
          {TONES.map((t) => (
            <label
              key={t.value}
              className="px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors"
              style={{
                backgroundColor: form.tone === t.value ? BRAND : BG,
                color: form.tone === t.value ? GOLD : BRAND,
                border: `1px solid ${form.tone === t.value ? BRAND : 'rgba(86, 14, 19, 0.15)'}`,
              }}
            >
              <input
                type="radio"
                name="tone"
                value={t.value}
                checked={form.tone === t.value}
                onChange={() => setForm({ ...form, tone: t.value })}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-md text-sm"
          style={{
            backgroundColor: 'rgba(220, 38, 38, 0.08)',
            color: '#991B1B',
            border: '1px solid rgba(220, 38, 38, 0.2)',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-md text-sm font-semibold transition-opacity"
        style={{
          backgroundColor: BRAND,
          color: GOLD,
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
      >
        Générer mes 3 posts IA →
      </button>
      <p className="text-xs opacity-60 text-center mt-3">
        Gratuit · Sans compte · IA générative · ~15 secondes
      </p>
    </form>
  )
}
