'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '@/components/AdminLayout'

const STATUTS = ['nouveau', 'en_cours', 'accepté', 'refusé'] as const
type Statut = typeof STATUTS[number]

const STATUT_COLORS: Record<Statut, { bg: string; text: string }> = {
  nouveau:  { bg: '#dbeafe', text: '#1d4ed8' },
  en_cours: { bg: '#fef3c7', text: '#92400e' },
  accepté:  { bg: '#dcfce7', text: '#16a34a' },
  refusé:   { bg: '#fee2e2', text: '#dc2626' },
}

interface Candidature {
  id: string
  nom: string
  email: string
  programme: string
  created_at: string
  statut: Statut
}

export default function CandidaturesPage() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCandidatures = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/candidatures')
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setCandidatures(data || [])
    } catch (err) {
      console.error('Erreur chargement candidatures:', err)
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCandidatures()
  }, [fetchCandidatures])

  const cycleStatut = async (id: string, currentStatut: Statut) => {
    const currentIndex = STATUTS.indexOf(currentStatut)
    const nextStatut = STATUTS[(currentIndex + 1) % STATUTS.length]

    try {
      const res = await fetch('/api/admin/candidatures', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, statut: nextStatut }),
      })
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const result = await res.json()
      if (result.error) throw new Error(result.error)

      setCandidatures(prev =>
        prev.map(c => c.id === id ? { ...c, statut: nextStatut } : c)
      )
    } catch (err) {
      console.error('Erreur mise à jour statut:', err)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
        >
          Candidatures Back to Senegal
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm opacity-40">Chargement...</div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : candidatures.length === 0 ? (
            <div className="p-8 text-center text-sm opacity-40">
              Aucune candidature pour le moment
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#560E13', color: '#fff' }}>
                    <th className="px-6 py-3 text-left font-semibold">Nom</th>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Programme</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-left font-semibold">Statut</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#f0ebe4' }}>
                  {candidatures.map(c => {
                    const colors = STATUT_COLORS[c.statut] || STATUT_COLORS.nouveau
                    return (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{c.nom}</td>
                        <td className="px-6 py-4 opacity-70">{c.email}</td>
                        <td className="px-6 py-4">{c.programme}</td>
                        <td className="px-6 py-4 opacity-50">{formatDate(c.created_at)}</td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {c.statut.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => cycleStatut(c.id, c.statut)}
                            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                            style={{
                              backgroundColor: '#F6C961',
                              color: '#560E13',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                          >
                            Changer statut
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
