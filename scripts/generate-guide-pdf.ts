/**
 * Génère le PDF du guide Sénégal de Roseline Ngom.
 *
 * Usage :
 *   npm run pdf:generate
 *
 * Écrit : public/guide-senegal-gratuit.pdf
 *
 * Le script scanne public/images/senegal/ pour savoir quelles photos
 * sont disponibles. Les expériences sans photo affichent un placeholder
 * décoratif (fond bordeaux + grand numéro doré).
 */

import { renderToFile } from '@react-pdf/renderer'
import { existsSync, readdirSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { GuideSenegal } from '../lib/pdf/GuideSenegal'
import { EXPERIENCES } from '../lib/pdf/content'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const IMAGES_DIR = resolve(ROOT, 'public', 'images', 'senegal')
const OUTPUT_PDF = resolve(ROOT, 'public', 'guide-senegal-gratuit.pdf')
const COVER_IMAGE = resolve(IMAGES_DIR, 'cover.jpg')

async function main() {
  console.log('📖 Génération du guide Sénégal PDF...\n')

  // 1. S'assurer que le dossier de sortie existe
  const outputDir = dirname(OUTPUT_PDF)
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // 2. Scanner les images disponibles
  const availableImages = new Set<string>()
  let coverImageExists = false

  if (existsSync(IMAGES_DIR)) {
    const files = readdirSync(IMAGES_DIR)
    files.forEach((f) => availableImages.add(f))
    coverImageExists = existsSync(COVER_IMAGE)
  } else {
    console.log(`⚠️  Dossier ${IMAGES_DIR} introuvable — tous les placeholders seront utilisés.`)
  }

  // Log état des images
  console.log('─ Images disponibles ─')
  console.log(`  Cover               : ${coverImageExists ? '✅' : '⚠️  placeholder'}`)
  EXPERIENCES.forEach((exp) => {
    const ok = availableImages.has(exp.image)
    console.log(`  ${String(exp.number).padStart(2, '0')}. ${exp.title.slice(0, 42).padEnd(42)} : ${ok ? '✅' : '⚠️  placeholder'}`)
  })
  console.log('')

  // 3. Rendu vers fichier
  console.log(`Rendu PDF vers : ${OUTPUT_PDF}`)
  const doc = React.createElement(GuideSenegal, { availableImages, coverImageExists })
  // @ts-expect-error — React.createElement renvoie un ReactElement, renderToFile accepte ReactElement<DocumentProps>
  await renderToFile(doc, OUTPUT_PDF)

  console.log('\n✅ PDF généré avec succès !')
  console.log(`   Fichier : ${OUTPUT_PDF}`)
  console.log(`   Poids   : voir ci-dessus\n`)
}

main().catch((err) => {
  console.error('❌ Erreur lors de la génération du PDF :')
  console.error(err)
  process.exit(1)
})
