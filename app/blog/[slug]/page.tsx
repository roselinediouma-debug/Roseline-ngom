import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, ' ')} | Roseline Ngom`,
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // TODO: fetch article from Supabase by slug
  void slug

  return (
    <>
      <Nav />
      <main
        className="min-h-screen flex items-center justify-center px-4 py-20"
        style={{ backgroundColor: '#F8F5F0' }}
      >
        <div className="text-center max-w-lg">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(86,14,19,0.08)' }}
          >
            <span className="text-2xl">📝</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#0A0A0A',
            }}
          >
            Article en cours de redaction
          </h1>
          <p className="text-base mb-8" style={{ color: 'rgba(10,10,10,0.6)' }}>
            Cet article sera disponible prochainement. Revenez bientot.
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
          >
            Retour au blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
