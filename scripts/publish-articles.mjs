/**
 * Script one-shot : insère les Articles 1 et 2 dans Supabase blog_posts.
 * Lance avec : node scripts/publish-articles.mjs
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

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

const articles = [
  {
    title:
      "Voyage au Sénégal : le guide complet pour partir en 2026",
    slug: 'voyage-senegal-guide-complet-2026',
    excerpt:
      "Tout pour préparer votre voyage au Sénégal en 2026 : quand partir, budget, visa, vaccins, itinéraires 7/14/21 jours, sécurité. Guide d'une franco-sénégalaise.",
    contentFile: 'docs/seo/article-1-voyage-senegal-PUBLISH.md',
    cover_image: '/images/senegal/hero.jpg',
    tags: ['sénégal', 'voyage', 'guide 2026', 'pilier'],
  },
  {
    title:
      "Lac Rose du Sénégal : pourquoi il n'est plus vraiment rose (et pourquoi il vaut toujours le détour)",
    slug: 'lac-rose-senegal',
    excerpt:
      "Tout sur le Lac Rose : pourquoi il a perdu sa couleur, y aller en 2026, prix en FCFA, danger, photos. Guide terrain d'une franco-sénégalaise qui y retourne chaque année.",
    contentFile: 'docs/seo/article-2-lac-rose-PUBLISH.md',
    cover_image: '/images/blog/lac-rose-hero.jpg',
    tags: ['sénégal', 'lac rose', 'guide voyage', '2026'],
  },
]

async function run() {
  for (const art of articles) {
    const content = fs.readFileSync(path.resolve(art.contentFile), 'utf-8')
    const payload = {
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt,
      content,
      cover_image: art.cover_image,
      tags: art.tags,
      status: 'published',
      published_at: new Date().toISOString(),
    }
    // Upsert sur slug — relance idempotente
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', art.slug)
      .maybeSingle()
    if (existing?.id) {
      const { error } = await supabase
        .from('blog_posts')
        .update(payload)
        .eq('id', existing.id)
      if (error) {
        console.error(`❌ Update ${art.slug}:`, error.message)
      } else {
        console.log(`✅ Mis à jour : ${art.slug}`)
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload)
      if (error) {
        console.error(`❌ Insert ${art.slug}:`, error.message)
      } else {
        console.log(`✅ Publié : ${art.slug}`)
      }
    }
  }
  console.log('\n🎉 Terminé.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
