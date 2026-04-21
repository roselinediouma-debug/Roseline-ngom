/**
 * Optimise les photos ajoutées par Roseline pour le web.
 * Resize gallery → 800x800 (1:1), experiences → 1600px wide.
 */
import { resolve } from 'node:path'
import { writeFile, rename, unlink } from 'node:fs/promises'
import sharp from 'sharp'

const DIR = resolve(__dirname, '..', 'public', 'images', 'senegal')

async function optimizeSquare(input: string, output: string, size = 800) {
  const img = sharp(input)
  const meta = await img.metadata()
  const buf = await img
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer()
  const outPath = resolve(DIR, output)
  const tmpPath = outPath + '.tmp'
  await writeFile(tmpPath, buf)
  try { await unlink(outPath) } catch {}
  await rename(tmpPath, outPath)
  console.log(`  ✅ ${output}, ${Math.round(buf.length / 1024)} KB (from ${meta.width}x${meta.height})`)
}

async function optimizeLandscape(input: string, output: string, width = 1600) {
  const img = sharp(input)
  const meta = await img.metadata()
  const buf = await img
    .resize(width, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer()
  const outPath = resolve(DIR, output)
  const tmpPath = outPath + '.tmp'
  await writeFile(tmpPath, buf)
  try { await unlink(outPath) } catch {}
  await rename(tmpPath, outPath)
  console.log(`  ✅ ${output}, ${Math.round(buf.length / 1024)} KB (from ${meta.width}x${meta.height})`)
}

async function main() {
  console.log('🖼️  Optimisation des photos Roseline...\n')

  console.log('Gallery (800x800 carré) :')
  await optimizeSquare(resolve(DIR, 'gallery-1.jpg'), 'gallery-1.jpg')
  await optimizeSquare(resolve(DIR, 'gallery-2.jpg'), 'gallery-2.jpg')
  await optimizeSquare(resolve(DIR, 'gallery-3.jpg'), 'gallery-3.jpg')
  await optimizeSquare(resolve(DIR, 'gallery-4.jpg'), 'gallery-4.jpg')

  // Gallery 5, mangrove Sine Saloum (PNG → JPG carré)
  await optimizeSquare(resolve(DIR, 'mangrove-sinesaloum.png'), 'gallery-5.jpg')

  // Gallery 6, pirogue Sine Saloum
  await optimizeSquare(resolve(DIR, 'SINE SALOUM', 'IMG_6938.jpg'), 'gallery-6.jpg')

  // Lac Rose, remplacer par la vraie photo
  console.log('\nExpériences :')
  await optimizeLandscape(resolve(DIR, 'exp-01-lac-rose-new.jpg'), 'exp-01-lac-rose.jpg')

  console.log('\n✅ Optimisation terminée !')
}

main().catch(console.error)
