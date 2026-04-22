import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const BORDEAUX = '#560E13'
const BORDEAUX_DARK = '#3d090e'
const OR = '#F6C961'
const OR_SOFT = '#b8860b'
const IVOIRE = '#FEFCF9'

function clamp(str: string, max: number): string {
  if (!str) return ''
  if (str.length <= max) return str
  return str.slice(0, max - 1).trimEnd() + '…'
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawTitle = (searchParams.get('title') || 'Roseline Ngom').trim()
  const rawSubtitle = (searchParams.get('subtitle') || searchParams.get('desc') || '').trim()
  const eyebrow = (searchParams.get('eyebrow') || 'roselinengom.com').trim()
  const variant = (searchParams.get('v') || 'default').trim() // default | dark | gold

  const title = clamp(rawTitle, 110)
  const subtitle = clamp(rawSubtitle, 170)

  const bg =
    variant === 'gold'
      ? `linear-gradient(135deg, ${OR} 0%, #e0b247 100%)`
      : `linear-gradient(135deg, ${BORDEAUX} 0%, ${BORDEAUX_DARK} 100%)`

  const titleColor = variant === 'gold' ? BORDEAUX : IVOIRE
  const subColor = variant === 'gold' ? 'rgba(86,14,19,0.75)' : 'rgba(254,252,249,0.82)'
  const eyebrowColor = variant === 'gold' ? BORDEAUX : OR
  const accentColor = variant === 'gold' ? BORDEAUX : OR

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background: bg,
          color: IVOIRE,
          fontFamily:
            '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Motif décoratif */}
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -140,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              variant === 'gold'
                ? 'radial-gradient(circle, rgba(86,14,19,0.12) 0%, rgba(86,14,19,0) 70%)'
                : 'radial-gradient(circle, rgba(246,201,97,0.14) 0%, rgba(246,201,97,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -140,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background:
              variant === 'gold'
                ? 'radial-gradient(circle, rgba(86,14,19,0.08) 0%, rgba(86,14,19,0) 70%)'
                : 'radial-gradient(circle, rgba(254,252,249,0.06) 0%, rgba(254,252,249,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: variant === 'gold' ? IVOIRE : BORDEAUX,
              fontSize: 24,
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
            }}
          >
            R
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              color: variant === 'gold' ? BORDEAUX : IVOIRE,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.02em' }}>
              Roseline Ngom
            </div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: eyebrowColor,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          </div>
        </div>

        {/* Corps */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1, maxWidth: 1040 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 52, height: 2, background: accentColor, display: 'flex' }} />
            <div
              style={{
                fontSize: 14,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: eyebrowColor,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 700,
              }}
            >
              Tourisme · Diaspora · IA
            </div>
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 64 : 76,
              fontWeight: 500,
              lineHeight: 1.08,
              color: titleColor,
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: subColor,
                marginTop: 26,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                display: 'flex',
                maxWidth: 960,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1,
            paddingTop: 24,
            borderTop: `1px solid ${
              variant === 'gold' ? 'rgba(86,14,19,0.2)' : 'rgba(246,201,97,0.25)'
            }`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: variant === 'gold' ? BORDEAUX : IVOIRE,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 600,
            }}
          >
            roselinengom.com
          </div>
          <div
            style={{
              fontSize: 16,
              color: variant === 'gold' ? 'rgba(86,14,19,0.65)' : 'rgba(254,252,249,0.55)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.1em',
            }}
          >
            Conseil · Voyages · Digital
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
