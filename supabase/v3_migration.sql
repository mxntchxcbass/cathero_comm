-- CatHero.GG v3 migration: Guide comments
create table if not exists public.guide_comments (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.guides(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists guide_comments_guide_created_idx on public.guide_comments(guide_id, created_at);
alter table public.guide_comments enable row level security;
drop policy if exists "guide comments readable" on public.guide_comments;
drop policy if exists "guide comments own insert" on public.guide_comments;
drop policy if exists "guide comments own update" on public.guide_comments;
drop policy if exists "guide comments own delete" on public.guide_comments;
create policy "guide comments readable" on public.guide_comments for select using(true);
create policy "guide comments own insert" on public.guide_comments for insert with check(auth.uid()=author_id);
create policy "guide comments own update" on public.guide_comments for update using(auth.uid()=author_id);
create policy "guide comments own delete" on public.guide_comments for delete using(auth.uid()=author_id);
