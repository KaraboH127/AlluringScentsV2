alter table fragrances add column sale_prices jsonb default null;
alter table fragrances add column sale_label text default null;

alter table collections add column prices_updated_at timestamptz default now();