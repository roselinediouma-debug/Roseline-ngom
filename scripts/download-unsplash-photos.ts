/**
 * Télécharge les photos Unsplash utilisées sur /guide et dans le PDF.
 *
 * Usage : npx tsx scripts/download-unsplash-photos.ts
 *
 * Idempotent : skip les fichiers qui existent déjà.
 */

import { writeFile, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public', 'images', 'senegal')

type Photo = { slug: string; url: string; size?: 'large' | 'portrait' | 'square' }

// Paramètres Unsplash par taille
const SIZES: Record<string, string> = {
  large: '?w=1600&q=80&auto=format&fit=crop&fm=jpg',
  portrait: '?w=1200&h=1600&q=80&auto=format&fit=crop&fm=jpg',
  square: '?w=400&h=400&q=80&auto=format&fit=crop&fm=jpg',
}

const PHOTOS: Photo[] = [
  // Hero + cover PDF, grand paysage iconique
  { slug: 'hero', url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53', size: 'large' },
  { slug: 'cover', url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53', size: 'portrait' },

  // 10 expériences
  { slug: 'exp-01-lac-rose', url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843', size: 'large' },
  { slug: 'exp-02-mbour', url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2', size: 'large' },
  { slug: 'exp-03-carabane', url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5', size: 'large' },
  { slug: 'exp-04-goree', url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24', size: 'large' },
  { slug: 'exp-05-bassari', url: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084', size: 'large' },
  { slug: 'exp-06-saloum', url: 'https://images.unsplash.com/photo-1528914457842-1af67b57139d', size: 'large' },
  { slug: 'exp-07-saint-louis', url: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8', size: 'large' },
  { slug: 'exp-08-niokolo', url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d', size: 'large' },
  { slug: 'exp-09-lutte', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205', size: 'large' },
  { slug: 'exp-10-lompoul', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', size: 'large' },

  // Galerie mosaïque
  { slug: 'gallery-1', url: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e', size: 'square' },
  { slug: 'gallery-2', url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53', size: 'square' },
  { slug: 'gallery-3', url: 'https://images.unsplash.com/photo-1541959833400-049d37f98ccd', size: 'square' },
  { slug: 'gallery-4', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', size: 'square' },
  { slug: 'gallery-5', url: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae', size: 'square' },
  { slug: 'gallery-6', url: 'https://images.unsplash.com/photo-1512675828443-4f454c42253a', size: 'square' },

  // 3 portraits testimonials
  { slug: 'testimonial-1', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', size: 'square' },
  { slug: 'testimonial-2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', size: 'square' },
  { slug: 'testimonial-3', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', size: 'square' },
]

async function downloadOne(photo: Photo): Promise<number> {
  const sizeParams = SIZES[photo.size || 'large']
  const url = photo.url + sizeParams
  const outPath = resolve(OUT_DIR, `${photo.slug}.jpg`)

  if (existsSync(outPath)) {
    const st = await stat(outPath)
    console.log(`  ⏭  ${photo.slug}.jpg (déjà présent, ${Math.round(st.size / 1024)} KB)`)
    return st.size
  }

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`${photo.slug}: HTTP ${res.status}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(outPath, buf)
  console.log(`  ✅ ${photo.slug}.jpg (${Math.round(buf.length / 1024)} KB)`)
  return buf.length
}

async function main() {
  console.log('📸 Téléchargement des photos Unsplash...\n')

  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true })
  }

  let total = 0
  let failed: string[] = []

  for (const photo of PHOTOS) {
    try {
      total += await downloadOne(photo)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ❌ ${photo.slug}: ${msg}`)
      failed.push(photo.slug)
    }
  }

  console.log(`\n📦 Total : ${Math.round(total / 1024)} KB (${PHOTOS.length - failed.length}/${PHOTOS.length} photos)`)
  if (failed.length) {
    console.log(`⚠️  Échecs : ${failed.join(', ')}`)
    process.exit(1)
  }
  console.log('✅ Toutes les photos sont prêtes dans public/images/senegal/\n')
}

main().catch((err) => {
  console.error('Erreur fatale:', err)
  process.exit(1)
})
