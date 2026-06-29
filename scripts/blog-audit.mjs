#!/usr/bin/env node
/**
 * Audit du contenu blog_posts pour la migration C-bis vers tripafro.com.
 * Liste tous les articles publiés avec leur titre, slug, tags, et propose
 * un target_domain ('tripafro' = voyage/diaspora, 'roseline-perso' = stratégie/IA).
 *
 * Usage : node scripts/blog-audit.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { readFileSync } from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Mini-parser .env.local (sans dépendance externe)
try {
  const envText = readFileSync(resolve(__dirname, "..", ".env.local"), "utf8")
  for (const line of envText.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "")
  }
} catch {}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error("Manque NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const sb = createClient(url, key)

// Heuristique : un slug ou titre qui parle de voyage/Sénégal touristique
// est candidat tripafro. Les sujets stratégie/IA/attractivité restent perso.
const TRIPAFRO_KEYWORDS = [
  "voyage", "casamance", "lac-rose", "lac rose", "dakar", "saint-louis",
  "sine-saloum", "saloum", "lompoul", "joal", "fadiouth", "saly", "petite-cote",
  "djoudj", "bandia", "fathala", "kedougou", "bassari", "guide-",
  "valise", "preparer", "premier voyage", "que faire", "ou aller",
  "retour-aux-sources", "diaspora", "famille", "enfants",
  "hebergement", "hotel", "campement", "ecotourisme",
  "experience", "itineraire", "circuit",
]

const PERSO_KEYWORDS = [
  "rwanda", "maroc", "benin", "attractivite", "ia ", "intelligence-artificielle",
  "transformation", "strategie", "marketing-territorial", "soft-power",
  "consulting", "advisory", "observatoire", "benchmark", "investir",
  "chantier", "politique-publique", "destination-marketing", "ministere",
  "office-tourisme", "marque-pays", "branding", "geo ", "llm",
]

function classify(title, slug) {
  const text = `${title} ${slug}`.toLowerCase()
  let triScore = 0
  let persoScore = 0
  for (const k of TRIPAFRO_KEYWORDS) if (text.includes(k)) triScore++
  for (const k of PERSO_KEYWORDS) if (text.includes(k)) persoScore++
  if (persoScore > triScore) return "roseline-perso"
  if (triScore > 0) return "tripafro"
  return "roseline-perso" // par défaut, prudent
}

async function main() {
  const { data, error } = await sb
    .from("blog_posts")
    .select("id, title, slug, status, tags, published_at")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Erreur Supabase :", error)
    process.exit(1)
  }

  const total = data.length
  const published = data.filter((p) => p.status === "published")
  console.log(`\n=== Audit blog_posts ===`)
  console.log(`Total : ${total} articles`)
  console.log(`Publiés : ${published.length}`)
  console.log(`Drafts : ${total - published.length}\n`)

  const tagged = data.map((p) => ({
    ...p,
    proposed_target: classify(p.title || "", p.slug || ""),
  }))

  const triByTarget = {
    tripafro: tagged.filter((p) => p.proposed_target === "tripafro"),
    "roseline-perso": tagged.filter((p) => p.proposed_target === "roseline-perso"),
  }

  console.log(`Proposé tripafro : ${triByTarget.tripafro.length}`)
  console.log(`Proposé roseline-perso : ${triByTarget["roseline-perso"].length}\n`)

  console.log(`\n--- TRIPAFRO ---`)
  for (const p of triByTarget.tripafro) {
    console.log(`  [${p.status}] ${p.slug}  →  ${p.title}`)
  }

  console.log(`\n--- ROSELINE PERSO ---`)
  for (const p of triByTarget["roseline-perso"]) {
    console.log(`  [${p.status}] ${p.slug}  →  ${p.title}`)
  }

  console.log(`\n\nLignes SQL pour confirmer le target côté roselinengom blog_posts :\n`)
  console.log(`-- Ajouter colonne si pas déjà fait`)
  console.log(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS target_domain text DEFAULT 'roseline-perso';\n`)
  for (const p of triByTarget.tripafro) {
    console.log(`UPDATE blog_posts SET target_domain = 'tripafro' WHERE slug = '${p.slug}';`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
