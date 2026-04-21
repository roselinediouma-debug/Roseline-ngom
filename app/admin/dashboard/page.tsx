'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'

interface MetricCardProps {
  label: string; value: string | number; icon: string; sub?: string; color?: string
}
function MetricCard({ label, value, icon, sub, color = '#560E13' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm opacity-60">{label}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs opacity-50 mt-1">{sub}</div>}
    </div>
  )
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ totalLeads: 0, leadsThisMonth: 0, totalCommandes: 0, caTotal: 0 })
  const [recentLeads, setRecentLeads] = useState<{ email: string; prenom: string; source: string; created_at: string }[]>([])
  const [recentCommandes, setRecentCommandes] = useState<{ email: string; produit: string; montant: number; status: string; created_at: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const now = new Date()
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

        const [
          { count: totalLeads },
          { count: leadsThisMonth },
          { data: leads },
          { data: commandes },
        ] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', firstOfMonth),
          supabase.from('leads').select('email, prenom, source, created_at').order('created_at', { ascending: false }).limit(10),
          supabase.from('commandes').select('email, produit, montant, status, created_at, stripe_id').order('created_at', { ascending: false }).limit(5),
        ])

        const caTotal = commandes?.filter(c => c.status === 'paid').reduce((sum: number, c: { montant: number }) => sum + (c.montant || 0), 0) || 0

        setMetrics({
          totalLeads: totalLeads || 0,
          leadsThisMonth: leadsThisMonth || 0,
          totalCommandes: commandes?.length || 0,
          caTotal,
        })
        setRecentLeads(leads || [])
        setRecentCommandes(commandes || [])
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
          Dashboard
        </h1>

        {/* Métriques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total leads" value={loading ? '-' : metrics.totalLeads} icon="👥" sub="Tous temps" />
          <MetricCard label="Leads ce mois" value={loading ? '-' : metrics.leadsThisMonth} icon="📈" sub="Mois en cours" color="#2563eb" />
          <MetricCard label="Commandes" value={loading ? '-' : metrics.totalCommandes} icon="💳" sub="Stripe" color="#7c3aed" />
          <MetricCard label="CA total" value={loading ? '-' : `${(metrics.caTotal / 100).toFixed(0)} €`} icon="💰" sub="Paiements réussis" color="#16a34a" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Derniers leads */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f0ebe4' }}>
              <h2 className="font-bold" style={{ color: '#560E13' }}>10 derniers leads</h2>
              <a href="/admin/leads" className="text-xs opacity-50 hover:opacity-80">Voir tout →</a>
            </div>
            {loading ? (
              <div className="p-6 text-sm opacity-40">Chargement...</div>
            ) : recentLeads.length === 0 ? (
              <div className="p-6 text-sm opacity-40">Aucun lead pour l'instant.</div>
            ) : (
              <div className="divide-y" style={{ borderColor: '#f0ebe4' }}>
                {recentLeads.map((lead, i) => (
                  <div key={i} className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{lead.prenom || '-'} · {lead.email}</div>
                      <div className="text-xs opacity-50">{lead.source}</div>
                    </div>
                    <div className="text-xs opacity-40">{formatDate(lead.created_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dernières commandes */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f0ebe4' }}>
              <h2 className="font-bold" style={{ color: '#560E13' }}>5 dernières commandes</h2>
              <a href="/admin/commandes" className="text-xs opacity-50 hover:opacity-80">Voir tout →</a>
            </div>
            {loading ? (
              <div className="p-6 text-sm opacity-40">Chargement...</div>
            ) : recentCommandes.length === 0 ? (
              <div className="p-6 text-sm opacity-40">Aucune commande pour l'instant.</div>
            ) : (
              <div className="divide-y" style={{ borderColor: '#f0ebe4' }}>
                {recentCommandes.map((cmd, i) => (
                  <div key={i} className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{cmd.email}</div>
                      <div className="text-xs opacity-50">{cmd.produit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#16a34a' }}>{(cmd.montant / 100).toFixed(0)} €</div>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{
                        backgroundColor: cmd.status === 'paid' ? '#dcfce7' : '#fef9c3',
                        color: cmd.status === 'paid' ? '#16a34a' : '#854d0e',
                      }}>{cmd.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
