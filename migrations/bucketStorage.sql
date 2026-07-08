-- Allow public to view images
create policy "Public can view fragrance images"
on storage.objects for select
to anon
using ( bucket_id = 'fragrance-images' );

-- Allow service role to upload and manage images
create policy "Service role can manage fragrance images"
on storage.objects for all
to service_role
using ( bucket_id = 'fragrance-images' )
with check ( bucket_id = 'fragrance-images' );