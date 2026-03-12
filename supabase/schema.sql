-- Construction Voting App schema + starter RLS draft
-- create extension   pgcrypto;

create table profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  role text not null check (role in ('admin','partner')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table partner_credentials (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  pin_hash text not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null check (status in ('draft','open','closed','archived')),
  created_by uuid references profiles(id),
  opens_at timestamptz,
  closes_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_segments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table segment_options (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references project_segments(id) on delete cascade,
  label text not null,
  sort_order integer not null,
  created_at timestamptz not null default now()
);

create table project_participants (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  unique(project_id, profile_id)
);

create table votes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  segment_id uuid not null references project_segments(id) on delete cascade,
  option_id uuid not null references segment_options(id) on delete cascade,
  voter_id uuid not null references profiles(id) on delete cascade,
  score integer not null check (score between 1 and 10),
  is_locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  locked_at timestamptz,
  unique(segment_id, option_id, voter_id)
);

create table ballot_status (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  voter_id uuid not null references profiles(id) on delete cascade,
  is_locked boolean not null default false,
  last_edited_at timestamptz,
  locked_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(project_id, voter_id)
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  actor_id uuid references profiles(id),
  action_type text not null,
  entity_type text not null,
  entity_id uuid,
  details_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index   idx_project_segments_project_id on project_segments(project_id);
create index   idx_segment_options_segment_id on segment_options(segment_id);
create index   idx_project_participants_project_id on project_participants(project_id);
create index   idx_votes_project_id on votes(project_id);
create index   idx_votes_voter_id on votes(voter_id);
create index   idx_ballot_status_project_voter on ballot_status(project_id, voter_id);
create index   idx_audit_logs_project_id on audit_logs(project_id);

alter table profiles enable row level security;
alter table partner_credentials enable row level security;
alter table projects enable row level security;
alter table project_segments enable row level security;
alter table segment_options enable row level security;
alter table project_participants enable row level security;
alter table votes enable row level security;
alter table ballot_status enable row level security;
alter table audit_logs enable row level security;

-- NOTE FOR DEVELOPER:
-- The policies below assume auth.uid() maps to profiles.id or there is a linked profile row.
-- Adjust according to the final auth strategy.

create policy   "profiles self read" on profiles
  for select using (auth.uid() = id);

create policy   "partners read assigned projects" on projects
  for select using (
    exists (
      select 1 from project_participants pp
      where pp.project_id = projects.id and pp.profile_id = auth.uid()
    )
    or exists (
      select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy   "admins manage projects" on projects
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "project segments visible to assigned or admin" on project_segments
  for select using (
    exists (select 1 from project_participants pp where pp.project_id = project_segments.project_id and pp.profile_id = auth.uid())
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "options visible to assigned or admin" on segment_options
  for select using (
    exists (
      select 1
      from project_segments ps
      join project_participants pp on pp.project_id = ps.project_id
      where ps.id = segment_options.segment_id and pp.profile_id = auth.uid()
    )
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "participants visible to admin or self" on project_participants
  for select using (
    profile_id = auth.uid()
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "admin manage participants" on project_participants
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "partners read own votes" on votes
  for select using (
    voter_id = auth.uid()
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "partners insert own unlocked votes" on votes
  for insert with check (
    voter_id = auth.uid()
    and exists (
      select 1 from project_participants pp where pp.project_id = votes.project_id and pp.profile_id = auth.uid()
    )
  );

create policy   "partners update own unlocked votes" on votes
  for update using (
    voter_id = auth.uid()
    and is_locked = false
  ) with check (
    voter_id = auth.uid()
    and is_locked = false
  );

create policy   "admin manage votes" on votes
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "partners read own ballot status" on ballot_status
  for select using (
    voter_id = auth.uid()
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "partners manage own ballot status" on ballot_status
  for all using (
    voter_id = auth.uid()
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  ) with check (
    voter_id = auth.uid()
    or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "admin read audit logs" on audit_logs
  for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy   "system inserts audit logs" on audit_logs
  for insert with check (true);

-- Seed note only: create real users via auth flow.
