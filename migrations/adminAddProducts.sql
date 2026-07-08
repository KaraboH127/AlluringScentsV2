-- Collections table
create table collections (
  id text primary key,
  name text not null,
  label text not null,
  tagline text not null,
  description text not null,
  prices jsonb not null default '{"10ml": 0, "50ml": 0, "100ml": 0}',
  active boolean default true,
  created_at timestamptz default now()
);

alter table collections enable row level security;

create policy "Public can read collections"
on collections for select
to anon
using (active = true);

create policy "Service role can manage collections"
on collections for all
to service_role
using (true)
with check (true);

-- Fragrances table
create table fragrances (
  id text primary key,
  slug text not null unique,
  name text not null,
  collection_id text not null references collections(id),
  description text not null,
  extrait text not null default 'Extrait de Parfum',
  notes jsonb not null default '{"top": "", "middle": "", "base": ""}',
  best_for text not null,
  occasions jsonb not null default '[]',
  personality text not null,
  image_url text not null,
  active boolean default true,
  created_at timestamptz default now()
);

alter table fragrances enable row level security;

create policy "Public can read fragrances"
on fragrances for select
to anon
using (active = true);

create policy "Service role can manage fragrances"
on fragrances for all
to service_role
using (true)
with check (true);