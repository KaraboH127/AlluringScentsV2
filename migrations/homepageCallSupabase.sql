create policy "Public can read inventory"
on inventory for select
to anon
using (true);