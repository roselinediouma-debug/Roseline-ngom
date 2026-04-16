'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/leads', label: 'Leads', icon: '👥' },
  { href: '/admin/commandes', label: 'Commandes', icon: '💳' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/candidatures', label: 'Candidatures', icon: '📋' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin')
      } else {
        setLoading(false)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F5F0' }}>
        <div className="text-sm opacity-50">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F8F5F0' }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#560E13' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(254,252,249,0.1)' }}>
          <div className="font-bold text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>Roseline Ngom</div>
          <div className="text-xs opacity-50 text-white mt-0.5">Back-office</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(({ href, label, icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: active ? 'rgba(246,201,97,0.2)' : 'transparent',
                  color: active ? '#F6C961' : 'rgba(254,252,249,0.7)',
                }}
              >
                <span>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-75"
            style={{ backgroundColor: 'rgba(254,252,249,0.1)', color: 'rgba(254,252,249,0.6)' }}
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
