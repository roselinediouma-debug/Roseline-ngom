import Image from 'next/image'

interface ExperienceCardProps {
  number: number
  category: string
  teaser: string
  image: string
}

export function ExperienceCard({ number, category, teaser, image }: ExperienceCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-2xl" style={{ aspectRatio: '4/3' }}>
      {/* Photo d'ambiance — blur pour garder le mystère */}
      <Image
        src={image}
        alt="Expérience révélée dans le guide"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'blur(14px) saturate(1.1)' }}
      />

      {/* Overlay fort pour masquer la photo */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(180deg, rgba(86,14,19,0.75) 0%, rgba(86,14,19,0.85) 45%, rgba(86,14,19,0.95) 100%)',
        }}
      />

      {/* Numéro + catégorie top */}
      <div className="absolute top-4 left-5 right-5 flex items-start justify-between">
        <div
          className="text-5xl font-bold leading-none"
          style={{ color: '#F6C961', fontFamily: 'var(--font-playfair)', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {String(number).padStart(2, '0')}
        </div>
        <span
          className="text-[10px] uppercase tracking-[2px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ color: '#F6C961', backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
          {category}
        </span>
      </div>

      {/* Cadenas + teaser bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Icône cadenas */}
        <div className="mb-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: '#F6C961' }}>
            <path d="M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span
            className="text-[10px] uppercase tracking-[2px] font-bold"
            style={{ color: '#F6C961' }}
          >
            Révélé dans le guide
          </span>
        </div>

        <p
          className="text-[15px] md:text-base leading-snug font-medium"
          style={{ color: '#FEFCF9', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
        >
          « {teaser} »
        </p>
      </div>
    </article>
  )
}
