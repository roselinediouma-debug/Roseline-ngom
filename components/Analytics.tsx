import Script from 'next/script'

/**
 * Analytics combinés : Google Analytics 4 + Vercel Analytics + Vercel Speed Insights.
 *
 * GA4 est chargé uniquement si `NEXT_PUBLIC_GA_MEASUREMENT_ID` est défini.
 * Vercel Analytics/SpeedInsights s'activent automatiquement sur Vercel prod.
 *
 * Placer dans app/layout.tsx juste avant </body>.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}
