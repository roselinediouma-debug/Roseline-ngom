import { buildMetadata } from '@/lib/seo/metadata'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema } from '@/lib/seo/jsonld'

export const metadata = buildMetadata({
  title: 'Consulting tourisme Afrique',
  description:
    'Consulting pour acteurs du tourisme et décideurs institutionnels en Afrique : audit stratégique, accompagnement, expertise. 10 ans d\'expertise.',
  path: '/consulting',
  keywords: ['consulting tourisme Afrique', 'audit stratégique tourisme', 'conseil institutionnel tourisme'],
})

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Consulting tourisme Afrique',
            description:
              'Audit stratégique, accompagnement et expertise institutionnelle pour acteurs du tourisme en Afrique.',
            slug: '/consulting',
            serviceType: 'Tourism strategy consulting',
          }),
          breadcrumbSchema([
            { name: 'Accueil', path: '/' },
            { name: 'Consulting', path: '/consulting' },
          ]),
        ]}
      />
      {children}
    </>
  )
}
