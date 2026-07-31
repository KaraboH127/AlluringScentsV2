create table settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table settings enable row level security;

create policy "Public can read settings"
on settings for select to anon
using (true);

create policy "Service role can manage settings"
on settings for all to service_role
using (true)
with check (true);

-- Seed default delivery fee: R95.00
insert into settings (key, value) values ('delivery_fee_cents', '9500');