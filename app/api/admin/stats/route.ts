import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  // Si Supabase n'est pas configuré, renvoyer des données vides
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      totalLeads: 0,
      leadsThisMonth: 0,
      totalOrders: 0,
      totalRevenue: 0,
      leadsBySource: [],
      recentLeads: [],
    })
  }

  try {
    const supabase = createServiceClient()

    // Premier jour du mois courant
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    // Total leads
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    // Leads ce mois-ci
    const { count: leadsThisMonth } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', firstDayOfMonth)

    // Total commandes
    const { count: totalOrders } = await supabase
      .from('commandes')
      .select('*', { count: 'exact', head: true })

    // Revenu total (commandes payées)
    const { data: revenueData } = await supabase
      .from('commandes')
      .select('montant')
      .eq('status', 'paid')

    const totalRevenue = (revenueData ?? []).reduce(
      (sum: number, row: { montant: number }) => sum + (row.montant || 0),
      0
    )

    // Leads par source
    const { data: leadsSourceData } = await supabase
      .from('leads')
      .select('source')

    const sourceMap: Record<string, number> = {}
    for (const row of leadsSourceData ?? []) {
      const src = row.source || 'inconnu'
      sourceMap[src] = (sourceMap[src] || 0) + 1
    }
    const leadsBySource = Object.entries(sourceMap).map(([source, count]) => ({
      source,
      count,
    }))

    // 5 derniers leads
    const { data: recentLeads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      totalLeads: totalLeads ?? 0,
      leadsThisMonth: leadsThisMonth ?? 0,
      totalOrders: totalOrders ?? 0,
      totalRevenue,
      leadsBySource,
      recentLeads: recentLeads ?? [],
    })
  } catch (err) {
    console.error('Admin stats API error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
