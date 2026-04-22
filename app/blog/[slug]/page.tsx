import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AuthorBox from '@/components/AuthorBox'
import CommentsList from '@/components/CommentsList'
import CommentForm from '@/components/CommentForm'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/RelatedArticles'
import { createServiceClient } from '@/lib/supabase'
import { buildMetadata, SITE_URL } from '@/lib/seo/metadata'
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/seo/jsonld'

export const revalidate = 300 // ISR 5 min

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  tags: string[] | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at?: string | null
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    if (error) throw error
    return (data as BlogPost) || null
  } catch {
    return null
  }
}

/** Extrait les FAQ du markdown (pattern: **N. Question ?** suivi d'un paragraphe). */
function extractFaqFromMarkdown(md: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []
  // Cherche le bloc après un H2 contenant "FAQ"
  const faqBlockMatch = md.match(/##\s+[^\n]*FAQ[^\n]*\n([\s\S]*?)(?=\n##\s|\n---|$)/i)
  if (!faqBlockMatch) return faqs
  const block = faqBlockMatch[1]
  // Matche **N. Question** puis jusqu'au prochain ** ou fin
  const qaRegex = /\*\*\d+\.\s+([^*\n]+?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*\d+\.|\n##|\n---|$)/g
  let m
  while ((m = qaRegex.exec(block)) !== null) {
    const question = m[1].trim()
    const answer = m[2].trim().replace(/\s+/g, ' ')
    if (question && answer) faqs.push({ question, answer })
  }
  return faqs
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) {
    return buildMetadata({
      title: 'Article introuvable',
      description: 'Cet article n\'existe pas ou a été déplacé.',
      path: `/blog/${slug}`,
      noindex: true,
    })
  }
  // Limites SEO : title ≤ 54 chars avant suffixe " , Roseline Ngom" (16) = 70 total
  // description 150-160 chars idéal
  const safeTitle =
    post.title.length > 54 ? post.title.slice(0, 51).trimEnd() + '…' : post.title
  const rawDesc = post.excerpt || post.title
  const safeDesc =
    rawDesc.length > 158 ? rawDesc.slice(0, 155).trimEnd() + '…' : rawDesc
  return buildMetadata({
    title: safeTitle,
    description: safeDesc,
    path: `/blog/${post.slug}`,
    ogImage: post.cover_image || undefined,
    ogType: 'article',
    publishedTime: post.published_at || undefined,
    modifiedTime: post.updated_at || post.published_at || undefined,
    authors: ['Roseline Ngom'],
  })
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const faqs = post.content ? extractFaqFromMarkdown(post.content) : []
  const heroImage = post.cover_image || '/images/og-default.jpg'
  const publishedDate = formatDate(post.published_at)

  const jsonLd: Array<Record<string, unknown>> = [
    articleSchema({
      title: post.title,
      description: post.excerpt || post.title,
      slug: post.slug,
      image: heroImage,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at || post.published_at || post.created_at,
    }),
    breadcrumbSchema([
      { name: 'Accueil', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]
  if (faqs.length > 0) jsonLd.push(faqSchema(faqs))

  return (
    <>
      <JsonLd data={jsonLd} />
      <Nav variant="solid" />
      <main style={{ backgroundColor: '#FEFCF9' }}>
        {/* Hero */}
        <header
          className="relative w-full"
          style={{ backgroundColor: '#F8F5F0' }}
        >
          {heroImage && (
            <div className="relative w-full h-[340px] md:h-[480px] overflow-hidden">
              <Image
                src={heroImage}
                alt={post.title.length > 100 ? post.title.slice(0, 97).trimEnd() + '…' : post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.55) 100%)',
                }}
              />
            </div>
          )}

          <div className="max-w-3xl mx-auto px-6 -mt-24 md:-mt-32 relative z-10 pb-10">
            <div
              className="rounded-2xl p-6 md:p-10"
              style={{
                backgroundColor: '#FEFCF9',
                boxShadow: '0 8px 32px rgba(10,10,10,0.08)',
                border: '1px solid rgba(86,14,19,0.06)',
              }}
            >
              <nav className="text-xs mb-4 flex items-center gap-2 flex-wrap">
                <Link
                  href="/blog"
                  className="hover:underline"
                  style={{ color: '#560E13', fontWeight: 600 }}
                >
                  Blog
                </Link>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span style={{ color: 'rgba(86,14,19,0.3)' }}>·</span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(86,14,19,0.06)',
                          color: '#560E13',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </nav>

              <h1
                className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#0A0A0A',
                }}
              >
                {post.title}
              </h1>

              {post.excerpt && (
                <p
                  className="text-base md:text-lg leading-relaxed mb-5"
                  style={{ color: 'rgba(10,10,10,0.7)' }}
                >
                  {post.excerpt}
                </p>
              )}

              <div
                className="text-xs flex items-center gap-3"
                style={{ color: 'rgba(10,10,10,0.5)' }}
              >
                <span>
                  Par <strong style={{ color: '#560E13' }}>Roseline Ngom</strong>
                </span>
                {publishedDate && (
                  <>
                    <span>·</span>
                    <time dateTime={post.published_at || undefined}>
                      {publishedDate}
                    </time>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-10 md:py-14">
          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || ''}
            </ReactMarkdown>
          </div>

          {/* CTAs */}
          <section
            className="mt-16 rounded-2xl p-6 md:p-10"
            style={{
              background:
                'linear-gradient(135deg, #560E13 0%, #7a1a20 100%)',
              color: '#FEFCF9',
            }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-3 font-semibold"
              style={{ color: '#F6C961', letterSpacing: '0.2em' }}
            >
              Envie d&apos;aller plus loin ?
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Cormorant Garamond', serif",
              }}
            >
              Préparez votre voyage au Sénégal avec Roseline
            </h2>
            <p className="text-sm md:text-base mb-6 opacity-90 leading-relaxed">
              Téléchargez le guide gratuit des 15 expériences secrètes, ou
              construisez un voyage entièrement sur-mesure avec l&apos;équipe
              Voyage Signature.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ressources/guide-15-experiences"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Recevoir le guide gratuit
              </Link>
              <Link
                href="/voyages/voyage-signature"
                className="px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  border: '1px solid rgba(246,201,97,0.5)',
                  color: '#F6C961',
                }}
              >
                Voyage sur-mesure
              </Link>
            </div>
          </section>

          {/* Author box EEAT */}
          <AuthorBox />

          {/* Commentaires */}
          <section className="mt-16">
            <h3
              className="text-2xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                color: '#560E13',
              }}
            >
              Commentaires
            </h3>
            <div className="mb-8">
              <CommentsList slug={post.slug} />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3" style={{ color: '#0A0A0A' }}>
                Laisser un commentaire
              </h4>
              <CommentForm slug={post.slug} />
            </div>
          </section>

          {/* Related posts (fallback sur articles récents si aucun tag commun) */}
          <RelatedArticles currentSlug={post.slug} tags={post.tags} />

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block text-sm font-semibold hover:underline"
              style={{ color: '#560E13' }}
            >
              ← Retour au blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />

      {/* Styles prose, scopés via .blog-prose */}
      <style>{`
        .blog-prose {
          color: #0A0A0A;
          font-size: 17px;
          line-height: 1.75;
        }
        .blog-prose h2 {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: #560E13;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .blog-prose h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0A0A0A;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .blog-prose p {
          margin-bottom: 1.25rem;
        }
        .blog-prose a {
          color: #560E13;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(86,14,19,0.3);
          text-underline-offset: 3px;
        }
        .blog-prose a:hover {
          text-decoration-color: #560E13;
        }
        .blog-prose strong {
          color: #0A0A0A;
          font-weight: 700;
        }
        .blog-prose em {
          font-style: italic;
        }
        .blog-prose ul,
        .blog-prose ol {
          margin: 1rem 0 1.25rem 1.5rem;
        }
        .blog-prose ul {
          list-style: disc;
        }
        .blog-prose ol {
          list-style: decimal;
        }
        .blog-prose li {
          margin-bottom: 0.5rem;
        }
        .blog-prose blockquote {
          border-left: 4px solid #F6C961;
          padding: 0.25rem 0 0.25rem 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(10,10,10,0.75);
        }
        .blog-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.95rem;
        }
        .blog-prose thead {
          background-color: #F8F5F0;
        }
        .blog-prose th,
        .blog-prose td {
          border: 1px solid rgba(86,14,19,0.15);
          padding: 0.6rem 0.85rem;
          text-align: left;
        }
        .blog-prose th {
          font-weight: 700;
          color: #560E13;
        }
        .blog-prose hr {
          border: none;
          border-top: 1px solid rgba(86,14,19,0.15);
          margin: 2rem 0;
        }
        .blog-prose code {
          background-color: #F8F5F0;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          color: #560E13;
        }
        .blog-prose img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
      `}</style>
    </>
  )
}
