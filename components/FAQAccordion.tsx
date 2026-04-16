'use client'

import { useState } from 'react'

interface FAQAccordionProps {
  items: { q: string; a: string }[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: '#F8F5F0', border: '1px solid rgba(86,14,19,0.1)' }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-base pr-4" style={{ color: '#0A0A0A' }}>
                {item.q}
              </span>
              <span
                className="text-xl font-bold flex-shrink-0 transition-transform duration-300"
                style={{
                  color: '#560E13',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </button>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
              <div className="px-6 pb-4" style={{ color: 'rgba(10,10,10,0.7)' }}>
                {item.a}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
