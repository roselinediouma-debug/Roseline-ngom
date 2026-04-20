-- Ajoute le tracking de la séquence de bienvenue sur la table `leads`.
-- À exécuter une fois dans le SQL Editor de Supabase.

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS welcome_step smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS welcome_last_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS unsubscribed boolean NOT NULL DEFAULT false;

-- Index pour accélérer la requête du cron (filtre sur source + welcome_step + created_at)
CREATE INDEX IF NOT EXISTS idx_leads_welcome_sequence
  ON public.leads (source, welcome_step, created_at)
  WHERE unsubscribed = false;
