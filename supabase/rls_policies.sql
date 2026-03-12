alter table profiles enable row level security;
alter table partner_credentials enable row level security;
alter table projects enable row level security;
alter table project_segments enable row level security;
alter table segment_options enable row level security;
alter table project_participants enable row level security;
alter table votes enable row level security;
alter table ballot_status enable row level security;
alter table audit_logs enable row level security;

create policy "profiles_select_self"
on profiles for select
using (auth.uid() = id);

create policy "projects_select_assigned_or_admin"
on projects for select
using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  or exists (
    select 1 from project_participants pp
    where pp.project_id = projects.id and pp.profile_id = auth.uid()
  )
);

create policy "votes_select_own_or_admin"
on votes for select
using (
  voter_id = auth.uid()
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "votes_insert_own"
on votes for insert
with check (voter_id = auth.uid());

create policy "votes_update_own_or_admin"
on votes for update
using (
  voter_id = auth.uid()
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "ballot_status_select_own_or_admin"
on ballot_status for select
using (
  voter_id = auth.uid()
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "ballot_status_update_own_or_admin"
on ballot_status for update
using (
  voter_id = auth.uid()
  or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "audit_logs_admin_only"
on audit_logs for select
using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
