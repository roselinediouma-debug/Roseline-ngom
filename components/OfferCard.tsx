import Link from 'next/link'

interface OfferCardProps {
  level: string
  levelColor?: string
  title: string
  description: string
  price: string
  features: string[]
  ctaText: string
  ctaLink: string
  highlighted?: boolean
  external?: boolean
}

export default function OfferCard({
  level, levelColor = '#560E13', title, description, price,
  features, ctaText, ctaLink, highlighted = false, external = false,
}: OfferCardProps) {
  const ctaEl = (
    <div
      className="mt-auto pt-4"
    >
      <div
        className="w-full py-3 rounded-xl text-sm font-bold text-center uppercase tracking-wider transition-opacity hover:opacity-85 cursor-pointer"
        style={highlighted
          ? { backgroundColor: '#F6C961', color: '#560E13' }
          : { backgroundColor: '#560E13', color: '#FEFCF9' }
        }
      >
        {ctaText}
      </div>
    </div>
  )

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col h-full transition-transform hover:scale-[1.01]"
      style={highlighted
        ? { border: '2px solid #F6C961', boxShadow: '0 8px 32px rgba(246,201,97,0.2)', backgroundColor: '#fff' }
        : { border: '1px solid #e0d8d0', backgroundColor: '#fff' }
      }
    >
      {/* Badge Populaire */}
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: '#F6C961', color: '#560E13' }}
        >
          ⭐ POPULAIRE
        </div>
      )}

      {/* Level badge */}
      <div
        className="inline-block self-start text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
        style={{ backgroundColor: `${levelColor}15`, color: levelColor, border: `1px solid ${levelColor}30` }}
      >
        {level}
      </div>

      <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-cormorant)', color: '#0A0A0A' }}>
        {title}
      </h3>

      <p className="text-sm opacity-60 mb-3">{description}</p>

      <div className="font-bold text-xl mb-4" style={{ color: '#560E13' }}>{price}</div>

      <ul className="flex flex-col gap-2 mb-4 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: '#F6C961', color: '#560E13' }}>✓</span>
            <span className="opacity-70">{f}</span>
          </li>
        ))}
      </ul>

      {external
        ? <a href={ctaLink} target="_blank" rel="noopener noreferrer">{ctaEl}</a>
        : <Link href={ctaLink}>{ctaEl}</Link>
      }
    </div>
  )
}
