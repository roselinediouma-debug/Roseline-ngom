import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Roseline Ngom',
  description: 'Articles, conseils et récits de voyage au Sénégal par Roseline Ngom.',
  openGraph: {
    title: 'Blog | Roseline Ngom',
    description: 'Articles, conseils et récits de voyage au Sénégal par Roseline Ngom.',
  },
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="py-20 px-6" style={{ backgroundColor: '#F8F5F0' }}>
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="BLOG" title="Le Journal de Roseline" centered />

            {/* Empty state */}
            <div className="mt-16 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(86,14,19,0.08)' }}
              >
                <span className="text-2xl">✍️</span>
              </div>
              <p className="text-base mb-6" style={{ color: 'rgba(10,10,10,0.6)' }}>
                Les articles arrivent bientot. En attendant, decouvrez nos guides.
              </p>
              <Link
                href="/guides"
                className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F6C961', color: '#560E13' }}
              >
                Voir les guides
              </Link>
            </div>

            {/* Future blog grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <BlogCard
                slug="example"
                title="Titre de l'article"
                excerpt="Extrait de l'article..."
                date="2026-04-15"
                image="/images/blog/example.jpg"
              />
            </div>
            */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
