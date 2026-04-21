'use client'

import { useEffect, useMemo, useState } from 'react'
import ToolLeadCapture from '@/components/ToolLeadCapture'

/** Taux de change fixe EUR → FCFA (parité fixe CFA). */
const EUR_TO_FCFA = 655.957

type Currency = 'FCFA' | 'EUR'

function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'FCFA') {
    return `${Math.round(amount).toLocaleString('fr-FR')} FCFA`
  }
  return `${Math.round(amount).toLocaleString('fr-FR')} €`
}

function logUsageBeacon(data: Record<string, unknown>) {
  try {
    fetch('/api/tools/usage', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ toolName: 'calculator_ota', segment: 'hotelier', ...data }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* noop */
  }
}

export default function CalculatorClient() {
  const [currency, setCurrency] = useState<Currency>('FCFA')
  const [avgPrice, setAvgPrice] = useState<number>(55000) // prix / nuit
  const [reservations, setReservations] = useState<number>(40) // / mois
  const [commissionRate, setCommissionRate] = useState<number>(18) // %

  const results = useMemo(() => {
    const monthlyOtaRevenue = avgPrice * reservations
    const yearlyOtaRevenue = monthlyOtaRevenue * 12
    const commissionYearly = (yearlyOtaRevenue * commissionRate) / 100
    const commissionMonthly = commissionYearly / 12
    // Scénario : 30 % des réservations passent en direct → économies
    const directShare = 0.3
    const saved = commissionYearly * directShare
    return { commissionYearly, commissionMonthly, saved, yearlyOtaRevenue }
  }, [avgPrice, reservations, commissionRate])

  // Log une seule fois par session quand les résultats stabilisent (>2s sans modif)
  const key = `${avgPrice}-${reservations}-${commissionRate}-${currency}`
  useEffect(() => {
    const t = setTimeout(() => {
      logUsageBeacon({
        inputData: { avgPrice, reservations, commissionRate, currency },
        resultSummary: `Commission annuelle estimée : ${formatCurrency(
          results.commissionYearly,
          currency
        )}`,
      })
    }, 2500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Équivalents concrets en FCFA (salaire employé, chambre rénovée, loyer)
  const amountFcfa =
    currency === 'FCFA'
      ? results.commissionYearly
      : results.commissionYearly * EUR_TO_FCFA
  const equivalents = {
    salaries: Math.floor(amountFcfa / 1_800_000), // salaire annuel ~150k FCFA/mois
    rooms: Math.floor(amountFcfa / 3_500_000), // rénovation légère chambre
    rentMonths: Math.floor(amountFcfa / 600_000), // loyer local pro
  }

  const directPct = 100 - (results.commissionYearly > 0 ? commissionRate : 0)

  return (
    <div className="space-y-8">
      {/* Form */}
      <div
        className="rounded-lg p-6 md:p-8"
        style={{ backgroundColor: '#F8F5F0', border: '1px solid #E5E0D6' }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2
            className="text-2xl"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
          >
            Vos chiffres
          </h2>
          <div
            className="inline-flex rounded-md overflow-hidden"
            style={{ border: '1px solid #560E13' }}
          >
            {(['FCFA', 'EUR'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  if (c === currency) return
                  // Conversion du prix moyen pour garder la valeur relative
                  if (c === 'EUR') setAvgPrice(Math.round(avgPrice / EUR_TO_FCFA))
                  else setAvgPrice(Math.round(avgPrice * EUR_TO_FCFA))
                  setCurrency(c)
                }}
                className="px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: currency === c ? '#560E13' : 'transparent',
                  color: currency === c ? '#F6C961' : '#560E13',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prix moyen */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#560E13' }}>
              Prix moyen / nuit ({currency})
            </label>
            <input
              type="number"
              min={0}
              step={currency === 'FCFA' ? 1000 : 5}
              value={avgPrice}
              onChange={(e) => setAvgPrice(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-4 py-3 rounded-md border text-base"
              style={{ borderColor: '#D4CFC2', backgroundColor: '#FEFCF9' }}
            />
          </div>

          {/* Réservations */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#560E13' }}>
              Réservations via OTA / mois : <strong>{reservations}</strong>
            </label>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={reservations}
              onChange={(e) => setReservations(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#560E13' }}
            />
          </div>

          {/* Commission */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2" style={{ color: '#560E13' }}>
              Taux de commission OTA
            </label>
            <div className="flex gap-2 flex-wrap">
              {[15, 18, 20, 25].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setCommissionRate(r)}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: commissionRate === r ? '#560E13' : '#FEFCF9',
                    color: commissionRate === r ? '#F6C961' : '#560E13',
                    border: '1px solid #560E13',
                  }}
                >
                  {r} %
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div
        className="rounded-lg p-6 md:p-8 text-center"
        style={{ backgroundColor: '#560E13', color: '#FEFCF9' }}
      >
        <p
          className="text-sm uppercase tracking-widest mb-3"
          style={{ color: '#F6C961' }}
        >
          Vous versez à Booking chaque année
        </p>
        <p
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#F6C961' }}
        >
          {formatCurrency(results.commissionYearly, currency)}
        </p>
        <p className="text-sm opacity-90">
          Soit environ {formatCurrency(results.commissionMonthly, currency)} par mois
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-md p-4" style={{ backgroundColor: 'rgba(246,201,97,0.1)' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#F6C961' }}>
              {equivalents.salaries}
            </p>
            <p className="opacity-90">salaires annuels d&apos;employé hôtel</p>
          </div>
          <div className="rounded-md p-4" style={{ backgroundColor: 'rgba(246,201,97,0.1)' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#F6C961' }}>
              {equivalents.rooms}
            </p>
            <p className="opacity-90">chambres rénovées</p>
          </div>
          <div className="rounded-md p-4" style={{ backgroundColor: 'rgba(246,201,97,0.1)' }}>
            <p className="text-2xl font-bold mb-1" style={{ color: '#F6C961' }}>
              {equivalents.rentMonths}
            </p>
            <p className="opacity-90">mois de loyer local pro</p>
          </div>
        </div>
      </div>

      {/* Bar chart simple : part OTA / direct */}
      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: '#F8F5F0', border: '1px solid #E5E0D6' }}
      >
        <h3 className="text-lg font-medium mb-4" style={{ color: '#560E13' }}>
          Sur 100 FCFA encaissés via Booking
        </h3>
        <div className="relative h-10 rounded-md overflow-hidden flex">
          <div
            className="flex items-center justify-center text-xs font-medium"
            style={{
              width: `${commissionRate}%`,
              backgroundColor: '#560E13',
              color: '#F6C961',
            }}
          >
            {commissionRate}% Booking
          </div>
          <div
            className="flex items-center justify-center text-xs font-medium"
            style={{
              width: `${directPct}%`,
              backgroundColor: '#F6C961',
              color: '#560E13',
            }}
          >
            {directPct}% pour vous
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-md"
          style={{ backgroundColor: '#FEFCF9', border: '1px solid #F6C961' }}
        >
          <p className="text-sm leading-relaxed">
            <strong style={{ color: '#560E13' }}>Si 30 % de vos réservations OTA passaient en direct,</strong>{' '}
            vous économiseriez{' '}
            <strong style={{ color: '#560E13' }}>
              {formatCurrency(results.saved, currency)} / an
            </strong>{' '}
            en commissions. C&apos;est ce qu&apos;on peut construire ensemble en 6 à 9 mois.
          </p>
        </div>
      </div>

      {/* Lead capture */}
      <ToolLeadCapture
        source="calculator_ota"
        title="Recevez ce rapport + une mini-analyse personnalisée"
        subtitle="On vous envoie le récapitulatif de votre cas + 3 leviers prioritaires à activer."
        ctaLabel="Recevoir mon rapport"
        extraAttributes={{
          PRIX_MOYEN: String(avgPrice),
          DEVISE: currency,
          RESA_MOIS: String(reservations),
          TAUX_COMMISSION: String(commissionRate),
          COMMISSION_ANNUELLE: String(Math.round(results.commissionYearly)),
        }}
      />

      <p className="text-xs text-center opacity-60">
        Vos données ne sont pas stockées au-delà de 30 jours. Calcul à titre indicatif,
        basé sur les taux publics Booking/Expedia/Agoda.
      </p>
    </div>
  )
}
