import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase'
import { buildMetadata } from '@/lib/seo/metadata'

export const revalidate = 300 // ISR : regénère la liste toutes les 5 min

export const metadata = buildMetadata({
  title: 'Blog, Roseline Ngom',
  description:
    'Articles, guides et récits de voyage au Sénégal par Roseline Ngom, franco-sénégalaise, fondatrice TripAfro.',
  path: '/blog',
  ogImage: '/images/og/blog-cover.jpg',
  ogType: 'website',
})

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  tags: string[] | null
  published_at: string | null
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, tags, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

function formatDate(iso: string | null): string | undefined {
  if (!iso) return undefined
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return undefined
  }
}

export default async function BlogPage() {
  const posts = await fetchPublishedPosts()

  return (
    <>
      <Nav variant="solid" />
      <main>
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="BLOG"
              title="Le Journal de Roseline"
              subtitle="Guides, conseils et récits de voyage au Sénégal, par une franco-sénégalaise qui y retourne chaque année."
              centered
            />

            {posts.length === 0 ? (
              <div className="mt-16 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(86,14,19,0.08)' }}
                >
                  <span className="text-2xl">✍️</span>
                </div>
                <p className="text-base mb-6" style={{ color: 'rgba(10,10,10,0.6)' }}>
                  Les articles arrivent bientôt. En attendant, découvrez nos guides.
                </p>
                <Link
                  href="/guides"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#F6C961', color: '#560E13' }}
                >
                  Voir les guides
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt || ''}
                    coverImage={post.cover_image || undefined}
                    tags={post.tags || undefined}
                    publishedAt={formatDate(post.published_at)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
