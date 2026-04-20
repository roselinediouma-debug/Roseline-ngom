-- Migration 003 : alignement du schéma avec le plan workflows (leads/réservations/candidatures/digital).
-- À exécuter dans le SQL Editor de Supabase.

-- ──────────────────────────────────────────────────────────────────────────
-- 1. EXTENSION DE LA TABLE leads (ajout des champs manquants du doc)
-- ──────────────────────────────────────────────────────────────────────────
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS nom TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp TEXT,
  ADD COLUMN IF NOT EXISTS ville TEXT,
  ADD COLUMN IF NOT EXISTS offre_interet TEXT,
  ADD COLUMN IF NOT EXISTS statut TEXT DEFAULT 'nouveau',
  ADD COLUMN IF NOT EXISTS score INTEGER,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS brevo_synced BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_statut ON public.leads(statut);

-- ──────────────────────────────────────────────────────────────────────────
-- 2. TABLE reservations (formulaires voyages RAS + Signature)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_id UUID REFERENCES public.leads(id),
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  type_voyage TEXT NOT NULL, -- retour_aux_sources | voyage_signature
  depart_souhaite TEXT,
  nb_adultes INTEGER DEFAULT 1,
  nb_enfants INTEGER DEFAULT 0,
  nb_bebes INTEGER DEFAULT 0,
  ville_residence TEXT,
  budget TEXT,
  confort TEXT,
  message TEXT,
  statut TEXT DEFAULT 'nouveau', -- nouveau|contacte|appel_fait|devis_envoye|confirme|paye|annule
  resume_ia TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 3. TABLE candidatures_bts (Back to Senegal — remplace si la table existe déjà)
--    Note : on ne touche pas à la table `candidatures` existante,
--    on crée une nouvelle `candidatures_bts` conforme au doc.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.candidatures_bts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_id UUID REFERENCES public.leads(id),
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  ville TEXT,
  cohorte TEXT NOT NULL,
  type_projet TEXT NOT NULL,
  maturite TEXT NOT NULL,
  budget_projet TEXT,
  description TEXT NOT NULL,
  score_ia INTEGER,
  resume_ia TEXT,
  statut TEXT DEFAULT 'nouvelle', -- nouvelle|preselectionnee|entretien_planifie|acceptee|refusee|payee
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.candidatures_bts ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 4. TABLE content_ideas (générateur IA hebdo)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.content_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  semaine TEXT,
  plateforme TEXT NOT NULL, -- instagram|tiktok|linkedin|youtube
  pilier TEXT NOT NULL,
  format TEXT,
  hook TEXT,
  description TEXT,
  cta TEXT,
  offre_associee TEXT,
  statut TEXT DEFAULT 'idee', -- idee|validee|en_production|publiee
  notes TEXT
);

ALTER TABLE public.content_ideas ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 5. TABLE prospects_digital (audit Digital & IA)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.prospects_digital (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_id UUID REFERENCES public.leads(id),
  nom_etablissement TEXT NOT NULL,
  type_etablissement TEXT, -- hotel|agence|restaurant|culture|autre
  ville TEXT,
  pays TEXT DEFAULT 'Senegal',
  site_web TEXT,
  google_business BOOLEAN,
  email_contact TEXT,
  telephone TEXT,
  audit_envoye BOOLEAN DEFAULT false,
  audit_ouvert BOOLEAN DEFAULT false,
  date_audit_envoye TIMESTAMPTZ,
  statut TEXT DEFAULT 'identifie',
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.prospects_digital ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 6. TABLE lead_magnet_downloads (tracking multi-magnet)
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lead_magnet_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  lead_id UUID REFERENCES public.leads(id),
  email TEXT NOT NULL,
  lead_magnet TEXT NOT NULL, -- guide_15_experiences|rapport_benchmark|guide_7_erreurs
  source_page TEXT,
  ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_lm_email ON public.lead_magnet_downloads(email);
CREATE INDEX IF NOT EXISTS idx_lm_type ON public.lead_magnet_downloads(lead_magnet);

ALTER TABLE public.lead_magnet_downloads ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────────
-- 7. VUE dashboard_stats
-- ──────────────────────────────────────────────────────────────────────────
DROP VIEW IF EXISTS public.dashboard_stats;
CREATE VIEW public.dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM public.leads) as total_leads,
  (SELECT COUNT(*) FROM public.leads WHERE source = 'guide_gratuit' OR source = 'guide-pdf') as leads_guide_voyage,
  (SELECT COUNT(*) FROM public.leads WHERE source = 'rapport_consulting') as leads_rapport,
  (SELECT COUNT(*) FROM public.leads WHERE source = 'audit_digital') as leads_audit,
  (SELECT COUNT(*) FROM public.leads WHERE source = 'guide_bts') as leads_guide_bts,
  (SELECT COUNT(*) FROM public.leads WHERE statut = 'signe') as leads_signes,
  (SELECT COUNT(*) FROM public.reservations WHERE statut = 'nouveau') as resa_nouvelles,
  (SELECT COUNT(*) FROM public.reservations WHERE statut = 'confirme') as resa_confirmees,
  (SELECT COUNT(*) FROM public.candidatures_bts WHERE statut = 'nouvelle') as bts_nouvelles,
  (SELECT COUNT(*) FROM public.candidatures_bts WHERE statut = 'acceptee') as bts_acceptees,
  (SELECT COUNT(*) FROM public.prospects_digital WHERE statut = 'signe') as digital_signes,
  (SELECT COUNT(*) FROM public.prospects_digital WHERE audit_ouvert = true) as digital_leads_chauds;
