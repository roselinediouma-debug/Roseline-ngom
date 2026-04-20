-- Active Row Level Security sur toutes les tables publiques.
-- À exécuter dans le SQL Editor de Supabase.
--
-- POURQUOI : sans RLS, n'importe qui avec la clé anon (exposée dans le navigateur)
-- peut lire/écrire les tables. Les Supabase Advisor warnings "RLS Disabled in Public"
-- critiques viennent de là.
--
-- AUCUNE POLICY n'est créée → accès anon = bloqué.
-- Les routes /api/* du site utilisent createServiceClient() (service role key)
-- qui BYPASSE RLS, donc l'app continue de fonctionner normalement.
--
-- Si un jour on a besoin d'exposer une table en lecture publique
-- (ex : blog_posts côté front sans passer par /api), on ajoutera une policy
-- `CREATE POLICY "Public read" ON blog_posts FOR SELECT USING (published = true);`

ALTER TABLE public.leads                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commandes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidatures           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts             ENABLE ROW LEVEL SECURITY;

-- Vérification : toutes les tables doivent retourner rowsecurity = true
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('leads','contacts','commandes','newsletter_subscribers','candidatures','blog_posts');
