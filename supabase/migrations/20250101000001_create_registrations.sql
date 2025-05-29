
-- Create registrations table
create table public.registrations (
  id uuid default gen_random_uuid() primary key,
  team_name text not null,
  team_size integer not null check (team_size >= 1 and team_size <= 3),
  leader_name text not null,
  leader_email text not null,
  leader_phone text not null,
  institution text not null,
  track text not null,
  team_members jsonb not null default '[]'::jsonb,
  terms_accepted boolean not null default false,
  data_consent boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.registrations enable row level security;

-- Create policy to allow inserts for everyone
create policy "Allow public registration inserts" on public.registrations
  for insert with check (true);

-- Create policy to allow users to view their own registrations
create policy "Allow users to view own registrations" on public.registrations
  for select using (true);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger handle_registrations_updated_at
  before update on public.registrations
  for each row execute function public.handle_updated_at();
