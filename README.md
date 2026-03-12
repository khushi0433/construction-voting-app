# Construction Voting App Starter

A near-production starter for a mobile-friendly construction partner voting application.

## What this includes
- Next.js App Router structure
- Tailwind CSS setup
- TypeScript types
- Supabase client helpers
- Auth guard helpers (stubs)
- Admin dashboard, partner dashboard, voting, results, and audit page scaffolds
- Zod validation schemas
- SQL schema and Row Level Security draft
- Report/export helper stubs
- Seed notes for the 6 default partners

## What is still left for the developer
- Install dependencies and run the app
- Create the Supabase project
- Run the SQL schema in `supabase/schema.sql`
- Wire Supabase auth flows into the login page
- Replace stub/mock data fetchers with real queries
- Finish server actions and API routes
- Add production styling polish and testing
- Deploy to Vercel

## Quick start
```bash
npm install
npm run dev
```

## Environment variables
Copy `.env.example` to `.env.local` and fill in your Supabase values.

## Suggested build order
1. Create Supabase project
2. Run `supabase/schema.sql`
3. Configure `.env.local`
4. Implement auth in `lib/auth`
5. Replace mock data in app pages with Supabase queries
6. Add save/lock vote server actions
7. Test mobile layout
8. Deploy to Vercel
