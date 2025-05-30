
-- Create site_config table for calendar URL management
create table public.site_config (
  id uuid primary key default gen_random_uuid(),
  cal_url text not null
);

insert into public.site_config (cal_url)
values ('https://cal.com/snapstack-scheduling/intro-consultation');

-- Create profiles table for user data
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  first_name text,
  last_name text,
  company text,
  phone text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
