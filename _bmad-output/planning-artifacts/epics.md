---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/prd.md', 'c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/architecture.md']
---

# test - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for test, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can sign up and login via Email/Password.
FR2: Users can view and manage profile details.
FR3: Users can request permanent account deletion (GDPR compliance).
FR4: Users can upload large PDF files (up to 100MB).
FR5: System automatically extracts Table of Contents (TOC).
FR6: Users must select a processing chunk (max 30 pages) via TOC or Page Range.
FR7: System enforces 30-page hard limit at processing stage.
FR8: System rejects password-protected/encrypted PDFs with clear error.
FR9: "One-Click Start" initiates session immediately on selected chunk.
FR10: Users can manually select Difficulty (Easy/Medium/Hard) before generation.
FR11: Users take text-based multiple-choice quizzes with instant feedback (Correct/Incorrect + Explanation).
FR12: Users can rate questions (Thumbs Up/Down) for quality feedback.
FR13: System tracks "Last Recalled Status" & timestamp for every topic.
FR14: Dashboard generates "Weak Topic Queue" prioritized by algorithm.
FR15: Admins can view activity logs with specific upload error codes.

### NonFunctional Requirements

NFR1: AI Question Generation must complete within 15 seconds (30-pg chunk).
NFR2: Dashboard LCP under 1.5s on 4G mobile networks.
NFR3: Quiz Interface & Upload must support full Keyboard Navigation and Screen Readers (WCAG AA).
NFR4: System must queue jobs/notify users (not crash) if OpenAI API is down/rate-limited.
NFR5: Strict context truncation to maintain positive unit economics.
NFR6: Logical isolation (RLS) of user files.
NFR7: Parser URLs expire after 5 minutes.
NFR8: "Delete Account" must wipe all user data (GDPR).

### Additional Requirements

- Use Custom Turborepo starter: `npx create-turbo@latest . --package-manager pnpm --design-system`
- Implement Supabase Auth, Postgres and Storage
- Ensure Vercel deployment compatibility (Serverless/Edge)
- Use Zod for shared validation
- Use shadcn/ui for components and Tailwind CSS for styling
- Implement Zustand for global UI state and TanStack Query for server state
- PDF parsing optimization (failover to edge/worker if needed)
- REST API protocol with NestJS
- Security: Implement RLS and NestJS Guards as double-layer security

### FR Coverage Map

FR1: Epic 1 - User signup
FR2: Epic 1 - Profile management
FR3: Epic 1 - Account deletion (GDPR)
FR4: Epic 2 - PDF upload
FR5: Epic 2 - TOC extraction
FR6: Epic 2 - Chunk selection
FR7: Epic 2 - 30-page limit enforcement
FR8: Epic 2 - PDF validation
FR9: Epic 3 - One-Click Start
FR10: Epic 3 - Difficulty selector
FR11: Epic 3 - Quiz interface
FR12: Epic 3 - Question rating
FR13: Epic 4 - Recall tracking
FR14: Epic 4 - Weak topic queue
FR15: Epic 5 - Admin activity logs

## Epic List

### Epic 1: User Authentication & Profile Management
Users can securely sign up, log in, manage their profile and data privacy.
**FRs covered:** FR1, FR2, FR3

### Epic 2: Core Content Ingestion
Users can upload PDFs, view TOCs, and select focus chunks within system limits.
**FRs covered:** FR4, FR5, FR6, FR7, FR8

### Epic 3: AI-Powered Study Session
Users can instantly generate and take interactive quizzes from their selected content.
**FRs covered:** FR9, FR10, FR11, FR12

### Epic 4: Retention & Mastery System
Users can track progress and target weak topics through algorithmic spaced repetition.
**FRs covered:** FR13, FR14

### Epic 5: Administration & Ops
Admins can monitor activity and support users with technical issues.
**FRs covered:** FR15


## Epic 1: User Authentication & Profile Management

Users can securely sign up, log in, manage their profile and data privacy.

### Story 1.1: Initialize Turborepo & Core Project Structure [x]

As a developer,
I want to set up the foundational monorepo workspace with NestJS and Next.js,
So that I have a scalable codebase structure for all future development.

**Acceptance Criteria:**

**Given** I am setting up the project
**When** I run `npx create-turbo@latest . --package-manager pnpm --design-system`
**Then** A Turborepo workspace is created with `apps/web` (Next.js) and placeholder apps
**And** Shared packages are created: `packages/ui`, `packages/typescript-config`
**And** I can run `pnpm install` successfully

**Given** the Turborepo is initialized
**When** I create `apps/api` with NestJS (`nest new api`)
**Then** The NestJS application is properly configured in the monorepo
**And** I can run both `apps/web` and `apps/api` concurrently via Turborepo
**And** TypeScript compilation works across all packages

**Given** the monorepo structure exists
**When** I create `packages/database` for shared Prisma client
**Then** The package is properly configured with `prisma` directory
**And** Other apps can import from `@repo/database`

### Story 1.2: Configure Supabase & Database Schema (Users Table)

As a developer,
I want to set up Supabase and create the initial users table with RLS,
So that the application has a secure data layer for authentication.

**Acceptance Criteria:**

**Given** I have Supabase project credentials
**When** I configure environment variables (SUPABASE_URL, SUPABASE_ANON_KEY, DATABASE_URL)
**Then** Both `apps/web` and `apps/api` can connect to Supabase
**And** Prisma is configured to use the Supabase Postgres connection string

**Given** Prisma is configured
**When** I create the initial schema with `users` table
**Then** The schema includes: `id`, `email`, `created_at`, `updated_at` fields
**And** I can run `prisma migrate dev` successfully
**And** The migration creates the table in Supabase

**Given** the users table exists
**When** I enable Row Level Security (RLS) in Supabase
**Then** RLS policies are created: users can only read/update their own data
**And** The `auth.uid()` helper is used in RLS policies

### Story 1.3: Implement User Registration (Email/Password)

As a new user,
I want to sign up for an account using email and password,
So that I can access the study platform.

**Acceptance Criteria:**

**Given** I am on the registration page
**When** I enter a valid email and password (min 8 characters)
**Then** A new user account is created in Supabase Auth
**And** A corresponding record is created in the `users` table
**And** I am automatically logged in and redirected to the dashboard

**Given** I am on the registration page
**When** I enter an email that already exists
**Then** I see an error message: "Email already registered"
**And** No duplicate user is created

**Given** I am on the registration page
**When** I enter an invalid email format
**Then** I see a validation error before submission
**And** The form does not submit

**Given** I submit the registration form
**When** Supabase Auth is unavailable
**Then** I see a user-friendly error message (not a crash)
**And** I can retry the registration (NFR4)

### Story 1.4: Implement User Login & Session Management

As a registered user,
I want to log in with my email and password,
So that I can access my study materials and progress.

**Acceptance Criteria:**

**Given** I am on the login page
**When** I enter correct email and password
**Then** I am authenticated via Supabase Auth
**And** A session token is stored securely
**And** I am redirected to the dashboard

**Given** I am on the login page
**When** I enter incorrect credentials
**Then** I see an error message: "Invalid email or password"
**And** I remain on the login page

**Given** I am logged in
**When** I navigate to protected routes
**Then** My session is validated on each request
**And** Unauthorized users are redirected to login

**Given** I am logged in
**When** I close the browser and return later
**Then** My session persists (if "Remember Me" was checked)
**And** I do not need to log in again

**Given** I am on the login page
**When** Supabase Auth is down
**Then** I see a clear error message (NFR4)
**And** The application does not crash

### Story 1.5: Implement User Profile Management

As a logged-in user,
I want to view and update my profile information,
So that I can keep my account details current.

**Acceptance Criteria:**

**Given** I am logged in
**When** I navigate to the profile page
**Then** I see my current email and profile information
**And** The data is fetched from the `users` table via RLS

**Given** I am on the profile page
**When** I update my profile information (e.g., display name)
**Then** The changes are saved to the `users` table
**And** I see a success confirmation message
**And** The updated data is reflected immediately

**Given** I am on the profile page
**When** I try to update with invalid data
**Then** I see validation errors before submission
**And** The invalid data is not saved

**Given** I am updating my profile
**When** The API request fails
**Then** I see an error message
**And** The form preserves my unsaved changes

### Story 1.6: Implement Account Deletion (GDPR Compliance)

As a logged-in user,
I want to permanently delete my account and all associated data,
So that I can exercise my right to be forgotten.

**Acceptance Criteria:**

**Given** I am logged in
**When** I navigate to account settings and click "Delete Account"
**Then** I see a confirmation dialog warning about permanent deletion
**And** I must type "DELETE" or my email to confirm

**Given** I confirm account deletion
**When** I submit the deletion request
**Then** My user record is deleted from the `users` table
**And** My Supabase Auth account is deleted
**And** All associated data (future: PDFs, sessions, progress) is cascaded and deleted
**And** I am logged out immediately (NFR8, FR3)

**Given** account deletion is in progress
**When** The deletion process completes
**Then** I am redirected to a "Account Deleted" confirmation page
**And** I cannot log in with those credentials anymore

**Given** account deletion fails
**When** There is a server error during deletion
**Then** I see an error message explaining the issue
**And** My account remains active (no partial deletion)

## Epic 2: Core Content Ingestion

Users can upload PDFs, view TOCs, and select focus chunks within system limits.

### Story 2.1: Implement PDF Upload UI & Storage

As a logged-in user,
I want to upload PDF files to the platform,
So that I can generate study materials from my documents.

**Acceptance Criteria:**

**Given** I am on the upload page
**When** I drag and drop a PDF file (up to 100MB)
**Then** The file is uploaded to Supabase Storage in a private bucket
**And** A signed URL is generated with 5-minute expiry (NFR7)
**And** I see an upload progress indicator

**Given** I am uploading a file
**When** I select a file larger than 100MB
**Then** I see an error message: "File too large. Maximum 100MB"
**And** The upload is prevented (FR4)

**Given** I am uploading a file
**When** I select a non-PDF file
**Then** I see an error message: "Only PDF files are supported"
**And** The upload is rejected

**Given** a file is uploaded successfully
**When** The upload completes
**Then** A record is created in the database linking the file to my user
**And** I am automatically redirected to the TOC extraction screen

### Story 2.2: Implement PDF Parsing & TOC Extraction

As a logged-in user,
I want the system to extract the Table of Contents from my PDF,
So that I can easily navigate and select sections to study.

**Acceptance Criteria:**

**Given** I have uploaded a PDF
**When** The system begins processing
**Then** `pdf-parse` extracts text and identifies the TOC structure
**And** I see a loading indicator: "Analyzing your document..."

**Given** the PDF has a clear TOC structure
**When** TOC extraction completes
**Then** I see a structured list of chapters/sections with page numbers
**And** Each TOC item is clickable for selection (FR5)

**Given** the PDF does not have a clear TOC
**When** TOC extraction fails or returns empty
**Then** I see a fallback option: "Select by Page Range"
**And** I can manually enter start and end page numbers

**Given** the PDF is password-protected
**When** The parser attempts to read it
**Then** I see an error: "PDF is password-protected. Please upload an unlocked version."
**And** The file is rejected (FR8)

**Given** PDF parsing takes longer than 15 seconds
**When** The timeout is reached
**Then** I see a message suggesting to try a smaller chunk
**And** The system does not crash (NFR4)

### Story 2.3: Implement Chunk Selection & 30-Page Limit

As a logged-in user,
I want to select a specific section of my PDF (max 30 pages),
So that I can focus my study session and stay within system limits.

**Acceptance Criteria:**

**Given** I see the TOC or page range selector
**When** I select a TOC section
**Then** The system calculates the page count for that section
**And** If the section is ≤ 30 pages, it is highlighted as valid
**And** If the section is > 30 pages, I see a warning: "Section too large. Please select a smaller range."

**Given** I am using the page range selector
**When** I enter start page 1 and end page 30
**Then** The selection is valid and highlighted
**And** A "Continue" button is enabled

**Given** I am using the page range selector
**When** I enter a range exceeding 30 pages (e.g., 1-50)
**Then** I see an error: "Maximum 30 pages allowed. Please adjust your selection."
**And** The "Continue" button is disabled (FR6, FR7)

**Given** I have selected a valid chunk
**When** I click "Continue"
**Then** The selected chunk is stored in the session/database
**And** I am redirected to the "One-Click Start" screen

### Story 2.4: Implement Mobile-Responsive Upload Experience

As a mobile user,
I want to upload and navigate PDFs on my phone,
So that I can study on the go.

**Acceptance Criteria:**

**Given** I am on a mobile device (detected via viewport)
**When** I access the upload page
**Then** The UI is fully responsive with touch-friendly controls
**And** The file picker opens the native mobile file selector

**Given** I have uploaded a PDF on mobile
**When** I view the TOC
**Then** The TOC is scrollable and easy to tap on small screens
**And** Selected items are visually highlighted (NFR2 - performance)

**Given** I am selecting a page range on mobile
**When** I interact with number inputs
**Then** The mobile keyboard appears with numeric keypad
**And** The experience is smooth (LCP < 1.5s on 4G - NFR2)

## Epic 3: AI-Powered Study Session

Users can instantly generate and take interactive quizzes from their selected content.

### Story 3.1: Implement "One-Click Start" Quiz Generation

As a logged-in user,
I want to initiate quiz generation with a single click,
So that I can start studying immediately without configuration friction.

**Acceptance Criteria:**

**Given** I have selected a PDF chunk (≤ 30 pages)
**When** I click the "One-Click Start" button
**Then** The system immediately begins generating questions (no configuration wizard)
**And** I see a loading screen: "Generating your quiz..." with estimated time (FR9)

**Given** quiz generation is in progress
**When** The OpenAI API processes the chunk
**Then** Questions are generated within 15 seconds (NFR1)
**And** The system uses strict context truncation to manage tokens (NFR5)

**Given** quiz generation completes
**When** Questions are ready
**Then** I am automatically redirected to the quiz interface
**And** The quiz session is saved to the database

**Given** the OpenAI API is down or rate-limited
**When** Generation fails
**Then** I see a notification: "AI service temporarily unavailable. Please try again."
**And** The job is queued for retry (NFR4)
**And** The application does not crash

### Story 3.2: Implement Manual Difficulty Selector (Optional)

As a logged-in user,
I want to optionally select question difficulty before generation,
So that I can adjust the challenge level to my expertise.

**Acceptance Criteria:**

**Given** I am on the "One-Click Start" screen
**When** I see the difficulty selector
**Then** Three options are available: Easy, Medium (default), Hard
**And** "Medium" is pre-selected to minimize friction (FR10)

**Given** I select "Hard" difficulty
**When** I click "One-Click Start"
**Then** The AI prompt includes instructions for synthesis and scenario-based questions
**And** Generated questions are appropriately challenging

**Given** I select "Easy" difficulty
**When** Generation completes
**Then** Questions focus on definitions and basic recall
**And** The question complexity matches the selected level

**Given** I do not interact with the difficulty selector
**When** I click "One-Click Start"
**Then** The default "Medium" difficulty is used
**And** I am not blocked by needing to make a choice

### Story 3.3: Implement Interactive Quiz Interface

As a logged-in user,
I want to answer multiple-choice questions with instant feedback,
So that I can actively test my knowledge and learn from mistakes.

**Acceptance Criteria:**

**Given** I am in a quiz session
**When** I view a question
**Then** I see the question text and 4 multiple-choice options
**And** All options are clearly readable with accessible contrast (NFR3 - WCAG AA)

**Given** I select an answer
**When** I click "Submit Answer"
**Then** I immediately see if my answer was correct or incorrect
**And** An explanation is displayed for the correct answer
**And** My response is recorded in the database (FR11)

**Given** I answer a question
**When** I click "Next Question"
**Then** The next question in the session is displayed
**And** My progress is shown (e.g., "Question 5 of 20")

**Given** I am using keyboard navigation
**When** I press Tab and Enter keys
**Then** I can navigate and answer questions without a mouse (NFR3 - WCAG AA)

**Given** I use a screen reader
**When** I interact with the quiz
**Then** All questions, options, and feedback are properly announced (NFR3 - WCAG AA)

### Story 3.4: Implement Question Rating System

As a logged-in user,
I want to rate questions with thumbs up/down,
So that the system can improve question quality over time.

**Acceptance Criteria:**

**Given** I have answered a question and seen the feedback
**When** I see thumbs up/down icons
**Then** I can click one to rate the question quality
**And** My rating is saved to the database (FR12)

**Given** I rate a question
**When** I click thumbs up
**Then** The icon is highlighted/filled to confirm my rating
**And** A brief "Thank you" message appears

**Given** I rate a question
**When** I click thumbs down
**Then** The rating is logged for quality analysis
**And** Future iterations can use this feedback to improve prompts

**Given** I do not rate a question
**When** I move to the next question
**Then** The question is marked as "not rated"
**And** I am not blocked from continuing the quiz

## Epic 4: Retention & Mastery System

Users can track progress and target weak topics through algorithmic spaced repetition.

### Story 4.1: Implement Recall Status Tracking

As a logged-in user,
I want the system to track when I last recalled each topic correctly,
So that spaced repetition can reinforce my weak areas.

**Acceptance Criteria:**

**Given** I answer a quiz question
**When** I submit my answer
**Then** The system records: topic, timestamp, correct/incorrect status
**And** This data is stored in a `recall_history` or similar table (FR13)

**Given** I answer correctly
**When** The response is recorded
**Then** The topic's "last_recalled_at" timestamp is updated
**And** The topic is marked as "strong" if answered correctly multiple times

**Given** I answer incorrectly
**When** The response is recorded
**Then** The topic is flagged as "weak"
**And** The topic's priority increases for the weak topic queue

**Given** I complete a quiz session
**When** All responses are processed
**Then** My overall progress dashboard is updated with mastery metrics
**And** I can view my recall history per topic

### Story 4.2: Implement Weak Topic Queue Algorithm

As a logged-in user,
I want the system to generate a prioritized queue of weak topics,
So that I can focus my study time on areas that need reinforcement.

**Acceptance Criteria:**

**Given** I have answered multiple quiz sessions
**When** The system calculates weak topics
**Then** Topics are ranked by: recency of incorrect answers, frequency of errors
**And** Topics not recalled in 14+ days are prioritized higher (FR14)

**Given** I view my dashboard
**When** The weak topic queue is displayed
**Then** I see a list of top 5-10 weak topics
**And** Each topic shows: last studied date, success rate

**Given** I click "Start Weak Topic Session"
**When** A new quiz is generated
**Then** The AI is prompted to focus on the weak topics from the queue
**And** The difficulty is adjusted based on my past performance

**Given** I have no weak topics (all strong)
**When** I view the dashboard
**Then** I see a congratulatory message: "Great job! All topics are strong."
**And** I am encouraged to review older material or upload new content

## Epic 5: Administration & Ops

Admins can monitor activity and support users with technical issues.

### Story 5.1: Implement Admin Activity Logs Dashboard

As an admin,
I want to view activity logs with specific error codes,
So that I can quickly diagnose and resolve user issues.

**Acceptance Criteria:**

**Given** I am logged in as an admin
**When** I navigate to the admin dashboard
**Then** I see a real-time activity log of user actions
**And** The log includes: timestamp, user ID, action type, status (success/error)

**Given** I am viewing the activity log
**When** An error occurs (e.g., "PDF_PASSWORD_PROTECTED")
**Then** The error code is clearly displayed in the log
**And** I can see the full error details by clicking the entry (FR15)

**Given** I see a specific error code
**When** I click on it
**Then** A modal or detail panel shows: user info, file details, stack trace (if applicable)
**And** I have a template response to send to the user

**Given** I need to filter logs
**When** I use the search/filter interface
**Then** I can filter by: user, error type, date range
**And** Results update immediately

**Given** I am troubleshooting
**When** I identify a pattern of errors
**Then** I can export the logs as CSV for further analysis
**And** The system provides insights (e.g., "50 password-protected PDF errors this week")

