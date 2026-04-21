import Image from 'next/image'
import Link from 'next/link'

/**
 * Bloc auteur EEAT à placer en bas de chaque article de blog.
 * Signal E-E-A-T pour Google : auteur identifié, autorité, lien vers profil.
 */
export default function AuthorBox() {
  return (
    <aside
      className="mt-16 rounded-2xl p-6 md:p-8"
      style={{
        backgroundColor: '#F8F5F0',
        border: '1px solid rgba(86,14,19,0.08)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        <div className="shrink-0">
          <Image
            src="/images/roseline.jpg"
            alt="Roseline Ngom, fondatrice TripAfro"
            width={96}
            height={96}
            className="rounded-full object-cover"
            style={{ border: '3px solid #F6C961' }}
          />
        </div>
        <div className="flex-1">
          <div
            className="text-xs uppercase tracking-widest mb-1 font-semibold"
            style={{ color: '#560E13', letterSpacing: '0.15em' }}
          >
            Écrit par
          </div>
          <h3
            className="text-2xl mb-1 font-bold"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#0A0A0A',
            }}
          >
            Roseline Ngom
          </h3>
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: 'rgba(10,10,10,0.7)' }}
          >
            Franco-sénégalaise, fondatrice de TripAfro, j&apos;accompagne depuis
            2015 plus de 2&nbsp;000 voyageurs au Sénégal. Ce guide est basé sur
            10 ans de terrain et mis à jour régulièrement.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link
              href="/a-propos"
              className="hover:underline"
              style={{ color: '#560E13' }}
            >
              En savoir plus
            </Link>
            <span style={{ color: 'rgba(86,14,19,0.3)' }}>·</span>
            <a
              href="https://www.linkedin.com/in/roselinengom"
              target="_blank"
              rel="noopener"
              className="hover:underline"
              style={{ color: '#560E13' }}
            >
              LinkedIn
            </a>
            <span style={{ color: 'rgba(86,14,19,0.3)' }}>·</span>
            <a
              href="https://www.instagram.com/roselinengom"
              target="_blank"
              rel="noopener"
              className="hover:underline"
              style={{ color: '#560E13' }}
            >
              Instagram
            </a>
            <span style={{ color: 'rgba(86,14,19,0.3)' }}>·</span>
            <a
              href="https://www.youtube.com/@RoselineNgom"
              target="_blank"
              rel="noopener"
              className="hover:underline"
              style={{ color: '#560E13' }}
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
