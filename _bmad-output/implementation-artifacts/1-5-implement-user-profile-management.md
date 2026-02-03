# Story 1.5: Implement User Profile Management

Status: done

## Story

As a logged-in user,
I want to view and update my profile information,
So that I can keep my account details current.

## Acceptance Criteria

1. **Given** I am logged in
   **When** I navigate to the profile page
   **Then** I see my current email and profile information
   **And** The data is fetched from the `users` table via RLS

2. **Given** I am on the profile page
   **When** I update my profile information (e.g., display name)
   **Then** The changes are saved to the `users` table
   **And** I see a success confirmation message
   **And** The updated data is reflected immediately

3. **Given** I am on the profile page
   **When** I try to update with invalid data
   **Then** I see validation errors before submission
   **And** The invalid data is not saved

4. **Given** I am updating my profile
   **When** The API request fails
   **Then** I see an error message
   **And** The form preserves my unsaved changes

## Tasks / Subtasks

- [x] Task 1: Profile UI & Form (AC: 1, 3)
  - [x] Create `ProfileForm` component in `apps/web/components/features/profile/profile-form.tsx`
  - [x] Add `profileSchema` to `apps/web/lib/schemas/user.ts` (New schema file for user related)
  - [x] Implement form with Display Name (text) and Email (readonly)
  - [x] Use `shadcn/ui` components (Card, Input, Button, Form, Toast)
  - [x] Ensure responsive design

- [x] Task 2: Supabase Integration (AC: 1, 2, 4)
  - [x] Create `updateProfile` server action or API handler in `apps/web/lib/actions/user.ts` (or similar) - *Implemented via Client*
  - [x] Implement data fetching: Use Supabase Client (Server Component) to get initial data
  - [x] Implement update logic: `supabase.from('users').update(...)`
  - [x] Handle errors and success notifications

- [x] Task 3: Profile Page (AC: 1)
  - [x] Create `apps/web/src/app/(main)/profile/page.tsx`
  - [x] Protect route with Middleware (ensure only auth users, verified by Layout/Middleware from Story 1.4)
  - [x] Layout: Use `(main)` layout (inherits Header/Nav)

- [x] Task 4: Testing (AC: All)
  - [x] Unit Test: `ProfileForm` validation
  - [x] Unit Test (Mocked): Form submission logic
  - [x] Manual verification of Update flow

## Dev Notes

### Architecture Patterns
- **Auth:** Protected Route. User *must* be logged in.
- **Data Fetching:** Server Components for initial fetch (`apps/web/src/app/(main)/profile/page.tsx`).
- **Data Mutation:** Server Actions or Supabase Client (client-side) with RLS. *Decision:* Use Client Side Supabase for consistency.
- **State:** React Hook Form for form state.
- **Validation:** Zod schema.

### Source Tree
- `apps/web/src/app/(main)/profile/page.tsx` [NEW]
- `apps/web/components/features/profile/profile-form.tsx` [NEW]
- `apps/web/lib/schemas/user.ts` [NEW]
- `apps/web/components/features/profile/__tests__/profile-form.test.tsx` [NEW]

### Previous Story Learnings (Story 1.4)
- `(main)` layout handles the authenticated header.
- Middleware protects the route.
- Re-use `packages/ui` components.

### References
- [Epics.md: Story 1.5](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/epics.md#Story_1.5:_Implement_User_Profile_Management)
- [Architecture.md](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/architecture.md#Authentication_&_Security)

## Dev Agent Record

### Completion Notes List
- Implemented `ProfileForm` with `react-hook-form`, `zod`, and `shadcn/ui`.
- Integrates with `public.users` table for name updates.
- Created `ProfilePage` as Server Component to fetch initial data.
- Added unit tests in `profile-form.test.tsx`.
- Validated tests pass (fixed `vitest.config.mts` issue).


### File List
- `apps/web/src/app/(main)/profile/page.tsx`
- `apps/web/components/features/profile/profile-form.tsx`
- `apps/web/lib/schemas/user.ts`
- `apps/web/components/features/profile/__tests__/profile-form.test.tsx`
- `apps/web/components/layout/user-nav.tsx` (Modified)
- `apps/api/src/main.ts` (Modified)
- `apps/web/vitest.config.mts` (Modified)
- `packages/database/prisma/apply-rls.sql` (Modified)

### Change Log
- **Fix:** Swapped API port to 4000 to avoid conflict with Next.js.
- **Fix:** Added navigation handler to UserNav profile link.
- **Fix:** Corrected RLS permissions (GRANT USAGE) for profile updates.
- **Fix:** Removed invalid markdown from vitest config.
