# Story 1.2: Configure Supabase & Database Schema (Users Table)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to set up local Supabase and create the initial users table with RLS,
so that the application has a secure data layer for authentication locally.

## Acceptance Criteria

1. **Given** I have Supabase project credentials
   **When** I configure environment variables (SUPABASE_URL, SUPABASE_ANON_KEY, DATABASE_URL) using local Supabase credentials
   **Then** Both `apps/web` and `apps/api` can connect to Supabase
   **And** Prisma is configured to use the Supabase Postgres connection string

2. **Given** Prisma is configured
   **When** I create the initial schema with `users` table
   **Then** The schema includes: `id`, `email`, `name`, `created_at`, `updated_at` fields
   **And** I can run `prisma migrate dev` successfully
   **And** The migration creates the table in Supabase

3. **Given** the users table exists
   **When** I enable Row Level Security (RLS) in Supabase
   **Then** RLS policies are created: users can only read/update their own data
   **And** The `auth.uid()` helper is used in RLS policies

## Tasks / Subtasks

- [x] Task 1: Environment Configuration (AC: 1)
  - [x] Initialize local Supabase: `npx supabase init` (if not already done)
  - [x] Start local Supabase: `npx supabase start`
  - [x] Create/Update `.env` files in `apps/web`, `apps/api` (or root `.env` if using turbo pipelining) with **local** Supabase variables (from `supabase start` output)
  - [x] Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `DATABASE_URL` to `.env`
  - [x] Ensure `.gitignore` includes `.env` files and `supabase/` config if needed
- [x] Task 2: Configure Prisma Package (AC: 1, 2)
  - [x] Initialize/Verify `packages/database` setup
  - [x] Update `packages/database/prisma/schema.prisma` datasource to use `DATABASE_URL`
  - [x] Define `User` model in `schema.prisma` with fields: `id` (UUID), `email` (String, unique), `name` (String?), `created_at` (DateTime), `updated_at` (DateTime)
  - [x] Map model to `users` table via `@@map("users")` map block
- [x] Task 3: Implement RLS Policies (AC: 3)
  - [x] Create initial migration (`npx prisma migrate dev --name init_users`)
  - [x] Implement RLS enabling and policies. (Note: Prisma doesn't natively manage RLS policies in schema, usually done via raw SQL migration or Supabase dashboard. For this story, we will create a migration file with raw SQL to enable RLS and add policies.)
  - [x] Write SQL for: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
  - [x] Write SQL for: `CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);`
  - [x] Write SQL for: `CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);` (Check logic intersection with `WITH CHECK`)
- [x] Task 4: Connectivity Verification (AC: 1)
  - [x] Create a script or test in `packages/database` to verify connection to DB
  - [x] Verify environment variables are correctly loaded in apps

## Dev Notes

### Architecture Patterns
- **Database:** Supabase Postgres used via Prisma.
- **Naming:** Tables must be `snake_case` (e.g., `users`).
- **Security:** RLS is Mandatory.
- **Structure:** Database logic resides in `packages/database`. Apps import the client.

### Project Structure Notes
- `packages/database` should export the PrismaClient instance.
- Environment variables must be handled securely.
- **Local Supabase:** Ensure `npx supabase start` is running before dev. `DATABASE_URL` typically looks like `postgresql://postgres:postgres@127.0.0.1:54322/postgres`.

### References
- [Architecture.md](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/architecture.md#Data_Architecture)
- [Epics.md: Story 1.2](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/epics.md#Story_1.2:_Configure_Supabase_&_Database_Schema_(Users_Table))

## Dev Agent Record

### Agent Model Used

Claude 4.5 Sonnet (Thinking)

### Debug Log References

### Completion Notes List

- ✅ Initialized local Supabase successfully
- ✅ Created `.env` files in `apps/web`, `apps/api`, and `packages/database` with local credentials
- ✅ Updated Prisma schema with User model including `name` field and proper snake_case column mappings
- ✅ Created migration `init_users` with RLS policies included
- ✅ Applied migration and RLS policies successfully to local Supabase database
- ✅ Created and executed connectivity test script - connection verified
- ✅ All acceptance criteria met

**Code Review Fixes Applied:**
- ✅ Fixed Issue #1: Implemented PrismaClient singleton pattern to prevent connection pool exhaustion
- ✅ Fixed Issue #2: Optimized UUID type to use `@db.Uuid` for better performance
- ✅ Fixed Issue #4: Added INSERT RLS policy
- ✅ Fixed Issue #5: Added `@types/node` dependency
- ✅ Separated RLS policies from Prisma migrations to avoid shadow database auth schema conflict

### File List

**Modified:**
- `packages/database/src/index.ts` - Implemented PrismaClient singleton pattern with logging
- `packages/database/prisma/schema.prisma` - Added @@map directives for snake_case columns + @db.Uuid optimization
- `packages/database/prisma/migrations/20260201020820_init_users/migration.sql` - Removed RLS policies (moved to separate file)
- `packages/database/package.json` - Added @types/node dependency

**Created:**
- `apps/web/.env` - Environment variables for Next.js
- `apps/api/.env` - Environment variables for NestJS  
- `packages/database/.env` - Environment variables for Prisma
- `packages/database/src/test-connection.ts` - Database connection test script
- `packages/database/prisma/migrations/20260201020820_init_users/migration.sql` - Initial users table migration
- `packages/database/prisma/migrations/20260201022859_optimize_uuid_type/migration.sql` - UUID type optimization migration
- `packages/database/prisma/apply-rls.sql` - RLS policies (applied separately from Prisma migrations)
- `supabase/config.toml` - Supabase configuration (auto-generated)
