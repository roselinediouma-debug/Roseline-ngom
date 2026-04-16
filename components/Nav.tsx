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
  {
    label: 'Expertise',
    children: [
      { href: '/consulting', label: 'Consulting' },
      { href: '/digital-ia', label: 'Digital & IA' },
      { href: '/guides', label: 'Guides' },
    ],
  },
  { label: 'A propos', href: '/a-propos' },
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
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
  }

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label)
  }

  const closeMobile = () => {
    setMenuOpen(false)
    setMobileExpanded(null)
  }

  const linkColor = scrolled ? '#0A0A0A' : '#FFFFFF'
  const logoColor = scrolled ? '#560E13' : '#FFFFFF'

  return (
    <>
      {/* Pulse animation + mobile stagger keyframes */}
      <style jsx global>{`
        @keyframes pulse-gold {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(246, 201, 97, 0.5);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(246, 201, 97, 0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dropdown-enter {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .btn-gold-pulse {
          animation: pulse-gold 2.5s ease-in-out infinite;
        }
        .btn-gold-pulse:hover {
          animation: none;
        }
        .mobile-nav-item {
          animation: fade-in-up 0.5s ease-out both;
        }
        .dropdown-panel {
          animation: dropdown-enter 0.25s ease-out both;
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-cormorant text-2xl tracking-wide transition-colors duration-500"
            style={{ color: logoColor, fontWeight: 600 }}
          >
            Roseline Ngom
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="font-dm-sans text-[13px] font-medium tracking-wide uppercase transition-all duration-500 flex items-center gap-1.5 hover:opacity-70"
                    style={{
                      color: linkColor,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className="transition-transform duration-300"
                      style={{
                        transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke={linkColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {openDropdown === item.label && (
                    <div
                      className="dropdown-panel absolute top-full left-0 mt-3 py-2 min-w-[200px]"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="font-dm-sans block px-5 py-2.5 text-sm transition-colors duration-200"
                          style={{ color: '#0A0A0A' }}
                          onMouseEnter={(e) => {
                            ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(86,14,19,0.04)'
                            ;(e.currentTarget as HTMLElement).style.color = '#560E13'
                          }}
                          onMouseLeave={(e) => {
                            ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                            ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
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
                  className="font-dm-sans text-[13px] font-medium tracking-wide uppercase transition-all duration-500 hover:opacity-70"
                  style={{ color: linkColor, letterSpacing: '0.08em' }}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* CTA */}
            <Link
              href="/guide"
              className="btn-gold-pulse font-dm-sans px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 hover:brightness-110"
              style={{
                backgroundColor: '#F6C961',
                color: '#560E13',
                borderRadius: '4px',
                letterSpacing: '0.06em',
              }}
            >
              Recevoir le guide
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span
              className="absolute w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF',
                transform: menuOpen ? 'rotate(45deg)' : 'translateY(-6px)',
              }}
            />
            <span
              className="absolute w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="absolute w-6 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: scrolled ? '#0A0A0A' : '#FFFFFF',
                transform: menuOpen ? 'rotate(-45deg)' : 'translateY(6px)',
              }}
            />
          </button>
        </div>

        {/* Gold separator line - only visible when scrolled */}
        <div
          className="transition-all duration-500"
          style={{
            height: '1px',
            backgroundColor: scrolled ? '#F6C961' : 'transparent',
          }}
        />
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-[60] md:hidden flex flex-col transition-all duration-500"
        style={{
          backgroundColor: '#560E13',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Mobile header with close button */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-cormorant text-2xl tracking-wide"
            style={{ color: '#F6C961', fontWeight: 600 }}
            onClick={closeMobile}
          >
            Roseline Ngom
          </Link>
          <button
            onClick={closeMobile}
            aria-label="Fermer le menu"
            className="w-10 h-10 flex items-center justify-center"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="#F6C961" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile nav links */}
        <div className="flex-1 flex flex-col justify-center px-10 gap-2">
          {navItems.map((item, index) =>
            item.children ? (
              <div
                key={item.label}
                className="mobile-nav-item"
                style={{ animationDelay: menuOpen ? `${index * 0.08}s` : '0s' }}
              >
                <button
                  className="font-cormorant text-3xl w-full text-left flex items-center justify-between py-3 transition-colors duration-200"
                  style={{
                    color: '#FEFCF9',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onClick={() => toggleMobileExpand(item.label)}
                >
                  {item.label}
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="transition-transform duration-300"
                    style={{
                      transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#F6C961" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {mobileExpanded === item.label && (
                  <div className="pl-4 pb-3 flex flex-col gap-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="font-dm-sans mobile-nav-item py-2 text-lg transition-colors duration-200"
                        style={{
                          color: 'rgba(254, 252, 249, 0.7)',
                          animationDelay: `${childIndex * 0.05}s`,
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.color = '#F6C961'
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.color = 'rgba(254, 252, 249, 0.7)'
                        }}
                        onClick={closeMobile}
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
                className="font-cormorant mobile-nav-item text-3xl py-3 transition-colors duration-200"
                style={{
                  color: '#FEFCF9',
                  fontWeight: 500,
                  animationDelay: menuOpen ? `${index * 0.08}s` : '0s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = '#F6C961'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = '#FEFCF9'
                }}
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          <div
            className="mobile-nav-item mt-8"
            style={{ animationDelay: menuOpen ? `${navItems.length * 0.08}s` : '0s' }}
          >
            <Link
              href="/guide"
              className="font-dm-sans inline-block px-8 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:brightness-110"
              style={{
                backgroundColor: '#F6C961',
                color: '#560E13',
                borderRadius: '4px',
                letterSpacing: '0.06em',
              }}
              onClick={closeMobile}
            >
              Recevoir le guide
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
