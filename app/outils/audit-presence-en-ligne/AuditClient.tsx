'use client'

import { useState } from 'react'
import Link from 'next/link'

/**
 * Wizard d'audit de présence en ligne — 3 étapes.
 * Étape 1 : infos de base + URL site
 * Étape 2 : questionnaire 7 questions
 * Étape 3 : rapport IA (appel Claude via /api/tools/audit)
 */

type Step = 1 | 2 | 3

type PrimaryOutlet = 'create_website' | 'seo_consulting' | 'reviews_tool' | 'social_tool'

interface AuditReport {
  score: number
  headline: string
  strengths: string[]
  weaknesses: Array<{ title: string; description: string; severity: 'high' | 'medium' }>
  actionPlan: Array<{ priority: number; action: string; horizon: 'now' | '30d' | '90d' }>
  primaryOutlet: PrimaryOutlet
  primaryOutletReason: string
}

interface SiteAnalysis {
  url: string
  reachable: boolean
  https: boolean
  title: string | null
  metaDescription: string | null
  h1Count: number
  pageSpeedMobile: number | null
  lcpMs: number | null
}

interface ApiResponse {
  report: AuditReport
  siteAnalysis: SiteAnalysis | null
}

interface FormData {
  hotelName: string
  city: string
  rooms: string
  email: string
  hasWebsite: 'yes' | 'no' | ''
  websiteUrl: string
  googleBusiness: '' | 'complete' | 'incomplete' | 'none' | 'unsure'
  googleReviewsCount: '' | '0' | '1-10' | '11-50' | '50+'
  googleReviewsRating: string
  otaPresence: '' | 'booking+tripadvisor' | 'booking-only' | 'tripadvisor-only' | 'none'
  otaRating: string
  reviewsReplyHabit: '' | 'systematic' | 'sometimes' | 'never'
  socialActivity: '' | 'active' | 'sporadic' | 'inactive' | 'none'
  bookingChannels: '' | 'all-ota' | 'mix' | 'all-direct'
  biggestPainPoint: string
}

const initialForm: FormData = {
  hotelName: '',
  city: '',
  rooms: '',
  email: '',
  hasWebsite: '',
  websiteUrl: '',
  googleBusiness: '',
  googleReviewsCount: '',
  googleReviewsRating: '',
  otaPresence: '',
  otaRating: '',
  reviewsReplyHabit: '',
  socialActivity: '',
  bookingChannels: '',
  biggestPainPoint: '',
}

const BRAND = '#560E13'
const GOLD = '#F6C961'
const BG = '#F8F5F0'
const BORDER = '#E5E0D6'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  border: `1px solid ${BORDER}`,
  borderRadius: '0.5rem',
  fontSize: '0.95rem',
  outline: 'none',
  backgroundColor: '#fff',
  color: '#0A0A0A',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  marginBottom: '0.45rem',
  color: BRAND,
  letterSpacing: '0.02em',
}

const helpStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  opacity: 0.6,
  marginTop: '0.35rem',
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  border: `1px solid ${BORDER}`,
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '0 4px 16px rgba(86, 14, 19, 0.05)',
}

const primaryBtnStyle: React.CSSProperties = {
  padding: '0.75rem 1.6rem',
  borderRadius: '0.5rem',
  backgroundColor: BRAND,
  color: GOLD,
  fontSize: '0.9rem',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  letterSpacing: '0.02em',
}

const secondaryBtnStyle: React.CSSProperties = {
  padding: '0.75rem 1.6rem',
  borderRadius: '0.5rem',
  backgroundColor: 'transparent',
  color: BRAND,
  fontSize: '0.9rem',
  fontWeight: 500,
  border: `1px solid ${BORDER}`,
  cursor: 'pointer',
}

function RadioGroup({
  name,
  value,
  options,
  onChange,
}: {
  name: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.6rem 0.9rem',
              border: `1px solid ${selected ? BRAND : BORDER}`,
              backgroundColor: selected ? 'rgba(86, 14, 19, 0.04)' : '#fff',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.15s',
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              style={{ accentColor: BRAND }}
            />
            <span>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}

function ProgressBar({ step }: { step: Step }) {
  const pct = step === 1 ? 33 : step === 2 ? 66 : 100
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-xs" style={{ color: BRAND, opacity: 0.7 }}>
        <span style={{ fontWeight: step >= 1 ? 600 : 400 }}>1. Ton hôtel</span>
        <span style={{ fontWeight: step >= 2 ? 600 : 400 }}>2. Présence actuelle</span>
        <span style={{ fontWeight: step >= 3 ? 600 : 400 }}>3. Rapport IA</span>
      </div>
      <div style={{ height: 4, backgroundColor: BORDER, borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${BRAND} 0%, ${GOLD} 100%)`,
            transition: 'width 0.4s',
          }}
        />
      </div>
    </div>
  )
}

/** Cercle de score animé */
function ScoreCircle({ score }: { score: number }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const dash = (score / 100) * circumference
  const color = score >= 70 ? '#15803D' : score >= 45 ? '#C2410C' : '#991B1B'

  return (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke={BORDER} strokeWidth="10" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform="rotate(-90 80 80)"
          style={{ transition: 'stroke-dasharray 1s ease-out' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: BRAND,
          fontFamily: 'var(--font-cormorant), serif',
        }}
      >
        <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
          sur 100
        </div>
      </div>
    </div>
  )
}

/** Métadonnées des 4 débouchés */
const OUTLETS: Record<
  PrimaryOutlet,
  { title: string; cta: string; href: string; paid: boolean; subtitle: string }
> = {
  create_website: {
    title: 'Tu as besoin d\'un site web avant tout',
    subtitle: 'Sans site, tu es 100 % dépendant des OTA et invisible sur Google.',
    cta: 'Créer un site qui convertit',
    href: '/digital-ia/presence-digitale',
    paid: true,
  },
  seo_consulting: {
    title: 'Un accompagnement stratégique est la clé',
    subtitle: 'Ton site existe mais il ne te rapporte pas ce qu\'il devrait. On retravaille ensemble.',
    cta: 'Prendre un audit stratégique',
    href: '/consulting/audit-strategique',
    paid: true,
  },
  reviews_tool: {
    title: 'Priorité : gérer tes avis en ligne',
    subtitle: 'Répondre aux avis est le levier n°1 pour ton ranking Booking et Google.',
    cta: 'Outil gratuit : bientôt disponible',
    href: '/outils',
    paid: false,
  },
  social_tool: {
    title: 'Priorité : réactiver tes réseaux sociaux',
    subtitle: 'Poster 1 fois par semaine double ton reach et nourrit ton SEO local.',
    cta: 'Générer mes posts IA (gratuit) →',
    href: '/outils/generer-posts',
    paid: false,
  },
}

function SeverityBadge({ severity }: { severity: 'high' | 'medium' }) {
  const map = {
    high: { label: 'Critique', bg: '#FEE2E2', fg: '#991B1B' },
    medium: { label: 'À améliorer', bg: '#FEF3C7', fg: '#92400E' },
  }
  const s = map[severity]
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.65rem',
        fontWeight: 600,
        padding: '0.2rem 0.55rem',
        borderRadius: '999px',
        backgroundColor: s.bg,
        color: s.fg,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      {s.label}
    </span>
  )
}

function HorizonBadge({ horizon }: { horizon: 'now' | '30d' | '90d' }) {
  const map = {
    now: { label: 'Cette semaine', bg: '#DCFCE7', fg: '#166534' },
    '30d': { label: 'Sous 30 jours', bg: '#DBEAFE', fg: '#1E40AF' },
    '90d': { label: 'Sous 90 jours', bg: '#F3E8FF', fg: '#6B21A8' },
  }
  const h = map[horizon]
  return (
    <span
      style={{
        fontSize: '0.65rem',
        fontWeight: 600,
        padding: '0.2rem 0.55rem',
        borderRadius: '999px',
        backgroundColor: h.bg,
        color: h.fg,
        letterSpacing: '0.02em',
      }}
    >
      {h.label}
    </span>
  )
}

export default function AuditClient() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ApiResponse | null>(null)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const canGoToStep2 =
    form.hotelName.trim().length > 1 &&
    form.city.trim().length > 1 &&
    form.rooms.trim() !== '' &&
    form.hasWebsite !== '' &&
    (form.hasWebsite === 'no' || form.websiteUrl.trim().length > 3)

  const canSubmit =
    form.googleBusiness !== '' &&
    form.googleReviewsCount !== '' &&
    form.otaPresence !== '' &&
    form.reviewsReplyHabit !== '' &&
    form.socialActivity !== '' &&
    form.bookingChannels !== ''

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    setStep(3)
    try {
      const res = await fetch('/api/tools/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.")
        setResult(null)
      } else {
        setResult(data as ApiResponse)
      }
    } catch {
      setError('Erreur réseau. Vérifie ta connexion et réessaye.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setForm(initialForm)
    setResult(null)
    setError('')
    setStep(1)
  }

  return (
    <div>
      <ProgressBar step={step} />

      {step === 1 && (
        <div style={cardStyle}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: BRAND,
              fontSize: '1.8rem',
              marginBottom: '0.4rem',
              lineHeight: 1.2,
            }}
          >
            On commence par ton hôtel
          </h2>
          <p className="text-sm opacity-70 mb-6">
            Quelques infos pour calibrer le rapport. Tout reste confidentiel.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Nom de ton hôtel</label>
              <input
                type="text"
                value={form.hotelName}
                onChange={(e) => update('hotelName', e.target.value)}
                placeholder="Ex. Hôtel Le Djoloff"
                style={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Ville / pays</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="Ex. Dakar, Sénégal"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Nombre de chambres</label>
                <input
                  type="number"
                  min={1}
                  value={form.rooms}
                  onChange={(e) => update('rooms', e.target.value)}
                  placeholder="Ex. 22"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>As-tu un site web pour ton hôtel ?</label>
              <RadioGroup
                name="hasWebsite"
                value={form.hasWebsite}
                onChange={(v) => update('hasWebsite', v as FormData['hasWebsite'])}
                options={[
                  { value: 'yes', label: 'Oui, voici mon URL' },
                  { value: 'no', label: "Non, je n'ai pas encore de site" },
                ]}
              />
            </div>

            {form.hasWebsite === 'yes' && (
              <div>
                <label style={labelStyle}>URL de ton site</label>
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(e) => update('websiteUrl', e.target.value)}
                  placeholder="https://monhotel.com"
                  style={inputStyle}
                />
                <p style={helpStyle}>
                  On analyse automatiquement vitesse mobile, SEO, structure. Rien n&apos;est stocké.
                </p>
              </div>
            )}

            <div>
              <label style={labelStyle}>
                Email <span style={{ opacity: 0.5, fontWeight: 400 }}>(optionnel — pour recevoir le rapport)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="toi@monhotel.com"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!canGoToStep2}
              style={{
                ...primaryBtnStyle,
                opacity: canGoToStep2 ? 1 : 0.4,
                cursor: canGoToStep2 ? 'pointer' : 'not-allowed',
              }}
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={cardStyle}>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: BRAND,
              fontSize: '1.8rem',
              marginBottom: '0.4rem',
              lineHeight: 1.2,
            }}
          >
            Ta présence actuelle
          </h2>
          <p className="text-sm opacity-70 mb-6">7 questions, 2 minutes. Sois honnête, c&apos;est le plus utile.</p>

          <div className="flex flex-col gap-6">
            <div>
              <label style={labelStyle}>1. Ta fiche Google Business</label>
              <RadioGroup
                name="googleBusiness"
                value={form.googleBusiness}
                onChange={(v) => update('googleBusiness', v as FormData['googleBusiness'])}
                options={[
                  { value: 'complete', label: 'Complète (photos, horaires, description, site)' },
                  { value: 'incomplete', label: 'Incomplète (créée mais vide ou presque)' },
                  { value: 'none', label: 'Pas créée' },
                  { value: 'unsure', label: 'Je ne sais pas' },
                ]}
              />
            </div>

            <div>
              <label style={labelStyle}>2. Nombre d&apos;avis Google</label>
              <RadioGroup
                name="googleReviewsCount"
                value={form.googleReviewsCount}
                onChange={(v) => update('googleReviewsCount', v as FormData['googleReviewsCount'])}
                options={[
                  { value: '0', label: '0 avis' },
                  { value: '1-10', label: '1 à 10 avis' },
                  { value: '11-50', label: '11 à 50 avis' },
                  { value: '50+', label: 'Plus de 50 avis' },
                ]}
              />
              {form.googleReviewsCount && form.googleReviewsCount !== '0' && (
                <div className="mt-3">
                  <label style={{ ...labelStyle, fontSize: '0.75rem', opacity: 0.8 }}>
                    Note moyenne Google (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.googleReviewsRating}
                    onChange={(e) => update('googleReviewsRating', e.target.value)}
                    placeholder="Ex. 4,3"
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>3. Présence sur OTA (Booking, TripAdvisor)</label>
              <RadioGroup
                name="otaPresence"
                value={form.otaPresence}
                onChange={(v) => update('otaPresence', v as FormData['otaPresence'])}
                options={[
                  { value: 'booking+tripadvisor', label: 'Les deux (Booking + TripAdvisor)' },
                  { value: 'booking-only', label: 'Booking uniquement' },
                  { value: 'tripadvisor-only', label: 'TripAdvisor uniquement' },
                  { value: 'none', label: 'Aucun des deux' },
                ]}
              />
              {form.otaPresence && form.otaPresence !== 'none' && (
                <div className="mt-3">
                  <label style={{ ...labelStyle, fontSize: '0.75rem', opacity: 0.8 }}>
                    Note moyenne Booking ou TripAdvisor (optionnel)
                  </label>
                  <input
                    type="text"
                    value={form.otaRating}
                    onChange={(e) => update('otaRating', e.target.value)}
                    placeholder="Ex. 8,4 ou 4 étoiles"
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>4. Tu réponds aux avis ?</label>
              <RadioGroup
                name="reviewsReplyHabit"
                value={form.reviewsReplyHabit}
                onChange={(v) => update('reviewsReplyHabit', v as FormData['reviewsReplyHabit'])}
                options={[
                  { value: 'systematic', label: 'Systématiquement, même les négatifs' },
                  { value: 'sometimes', label: "Parfois, quand j'ai le temps" },
                  { value: 'never', label: 'Jamais ou presque' },
                ]}
              />
            </div>

            <div>
              <label style={labelStyle}>5. Activité réseaux sociaux (Insta, Facebook)</label>
              <RadioGroup
                name="socialActivity"
                value={form.socialActivity}
                onChange={(v) => update('socialActivity', v as FormData['socialActivity'])}
                options={[
                  { value: 'active', label: 'Actif (post dans les 7 derniers jours)' },
                  { value: 'sporadic', label: 'Sporadique (1-2 fois par mois)' },
                  { value: 'inactive', label: 'Inactif (aucun post récent)' },
                  { value: 'none', label: 'Pas de compte réseaux' },
                ]}
              />
            </div>

            <div>
              <label style={labelStyle}>6. D&apos;où viennent tes réservations ?</label>
              <RadioGroup
                name="bookingChannels"
                value={form.bookingChannels}
                onChange={(v) => update('bookingChannels', v as FormData['bookingChannels'])}
                options={[
                  { value: 'all-ota', label: '100 % via OTA (Booking, Expedia…)' },
                  { value: 'mix', label: 'Mix OTA + quelques directes' },
                  { value: 'all-direct', label: '100 % direct (WhatsApp, téléphone, site)' },
                ]}
              />
            </div>

            <div>
              <label style={labelStyle}>
                7. Ton plus gros problème business aujourd&apos;hui{' '}
                <span style={{ opacity: 0.5, fontWeight: 400 }}>(optionnel, en 1 phrase)</span>
              </label>
              <textarea
                value={form.biggestPainPoint}
                onChange={(e) => update('biggestPainPoint', e.target.value)}
                rows={2}
                placeholder="Ex. Marge rongée par les 20 % de Booking, saisonnalité trop forte…"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between gap-3">
            <button onClick={() => setStep(1)} style={secondaryBtnStyle}>
              ← Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              style={{
                ...primaryBtnStyle,
                opacity: canSubmit && !loading ? 1 : 0.4,
                cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? 'Analyse en cours…' : 'Générer mon rapport IA →'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          {loading && (
            <div style={cardStyle}>
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    width: 48,
                    height: 48,
                    border: `3px solid ${BORDER}`,
                    borderTopColor: BRAND,
                    borderRadius: '50%',
                    animation: 'audit-spin 0.8s linear infinite',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    color: BRAND,
                    fontSize: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  L&apos;IA analyse ta présence en ligne…
                </h3>
                <p className="text-sm opacity-70 mt-2">
                  {form.hasWebsite === 'yes'
                    ? 'Scan de ton site + PageSpeed + analyse IA.'
                    : 'Analyse IA en cours.'}{' '}
                  15 à 30 secondes.
                </p>
              </div>
              <style>{`@keyframes audit-spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && !loading && (
            <div style={cardStyle}>
              <div
                className="text-sm rounded-lg px-4 py-3"
                style={{ color: '#991B1B', backgroundColor: '#FEE2E2' }}
              >
                {error}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(2)} style={secondaryBtnStyle}>
                  ← Retour au questionnaire
                </button>
                <button onClick={handleSubmit} style={primaryBtnStyle}>
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {result && !loading && (
            <Report data={result} hotelName={form.hotelName} onReset={reset} />
          )}
        </>
      )}
    </div>
  )
}

function Report({
  data,
  hotelName,
  onReset,
}: {
  data: ApiResponse
  hotelName: string
  onReset: () => void
}) {
  const { report, siteAnalysis } = data
  const outlet = OUTLETS[report.primaryOutlet]

  return (
    <div className="flex flex-col gap-6">
      {/* Carte score + headline */}
      <div style={cardStyle}>
        <div
          className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
          style={{ backgroundColor: BRAND, color: GOLD }}
        >
          Rapport · {hotelName}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <ScoreCircle score={report.score} />
          <div className="flex-1">
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: BRAND,
                fontSize: '1.6rem',
                lineHeight: 1.25,
                marginBottom: '0.5rem',
              }}
            >
              {report.headline}
            </h2>
            {report.strengths.length > 0 && (
              <div className="mt-3">
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#15803D', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Points forts
                </div>
                <ul className="text-sm opacity-80 list-disc ml-5">
                  {report.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faiblesses */}
      {report.weaknesses.length > 0 && (
        <div style={cardStyle}>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: BRAND,
              fontSize: '1.4rem',
              marginBottom: '1rem',
            }}
          >
            Ce qui te fait perdre des réservations
          </h3>
          <div className="flex flex-col gap-3">
            {report.weaknesses.map((w, i) => (
              <div
                key={i}
                style={{
                  padding: '0.9rem 1rem',
                  borderLeft: `3px solid ${w.severity === 'high' ? '#991B1B' : '#C2410C'}`,
                  backgroundColor: BG,
                  borderRadius: '0.4rem',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4 style={{ fontWeight: 600, color: BRAND, fontSize: '0.95rem' }}>{w.title}</h4>
                  <SeverityBadge severity={w.severity} />
                </div>
                <p className="text-sm opacity-80 leading-relaxed">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan d'action */}
      {report.actionPlan.length > 0 && (
        <div style={cardStyle}>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: BRAND,
              fontSize: '1.4rem',
              marginBottom: '1rem',
            }}
          >
            Ton plan d&apos;action
          </h3>
          <ol className="flex flex-col gap-3">
            {report.actionPlan.map((a) => (
              <li key={a.priority} className="flex gap-3 items-start">
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: BRAND,
                    color: GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}
                >
                  {a.priority}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm" style={{ color: '#0A0A0A' }}>
                      {a.action}
                    </span>
                    <HorizonBadge horizon={a.horizon} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Débouché principal (CTA fort) */}
      <div
        style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, #7a1a20 100%)`,
          color: '#FEFCF9',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(86, 14, 19, 0.2)',
        }}
      >
        <div
          className="text-xs uppercase tracking-widest mb-3 font-semibold"
          style={{ color: GOLD, letterSpacing: '0.15em' }}
        >
          Prochaine étape recommandée
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.75rem',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
        >
          {outlet.title}
        </h3>
        <p className="text-sm opacity-85 mb-5">{outlet.subtitle}</p>
        <p className="text-xs italic opacity-70 mb-5">{report.primaryOutletReason}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={outlet.href}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.6rem',
              borderRadius: '0.5rem',
              backgroundColor: GOLD,
              color: BRAND,
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {outlet.cta} →
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.6rem',
              borderRadius: '0.5rem',
              border: `1px solid rgba(254, 252, 249, 0.3)`,
              color: '#FEFCF9',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Parler à Roseline
          </Link>
        </div>
      </div>

      {/* Analyse site (détails techniques, repliés) */}
      {siteAnalysis && siteAnalysis.reachable && (
        <details style={{ ...cardStyle, cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, color: BRAND, fontSize: '0.9rem' }}>
            Voir les détails techniques du scan de ton site
          </summary>
          <div className="mt-4 text-sm opacity-80 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><strong>URL :</strong> {siteAnalysis.url}</div>
            <div><strong>HTTPS :</strong> {siteAnalysis.https ? 'oui' : 'non'}</div>
            <div><strong>Title :</strong> {siteAnalysis.title || '—'}</div>
            <div><strong>Meta desc :</strong> {siteAnalysis.metaDescription ? 'présente' : 'absente'}</div>
            <div><strong>Nombre de H1 :</strong> {siteAnalysis.h1Count}</div>
            <div><strong>PageSpeed mobile :</strong> {siteAnalysis.pageSpeedMobile !== null ? siteAnalysis.pageSpeedMobile + '/100' : 'non mesuré'}</div>
            {siteAnalysis.lcpMs !== null && <div><strong>LCP :</strong> {siteAnalysis.lcpMs} ms</div>}
          </div>
        </details>
      )}

      <div className="flex justify-center pt-2">
        <button onClick={onReset} style={secondaryBtnStyle}>
          ↻ Refaire un audit
        </button>
      </div>
    </div>
  )
}
