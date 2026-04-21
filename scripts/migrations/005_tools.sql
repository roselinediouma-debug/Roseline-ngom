-- Migration 005 : infrastructure pour les outils IA du site
-- Tables: tool_usage (tracking), tool_rate_limit (anti-abus), tool_monthly_cost (budget guard)
-- Vue: tool_conversion_stats (KPIs business par outil)
-- À exécuter dans le SQL Editor de Supabase.

-- ──────────────────────────────────────────────────────────────────────────
-- 1. TABLE tool_usage : 1 ligne par utilisation d'un outil IA
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tool_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  -- Identifiant court de l'outil: 'calculator_ota' | 'chatbot' | ...
  tool_name TEXT NOT NULL,
  -- Segment détecté automatiquement: 'hotelier' | 'voyageur' | 'diaspora' | 'entrepreneur' | 'consulting' | NULL
  segment TEXT,
  -- Catégorie d'intention détectée (chatbot): 'DEMANDE_DEVIS' | 'INFO_VOYAGE' | 'CONSULTING' | ...
  category TEXT,
  user_ip TEXT,
  user_email TEXT,
  -- Données d'entrée (purgées après 30 jours par cron)
  input_data JSONB,
  -- Résumé du résultat (purgé après 30 jours par cron)
  result_summary TEXT,
  -- Un lead Supabase a-t-il été créé suite à cette utilisation ?
  lead_created BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  -- Tokens consommés (chatbot uniquement, 0 pour le calculateur)
  tokens_input INTEGER DEFAULT 0,
  tokens_output INTEGER DEFAULT 0,
  -- Session chatbot (regroupe plusieurs messages)
  session_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON public.tool_usage(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON public.tool_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_usage_session ON public.tool_usage(session_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_segment ON public.tool_usage(segment);

ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;
-- Pas de policy publique : accès uniquement via service role (les API routes)

-- ──────────────────────────────────────────────────────────────────────────
-- 2. TABLE tool_rate_limit : log d'appels API pour rate limiting
-- (purgé automatiquement par la fonction purge_tool_rate_limit_old)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tool_rate_limit (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  tool_name TEXT NOT NULL,
  user_ip TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tool_rate_limit_ip_created
  ON public.tool_rate_limit(tool_name, user_ip, created_at DESC);

ALTER TABLE public.tool_rate_limit ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 3. TABLE tool_monthly_cost : cumul des coûts API par mois (budget guard)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tool_monthly_cost (
  -- Mois au format 'YYYY-MM'
  month TEXT PRIMARY KEY,
  tokens_input BIGINT DEFAULT 0,
  tokens_output BIGINT DEFAULT 0,
  -- Coût estimé en euros (calculé côté app, recalculable)
  estimated_cost_eur NUMERIC(10,4) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tool_monthly_cost ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 4. VUE tool_conversion_stats : KPIs business par outil
-- ──────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.tool_conversion_stats AS
SELECT
  tool_name,
  COUNT(*)::int AS total_utilisations,
  COUNT(DISTINCT user_ip)::int AS utilisateurs_uniques,
  COUNT(*) FILTER (WHERE lead_created = true)::int AS leads_generes,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days')::int AS cette_semaine,
  COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '30 days')::int AS ce_mois,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE lead_created = true) / NULLIF(COUNT(*), 0),
    1
  ) AS taux_conversion_pct,
  SUM(tokens_input + tokens_output)::bigint AS tokens_totaux
FROM public.tool_usage
GROUP BY tool_name
ORDER BY total_utilisations DESC;

-- ──────────────────────────────────────────────────────────────────────────
-- 5. FONCTIONS de purge (appelées par cron pg_cron ou depuis un script)
-- ──────────────────────────────────────────────────────────────────────────

-- Purge les input_data + result_summary des tool_usage de plus de 30 jours
-- (on garde les meta: tool_name, segment, lead_created, tokens pour les stats)
CREATE OR REPLACE FUNCTION public.purge_tool_usage_data_30d()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  UPDATE public.tool_usage
  SET input_data = NULL,
      result_summary = NULL
  WHERE created_at < now() - INTERVAL '30 days'
    AND (input_data IS NOT NULL OR result_summary IS NOT NULL);
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected;
END;
$$;

-- Purge les logs de rate limit de plus de 48h (on n'en a plus besoin)
CREATE OR REPLACE FUNCTION public.purge_tool_rate_limit_old()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  DELETE FROM public.tool_rate_limit
  WHERE created_at < now() - INTERVAL '48 hours';
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected;
END;
$$;

-- ──────────────────────────────────────────────────────────────────────────
-- 6. (optionnel) pg_cron : schedule les purges
-- Décommenter si l'extension pg_cron est activée dans Supabase
-- ──────────────────────────────────────────────────────────────────────────
-- SELECT cron.schedule('purge_tool_usage_data_30d', '0 3 * * *', $$SELECT public.purge_tool_usage_data_30d();$$);
-- SELECT cron.schedule('purge_tool_rate_limit_old', '15 * * * *', $$SELECT public.purge_tool_rate_limit_old();$$);
