'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type PublishMode = 'draft' | 'now' | 'scheduled'

interface PostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  tags: string
  mode: PublishMode
  scheduled_at: string // format datetime-local (YYYY-MM-DDTHH:mm)
}

const emptyForm: PostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  tags: '',
  mode: 'draft',
  scheduled_at: '',
}

/** ISO UTC → valeur datetime-local (heure locale) */
function isoToLocalInput(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function AdminBlogEditorPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const isNew = id === 'new'

  const [form, setForm] = useState<PostForm>(emptyForm)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/blog/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            const now = Date.now()
            const pubMs = data.published_at ? new Date(data.published_at).getTime() : 0
            let mode: PublishMode = 'draft'
            if (data.status === 'published') {
              mode = pubMs > now ? 'scheduled' : 'now'
            }
            // Pré-charge la date planifiée même en brouillon (venant du planning éditorial)
            setForm({
              title: data.title || '',
              slug: data.slug || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              cover_image: data.cover_image || '',
              tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
              mode,
              scheduled_at: isoToLocalInput(data.published_at),
            })
          }
        })
        .catch(() => setError('Impossible de charger l\'article'))
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const handleChange = (field: keyof PostForm, value: string) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value } as PostForm
      if (field === 'title' && (prev.slug === '' || prev.slug === slugify(prev.title))) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')

    let status: 'draft' | 'published' = 'draft'
    let published_at: string | null = null

    if (form.mode === 'draft') {
      // Conserver la date planifiée même en brouillon (planning éditorial)
      if (form.scheduled_at) {
        const planned = new Date(form.scheduled_at)
        if (!isNaN(planned.getTime())) published_at = planned.toISOString()
      }
    } else if (form.mode === 'now') {
      status = 'published'
      published_at = new Date().toISOString()
    } else if (form.mode === 'scheduled') {
      if (!form.scheduled_at) {
        setError('Choisis une date/heure de publication')
        setSaving(false)
        return
      }
      const scheduled = new Date(form.scheduled_at)
      if (isNaN(scheduled.getTime())) {
        setError('Date/heure invalide')
        setSaving(false)
        return
      }
      status = 'published'
      published_at = scheduled.toISOString()
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image || null,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status,
      published_at,
    }

    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la sauvegarde')
      } else {
        router.push('/admin/blog')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    border: '1px solid #e5e1db',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600 as const,
    marginBottom: '0.25rem',
    color: '#560E13',
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-cormorant)', color: '#560E13' }}>
          {isNew ? 'Nouvel article' : 'Modifier l\'article'}
        </h1>

        {loading ? (
          <div className="text-sm opacity-40">Chargement...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</div>
            )}

            <div>
              <label style={labelStyle}>Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="Titre de l'article"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => handleChange('slug', e.target.value)}
                placeholder="mon-article"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Extrait</label>
              <textarea
                value={form.excerpt}
                onChange={e => handleChange('excerpt', e.target.value)}
                rows={2}
                placeholder="Court extrait de l'article..."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Contenu</label>
              <textarea
                value={form.content}
                onChange={e => handleChange('content', e.target.value)}
                rows={10}
                placeholder="Contenu de l'article..."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Image de couverture</label>
              <input
                type="text"
                value={form.cover_image}
                onChange={e => handleChange('cover_image', e.target.value)}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Tags</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => handleChange('tags', e.target.value)}
                placeholder="coaching, mindset, business"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Publication</label>
              <select
                value={form.mode}
                onChange={e => handleChange('mode', e.target.value)}
                style={inputStyle}
              >
                <option value="draft">Brouillon (non publié)</option>
                <option value="now">Publier maintenant</option>
                <option value="scheduled">Programmer pour plus tard</option>
              </select>
            </div>

            {(form.mode === 'scheduled' || form.mode === 'draft') && (
              <div>
                <label style={labelStyle}>
                  {form.mode === 'scheduled'
                    ? 'Date et heure de publication'
                    : 'Date prévue (planning éditorial)'}
                </label>
                <input
                  type="datetime-local"
                  value={form.scheduled_at}
                  onChange={e => handleChange('scheduled_at', e.target.value)}
                  style={inputStyle}
                />
                <p className="text-xs opacity-50 mt-1">
                  {form.mode === 'scheduled'
                    ? "L'article apparaîtra automatiquement sur le site à cette date."
                    : "Date de référence du planning. Passe en « Programmer » pour la rendre active."}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: saving ? '#9ca3af' : '#560E13' }}
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                onClick={() => router.push('/admin/blog')}
                className="px-5 py-2 rounded-lg text-sm font-medium"
                style={{ border: '1px solid #e5e1db', color: '#560E13' }}
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
