/**
 * Patch one-shot : ajoute une section "Sources & références officielles"
 * (liens d'autorité EEAT) à la fin du contenu markdown des articles 1 et 2.
 *
 * Boost SEO :
 *  - Liens sortants vers domaines à haute autorité (UNESCO, diplomatie.gouv,
 *    OMS, portail officiel Sénégal) → topical trust
 *  - Attribut rel="noopener" + target="_blank" ajoutés côté rendu par
 *    ReactMarkdown (comportement par défaut)
 *
 * Lance avec : node scripts/patch-articles-authority-links.mjs
 * Idempotent : si la section est déjà présente (marqueur comment HTML), skip.
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'

// Parse .env.local manuellement
const envFile = fs.readFileSync('.env.local', 'utf-8')
for (const line of envFile.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/)
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('❌ Supabase env vars manquantes')
  process.exit(1)
}

const supabase = createClient(url, key)

const MARKER = '<!-- authority-links-v1 -->'

/** Bloc générique d'autorité, tronc commun voyage Sénégal */
const AUTHORITY_BLOCK_GENERIC = `
${MARKER}

## Sources & références officielles

Pour préparer votre voyage en toute sérénité, voici les sources officielles à consulter en complément de cet article :

- [Conseils aux voyageurs France Diplomatie — Sénégal](https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/senegal/) : sécurité, santé, formalités à jour.
- [Santé du voyageur — OMS (pays Sénégal)](https://www.who.int/countries/sen) : vaccins recommandés et situation sanitaire.
- [Patrimoine mondial UNESCO — Sénégal](https://whc.unesco.org/fr/etatsparties/sn) : Île de Gorée, Saint-Louis, Djoudj, delta du Saloum.
- [Agence Sénégalaise de Promotion Touristique (ASPT)](https://aspt.sn) : informations officielles tourisme Sénégal.
- [Ministère du Tourisme du Sénégal](https://tourisme.gouv.sn) : actualités et cadre officiel du secteur.
`

/** Bloc spécifique Article 1 (guide complet voyage Sénégal) */
const AUTHORITY_BLOCK_ARTICLE_1 = AUTHORITY_BLOCK_GENERIC

/** Bloc spécifique Article 2 (Lac Rose) : ajouter réf scientifique */
const AUTHORITY_BLOCK_ARTICLE_2 = `
${MARKER}

## Sources & références officielles

- [Conseils aux voyageurs France Diplomatie — Sénégal](https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/senegal/) : formalités et sécurité.
- [Patrimoine mondial UNESCO — Sénégal](https://whc.unesco.org/fr/etatsparties/sn) : les grands sites classés du pays.
- [Agence Sénégalaise de Promotion Touristique](https://aspt.sn) : portail officiel tourisme.
- [Santé du voyageur — OMS Sénégal](https://www.who.int/countries/sen) : point vaccins et épidémies.
- [Ministère du Tourisme du Sénégal](https://tourisme.gouv.sn) : actualités du secteur touristique.
`

const patches = [
  { slug: 'voyage-senegal-guide-complet-2026', block: AUTHORITY_BLOCK_ARTICLE_1 },
  { slug: 'lac-rose-senegal', block: AUTHORITY_BLOCK_ARTICLE_2 },
]

async function run() {
  for (const p of patches) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, content, updated_at')
      .eq('slug', p.slug)
      .maybeSingle()

    if (error) {
      console.error(`❌ ${p.slug} : erreur fetch`, error.message)
      continue
    }
    if (!data) {
      console.warn(`⚠️  ${p.slug} : article introuvable, skip`)
      continue
    }
    if (data.content && data.content.includes(MARKER)) {
      console.log(`✓  ${p.slug} : déjà patché (marker présent), skip`)
      continue
    }

    const newContent = (data.content || '').trimEnd() + '\n' + p.block

    const { error: upErr } = await supabase
      .from('blog_posts')
      .update({
        content: newContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', data.id)

    if (upErr) {
      console.error(`❌ ${p.slug} : erreur update`, upErr.message)
    } else {
      console.log(`✅ ${p.slug} : liens autorité injectés (+${p.block.length} car.)`)
    }
  }
}

run()
  .then(() => {
    console.log('\nTerminé.')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
