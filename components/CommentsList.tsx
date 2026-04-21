import { createServiceClient } from '@/lib/supabase'

type Comment = {
  id: string
  author_name: string
  content: string
  created_at: string
  parent_id: string | null
}

async function fetchApprovedComments(slug: string): Promise<Comment[]> {
  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from('blog_comments')
      .select('id, author_name, content, created_at, parent_id')
      .eq('post_slug', slug)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
    return (data as Comment[]) || []
  } catch {
    return []
  }
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default async function CommentsList({ slug }: { slug: string }) {
  const comments = await fetchApprovedComments(slug)

  if (comments.length === 0) {
    return (
      <p
        className="text-sm italic"
        style={{ color: 'rgba(10,10,10,0.55)' }}
      >
        Aucun commentaire pour le moment. Soyez la première à partager votre
        expérience.
      </p>
    )
  }

  return (
    <ul className="space-y-5">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-xl p-5"
          style={{
            backgroundColor: '#F8F5F0',
            border: '1px solid rgba(86,14,19,0.06)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'rgba(86,14,19,0.1)', color: '#560E13' }}
            >
              {c.author_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: '#0A0A0A' }}
              >
                {c.author_name}
              </div>
              <div
                className="text-xs"
                style={{ color: 'rgba(10,10,10,0.5)' }}
              >
                {formatDate(c.created_at)}
              </div>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: 'rgba(10,10,10,0.85)' }}
          >
            {c.content}
          </p>
        </li>
      ))}
    </ul>
  )
}
