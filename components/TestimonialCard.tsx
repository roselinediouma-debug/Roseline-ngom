import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  location?: string
  quote: string
  image?: string
  stars?: number
}

export default function TestimonialCard({ name, location, quote, image, stars = 5 }: TestimonialCardProps) {
  return (
    <div
      className="rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: '#F8F5F0',
        border: '1px solid rgba(86,14,19,0.08)',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        {image && (
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid #560E13' }}>
            <Image src={image} alt={name} width={56} height={56} className="object-cover w-full h-full" />
          </div>
        )}
        <div>
          <p className="font-semibold" style={{ color: '#0A0A0A' }}>{name}</p>
          {location && (
            <p className="text-sm" style={{ color: 'rgba(10,10,10,0.5)' }}>{location}</p>
          )}
        </div>
      </div>
      {stars > 0 && (
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} style={{ color: '#F6C961', fontSize: '1.1rem' }}>&#9733;</span>
          ))}
        </div>
      )}
      <p className="italic leading-relaxed" style={{ color: 'rgba(10,10,10,0.75)' }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
