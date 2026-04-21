'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminLayout from '@/components/AdminLayout'

type CommentStatus = 'pending' | 'approved' | 'rejected'

interface AdminComment {
  id: string
  post_slug: string
  author_name: string
  author_email: string
  content: string
  status: CommentStatus
  created_at: string
  approved_at: string | null
}

const TABS: { key: CommentStatus | 'all'; label: string }[] = [
  { key: 'pending', label: 'À modérer' },
  { key: 'approved', label: 'Approuvés' },
  { key: 'rejected', label: 'Rejetés' },
  { key: 'all', label: 'Tous' },
]

export default function AdminCommentsPage() {
  const [status, setStatus] = useState<CommentStatus | 'all'>('pending')
  const [comments, setComments] = useState<AdminComment[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/comments?status=${status}`)
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch {
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  async function moderate(id: string, action: 'approve' | 'reject') {
    setBusyId(id)
    try {
      await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      await fetchComments()
    } finally {
      setBusyId(null)
    }
  }

  async function remove(id: string) {
    if (!confirm('Supprimer définitivement ce commentaire ?')) return
    setBusyId(id)
    try {
      await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' })
      await fetchComments()
    } finally {
      setBusyId(null)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#560E13' }}>
          Commentaires blog
        </h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setStatus(t.key)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                backgroundColor: status === t.key ? '#560E13' : 'rgba(86,14,19,0.08)',
                color: status === t.key ? '#FEFCF9' : '#560E13',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm opacity-60">Chargement...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm opacity-60">Aucun commentaire dans cette catégorie.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <div>
                    <div className="font-semibold text-sm">{c.author_name}</div>
                    <div className="text-xs opacity-60">
                      {c.author_email} · {new Date(c.created_at).toLocaleString('fr-FR')}
                    </div>
                    <a
                      href={`/blog/${c.post_slug}`}
                      target="_blank"
                      rel="noopener"
                      className="text-xs underline"
                      style={{ color: '#560E13' }}
                    >
                      /blog/{c.post_slug}
                    </a>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor:
                        c.status === 'approved'
                          ? 'rgba(34,197,94,0.15)'
                          : c.status === 'rejected'
                            ? 'rgba(239,68,68,0.15)'
                            : 'rgba(250,204,21,0.25)',
                      color:
                        c.status === 'approved'
                          ? '#166534'
                          : c.status === 'rejected'
                            ? '#991b1b'
                            : '#854d0e',
                    }}
                  >
                    {c.status === 'pending' ? 'À modérer' : c.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line mb-4" style={{ color: 'rgba(10,10,10,0.85)' }}>
                  {c.content}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {c.status !== 'approved' && (
                    <button
                      onClick={() => moderate(c.id, 'approve')}
                      disabled={busyId === c.id}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold disabled:opacity-50"
                      style={{ backgroundColor: '#22c55e', color: '#fff' }}
                    >
                      ✓ Approuver
                    </button>
                  )}
                  {c.status !== 'rejected' && (
                    <button
                      onClick={() => moderate(c.id, 'reject')}
                      disabled={busyId === c.id}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold disabled:opacity-50"
                      style={{ backgroundColor: 'rgba(86,14,19,0.08)', color: '#560E13' }}
                    >
                      ✕ Rejeter
                    </button>
                  )}
                  <button
                    onClick={() => remove(c.id)}
                    disabled={busyId === c.id}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold disabled:opacity-50"
                    style={{ backgroundColor: 'transparent', color: '#991b1b', border: '1px solid rgba(153,27,27,0.3)' }}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  )
}
