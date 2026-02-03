# Story 1.4: Implement User Login & Session Management

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a registered user,
I want to log in with my email and password,
so that I can access my study materials and progress.

## Acceptance Criteria

1. **Given** I am on the login page
   **When** I enter correct email and password
   **Then** I am authenticated via Supabase Auth
   **And** A session token is stored securely
   **And** I am redirected to the dashboard

2. **Given** I am on the login page
   **When** I enter incorrect credentials
   **Then** I see an error message: "Invalid email or password"
   **And** I remain on the login page

3. **Given** I am logged in
   **When** I navigate to protected routes
   **Then** My session is validated on each request
   **And** Unauthorized users are redirected to login

4. **Given** I am logged in
   **When** I close the browser and return later
   **Then** My session persists (if "Remember Me" was checked)
   **And** I do not need to log in again

5. **Given** I am on the login page
   **When** Supabase Auth is down
   **Then** I see a clear error message (NFR4)
   **And** The application does not crash

## Tasks / Subtasks

- [x] Task 1: Login UI & Form (AC: 1, 2)
  - [x] Create `LoginForm` component in `apps/web/components/features/auth/login-form.tsx`
  - [x] Add `loginSchema` to `apps/web/lib/schemas/auth.ts` (extend existing auth schemas)
  - [x] Implement form with Email, Password, and "Remember Me" checkbox using `react-hook-form`
  - [x] Use `shadcn/ui` components (Card, Input, Button, Checkbox, Toast)
  - [x] Ensure responsive design matching Register page style

- [x] Task 2: Supabase Integration (AC: 1, 2, 4, 5)
  - [x] Implement `signInWithPassword` call in `LoginForm` using Supabase Client
  - [x] Handle success: Redirect to `/dashboard` (or intended destination)
  - [x] Handle errors: Map Supabase errors to user-friendly messages
  - [x] Implement loading state handles

- [x] Task 3: Session Management & Protected Routes (AC: 3, 4)
  - [x] Create/Update Middleware (`apps/web/middleware.ts`) to protect dashboard routes
  - [x] Implement session validation in middleware (redirect unauth to `/login`)
  - [x] Update Root Layout or Auth Provider to sync server session with client state (Zustand if needed, or stick to Supabase Auth helper default)
  - [x] Verify "Remember Me" functionality (Supabase default persistence)

- [x] Task 4: Login Page & Navigation (AC: 1)
  - [x] Create `apps/web/src/app/(auth)/login/page.tsx`
  - [x] Add link to Register page ("Don't have an account?")
  - [x] Update global navigation/header to show "Login" vs "User Menu" based on state (Moved to `(main)` layout)

- [x] Task 5: Testing (AC: All)
  - [x] Unit Test: `LoginForm` validation and error display
  - [x] Integration Test: Middleware redirection logic (mocked)
  - [x] Manual verification of Login Flow and Session Persistence

- [x] Task 6: UI Refinement (User Feedback)
  - [x] Add password placeholder to LoginForm
  - [x] Align LoginForm design with RegisterForm
  - [x] Remove Header from Login/Register pages (Route Groups)

## Dev Notes

### Architecture Patterns
- **Auth:** Supabase Auth (`signInWithPassword`).
- **State:** Supabase Auth Helpers automatically handle session persistence (cookies/local storage). Middleware handles route protection.
- **Validation:** Extend `apps/web/lib/schemas/auth.ts` (created in Story 1.3).
- **UI:** Maintain consistency with `RegisterForm` (Story 1.3).
- **Routing:** Use Route Groups `(auth)` and `(main)` to manage different layouts (Header visibility).

### Source Tree
- `apps/web/src/app/(auth)/login/page.tsx` [NEW]
- `apps/web/components/features/auth/login-form.tsx` [NEW]
- `apps/web/lib/schemas/auth.ts` [MODIFY]
- `apps/web/middleware.ts` [NEW/MODIFY]
- `apps/web/src/app/(main)/layout.tsx` [NEW]

### Previous Story Learnings (Story 1.3)
- Reuse `packages/ui` components.
- Zod schemas are centralised in `lib/schemas`.
- Ensure environment variables are correctly prefixed (`NEXT_PUBLIC_`) if used on client.

### References
- [Epics.md: Story 1.4](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/epics.md#Story_1.4:_Implement_User_Login_&_Session_Management)
- [Architecture.md](file:///c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/architecture.md#Authentication_&_Security)

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
- apps/web/components/features/auth/login-form.tsx
- apps/web/components/features/auth/__tests__/login-form.test.tsx
- apps/web/lib/schemas/auth.ts
- apps/web/middleware.ts
- apps/web/lib/supabase/middleware.ts
- apps/web/lib/supabase/client.ts
- apps/web/lib/supabase/server.ts
- apps/web/components/layout/header.tsx
- apps/web/components/layout/user-nav.tsx
- apps/web/src/app/(auth)/login/page.tsx
- apps/web/src/app/(main)/layout.tsx
- apps/web/src/app/(main)/page.tsx
- apps/web/src/app/(main)/dashboard/page.tsx
- apps/web/src/app/layout.tsx
- apps/web/next.config.ts
- apps/web/tsconfig.json
- packages/ui/src/checkbox.tsx
- packages/ui/src/dropdown-menu.tsx
- packages/ui/src/avatar.tsx
