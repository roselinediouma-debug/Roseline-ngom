import Link from 'next/link'

interface PricingTier {
  name: string
  price: string
  period?: string
  features: string[]
  highlighted?: boolean
  ctaLabel: string
  ctaHref: string
}

interface PricingTableProps {
  tiers: PricingTier[]
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {tiers.map((tier, i) => (
        <div
          key={i}
          className="relative rounded-xl p-8 flex flex-col"
          style={{
            backgroundColor: tier.highlighted ? '#FEFCF9' : '#F8F5F0',
            border: tier.highlighted ? '2px solid #F6C961' : '1px solid rgba(86,14,19,0.1)',
            transform: tier.highlighted ? 'scale(1.03)' : 'none',
          }}
        >
          {tier.highlighted && (
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            >
              Populaire
            </span>
          )}

          <h3
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              color: '#560E13',
            }}
          >
            {tier.name}
          </h3>

          <div className="mb-6">
            <span className="text-4xl font-bold" style={{ color: '#0A0A0A' }}>
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-sm ml-1" style={{ color: 'rgba(10,10,10,0.5)' }}>
                {tier.period}
              </span>
            )}
          </div>

          <ul className="flex-1 space-y-3 mb-8">
            {tier.features.map((feature, j) => (
              <li key={j} className="flex items-start gap-2 text-sm">
                <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0">&#10003;</span>
                <span style={{ color: 'rgba(10,10,10,0.75)' }}>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.ctaHref}
            className="block text-center px-6 py-3 rounded-lg font-semibold transition-opacity duration-200 hover:opacity-90"
            style={{
              backgroundColor: tier.highlighted ? '#F6C961' : '#560E13',
              color: tier.highlighted ? '#560E13' : '#FEFCF9',
            }}
          >
            {tier.ctaLabel}
          </Link>
        </div>
      ))}
    </div>
  )
}
