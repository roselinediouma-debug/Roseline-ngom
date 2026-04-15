'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/guide', label: 'Guide gratuit' },
  { href: '/offres', label: 'Offres' },
  { href: '/voyages', label: 'Voyages' },
  { href: '/conseil', label: 'Conseil' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(254, 252, 249, 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-playfair text-xl font-bold" style={{ color: scrolled ? '#560E13' : '#FEFCF9' }}>
          Roseline Ngom
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: scrolled ? '#0A0A0A' : '#FEFCF9' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/guide"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
          >
            Guide gratuit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="w-6 h-0.5 transition-all"
            style={{
              backgroundColor: scrolled ? '#0A0A0A' : '#FEFCF9',
              transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="w-6 h-0.5 transition-all"
            style={{
              backgroundColor: scrolled ? '#0A0A0A' : '#FEFCF9',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="w-6 h-0.5 transition-all"
            style={{
              backgroundColor: scrolled ? '#0A0A0A' : '#FEFCF9',
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: '#FEFCF9' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-1"
              style={{ color: '#0A0A0A' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/guide"
            className="px-5 py-3 rounded-full text-sm font-semibold text-center"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            onClick={() => setMenuOpen(false)}
          >
            Guide gratuit
          </Link>
        </div>
      )}
    </nav>
  )
}
