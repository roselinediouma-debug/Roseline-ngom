'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

interface BlogPost {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  created_at: string
  published_at: string | null
}

type DisplayStatus = 'draft' | 'scheduled' | 'published'

function getDisplayStatus(post: BlogPost): DisplayStatus {
  if (post.status !== 'published') return 'draft'
  if (post.published_at && new Date(post.published_at).getTime() > Date.now()) {
    return 'scheduled'
  }
  return 'published'
}

const STATUS_STYLE: Record<DisplayStatus, { label: string; bg: string; color: string }> = {
  draft:     { label: 'Brouillon', bg: '#f3f4f6', color: '#6b7280' },
  scheduled: { label: 'Programmé', bg: '#fef3c7', color: '#92400e' },
  published: { label: 'Publié',    bg: '#dcfce7', color: '#16a34a' },
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
            Gestion Blog
          </h1>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: '#560E13' }}
          >
            Nouvel article
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm opacity-40">Chargement...</div>
          ) : posts.length === 0 ? (
            <div className="p-6 text-sm opacity-40">Aucun article pour le moment</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #f0ebe4' }}>
                  <th className="text-left px-6 py-3 font-medium opacity-60">Titre</th>
                  <th className="text-left px-6 py-3 font-medium opacity-60">Statut</th>
                  <th className="text-left px-6 py-3 font-medium opacity-60">Date</th>
                  <th className="text-right px-6 py-3 font-medium opacity-60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => {
                  const display = getDisplayStatus(post)
                  const style = STATUS_STYLE[display]
                  return (
                  <tr key={post.id} style={{ borderBottom: '1px solid #f0ebe4' }}>
                    <td className="px-6 py-3 font-medium">{post.title}</td>
                    <td className="px-6 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: style.bg, color: style.color }}
                      >
                        {style.label}
                      </span>
                    </td>
                    <td className="px-6 py-3 opacity-50">
                      {display === 'scheduled' && post.published_at
                        ? `→ ${formatDateTime(post.published_at)}`
                        : formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-xs font-medium hover:underline"
                        style={{ color: '#560E13' }}
                      >
                        Modifier
                      </Link>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
