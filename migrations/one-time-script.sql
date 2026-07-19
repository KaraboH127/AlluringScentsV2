-- ============================================================
-- ALLURING SCENTS — FULL DATABASE SETUP SCRIPT
-- Run this in Supabase SQL Editor in one go
-- ============================================================


-- ── Step 1: Extensions ───────────────────────────────────────
create extension if not exists pgcrypto;


-- ── Step 2: Tables ───────────────────────────────────────────

-- Orders
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

-- Inventory
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

-- Collections
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

-- Fragrances
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

-- Admin config
create table admin_config (
  id integer primary key default 1,
  password_hash text not null
);


-- ── Step 3: Enable RLS on all tables ─────────────────────────
alter table orders enable row level security;
alter table inventory enable row level security;
alter table collections enable row level security;
alter table fragrances enable row level security;
alter table admin_config enable row level security;


-- ── Step 4: RLS Policies ─────────────────────────────────────

-- Orders
create policy "Service role can insert orders"
on orders for insert to service_role
with check (true);

create policy "Service role can read orders"
on orders for select to service_role
using (true);

create policy "Service role can update orders"
on orders for update to service_role
using (true);

-- Inventory
create policy "Service role can manage inventory"
on inventory for all to service_role
using (true)
with check (true);

-- Collections
create policy "Public can read collections"
on collections for select to anon
using (active = true);

create policy "Service role can manage collections"
on collections for all to service_role
using (true)
with check (true);

-- Fragrances
create policy "Public can read fragrances"
on fragrances for select to anon
using (active = true);

create policy "Service role can manage fragrances"
on fragrances for all to service_role
using (true)
with check (true);

-- Admin config
create policy "Service role can read admin config"
on admin_config for select to service_role
using (true);


-- ── Step 5: verify_password function ─────────────────────────
create or replace function verify_password(password text, hash text)
returns boolean as $$
  select (crypt(password, hash) = hash);
$$ language sql security definer;


-- ── Step 6: Seed collections ──────────────────────────────────
insert into collections (id, name, label, tagline, description, prices) values
(
  'standard',
  'Standard Collection',
  'White Label',
  'Elegant Everyday Luxury',
  'Our Standard Collection brings accessible luxury to everyday life, beautifully balanced fragrances crafted from the finest ingredients.',
  '{"10ml": 120, "50ml": 400, "100ml": 700}'
),
(
  'private',
  'Private Collection',
  'Black Label',
  'Exclusively Crafted. Unapologetically Bold.',
  'Our Private Collection represents the pinnacle of olfactory artistry, bold, complex compositions designed for those who wear fragrance as a statement.',
  '{"10ml": 200, "50ml": 600, "100ml": 1100}'
);


-- ── Step 7: Seed fragrances ───────────────────────────────────
insert into fragrances (id, slug, name, collection_id, description, extrait, notes, best_for, occasions, personality, image_url) values
('lush', 'lush', 'Lush', 'standard', 'A radiant floral-green composition with polished depth.', 'Extrait de Parfum', '{"top": "Bergamot and pear leaf", "middle": "Jasmine petals and white tea", "base": "Creamy musk and sandalwood"}', 'Daily elegance', '["Workdays", "Brunch", "Evening transitions"]', 'Refined, calm, effortlessly confident', '/image10.webp'),
('whiskey-sour', 'whiskey-sour', 'Whiskey Sour', 'standard', 'Citrus brightness wrapped in warm ambered woods.', 'Extrait de Parfum', '{"top": "Lemon zest and ginger", "middle": "Clary sage and aromatic spice", "base": "Oakwood and soft vanilla"}', 'Bold evenings', '["Dinner dates", "Lounges", "Night events"]', 'Magnetic, adventurous, polished', '/image9.webp'),
('velvet-nectar', 'velvet-nectar', 'Velvet Nectar', 'standard', 'Silken fruit and petals balanced with warm resins.', 'Extrait de Parfum', '{"top": "Nectarine and pink pepper", "middle": "Rose absolute and iris", "base": "Amber resin and tonka bean"}', 'Signature wear', '["Celebrations", "Day-to-night wear", "Special meetings"]', 'Elegant, expressive, poised', '/image5.webp'),
('midnight-oud', 'midnight-oud', 'Midnight Oud', 'standard', 'Dark woods and spice with a velvety modern trail.', 'Extrait de Parfum', '{"top": "Saffron and smoked cardamom", "middle": "Rose and cedar", "base": "Oud accord and patchouli"}', 'After-dark presence', '["Formal events", "Winter evenings", "Statement moments"]', 'Commanding, luxurious, deep', '/image6.webp'),
('purple-rain', 'purple-rain', 'Purple Rain', 'standard', 'Velvet florals lit by sparkling citrus and musk.', 'Extrait de Parfum', '{"top": "Mandarin and blackcurrant", "middle": "Violet and peony", "base": "Clean musk and amberwood"}', 'Fresh confidence', '["Day events", "Creative work", "Weekend outings"]', 'Modern, romantic, expressive', '/image3.webp'),
('taboo', 'taboo', 'Taboo', 'standard', 'A sensual amber-spice blend with smoky sophistication.', 'Extrait de Parfum', '{"top": "Pink pepper and saffron", "middle": "Labdanum and suede", "base": "Incense and vanilla absolute"}', 'Evening attraction', '["Date nights", "Cocktail evenings", "Luxury occasions"]', 'Fearless, alluring, unforgettable', '/image2.webp'),
('ocean-eyes', 'ocean-eyes', 'Ocean Eyes', 'standard', 'Marine freshness elevated with citrus and soft woods.', 'Extrait de Parfum', '{"top": "Grapefruit and sea breeze accord", "middle": "Lavender and neroli", "base": "Driftwood and white musk"}', 'Clean versatility', '["Warm days", "Travel", "Office wear"]', 'Fresh, focused, relaxed', '/image1.webp'),
('fresh', 'fresh', 'Fresh', 'standard', 'Crisp citrus and herbal brightness with clean depth.', 'Extrait de Parfum', '{"top": "Lime and petitgrain", "middle": "Green tea and basil", "base": "Vetiver and soft musk"}', 'Everyday ease', '["Morning routines", "Gym-to-day transitions", "Hot weather"]', 'Minimal, energetic, sharp', '/image0.webp'),
('9-lives', '9-lives', '9 Lives', 'private', 'A daring signature built on radiant spice and woods.', 'Extrait de Parfum', '{"top": "Bergamot and pink pepper", "middle": "Geranium and nutmeg", "base": "Sandalwood and ambergris accord"}', 'Statement identity', '["High-impact meetings", "Events", "Nightlife"]', 'Bold, charismatic, uncompromising', '/image12.webp'),
('golden-amber', 'golden-amber', 'Golden Amber', 'private', 'Liquid gold warmth with noble woods and resins.', 'Extrait de Parfum', '{"top": "Saffron and bergamot", "middle": "Amber and orange blossom", "base": "Guaiac wood and benzoin"}', 'Luxury evenings', '["Formal dinners", "Celebratory nights", "Cool seasons"]', 'Confident, warm, regal', '/image11.webp'),
('island-water', 'island-water', 'Island Water', 'private', 'A refined tropical interpretation with mineral depth.', 'Extrait de Parfum', '{"top": "Bitter orange and coconut water", "middle": "Tiare flower and sea salt", "base": "Cedar and ambrette"}', 'Luxurious freshness', '["Resort wear", "Summer evenings", "Holiday escapes"]', 'Relaxed, premium, luminous', '/image7.webp'),
('signature', 'signature', 'Signature', 'private', 'The house icon, smooth spice, woods, and rare florals.', 'Extrait de Parfum', '{"top": "Black pepper and bergamot", "middle": "Orris and rose", "base": "Sandalwood, musk, and labdanum"}', 'Defining moments', '["Daily signature wear", "Business", "Elegant evenings"]', 'Timeless, assured, sophisticated', '/image4.webp');


-- ── Step 8: Seed inventory ────────────────────────────────────
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


-- ── Step 9: Admin password ────────────────────────────────────
-- !! REPLACE 'THEIR_PASSWORD_HERE' with the client's chosen password !!
insert into admin_config (id, password_hash)
values (1, crypt('THEIR_PASSWORD_HERE', gen_salt('bf')));


-- ── Step 10: Storage policies ─────────────────────────────────
-- !! IMPORTANT: Before running these two lines, you must manually
--    create the storage bucket in Supabase first:
--    Storage → New Bucket → Name: "fragrance-images" → Public: ON
--    Then come back and run these: !!

create policy "Public can view fragrance images"
on storage.objects for select to anon
using (bucket_id = 'fragrance-images');

create policy "Service role can manage fragrance images"
on storage.objects for all to service_role
using (bucket_id = 'fragrance-images')
with check (bucket_id = 'fragrance-images');


-- ============================================================
-- DONE. Verify by checking the Table Editor in Supabase.
-- You should see: orders, inventory, collections, fragrances,
-- admin_config — all with RLS enabled.
-- ============================================================