'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'

interface Lead {
  id: string; email: string; prenom: string; source: string; created_at: string; tags: string[]
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filtered, setFiltered] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [page, setPage] = useState(0)
  const PER_PAGE = 25

  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data || []); setFiltered(data || []) })
      .then(() => setLoading(false), () => setLoading(false))
  }, [])

  useEffect(() => {
    let result = leads
    if (search) result = result.filter(l => l.email?.includes(search) || l.prenom?.toLowerCase().includes(search.toLowerCase()))
    if (sourceFilter !== 'all') result = result.filter(l => l.source === sourceFilter)
    setFiltered(result)
    setPage(0)
  }, [search, sourceFilter, leads])

  const exportCSV = () => {
    const headers = ['email', 'prenom', 'source', 'tags', 'created_at']
    const rows = filtered.map(l => [l.email, l.prenom, l.source, (l.tags || []).join(';'), l.created_at])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'leads.csv'; a.click()
  }

  const sources = ['all', ...Array.from(new Set(leads.map(l => l.source).filter(Boolean)))]
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR')

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
            Leads ({filtered.length})
          </h1>
          <button onClick={exportCSV} className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}>
            ⬇ Export CSV
          </button>
        </div>

        {/* Filtres */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher email ou prénom..."
            className="px-4 py-2 rounded-xl border text-sm outline-none bg-white flex-1 min-w-48"
            style={{ borderColor: '#e0d8d0' }}
          />
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border text-sm outline-none bg-white"
            style={{ borderColor: '#e0d8d0' }}>
            {sources.map(s => <option key={s} value={s}>{s === 'all' ? 'Toutes les sources' : s}</option>)}
          </select>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8F5F0', borderBottom: '1px solid #e0d8d0' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Prénom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center opacity-40">Chargement...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center opacity-40">Aucun lead trouvé.</td></tr>
              ) : paginated.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #f0ebe4' }}>
                  <td className="px-4 py-3 font-medium">{lead.email}</td>
                  <td className="px-4 py-3 opacity-70">{lead.prenom || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: '#f0ebe4' }}>{lead.source}</span>
                  </td>
                  <td className="px-4 py-3 opacity-60 text-xs">{(lead.tags || []).join(', ') || '—'}</td>
                  <td className="px-4 py-3 opacity-50 text-xs">{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <span className="opacity-50">Page {page + 1} / {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="px-3 py-1.5 rounded-lg border disabled:opacity-30" style={{ borderColor: '#e0d8d0' }}>←</button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg border disabled:opacity-30" style={{ borderColor: '#e0d8d0' }}>→</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
