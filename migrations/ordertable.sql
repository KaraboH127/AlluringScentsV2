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
  created_at timestamptz default now()
);