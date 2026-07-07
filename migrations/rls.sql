-- Enable RLS
alter table orders enable row level security;

-- Only the service role (your backend) can insert orders
create policy "Service role can insert orders"
on orders for insert
to service_role
with check (true);

-- Only the service role can read orders
create policy "Service role can read orders"
on orders for select
to service_role
using (true);