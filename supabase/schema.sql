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

-- Módulos adicionais: veículos e encomendas.
create table if not exists public.vehicles (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 property_id uuid references public.properties(id) on delete set null,
 plate text not null check (plate ~ '^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$'),
 model text not null check (char_length(model) between 1 and 100),
 created_at timestamptz not null default now(),
 unique (owner_id, plate)
);
create table if not exists public.packages (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 property_id uuid not null references public.properties(id),
 description text not null check (char_length(description) between 1 and 180),
 recipient text not null check (char_length(recipient) between 1 and 120),
 status text not null default 'recebida' check (status in ('recebida','entregue')),
 created_at timestamptz not null default now(),
 delivered_at timestamptz,
 constraint delivered_status_consistent check ((status='recebida' and delivered_at is null) or (status='entregue' and delivered_at is not null))
);
alter table public.vehicles enable row level security;
alter table public.packages enable row level security;
create policy "vehicles_read" on public.vehicles for select to authenticated using ((select auth.uid())=owner_id);
create policy "vehicles_create" on public.vehicles for insert to authenticated with check ((select auth.uid())=owner_id and (property_id is null or exists(select 1 from public.properties p where p.id=property_id and p.owner_id=(select auth.uid()))));
create policy "packages_read" on public.packages for select to authenticated using ((select auth.uid())=owner_id);
create policy "packages_create" on public.packages for insert to authenticated with check ((select auth.uid())=owner_id and exists(select 1 from public.properties p where p.id=property_id and p.owner_id=(select auth.uid())));
create policy "packages_update" on public.packages for update to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id and exists(select 1 from public.properties p where p.id=property_id and p.owner_id=(select auth.uid())));
create index if not exists vehicles_owner_idx on public.vehicles(owner_id);
create index if not exists packages_owner_created_idx on public.packages(owner_id,created_at desc);
