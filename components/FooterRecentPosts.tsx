'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Post = { slug: string; title: string }

export default function FooterRecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('slug, title')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data as Post[])
      })
  }, [])

  return (
    <div>
      <h4
        className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-60"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Articles récents
      </h4>
      <ul className="flex flex-col gap-2 text-sm opacity-80">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="hover:opacity-60 transition-opacity line-clamp-2"
              title={p.title}
            >
              {p.title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/blog"
            className="hover:opacity-60 transition-opacity text-xs uppercase tracking-wider"
            style={{ color: '#F6C961' }}
          >
            Voir tout le blog →
          </Link>
        </li>
      </ul>
    </div>
  )
}
