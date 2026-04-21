-- Table des commentaires blog, modérés en back-office.
-- À exécuter une fois dans Supabase > SQL Editor.

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author_name text not null,
  author_email text not null,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  approved_by text,
  parent_id uuid references public.blog_comments(id) on delete cascade,
  user_ip text,
  user_agent text
);

create index if not exists blog_comments_post_slug_idx on public.blog_comments (post_slug);
create index if not exists blog_comments_status_idx on public.blog_comments (status);
create index if not exists blog_comments_created_at_idx on public.blog_comments (created_at desc);

-- RLS : aucune lecture publique directe (tout passe par l'API server-side
-- qui utilise SUPABASE_SERVICE_ROLE_KEY).
alter table public.blog_comments enable row level security;
