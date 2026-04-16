interface Feature {
  icon: string
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div
          key={i}
          className="rounded-xl p-6"
          style={{
            backgroundColor: '#F8F5F0',
            border: '1px solid rgba(86,14,19,0.06)',
          }}
        >
          <div className="text-3xl mb-4">{feature.icon}</div>
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: '#560E13' }}
          >
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
