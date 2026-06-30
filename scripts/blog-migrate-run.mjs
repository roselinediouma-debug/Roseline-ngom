#!/usr/bin/env node
/**
 * Exécution complète de la migration C-bis Phase 4 (côté roselinengom).
 * Lance :
 *   1. ALTER TABLE blog_posts ADD COLUMN target_domain
 *   2. UPDATE 27 articles voyage avec target_domain='tripafro'
 *   3. SELECT comptage par target_domain
 *   4. SELECT exports des articles tripafro pour reprise tripafro-app
 *
 * Pré-requis : NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY dans .env.local
 * Usage : node scripts/blog-migrate-run.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { readFileSync, writeFileSync } from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Mini-parser .env.local
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

const sb = createClient(url, key, { auth: { persistSession: false } })

// 27 articles à tagger 'tripafro'
const TRIPAFRO_SLUGS = [
  "voyage-senegal-guide-complet-2026",
  "lac-rose-senegal",
  "voyage-casamance-senegal",
  "rentrer-au-senegal-diaspora",
  "quand-partir-au-senegal",
  "visite-ile-goree-senegal",
  "visa-senegal-francais",
  "budget-voyage-senegal-2026",
  "sine-saloum-que-faire",
  "voyage-senegal-famille-enfants",
  "saint-louis-senegal-que-voir",
  "itineraire-senegal-7-jours",
  "transmettre-origines-enfants-diaspora",
  "desert-lompoul-senegal",
  "vaccins-sante-senegal",
  "cap-skirring-vacances",
  "dakar-que-faire-3-jours",
  "noel-reveillon-senegal",
  "voyage-senegal-couple-mixte",
  "premiere-fois-senegal-diaspora",
  "itineraire-senegal-14-jours",
  "djoudj-parc-oiseaux-senegal",
  "mosquee-touba-senegal",
  "cuisine-senegalaise-decouvrir",
  "pilgrimage-goree-africain-americain",
  "securite-senegal-2027",
  "voyage-senegal-vs-maroc-cap-vert",
]

async function execSql(sql, description) {
  console.log(`\n→ ${description}`)
  // Utilise l'API REST PostgREST de Supabase via une RPC. Comme on n'a pas de RPC custom,
  // on passe par le pg-meta endpoint qui exécute du SQL brut (réservé service_role).
  const res = await fetch(`${url}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ sql }),
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`SQL exec failed (${res.status}): ${t.slice(0, 200)}`)
  }
  return await res.json()
}

async function main() {
  // 1. ALTER TABLE — on utilise le client Supabase pour les opérations RPC.
  //    Si exec_sql n'existe pas, on tombe sur du select/update via le client.
  console.log("=== 1. Vérification connectivité Supabase ===")
  const ping = await sb.from("blog_posts").select("id").limit(1)
  if (ping.error) {
    console.error("Connexion KO :", ping.error)
    process.exit(1)
  }
  console.log("✓ Supabase OK")

  // 2. Ajout colonne target_domain (idempotent grâce à IF NOT EXISTS).
  //    Comme on ne peut pas faire de DDL via le client supabase-js, on tente via une RPC.
  //    Si la RPC n'existe pas, on demande de le faire via SQL Editor.
  console.log("\n=== 2. Ajout colonne target_domain ===")
  try {
    await execSql(
      `ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS target_domain text DEFAULT 'roseline-perso' CHECK (target_domain IN ('roseline-perso','tripafro'));`,
      "ALTER TABLE blog_posts ADD COLUMN target_domain",
    )
    console.log("✓ Colonne ajoutée (ou déjà présente)")
  } catch (e) {
    console.warn(`⚠ RPC exec_sql non disponible. À faire manuellement dans SQL Editor :`)
    console.warn(`  ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS target_domain text DEFAULT 'roseline-perso';`)
    console.warn(`  Raison : ${e.message}`)
    // On continue malgré tout — le UPDATE marchera si la colonne existe déjà.
  }

  // 3. UPDATE des 27 slugs
  console.log(`\n=== 3. Tagging des ${TRIPAFRO_SLUGS.length} articles voyage ===`)
  const { data: updated, error: upErr } = await sb
    .from("blog_posts")
    .update({ target_domain: "tripafro" })
    .in("slug", TRIPAFRO_SLUGS)
    .select("slug, title, status, target_domain")
  if (upErr) {
    console.error("Erreur UPDATE :", upErr)
    process.exit(1)
  }
  console.log(`✓ ${updated?.length || 0} articles taggés target_domain='tripafro'`)
  for (const a of updated || []) console.log(`   [${a.status}] ${a.slug}`)

  // 4. Comptage final
  console.log("\n=== 4. Comptage par target_domain ===")
  const { data: all, error: countErr } = await sb
    .from("blog_posts")
    .select("target_domain, status")
  if (countErr) {
    console.error("Erreur comptage :", countErr)
  } else {
    const groups = {}
    for (const row of all) {
      const k = `${row.target_domain || "null"} / ${row.status || "null"}`
      groups[k] = (groups[k] || 0) + 1
    }
    for (const [k, v] of Object.entries(groups)) console.log(`  ${k} : ${v}`)
  }

  // 5. Export des articles tripafro pour reprise sur tripafro-app
  console.log("\n=== 5. Export des articles tripafro ===")
  const { data: tripa, error: expErr } = await sb
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, cover_image, tags, status, published_at, created_at, updated_at")
    .eq("target_domain", "tripafro")
    .order("published_at", { ascending: false, nullsLast: true })
  if (expErr) {
    console.error("Erreur export :", expErr)
    process.exit(1)
  }
  const outputPath = resolve(__dirname, "exports", "blog_posts_tripafro.json")
  try {
    writeFileSync(outputPath, JSON.stringify(tripa, null, 2), "utf8")
    console.log(`✓ ${tripa.length} articles exportés vers ${outputPath}`)
  } catch (e) {
    const fallback = resolve(__dirname, "blog_posts_tripafro.json")
    writeFileSync(fallback, JSON.stringify(tripa, null, 2), "utf8")
    console.log(`✓ ${tripa.length} articles exportés vers ${fallback}`)
  }

  console.log("\n✓ Migration Phase 4 (BDD côté roselinengom) terminée.")
  console.log("  Prochain : créer table blog_articles côté tripafro Supabase + importer le JSON.")
}

main().catch((err) => {
  console.error("Erreur globale :", err)
  process.exit(1)
})
