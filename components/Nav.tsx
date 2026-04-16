'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface DropdownItem {
  href: string
  label: string
}

interface NavItem {
  label: string
  href?: string
  children?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Voyages',
    children: [
      { href: '/voyages/retour-aux-sources', label: 'Retour aux Sources' },
      { href: '/voyages/voyage-signature', label: 'Voyage Signature' },
      { href: '/voyages/back-to-senegal', label: 'Back to Senegal' },
    ],
  },
  { label: 'Guides', href: '/guides' },
  {
    label: 'Consulting',
    children: [
      { href: '/consulting/audit-strategique', label: 'Audit Strat\u00e9gique' },
      { href: '/consulting/accompagnement', label: 'Accompagnement' },
      { href: '/consulting/institutionnel', label: 'Institutionnel' },
    ],
  },
  {
    label: 'Digital & IA',
    children: [
      { href: '/digital-ia/presence-digitale', label: 'Pr\u00e9sence Digitale' },
      { href: '/digital-ia/transformation', label: 'Transformation' },
      { href: '/digital-ia/ia-appliquee', label: 'IA Appliqu\u00e9e' },
      { href: '/digital-ia/formations', label: 'Formations' },
    ],
  },
  {
    label: 'Ressources',
    children: [
      { href: '/guide', label: 'Guide gratuit' },
      { href: '/ressources/checklist-voyage', label: 'Checklist voyage' },
      { href: '/ressources/newsletter', label: 'Newsletter' },
    ],
  },
  { label: '\u00c0 propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label)
  }

  const linkColor = scrolled ? '#0A0A0A' : '#FEFCF9'
  const logoColor = scrolled ? '#560E13' : '#FEFCF9'
  const hamburgerColor = scrolled ? '#0A0A0A' : '#FEFCF9'

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
        <Link
          href="/"
          className="text-xl font-bold"
          style={{ color: logoColor, fontFamily: "'Cormorant Garamond', serif" }}
        >
          Roseline Ngom
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-sm font-medium transition-opacity hover:opacity-70 flex items-center gap-1"
                  style={{ color: linkColor, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {item.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="transition-transform"
                    style={{
                      transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path d="M1 1L5 5L9 1" stroke={linkColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                {openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-2 py-3 px-1 rounded-lg min-w-[220px]"
                    style={{
                      backgroundColor: '#F8F5F0',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm rounded-md transition-colors"
                        style={{ color: '#560E13' }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(86,14,19,0.06)'
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                        }}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: linkColor }}
              >
                {item.label}
              </Link>
            )
          )}

          {/* CTA */}
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
            className="w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: hamburgerColor,
              transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: hamburgerColor,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="w-6 h-0.5 transition-all duration-300"
            style={{
              backgroundColor: hamburgerColor,
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-1 overflow-y-auto"
          style={{ backgroundColor: '#FEFCF9', maxHeight: 'calc(100vh - 72px)' }}
        >
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between py-3 text-base font-medium"
                  style={{ color: '#0A0A0A', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => toggleMobileExpand(item.label)}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="transition-transform duration-200"
                    style={{
                      transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {mobileExpanded === item.label && (
                  <div className="pl-4 pb-2 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-sm"
                        style={{ color: '#560E13' }}
                        onClick={() => {
                          setMenuOpen(false)
                          setMobileExpanded(null)
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="py-3 text-base font-medium"
                style={{ color: '#0A0A0A' }}
                onClick={() => {
                  setMenuOpen(false)
                  setMobileExpanded(null)
                }}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          <Link
            href="/guide"
            className="mt-3 px-5 py-3 rounded-full text-sm font-semibold text-center"
            style={{ backgroundColor: '#F6C961', color: '#560E13' }}
            onClick={() => {
              setMenuOpen(false)
              setMobileExpanded(null)
            }}
          >
            Guide gratuit
          </Link>
        </div>
      )}
    </nav>
  )
}
