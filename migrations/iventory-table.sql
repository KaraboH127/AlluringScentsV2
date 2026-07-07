-- Inventory table
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

-- Enable RLS
alter table inventory enable row level security;

create policy "Service role can manage inventory"
on inventory for all
to service_role
using (true)
with check (true);

-- Admin config table
create table admin_config (
  id integer primary key default 1,
  password_hash text not null
);

alter table admin_config enable row level security;

create policy "Service role can read admin config"
on admin_config for select
to service_role
using (true);

-- Seed inventory with all fragrances and sizes
insert into inventory (fragrance_id, fragrance_name, collection, size, stock) values
  ('lush', 'Lush', 'standard', '10ml', 50),
  ('lush', 'Lush', 'standard', '50ml', 30),
  ('lush', 'Lush', 'standard', '100ml', 20),
  ('whiskey-sour', 'Whiskey Sour', 'standard', '10ml', 50),
  ('whiskey-sour', 'Whiskey Sour', 'standard', '50ml', 30),
  ('whiskey-sour', 'Whiskey Sour', 'standard', '100ml', 20),
  ('velvet-nectar', 'Velvet Nectar', 'standard', '10ml', 50),
  ('velvet-nectar', 'Velvet Nectar', 'standard', '50ml', 30),
  ('velvet-nectar', 'Velvet Nectar', 'standard', '100ml', 20),
  ('midnight-oud', 'Midnight Oud', 'standard', '10ml', 50),
  ('midnight-oud', 'Midnight Oud', 'standard', '50ml', 30),
  ('midnight-oud', 'Midnight Oud', 'standard', '100ml', 20),
  ('purple-rain', 'Purple Rain', 'standard', '10ml', 50),
  ('purple-rain', 'Purple Rain', 'standard', '50ml', 30),
  ('purple-rain', 'Purple Rain', 'standard', '100ml', 20),
  ('taboo', 'Taboo', 'standard', '10ml', 50),
  ('taboo', 'Taboo', 'standard', '50ml', 30),
  ('taboo', 'Taboo', 'standard', '100ml', 20),
  ('ocean-eyes', 'Ocean Eyes', 'standard', '10ml', 50),
  ('ocean-eyes', 'Ocean Eyes', 'standard', '50ml', 30),
  ('ocean-eyes', 'Ocean Eyes', 'standard', '100ml', 20),
  ('fresh', 'Fresh', 'standard', '10ml', 50),
  ('fresh', 'Fresh', 'standard', '50ml', 30),
  ('fresh', 'Fresh', 'standard', '100ml', 20),
  ('9-lives', '9 Lives', 'private', '10ml', 30),
  ('9-lives', '9 Lives', 'private', '50ml', 20),
  ('9-lives', '9 Lives', 'private', '100ml', 10),
  ('golden-amber', 'Golden Amber', 'private', '10ml', 30),
  ('golden-amber', 'Golden Amber', 'private', '50ml', 20),
  ('golden-amber', 'Golden Amber', 'private', '100ml', 10),
  ('island-water', 'Island Water', 'private', '10ml', 30),
  ('island-water', 'Island Water', 'private', '50ml', 20),
  ('island-water', 'Island Water', 'private', '100ml', 10),
  ('signature', 'Signature', 'private', '10ml', 30),
  ('signature', 'Signature', 'private', '50ml', 20),
  ('signature', 'Signature', 'private', '100ml', 10);