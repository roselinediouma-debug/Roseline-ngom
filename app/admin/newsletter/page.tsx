'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface Subscriber {
  id: string
  email: string
  prenom: string | null
  source: string | null
  subscribed_at: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/newsletter')
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setSubscribers(data || [])
    } catch (err) {
      console.error('Erreur chargement abonnés:', err)
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

  const exportCSV = () => {
    if (subscribers.length === 0) return

    const headers = ['Email', 'Prénom', 'Source', "Date d'inscription"]
    const rows = subscribers.map(s => [
      s.email,
      s.prenom || '',
      s.source || '',
      formatDate(s.subscribed_at),
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}
          >
            Newsletter La Teranga
          </h1>
          <button
            onClick={exportCSV}
            disabled={subscribers.length === 0}
            className="text-sm px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-40"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            onMouseEnter={e => { if (subscribers.length > 0) e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Exporter CSV
          </button>
        </div>

        {/* KPI Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm opacity-60">Total abonnés</span>
              <span className="text-2xl">📧</span>
            </div>
            <div className="text-3xl font-bold" style={{ color: '#560E13' }}>
              {loading ? '-' : subscribers.length}
            </div>
            <div className="text-xs opacity-50 mt-1">Newsletter La Teranga</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm opacity-40">Chargement...</div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : subscribers.length === 0 ? (
            <div className="p-8 text-center text-sm opacity-40">
              Aucun abonné pour le moment
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#560E13', color: '#fff' }}>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Prénom</th>
                    <th className="px-6 py-3 text-left font-semibold">Source</th>
                    <th className="px-6 py-3 text-left font-semibold">Date d&apos;inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#f0ebe4' }}>
                  {subscribers.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{s.email}</td>
                      <td className="px-6 py-4">{s.prenom || '-'}</td>
                      <td className="px-6 py-4 opacity-70">{s.source || '-'}</td>
                      <td className="px-6 py-4 opacity-50">{formatDate(s.subscribed_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
