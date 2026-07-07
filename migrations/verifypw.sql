create or replace function verify_password(password text, hash text)
returns boolean as $$
  select (crypt(password, hash) = hash);
$$ language sql security definer;