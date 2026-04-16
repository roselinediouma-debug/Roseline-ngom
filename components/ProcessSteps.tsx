interface Step {
  number: number
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: Step[]
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Mobile: vertical timeline */}
      <div className="md:hidden space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                }}
              >
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: '#F6C961' }} />
              )}
            </div>
            <div className="pb-8">
              <h3
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#0A0A0A',
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="flex items-start">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center px-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                style={{
                  backgroundColor: '#F6C961',
                  color: '#560E13',
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                }}
              >
                {step.number}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  color: '#0A0A0A',
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(10,10,10,0.6)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {/* Connecting line */}
        <div className="relative mt-[-4.5rem] mx-auto" style={{ height: '2px' }}>
          <div
            className="absolute top-0 h-0.5"
            style={{
              backgroundColor: '#F6C961',
              left: `${100 / (steps.length * 2)}%`,
              right: `${100 / (steps.length * 2)}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
