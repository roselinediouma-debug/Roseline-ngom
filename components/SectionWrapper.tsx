interface SectionWrapperProps {
  bg: 'bordeaux' | 'cream' | 'white' | 'black'
  children: React.ReactNode
  className?: string
  id?: string
  withHexOverlay?: boolean
  noPadding?: boolean
}

const BG_MAP = {
  bordeaux: { backgroundColor: '#560E13', color: '#FEFCF9' },
  cream: { backgroundColor: '#F8F5F0', color: '#0A0A0A' },
  white: { backgroundColor: '#FEFCF9', color: '#0A0A0A' },
  black: { backgroundColor: '#0A0A0A', color: '#FEFCF9' },
}

export default function SectionWrapper({
  bg,
  children,
  className = '',
  id,
  withHexOverlay,
  noPadding,
}: SectionWrapperProps) {
  const styles = BG_MAP[bg]
  const showHex = withHexOverlay ?? bg === 'bordeaux'

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${noPadding ? '' : 'py-20 sm:py-24 px-5'} ${className}`}
      style={styles}
    >
      {showHex && <div className="hex-overlay" />}
      <div className="relative z-10 max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}
