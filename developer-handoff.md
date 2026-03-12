# Developer Handoff Notes

## Immediate tasks
- Replace all mock data sources with real Supabase queries.
- Build auth using Supabase Auth.
- Store partner role in `profiles` and map authenticated user to profile row.
- Add server actions or route handlers for create project, save vote, lock ballot, export audit.
- Add print stylesheet and JSON download endpoint.

## Suggested order
1. Supabase project + SQL schema
2. Auth and profile bootstrap
3. Admin create project flow
4. Participant assignment
5. Partner voting flow
6. Ballot lock flow
7. Results aggregate query
8. Audit page and exports
9. Mobile polish
10. Vercel deployment

## Non-negotiable business rules
- Exactly 3 options per segment
- Votes are 1 to 10 integers only
- Partners cannot edit locked ballots
- Highest total wins
- Ties must be flagged
- Admin can review full audit trail
