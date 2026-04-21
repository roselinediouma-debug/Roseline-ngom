import { buildMetadata } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: 'Guide gratuit : 15 expériences secrètes au Sénégal',
  description:
    "Mon carnet d'adresses personnel. 15 lieux, contacts directs, astuces locales pour un voyage authentique au Sénégal. PDF 33 pages à télécharger gratuitement.",
  path: '/guide',
  ogImage: '/images/og/guide.jpg',
  keywords: [
    'guide Sénégal gratuit',
    'que visiter au Sénégal',
    'Sénégal authentique',
    'conseils voyage Sénégal',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
