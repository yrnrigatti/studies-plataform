---
stepsCompleted: [step-01-init, step-02-context, step-03-starter, step-04-decisions, step-05-patterns, step-06-structure, step-07-validation]
inputDocuments:
  - c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/prd.md
workflowType: 'architecture'
project_name: 'test'
user_name: 'Yorran'
date: '2026-01-30'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The system requires a robust **Content Ingestion** pipeline capable of handling large PDFs (up to 100MB) with a strict 30-page processing limit. **User Management** will likely leverage Supabase Auth for seamless integration. The core value driver is the **Study Session** (AI-generated quizzes) and **Retention Engine** (spaced repetition algorithm). **Administration** provides oversight on errors. Architecturally, using Supabase consolidates separate DB and object storage services.

**Non-Functional Requirements:**
- **Performance:** High priority on low latency for AI generation (<15s).
- **Security:** RLS (Row Level Security) is a native First-Class Citizen in Supabase, aligning perfectly with the data isolation requirement.
- **Simplicity:** Reducing infrastructure complexity by using managed Supabase services.

**Scale & Complexity:**
- Primary domain: Web Application (EdTech).
- Complexity level: Medium.
- Estimated architectural components: ~4 (Frontend, API/Backend, Worker, Supabase [DB/Storage/Auth]).

### Technical Constraints & Dependencies
- **Stack:** Nest.js (Backend), Next.js (Frontend), Prisma (connected to Supabase Postgres).
- **Infrastructure:** **Supabase** (replacing standalone Postgres and S3).
    -   **Database:** Supabase Postgres.
    -   **Storage:** Supabase Storage (for PDFs).
    -   **Auth:** Supabase Auth (Recommended for RLS synergy).
- **AI/ML:** OpenAI API, `pdf-parse`.

### Cross-Cutting Concerns Identified
- **Authentication & Authorization:** Consistent user context across API and Supabase RLS policies.
- **Error Handling:** Unified approach for UI, API, and Supabase interaction errors.
- **Observability:** logging AI token usage.

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack Monorepo** (TypeScript) - Integrating NestJS (Backend) and Next.js (Frontend).

### Starter Options Considered

- **Standard Separate Repos:** (create-next-app + nest new). Simple but leads to code duplication (types/DTOs).
- **Existing "Mega-Boilerplates":** Often outdated or include too much bloat (unwanted UI libs, old Auth logic).
- **Custom Turborepo (Recommended):** Uses Vercel's official `create-turbo` to scaffold the workspace, then we inject NestJS. Best for long-term scale and type safety.

### Selected Starter: Custom Turborepo Setup

**Rationale for Selection:**
Your requirement for **NestJS** (for robust AI workers) and **Next.js** (for SEO/UI) demands a monorepo to share TypeScript interfaces and the Prisma client. Turborepo is the industry standard for this. It allows us to keep the backend and frontend in sync without deploying them together if we choose not to.

**Initialization Command:**

```bash
npx create-turbo@latest . --package-manager pnpm --design-system
```
*(We will then replace the default `docs` app with a `nest new api` application during implementation)*

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- **TypeScript:** Enforced across the entire stack.
- **Node.js/Bun:** Backend runtime.

**Code Organization:**
- **apps/web:** Next.js (Frontend).
- **apps/api:** NestJS (Backend - to be created).
- **packages/ui:** Shared React components.
- **packages/database:** Shared Prisma schema & client (connected to Supabase).
- **packages/typescript-config:** Shared strict TSConfig.

**Development Experience:**
- **Turborepo:** Parallel builds and caching (fast CI/CD).
- **pnpm:** Efficient package management.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Deployment:** Unified Vercel (Serverless).
- **API Protocol:** REST.
- **State Management:** Zustand + TanStack Query.

**Important Decisions (Shape Architecture):**
- **Validation:** Zod (Shared schemas).
- **Components:** shadcn/ui.

**Deferred Decisions:**
- **WebSockets:** Not natively supported in standard Vercel functions; MVP will use polling if needed.

### Data Architecture

- **Database:** Supabase Postgres.
- **ORM:** Prisma.
- **Validation:** `Zod` (Type-safe schemas shared via monorepo packages).
- **Migration:** `Prisma Migrate`.

### Authentication & Security

- **Auth:** Supabase Auth (Client-side handling + Server-side verification).
- **Authorization:** **RLS** (Primary data security) + NestJS Guards (API security).

### API & Communication Patterns

- **Protocol:** REST (NestJS Standard).
- **Documentation:** Swagger/OpenAPI.
- **Error Handling:** Standardized JSON error envelopes (NestJS Exception Filters).

### Frontend Architecture

- **State Management:** `Zustand` (Global UI state), `TanStack Query` (Server state/caching).
- **Styling:** Tailwind CSS (v3/v4).
- **Components:** `shadcn/ui` (Radix UI based).

### Infrastructure & Deployment

- **Strategy:** Monorepo deployed to **Vercel**.
- **Adaptation:** NestJS will use a serverless adaptor (e.g., `@vercel/node` entry point).
- **Constraint Management:** Long-running AI/PDF tasks must be optimized or offloaded to **Supabase Edge Functions** if they exceed Vercel's timeout limits.

### Decision Impact Analysis

**Implementation Sequence:**
1.  Initialize Turborepo (NestJS + Next.js).
2.  Configure Supabase & Environment.
3.  Set up Shared Packages (`ui`, `database`, `config`).
 Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
4 areas where AI agents could make different choices (Naming, Structure, Format, Process).

### Naming Patterns

**Database Naming Conventions:**
- **Tables:** `snake_case` plural (e.g., `users`, `subscription_plans`).
- **Columns:** `snake_case` (e.g., `user_id`, `created_at`).
- **Foreign Keys:** `snake_case` (e.g., `user_id`).

**API Naming Conventions:**
- **Endpoints:** REST standard, kebab-case for paths if needed (e.g., `/users`, `/users/:id/settings`).
- **JSON Fields:** `camelCase` (e.g., `{ "firstName": "John" }`).
- **Parameters:** `camelCase` (e.g., `?page=1&limit=10`).

**Code Naming Conventions:**
- **Files:** `kebab-case` (e.g., `auth.service.ts`, `user-profile.component.tsx`).
- **Variables/Functions:** `camelCase` (e.g., `getUserData`, `isLoggedIn`).
- **Classes/Components:** `PascalCase` (e.g., `AuthService`, `UserProfile`).

### Structure Patterns

**Project Organization:**
- **Monorepo:** Turborepo structure (`apps/*`, `packages/*`).
- **Apps:** `apps/web` (Next.js), `apps/api` (NestJS).
- **Packages:** `packages/ui` (Shared Components), `packages/database` (Prisma).
- **Feature Modules:** Logic organized by feature (e.g., `modules/auth/`) containing all related files.

**File Structure Patterns:**
- **Config:** Root level or package specific (e.g., `turbo.json`, `tsconfig.json`).
- **Tests:** Co-located with source files `*.spec.ts` (backend) or `*.test.tsx` (frontend).

### Format Patterns

**API Response Formats:**
- **Success:** `{ data: T, meta?: any }`
- **Error:** `{ error: { code: string, message: string, details?: any } }`

**Data Exchange Formats:**
- **Dates:** ISO 8601 UTC strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- **Booleans:** `true`/`false` (JSON).

### Communication Patterns

**Event System Patterns:**
- **Naming:** Past tense describing event (e.g., `user.created`).
- **Payload:** `{ entityId: string, timestamp: string, payload: any }`.

**State Management Patterns:**
- **Server:** React Query (TanStack Query) for async data.
- **Client:** Zustand for global UI state.

### Process Patterns

**Error Handling Patterns:**
- **Backend:** Global Exception Filter -> JSON.
- **Frontend:** Error Boundaries for crash protection, Toasts for API errors.

**Loading State Patterns:**
- **Naming:** `isLoading`, `isSubmitting`.
- **UI:** Skeleton loaders for content, Spinners for actions.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use **kebab-case** for ALL file names.
- Use **camelCase** for JSON properties (API).
- Isolate DB access to `packages/database` or specific NestJS modules.

**Pattern Enforcement:**
- Verified via ESLint and strict TSConfig.
- Pattern violations documented in PR reviews.

### Pattern Examples

**Good Examples:**
- File: `user-controller.ts`
- Table: `users`
- API Return: `{ "data": { "userId": "123" } }`

**Anti-Patterns:**
- File: `UserController.ts` (Wrong case)
- Column: `UserId` (Wrong case)
- API Return: Directly returning array `[{...}]` without wrapper.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
project-root/
├── apps/
│   ├── api/ (NestJS Backend)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/ (Supabase Guard, User Context)
│   │   │   │   ├── content/ (PDF Parsing, Upload Handling)
│   │   │   │   │   └── interfaces/parser.interface.ts (Boundary)
│   │   │   │   ├── quiz/ (OpenAI Generation, Spaced Repetition)
│   │   │   │   └── users/ (Profile Management)
│   │   │   ├── common/ (Global Filters, Guards, Pipes)
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── test/ (E2E Tests)
│   │   └── package.json
│   │
│   └── web/ (Next.js Frontend)
│       ├── app/
│       │   ├── (auth)/login/page.tsx
│       │   ├── (dashboard)/ (Sidebar Layout)
│       │   │   ├── layout.tsx
│       │   │   ├── upload/page.tsx
│       │   │   └── library/page.tsx
│       │   ├── (focus)/ (Minimal Layout)
│       │   │   ├── layout.tsx
│       │   │   └── study/[sessionId]/page.tsx
│       │   ├── api/
│       │   └── page.tsx (Landing)
│       ├── components/
│       │   ├── features/
│       │   └── layout/
│       ├── lib/
│       └── package.json
│
├── packages/
│   ├── database/ (Prisma Shared)
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/index.ts
│   │
│   ├── ui/ (Shared Design System)
│   │   ├── src/components/
│   │   └── package.json
│   │
│   └── config/ (Shared TSConfig, Eslint)
│
├── turbo.json
└── package.json
```

### Architectural Boundaries

**API Boundaries:**
- **External:** `GET /api/v1/*` exposed by NestJS.
- **Internal:** Next.js uses a `library/api-client.ts` which calls NestJS endpoints.
- **Auth:** Supabase Auth Token passed in `Authorization: Bearer` header.

**Component Boundaries:**
- **UI:** `packages/ui` contains *dumb* components (Button, Card).
- **Web:** `apps/web/components` contains *smart* connected components (QuizPlayer, UploadForm).

**Data Boundaries:**
- **Database:** ONLY `apps/api` (and `packages/database` scripts) writes to SQL.
- **Frontend:** NEVER connects to SQL directly; must go through API or Supabase Client (for Auth/Storage).

### Requirements to Structure Mapping

**Feature: Content Ingestion**
- **UI:** `apps/web/app/(dashboard)/upload/page.tsx`
- **Upload Logic:** `modules/content/content.controller.ts`
- **PDF Parsing:** Uses `ParserInterface` implementation to allow future swap to Edge Function.

**Feature: Study Session (AI)**
- **UI:** `apps/web/app/(focus)/study/[sessionId]/page.tsx` (Distraction-free)
- **Quiz Engine:** `modules/quiz/services/quiz-engine.service.ts`

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All decisions work together. The **Turborepo** structure correctly isolates the **NestJS** API and **Next.js** Frontend, allowing them to be deployed independently on Vercel or together. **Supabase** acts as the unifying data layer. The **ParserInterface** boundary correctly safeguards against Vercel's serverless timeout limits.

**Pattern Consistency:**
Implementation patterns (naming, structure) fully support the Monorepo + NestJS separation of concerns.

**Structure Alignment:**
The project structure explicitly supports the "Feature Module" pattern in NestJS and "Route Group" pattern in Next.js.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
- **Content Ingestion (FR4-8):** Handled by `apps/api/src/modules/content` with `ParserInterface` for flexibility.
- **Study Session (FR9-12):** UI handled by `apps/web/app/(focus)/study` for distraction-free learning. Logic in `quiz-engine.service.ts`.
- **Retention Engine (FR13-14):** Spaced repetition logic resides in `apps/api/src/modules/quiz`, persisting state to Supabase.

**Non-Functional Requirements Coverage:**
- **Performance:** Addressed via Vercel Edge/Serverless split and potential Worker offloading for PDF parsing.
- **Security:** RLS policies in Supabase + NestJS Guards provide double-layer security.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions (Deployment, Auth, State) are documented.

**Structure Completeness:**
Directory tree is complete, including shared packages (`database`, `ui`).

**Pattern Completeness:**
Naming and communication patterns are defined.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- **Separation of Concerns:** Clear distinction between Marketing/Dashboard/Study UI and Backend Logic.
- **Scalability:** Monorepo allows independent scaling of API and Web.
- **Type Safety:** Shared types via Turborepo + Prisma.

**Areas for Future Enhancement:**
- **Background Workers:** Moving PDF parsing to a dedicated worker if Vercel limits are hit.
- **WebSockets:** Implementation for real-time study capability.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize the Turborepo workspace.

```bash
npx create-turbo@latest . --package-manager pnpm --design-system
```
