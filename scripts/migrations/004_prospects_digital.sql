-- Migration 004 : table prospects_digital (WF5 Prospecteur Digital via Claude Managed Agent Deep researcher)
-- Alimentée hebdomadairement par n8n + agent Deep researcher (Claude Sonnet 4.6)
-- Cold outreach via Gmail OAuth ensuite.

create table if not exists public.prospects_digital (
  id              uuid primary key default gen_random_uuid(),
  -- identité
  nom             text not null,
  ville           text,
  type_etablissement text default 'hotel',  -- hotel / restaurant / agence / office_tourisme
  etoiles         int,
  -- contact
  telephone       text,
  site_web        text,
  email_decideur  text,
  instagram_url   text,
  instagram_followers int,
  -- diagnostic IA
  faiblesses_digitales jsonb default '[]'::jsonb,
  opportunite     text,
  score_ia        int check (score_ia between 0 and 100),
  resume_ia       text,
  -- outreach
  statut          text default 'nouveau' check (statut in (
    'nouveau', 'contacte', 'relance_1', 'relance_2', 'reponse_positive',
    'reponse_negative', 'converti', 'abandonne'
  )),
  last_contact_at timestamptz,
  nb_relances     int default 0,
  thread_gmail_id text,
  -- méta
  source          text default 'deep_researcher',
  raw_agent_output jsonb,
  agent_session_id text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists idx_prospects_digital_statut on public.prospects_digital(statut);
create index if not exists idx_prospects_digital_last_contact on public.prospects_digital(last_contact_at);
create unique index if not exists uniq_prospects_digital_email on public.prospects_digital(lower(email_decideur)) where email_decideur is not null;
create unique index if not exists uniq_prospects_digital_site on public.prospects_digital(lower(site_web)) where site_web is not null;

alter table public.prospects_digital enable row level security;

-- Service role uniquement (n8n backend)
drop policy if exists "service_role_full_access_prospects_digital" on public.prospects_digital;
create policy "service_role_full_access_prospects_digital"
  on public.prospects_digital
  for all
  to service_role
  using (true)
  with check (true);

-- Trigger updated_at
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
