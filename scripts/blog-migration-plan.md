# C-bis Phase 4 — Migration des articles blog vers tripafro.com

## Statut : préparé, à exécuter manuellement (DNS Supabase bloqué en local)

## Vue d'ensemble

| Total articles planning | Destination | Pourquoi |
|---|---|---|
| 27 | tripafro.com | Voyage, diaspora, lieux Sénégal, conseils pratiques |
| 3 | roselinengom.com | IA hôtel, audit digital, automatisation agence voyage |

Les 3 articles `roseline-perso` restent sur le `/journal` de roselinengom.com (refonte V3). Les 27 articles `tripafro` partent vers une nouvelle infra `/fr/articles/[slug]` sur tripafro.com.

## Workflow d'exécution

### Étape A — Tagging dans Supabase roselinengom (5 min, manuel)

1. Ouvrir Supabase Dashboard → projet roselinengom → SQL Editor
2. Coller le contenu de `scripts/blog-migration.sql`
3. Exécuter les sections 1, 2, 3, 4 dans l'ordre
4. Vérifier : devrait afficher `tripafro: 27, roseline-perso: 3` (au moins parmi les articles déjà créés)

### Étape B — Export du contenu (5 min, manuel)

1. Exécuter la section 5 du SQL (SELECT export)
2. Cliquer **Download CSV** dans Supabase Dashboard
3. Sauvegarder le fichier sous `scripts/exports/blog_posts_tripafro.csv`

### Étape C — Création table côté tripafro Supabase (10 min)

1. Ouvrir Supabase Dashboard → projet tripafro → SQL Editor
2. Exécuter la migration `tripafro-app/supabase/migrations/20260629170000_blog_articles.sql` (à créer, voir ci-dessous)
3. Vérifier que la table `blog_articles` existe avec les bons champs

### Étape D — Import des articles dans tripafro Supabase (10 min)

1. Supabase Dashboard → tripafro → Table Editor → `blog_articles`
2. Cliquer **Insert** → **Import data from CSV**
3. Uploader `blog_posts_tripafro.csv`
4. Mapper les colonnes (slug, title, excerpt, content, cover_image, tags, status, published_at, created_at, updated_at)

### Étape E — Création route `/fr/articles/[slug]` côté tripafro (1-2h, code)

Code à écrire (sera fait dans une session suivante) :
- `tripafro-app/src/lib/data/blog-articles.ts` : helpers `getBlogArticles()`, `getBlogArticle(slug)`
- `tripafro-app/src/app/[locale]/(site)/articles/page.tsx` : hub liste
- `tripafro-app/src/app/[locale]/(site)/articles/[slug]/page.tsx` : page article (réutilise composants Markdown existants)
- Sitemap : ajouter routes `articles/[slug]` dynamiques

### Étape F — Activer 301 côté roselinengom (5 min)

Ajouter dans `next.config.ts` :

```ts
{
  source: '/blog/:slug',
  has: [
    // Idéal : condition sur target_domain via une edge fonction.
    // Solution simple : liste explicite des 27 slugs à rediriger,
    // les 3 autres slugs restent servis par /blog/[slug] (puis renommés /journal/[slug])
  ],
  destination: 'https://tripafro.com/fr/articles/:slug',
  permanent: true,
},
```

Vu la complexité d'une condition sur target_domain en config statique, la solution pragmatique est :
- Lister les 27 slugs dans un tableau
- Générer 27 redirects via `.map()` dans `redirects()`

## Migration SQL à appliquer (tripafro)

À créer : `tripafro-app/supabase/migrations/20260629170000_blog_articles.sql`

```sql
-- Articles éditoriaux importés depuis roselinengom.com (C-bis Phase 4)
create table if not exists public.blog_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text, -- markdown
  cover_image text,
  tags jsonb default '[]'::jsonb,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_blog_articles_status on public.blog_articles (status);
create index if not exists idx_blog_articles_published on public.blog_articles (published_at desc nulls last);

alter table public.blog_articles enable row level security;

drop policy if exists "blog_articles_public_read" on public.blog_articles;
create policy "blog_articles_public_read" on public.blog_articles
  for select to anon, authenticated
  using (status = 'published' and (published_at is null or published_at <= now()));

drop policy if exists "blog_articles_service_full" on public.blog_articles;
create policy "blog_articles_service_full" on public.blog_articles
  for all to service_role using (true) with check (true);
```

## Statut C-bis global après cette phase

| Phase | Statut |
|---|---|
| Phase 1 (voyages) | ✅ Livrée (commit `620e4c8`) |
| Phase 2 (guides Stripe) | ✅ Livrée (commits `9401c72` + `ddd95b3`) |
| Phase 3 (lead magnets) | ✅ Livrée (commits `985699f` + `8d675fb`) |
| Phase 4 (articles) | ⏳ Préparée — exécution manuelle requise (DNS Supabase bloqué en local) |

## Prochaine session

Une fois les étapes A à D faites manuellement par Roseline (compter ~30 min), on enchaîne :
- Création des routes `/fr/articles/*` sur tripafro (1-2h)
- Activation des 27 redirects 301 côté roselinengom
- Verification SEO (sitemaps des 2 domaines, GSC)
