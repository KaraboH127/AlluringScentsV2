-- 1. Extensions
create extension if not exists pgcrypto;

-- 2. Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  order_id text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  province text not null,
  postal_code text not null,
  amount_in_cents integer not null,
  currency text default 'ZAR',
  status text default 'succeeded',
  checkout_id text,
  items jsonb default '[]',
  created_at timestamptz default now()
);

-- 3. Inventory table
create table inventory (
  id uuid default gen_random_uuid() primary key,
  fragrance_id text not null,
  fragrance_name text not null,
  collection text not null,
  size text not null,
  stock integer not null default 0,
  updated_at timestamptz default now(),
  unique(fragrance_id, size)
);

-- 4. Collections table
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

-- 5. Fragrances table
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

-- 6. Admin config table
create table admin_config (
  id integer primary key default 1,
  password_hash text not null
);

-- 7. RLS on all tables
alter table orders enable row level security;
alter table inventory enable row level security;
alter table collections enable row level security;
alter table fragrances enable row level security;
alter table admin_config enable row level security;

-- 8. Policies
create policy "Service role can manage orders" on orders for all to service_role using (true) with check (true);
create policy "Public can read collections" on collections for select to anon using (active = true);
create policy "Service role can manage collections" on collections for all to service_role using (true) with check (true);
create policy "Public can read fragrances" on fragrances for select to anon using (active = true);
create policy "Service role can manage fragrances" on fragrances for all to service_role using (true) with check (true);
create policy "Service role can manage inventory" on inventory for all to service_role using (true) with check (true);
create policy "Service role can read admin config" on admin_config for select to service_role using (true);

-- 9. verify_password function
create or replace function verify_password(password text, hash text)
returns boolean as $$
  select (crypt(password, hash) = hash);
$$ language sql security definer;

-- 10. Admin password — replace with their chosen password
insert into admin_config (id, password_hash)
values (1, crypt('THEIR_PASSWORD_HERE', gen_salt('bf')));