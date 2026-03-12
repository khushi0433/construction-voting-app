------------------------------------------------------------
-- ENABLE RLS
------------------------------------------------------------

alter table profiles enable row level security;
alter table partner_credentials enable row level security;
alter table projects enable row level security;
alter table project_segments enable row level security;
alter table segment_options enable row level security;
alter table project_participants enable row level security;
alter table votes enable row level security;
alter table ballot_status enable row level security;
alter table audit_logs enable row level security;


------------------------------------------------------------
-- DROP EXISTING POLICIES (prevents duplicate errors)
------------------------------------------------------------

drop policy if exists "profiles_select_self" on profiles;

drop policy if exists "projects_select_assigned_or_admin" on projects;
drop policy if exists "projects_admin_manage" on projects;

drop policy if exists "project_segments_admin_manage" on project_segments;
drop policy if exists "project_segments_select_visible" on project_segments;

drop policy if exists "segment_options_admin_manage" on segment_options;
drop policy if exists "segment_options_select_visible" on segment_options;

drop policy if exists "project_participants_select_self" on project_participants;

drop policy if exists "votes_select_own_or_admin" on votes;
drop policy if exists "votes_insert_own" on votes;
drop policy if exists "votes_update_own_or_admin" on votes;

drop policy if exists "ballot_status_select_own_or_admin" on ballot_status;
drop policy if exists "ballot_status_update_own_or_admin" on ballot_status;

drop policy if exists "audit_logs_admin_only" on audit_logs;


------------------------------------------------------------
-- PROFILES
------------------------------------------------------------

create policy "profiles_select_self"
on profiles for select
using (auth.uid() = id);


------------------------------------------------------------
-- PROJECTS
------------------------------------------------------------

create policy "projects_select_assigned_or_admin"
on projects for select
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
  or exists (
    select 1 from project_participants pp
    where pp.project_id = projects.id
    and pp.profile_id = auth.uid()
  )
);

create policy "projects_admin_manage"
on projects for all
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);


------------------------------------------------------------
-- PROJECT SEGMENTS
------------------------------------------------------------

create policy "project_segments_admin_manage"
on project_segments for all
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "project_segments_select_visible"
on project_segments for select
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
  or exists (
    select 1 from project_participants pp
    where pp.project_id = project_segments.project_id
    and pp.profile_id = auth.uid()
  )
);


------------------------------------------------------------
-- SEGMENT OPTIONS
------------------------------------------------------------

create policy "segment_options_admin_manage"
on segment_options for all
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "segment_options_select_visible"
on segment_options for select
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
  or exists (
    select 1
    from project_segments ps
    join project_participants pp
      on pp.project_id = ps.project_id
    where ps.id = segment_options.segment_id
    and pp.profile_id = auth.uid()
  )
);


------------------------------------------------------------
-- PROJECT PARTICIPANTS
------------------------------------------------------------

create policy "project_participants_select_self"
on project_participants for select
using (
  profile_id = auth.uid()
);


------------------------------------------------------------
-- VOTES
------------------------------------------------------------

create policy "votes_select_own_or_admin"
on votes for select
using (
  voter_id = auth.uid()
  or exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "votes_insert_own"
on votes for insert
with check (
  voter_id = auth.uid()
);

create policy "votes_update_own_or_admin"
on votes for update
using (
  voter_id = auth.uid()
  or exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);


------------------------------------------------------------
-- BALLOT STATUS
------------------------------------------------------------

create policy "ballot_status_select_own_or_admin"
on ballot_status for select
using (
  voter_id = auth.uid()
  or exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "ballot_status_update_own_or_admin"
on ballot_status for update
using (
  voter_id = auth.uid()
  or exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);


------------------------------------------------------------
-- AUDIT LOGS
------------------------------------------------------------

create policy "audit_logs_admin_only"
on audit_logs for select
using (
  exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);