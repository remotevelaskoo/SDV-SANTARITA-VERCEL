-- Base inicial de homologação. Cada conta acessa apenas seus próprios registros.
-- Não usar para operação real de portaria sem autorização por implantação, perfis e auditoria.
create extension if not exists pgcrypto;
create table if not exists public.properties (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 120),
 block text,
 created_at timestamptz not null default now()
);
create table if not exists public.people (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 120),
 category text not null check (category in ('morador','visitante','prestador')),
 created_at timestamptz not null default now()
);
create table if not exists public.access_events (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 person_name text not null check (char_length(person_name) between 1 and 120),
 direction text not null check (direction in ('entrada','saida')),
 created_at timestamptz not null default now()
);
alter table public.properties enable row level security;
alter table public.people enable row level security;
alter table public.access_events enable row level security;
create policy "own_properties_select" on public.properties for select to authenticated using ((select auth.uid()) = owner_id);
create policy "own_properties_insert" on public.properties for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "own_people_select" on public.people for select to authenticated using ((select auth.uid()) = owner_id);
create policy "own_people_insert" on public.people for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "own_access_select" on public.access_events for select to authenticated using ((select auth.uid()) = owner_id);
create policy "own_access_insert" on public.access_events for insert to authenticated with check ((select auth.uid()) = owner_id);
create index if not exists properties_owner_idx on public.properties(owner_id);
create index if not exists people_owner_idx on public.people(owner_id);
create index if not exists access_owner_created_idx on public.access_events(owner_id,created_at desc);
