interface TimelineDay {
  day: string
  title: string
  location?: string
  highlights: string[]
}

interface TimelineSectionProps {
  days: TimelineDay[]
}

export default function TimelineSection({ days }: TimelineSectionProps) {
  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Connecting line */}
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        style={{ backgroundColor: '#560E13' }}
        aria-hidden="true"
      />

      <div className="space-y-12">
        {days.map((day, i) => {
          const isLeft = i % 2 === 0
          return (
            <div key={i} className="relative">
              {/* Gold circle */}
              <div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 text-sm font-bold"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                  border: '3px solid #FEFCF9',
                }}
              >
                {day.day.replace(/\D/g, '').slice(0, 2)}
              </div>

              {/* Content card */}
              <div
                className={`
                  ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]
                  ${isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}
                `}
              >
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.08)' }}
                >
                  <p
                    className="text-sm font-semibold uppercase tracking-wider mb-1"
                    style={{ color: '#F6C961' }}
                  >
                    {day.day}
                  </p>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                      color: '#0A0A0A',
                    }}
                  >
                    {day.title}
                  </h3>
                  {day.location && (
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-medium"
                      style={{ backgroundColor: 'rgba(86,14,19,0.08)', color: '#560E13' }}
                    >
                      {day.location}
                    </span>
                  )}
                  <ul className="space-y-1.5">
                    {day.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(10,10,10,0.7)' }}>
                        <span style={{ color: '#F6C961' }} className="mt-0.5 flex-shrink-0">&#9679;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
