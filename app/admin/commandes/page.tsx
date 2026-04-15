'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { supabase } from '@/lib/supabase'

interface Commande {
  id: string; email: string; produit: string; montant: number; stripe_id: string; status: string; created_at: string
}

export default function AdminCommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('commandes').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setCommandes(data || []))
      .then(() => setLoading(false), () => setLoading(false))
  }, [])

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR')
  const caTotal = commandes.filter(c => c.status === 'paid').reduce((sum, c) => sum + (c.montant || 0), 0)

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#560E13' }}>
            Commandes
          </h1>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>{(caTotal / 100).toFixed(2)} €</div>
            <div className="text-xs opacity-50">CA total (paiements réussis)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8F5F0', borderBottom: '1px solid #e0d8d0' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Produit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider opacity-60">Stripe</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center opacity-40">Chargement...</td></tr>
              ) : commandes.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center opacity-40">Aucune commande pour l'instant.</td></tr>
              ) : commandes.map((cmd) => (
                <tr key={cmd.id} style={{ borderBottom: '1px solid #f0ebe4' }}>
                  <td className="px-4 py-3 font-medium">{cmd.email}</td>
                  <td className="px-4 py-3 opacity-70">{cmd.produit}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: '#16a34a' }}>
                    {(cmd.montant / 100).toFixed(2)} €
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{
                      backgroundColor: cmd.status === 'paid' ? '#dcfce7' : cmd.status === 'pending' ? '#fef9c3' : '#fee2e2',
                      color: cmd.status === 'paid' ? '#16a34a' : cmd.status === 'pending' ? '#854d0e' : '#dc2626',
                    }}>
                      {cmd.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 opacity-50 text-xs">{formatDate(cmd.created_at)}</td>
                  <td className="px-4 py-3">
                    {cmd.stripe_id && (
                      <a
                        href={`https://dashboard.stripe.com/payments/${cmd.stripe_id}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-xs opacity-50 hover:opacity-80 underline"
                      >
                        Voir ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
