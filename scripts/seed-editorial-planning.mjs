/**
 * Seed du planning éditorial 30 articles dans Supabase `blog_posts`.
 *
 * Insère en BROUILLON (status='draft') tous les articles encore à rédiger, avec
 * leur `published_at` pré-rempli à la date prévue du planning (à 09:00 heure
 * Paris). Les articles 1 et 2 (déjà publiés) sont ignorés via upsert onConflict.
 *
 * Lancer : node scripts/seed-editorial-planning.mjs
 *
 * Source : docs/seo/planning-editorial-30-articles.md
 */
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'

// Parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf-8')
for (const line of envFile.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/)
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Supabase env vars manquantes')
  process.exit(1)
}

const supabase = createClient(url, key)

// Heure de publication par défaut (09:00 Europe/Paris = 07:00 ou 08:00 UTC selon DST)
// On fixe 09:00 locale et laisse JS gérer la conversion UTC via new Date(YYYY-MM-DDTHH:mm)
// en prenant l'heure système de la machine. Simpler: on code en UTC et on met 08:00 UTC.
const DEFAULT_TIME_UTC = '08:00:00Z'

function scheduledAt(dateYmd) {
  return new Date(`${dateYmd}T${DEFAULT_TIME_UTC}`).toISOString()
}

// Articles 3 à 30 : tout le planning restant à rédiger
// Chaque entrée : { date, slug, title, cluster, keyword, cta, tags }
const ARTICLES = [
  // MOIS 1
  { date: '2026-05-05', slug: 'voyage-casamance-senegal', title: "Voyage en Casamance : le Sénégal que personne ne montre", cluster: 'C', keyword: 'voyage casamance', cta: 'Guide Casamance 29 € + Voyage Signature' },
  // MOIS 2
  { date: '2026-05-19', slug: 'rentrer-au-senegal-diaspora', title: "Rentrer au Sénégal après 10 ans, ce que la diaspora doit savoir", cluster: 'B', keyword: 'retour au sénégal diaspora', cta: 'Retour aux Sources + Le Bled Autrement' },
  { date: '2026-06-02', slug: 'quand-partir-au-senegal', title: "Quand partir au Sénégal, le guide mois par mois", cluster: 'A+D', keyword: 'quand partir au sénégal', cta: 'Guide gratuit' },
  { date: '2026-06-16', slug: 'visite-ile-goree-senegal', title: "Île de Gorée, la Maison des Esclaves et la mémoire", cluster: 'C', keyword: 'gorée visite', cta: 'Retour aux Sources' },
  // MOIS 3
  { date: '2026-07-07', slug: 'visa-senegal-francais', title: "Faut-il un visa pour le Sénégal en 2026 (France, Belgique, Canada)", cluster: 'D', keyword: 'visa sénégal français', cta: 'Guide gratuit' },
  { date: '2026-07-21', slug: 'budget-voyage-senegal-2026', title: "Budget voyage au Sénégal, par profil et par jour", cluster: 'D', keyword: 'budget voyage sénégal', cta: 'Voyage Signature' },
  // MOIS 4
  { date: '2026-08-04', slug: 'sine-saloum-que-faire', title: "Sine Saloum, entre bolongs et îles : que faire en 5 jours", cluster: 'C', keyword: 'sine saloum que faire', cta: 'Voyage Signature + guide Sine Saloum' },
  { date: '2026-08-18', slug: 'voyage-senegal-famille-enfants', title: "Partir au Sénégal en famille : guide 100 % testé avec mes enfants", cluster: 'B+D', keyword: 'voyage sénégal famille', cta: 'Voyage Signature' },
  // MOIS 5
  { date: '2026-09-01', slug: 'saint-louis-senegal-que-voir', title: "Saint-Louis du Sénégal, que voir en 2 jours (UNESCO)", cluster: 'C', keyword: 'saint-louis sénégal que voir', cta: 'Guide Nord Sénégal' },
  { date: '2026-09-15', slug: 'itineraire-senegal-7-jours', title: "Itinéraire Sénégal 7 jours, le meilleur parcours", cluster: 'A+D', keyword: 'itinéraire sénégal 7 jours', cta: 'Voyage Signature' },
  { date: '2026-09-29', slug: 'transmettre-origines-enfants-diaspora', title: "Transmettre le Sénégal à ses enfants nés en France", cluster: 'B', keyword: 'transmettre origines enfants', cta: 'Retour aux Sources' },
  // MOIS 6
  { date: '2026-10-06', slug: 'desert-lompoul-senegal', title: "Désert de Lompoul, comment y dormir sous les étoiles", cluster: 'C', keyword: 'lompoul désert sénégal', cta: 'Voyage Signature' },
  { date: '2026-10-20', slug: 'vaccins-sante-senegal', title: "Vaccins et santé au Sénégal, ce que disent les médecins en 2026", cluster: 'D', keyword: 'vaccins sénégal', cta: 'Guide gratuit' },
  // MOIS 7
  { date: '2026-11-03', slug: 'cap-skirring-vacances', title: "Cap Skirring : plages, clubs et authenticité diola", cluster: 'C', keyword: 'cap skirring', cta: 'Guide Casamance' },
  { date: '2026-11-17', slug: 'dakar-que-faire-3-jours', title: "Dakar, que faire en 3 jours (vrai quartier par quartier)", cluster: 'C', keyword: 'dakar que faire', cta: 'Voyage Signature' },
  { date: '2026-12-01', slug: 'noel-reveillon-senegal', title: "Passer Noël et le Réveillon au Sénégal", cluster: 'C+D', keyword: 'noël sénégal', cta: 'Voyage Signature' },
  // MOIS 8
  { date: '2026-12-15', slug: 'voyage-senegal-couple-mixte', title: "Voyage au Sénégal en couple mixte, ce que j'ai appris", cluster: 'B', keyword: 'voyage couple mixte afrique', cta: 'Voyage Signature' },
  { date: '2026-12-29', slug: 'premiere-fois-senegal-diaspora', title: "Première fois au Sénégal pour la diaspora, quoi préparer", cluster: 'B', keyword: 'première fois sénégal', cta: 'Retour aux Sources + Le Bled Autrement' },
  // MOIS 9
  { date: '2027-01-12', slug: 'itineraire-senegal-14-jours', title: "Itinéraire Sénégal 14 jours, nord et sud, guide optimisé", cluster: 'A+D', keyword: 'itinéraire sénégal 14 jours', cta: 'Retour aux Sources' },
  { date: '2027-01-26', slug: 'ia-hotel-independant-senegal-afrique', title: "IA pour hôtels indépendants en Afrique, par où commencer", cluster: 'E', keyword: 'IA hôtel afrique', cta: '/digital-ia + appel découverte' },
  // MOIS 10
  { date: '2027-02-09', slug: 'audit-digital-hotel-checklist', title: "Audit digital pour un hôtel : la checklist 2027", cluster: 'E', keyword: 'audit digital hôtelier', cta: '/digital-ia' },
  { date: '2027-02-23', slug: 'djoudj-parc-oiseaux-senegal', title: "Parc du Djoudj, le sanctuaire ornithologique UNESCO", cluster: 'C', keyword: 'djoudj sénégal', cta: 'Voyage Signature + guide Nord' },
  // MOIS 11
  { date: '2027-03-09', slug: 'mosquee-touba-senegal', title: "Mosquée de Touba, comprendre le Magal et le mouridisme", cluster: 'C', keyword: 'mosquée touba', cta: 'Voyage Signature' },
  { date: '2027-03-23', slug: 'cuisine-senegalaise-decouvrir', title: "Cuisine sénégalaise, les 10 plats à absolument goûter", cluster: 'C', keyword: 'cuisine sénégalaise', cta: 'Guide gratuit' },
  // MOIS 12
  { date: '2027-04-06', slug: 'pilgrimage-gorée-africain-americain', title: "Pèlerinage à Gorée pour la diaspora africaine-américaine", cluster: 'B', keyword: 'gorée pilgrimage', cta: 'Retour aux Sources' },
  { date: '2027-04-20', slug: 'automatisation-agence-voyage-ia', title: "Automatiser son agence de voyage avec l'IA, le guide 2027", cluster: 'E', keyword: 'automatisation agence voyage', cta: '/digital-ia + formations' },
  { date: '2027-04-27', slug: 'securite-senegal-2027', title: "Le Sénégal est-il sûr en 2027 ? Guide honnête d'une franco-sénégalaise", cluster: 'D', keyword: 'sénégal sûr', cta: 'Guide gratuit' },
  { date: '2027-04-30', slug: 'voyage-senegal-vs-maroc-cap-vert', title: "Sénégal, Maroc ou Cap-Vert : quelle destination pour la première fois", cluster: 'A+comparatif', keyword: 'sénégal ou maroc', cta: 'Guide gratuit' },
]

const CLUSTER_TAG = {
  A: 'pilier-voyage-senegal',
  B: 'diaspora',
  C: 'destinations',
  D: 'pratique-voyage',
  E: 'consulting-b2b',
}

function clusterTags(cluster) {
  // "A+D" → ['pilier-voyage-senegal', 'pratique-voyage']
  return cluster
    .split('+')
    .map(c => CLUSTER_TAG[c.trim()] || c.trim())
}

const PLACEHOLDER_CONTENT = `<!-- ARTICLE À RÉDIGER -->

> Ce brouillon a été pré-créé par le planning éditorial.
> Remplace ce contenu par l'article complet avant de basculer en « Programmer ».

**Mot-clé principal** : TO_FILL
**CTA** : TO_FILL
**Angle éditorial** : TO_FILL

## 1. Titre H2 à définir

Contenu à rédiger.

## FAQ

**1. Question ?**

Réponse.
`

async function run() {
  let inserted = 0
  let updated = 0
  let skipped = 0

  for (const art of ARTICLES) {
    const record = {
      title: art.title,
      slug: art.slug,
      excerpt: `${art.title} — article du planning éditorial (mot-clé : ${art.keyword}, cluster ${art.cluster}).`,
      content: PLACEHOLDER_CONTENT
        .replace('TO_FILL', art.keyword)
        .replace('TO_FILL', art.cta)
        .replace('TO_FILL', `Cluster ${art.cluster}`),
      cover_image: null,
      tags: ['planning-editorial', ...clusterTags(art.cluster)],
      status: 'draft',
      published_at: scheduledAt(art.date),
    }

    // Check si existe déjà (par slug)
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id, status')
      .eq('slug', art.slug)
      .maybeSingle()

    if (existing) {
      if (existing.status === 'published') {
        console.log(`⤷ ${art.slug} : déjà publié, skip.`)
        skipped++
        continue
      }
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: record.title,
          excerpt: record.excerpt,
          tags: record.tags,
          published_at: record.published_at,
          // on NE touche PAS au content s'il existe déjà (pour ne pas écraser du vrai travail)
        })
        .eq('id', existing.id)
      if (error) {
        console.error(`✗ update ${art.slug} :`, error.message)
      } else {
        console.log(`↻ ${art.slug} : mis à jour (date ${art.date})`)
        updated++
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert(record)
      if (error) {
        console.error(`✗ insert ${art.slug} :`, error.message)
      } else {
        console.log(`+ ${art.slug} : créé (${art.date})`)
        inserted++
      }
    }
  }

  console.log(`\n${inserted} créés, ${updated} mis à jour, ${skipped} ignorés.`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
