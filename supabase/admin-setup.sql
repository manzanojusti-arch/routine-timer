-- Run once in the SQL Editor of the Routine Timer Supabase project.
-- Only a confirmed existing account can receive the owner role.
begin;
create table if not exists public.rt_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.rt_admins enable row level security;
revoke all on public.rt_admins from anon, authenticated;
insert into public.rt_admins(user_id)
select id from auth.users where lower(email)='justimanzano@gmail.com' and email_confirmed_at is not null
on conflict do nothing;
create or replace function public.rt_is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.rt_admins a where a.user_id=(select auth.uid())); $$;
revoke all on function public.rt_is_admin() from public;
grant execute on function public.rt_is_admin() to authenticated;
create table if not exists public.rt_app_config (
 id text primary key check(id='public'),
 value jsonb not null default '{}'::jsonb check(jsonb_typeof(value)='object')
);
alter table public.rt_app_config enable row level security;
grant select on public.rt_app_config to anon, authenticated;
grant insert,update on public.rt_app_config to authenticated;
drop policy if exists rt_config_read on public.rt_app_config;
create policy rt_config_read on public.rt_app_config for select to anon,authenticated using(true);
drop policy if exists rt_config_insert on public.rt_app_config;
create policy rt_config_insert on public.rt_app_config for insert to authenticated with check(public.rt_is_admin());
drop policy if exists rt_config_update on public.rt_app_config;
create policy rt_config_update on public.rt_app_config for update to authenticated using(public.rt_is_admin()) with check(public.rt_is_admin());
insert into public.rt_app_config(id,value) values('public','{"notice":"","season":"auto"}') on conflict do nothing;
commit;
-- Must return the intended owner account; an empty result means it is not confirmed yet.
select u.email from public.rt_admins a join auth.users u on u.id=a.user_id;
