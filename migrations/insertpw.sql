insert into admin_config (id, password_hash)
values (1, crypt('your-password-here', gen_salt('bf')));


<errors>
create extension if not exists pgcrypto;