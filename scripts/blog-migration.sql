-- =====================================================================
-- C-bis Phase 4 — Migration des articles blog vers tripafro.com
-- À exécuter dans Supabase Dashboard → SQL Editor (projet roselinengom)
-- =====================================================================

-- 1. Ajouter colonne target_domain si pas déjà présente
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS target_domain text DEFAULT 'roseline-perso'
    CHECK (target_domain IN ('roseline-perso', 'tripafro'));

CREATE INDEX IF NOT EXISTS idx_blog_posts_target_domain
  ON public.blog_posts (target_domain);

-- 2. Tagger les 27 articles voyage/diaspora comme cible tripafro
UPDATE public.blog_posts SET target_domain = 'tripafro' WHERE slug IN (
  'voyage-senegal-guide-complet-2026',
  'lac-rose-senegal',
  'voyage-casamance-senegal',
  'rentrer-au-senegal-diaspora',
  'quand-partir-au-senegal',
  'visite-ile-goree-senegal',
  'visa-senegal-francais',
  'budget-voyage-senegal-2026',
  'sine-saloum-que-faire',
  'voyage-senegal-famille-enfants',
  'saint-louis-senegal-que-voir',
  'itineraire-senegal-7-jours',
  'transmettre-origines-enfants-diaspora',
  'desert-lompoul-senegal',
  'vaccins-sante-senegal',
  'cap-skirring-vacances',
  'dakar-que-faire-3-jours',
  'noel-reveillon-senegal',
  'voyage-senegal-couple-mixte',
  'premiere-fois-senegal-diaspora',
  'itineraire-senegal-14-jours',
  'djoudj-parc-oiseaux-senegal',
  'mosquee-touba-senegal',
  'cuisine-senegalaise-decouvrir',
  'pilgrimage-goree-africain-americain',
  'securite-senegal-2027',
  'voyage-senegal-vs-maroc-cap-vert'
);

-- 3. Vérification : compte par target_domain
SELECT target_domain, COUNT(*) AS nombre
FROM public.blog_posts
GROUP BY target_domain
ORDER BY target_domain;

-- 4. Liste les articles à migrer (target tripafro + publiés ou drafts)
SELECT id, slug, title, status, published_at
FROM public.blog_posts
WHERE target_domain = 'tripafro'
ORDER BY published_at DESC NULLS LAST;

-- =====================================================================
-- 5. Export pour import côté tripafro Supabase
-- =====================================================================
-- Exporter le résultat de cette requête en CSV depuis Supabase Dashboard.
-- Le CSV sera ensuite importé dans tripafro.blog_articles (table à créer
-- sur le projet Supabase tripafro). Voir scripts/blog-migration-plan.md.
SELECT
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image,
  tags,
  status,
  published_at,
  created_at,
  updated_at
FROM public.blog_posts
WHERE target_domain = 'tripafro'
ORDER BY published_at DESC NULLS LAST;

-- =====================================================================
-- APRÈS la migration tripafro confirmée (articles présents sur tripafro
-- ET 301 actifs côté roselinengom), exécuter ce cleanup :
-- =====================================================================
-- DELETE FROM public.blog_posts WHERE target_domain = 'tripafro';
-- (à exécuter UNIQUEMENT après validation que les articles sont bien
--  servis depuis tripafro.com/fr/articles/[slug] et que les 301 marchent)
