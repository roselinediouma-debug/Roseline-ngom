-- Migration 004b : réconciliation schema prospects_digital existant + WF5 Prospecteur Digital
-- La table existe déjà avec : nom_etablissement, email_contact, score_digital, audit_envoye, etc.
-- On AJOUTE les colonnes analytiques nécessaires au Deep researcher + outreach sans casser l'existant.

alter table public.prospects_digital
  add column if not exists score_ia              int check (score_ia between 0 and 100),
  add column if not exists faiblesses_digitales  jsonb default '[]'::jsonb,
  add column if not exists opportunite           text,
  add column if not exists resume_ia             text,
  add column if not exists instagram_url         text,
  add column if not exists instagram_followers   int,
  add column if not exists etoiles               int,
  add column if not exists last_contact_at       timestamptz,
  add column if not exists nb_relances           int default 0,
  add column if not exists thread_gmail_id       text,
  add column if not exists source                text default 'deep_researcher',
  add column if not exists raw_agent_output      jsonb,
  add column if not exists agent_session_id      text;

-- Unicité sur email_contact (colonne existante) pour l'upsert n8n
create unique index if not exists uniq_prospects_digital_email_contact
  on public.prospects_digital(lower(email_contact))
  where email_contact is not null;

create unique index if not exists uniq_prospects_digital_site_web
  on public.prospects_digital(lower(site_web))
  where site_web is not null;

create index if not exists idx_prospects_digital_statut_v2
  on public.prospects_digital(statut);
create index if not exists idx_prospects_digital_last_contact
  on public.prospects_digital(last_contact_at);

-- RLS service_role (idempotent)
alter table public.prospects_digital enable row level security;
drop policy if exists "service_role_full_access_prospects_digital" on public.prospects_digital;
create policy "service_role_full_access_prospects_digital"
  on public.prospects_digital
  for all
  to service_role
  using (true)
  with check (true);

-- Trigger updated_at (idempotent)
create or replace function public.tg_prospects_digital_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_prospects_digital_updated_at on public.prospects_digital;
create trigger trg_prospects_digital_updated_at
  before update on public.prospects_digital
  for each row execute function public.tg_prospects_digital_updated_at();
