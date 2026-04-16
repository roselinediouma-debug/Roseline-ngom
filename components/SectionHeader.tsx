interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <p
          className="text-sm uppercase tracking-widest mb-3 font-semibold"
          style={{ color: light ? '#F6C961' : '#560E13' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          color: light ? '#FEFCF9' : '#0A0A0A',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg max-w-2xl"
          style={{
            color: light ? 'rgba(254,252,249,0.75)' : 'rgba(10,10,10,0.6)',
            ...(centered ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
