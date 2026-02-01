---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['c:/Users/yorran/Desktop/Projetos/test/_bmad-output/planning-artifacts/product-brief-test-2026-01-30.md', 'c:/Users/yorran/Desktop/Projetos/test/_bmad-output/brainstorming/brainstorming-session-2026-01-30.md']
workflowType: 'prd'
classification:
  projectType: Web App
  domain: EdTech
  complexity: Medium
  projectContext: Greenfield
---

# Product Requirements Document - test

**Author:** Yorran
**Date:** 2026-01-30

## 1. Executive Summary

**Vision:** An AI-powered "Anti-Procrastination" study platform that transforms overwhelming PDF materials into bite-sized, active learning sessions.
**Core Differentiator:** Unlike competitors that promise to "read everything," we enforce a **30-page focus limit** and a **"One-Click Start"** experience to solve analysis paralysis.
**Target Audience:** High-stakes learners (Med Students like "Maya"), Professionals (Compliance Officers like "David"), and Lifelong Learners (Commuters like "Thomas").

## 2. Success Metrics

### User Success
- **Mastery Rate:** Increasing % of correct answers over time (proving the "Tutor" works).
- **Early Engagement Streak:** > 3-day active use (leading indicator for habit formation).
- **Habit Formation Streak:** > 21-day active use (behavioral psychology threshold).
- **User Sentiment Score:** Average session rating > 4.0/5.0.

### Business Success
- **Activation Rate:** > **30%** of users complete their first study session within 24 hours.
- **Day-30 Retention:** > **10%** (PLG benchmark for habit-forming apps).
- **Session Completion Rate:** > 80% of started quizzes are finished.
- **Paywall Conversion Rate:** % of users who upgrade after hitting free tier limits.

### Technical Success
- **Generation Latency:** < 15 seconds to parse a 30-page chunk and generate initial questions.
- **System Health:** 99.9% uptime during active study sessions.
- **Parsing Reliability:** > 98% success rate for standard PDF uploads.

## 3. Product Scope & Roadmap

### MVP Strategy: "Systemized Anti-Procrastination"
**Philosophy:** Trade feature breadth for speed-to-value. Users must go from Upload -> Quiz in <30 seconds.
**Team:** Single Developer (Full Stack NestJS/Next.js).

### Phase 1: MVP (Active Now)
**Core Value:** Immediate Action & Focus.
- **Smart Upload:** PDF Parsing (Limit: 30 pages) w/ TOC extraction.
- **One-Click Start:** Auto-generation of quizzes without configuration wizard.
- **Manual Difficulty Selector:** "Hard/Medium/Easy" toggle during quiz generation.
- **Basic Spaced Repetition:** "Weak Topic" queue logic.
- **Mobile Web View:** Responsive design for commuter usage.

### Phase 2: Growth (Habit & Retention)
**Core Value:** Stickiness.
- **Gamification Layer:** Streaks, Daily Targets, Badges.
- **Audio/TTS:** "Listen to my Quiz" mode.
- **Advanced Analytics:** Mastery Curves and "Forgetfulness" alerts.
- **Real-Time Sync:** Web Sockets for multi-device instant state.

### Phase 3: Expansion (Vision)
**Core Value:** Platform & Scale.
- **Universal Input:** Video/YouTube to Quiz processing.
- **Native Mobile App:** React Native wrapper or Native iOS/Android.
- **Collaborative Decks:** Share "Difficult" sets with peers (No Marketplace).

## 4. User Journeys

### 1. Maya: The "Panic-to-Power" Flow (Core Success)
**Scenario:** Tuesday before Friday exams. 500-page PDF. Overwhelmed.
**Journey:**
1.  **Action:** Drags massive PDF to upload.
2.  **System:** "Whoa, comprehensive doc! Let's focus." Launches **Smart Scan** showing TOC.
3.  **Choice:** Selects "Chapter 4" (30 pgs).
4.  **Climax:** Hits **"One-Click Start"**. No settings. 10s later -> First Question.
5.  **Result:** 15 mins later, 20 questions done. Dopamine hit. Relief.

### 2. Thomas: The "Commuter Habit" (Retention)
**Scenario:** 15 mins on a train. Needs to retain "Psychology of Money" concepts.
**Journey:**
1.  **Action:** Opens Web App on mobile.
2.  **System:** Dashboard shows **"Weak Topic"** queue.
3.  **Climax:** Starts **Micro-Session**. Getting questions on items he forgot 14 days ago.
4.  **Result:** Commute finished productive. "Library of Mind" reinforced.

### 3. David: The "Goldilocks" Adjustment (Expert)
**Scenario:** Compliance expert learning new regs.
**Journey:**
1.  **Action:** Auto-starts session.
2.  **Conflict:** Questions too easy ("Definition of X?").
3.  **Climax:** Toggles **Difficulty Selector** to **"Hard"**. Questions shift to synthesis/scenarios.
4.  **Result:** Engaged. Giving "Thumbs Up" to question quality.

### 4. Admin: The "Guardian" (Support)
**Scenario:** User ticker: "Upload failed!"
**Journey:**
1.  **Action:** Logs into Backoffice. Checks **Activity Logs**.
2.  **Discovery:** Error: "PDF_PASSWORD_PROTECTED".
3.  **Resolution:** Sends template reply. Ticket closed <2 mins.

## 5. Functional Requirements

### User Management (Auth)
- **FR1:** Users can sign up and login via Email/Password.
- **FR2:** Users can view and manage profile details.
- **FR3:** Users can request permanent account deletion (GDPR compliance).

### Content Ingestion (Smart Upload)
- **FR4:** Users can upload large PDF files (up to 100MB).
- **FR5:** System automatically extracts Table of Contents (TOC).
- **FR6:** Users must select a processing chunk (max 30 pages) via TOC or Page Range.
- **FR7:** System **enforces 30-page hard limit** at processing stage.
- **FR8:** System rejects password-protected/encrypted PDFs with clear error.

### Study Session
- **FR9:** **"One-Click Start"** initiates session immediately on selected chunk.
- **FR10:** Users can manually select **Difficulty** (Easy/Medium/Hard) before generation.
- **FR11:** Users take text-based multiple-choice quizzes with instant feedback (Correct/Incorrect + Explanation).
- **FR12:** Users can rate questions (Thumbs Up/Down) for quality feedback.

### Retention Engine
- **FR13:** System tracks "Last Recalled Status" & timestamp for every topic.
- **FR14:** Dashboard generates **"Weak Topic Queue"** prioritized by algorithm.

### Administration
- **FR15:** Admins can view activity logs with specific upload error codes.

## 6. Non-Functional Requirements (Quality Attributes)

### Performance
- **NFR1 (Generation Latency):** AI Question Generation must complete within **15 seconds** (30-pg chunk).
- **NFR2 (Page Speed):** Dashboard LCP under **1.5s** on 4G mobile networks.

### Accessibility (EdTech Standard)
- **NFR3 (WCAG AA):** Quiz Interface & Upload must support full Keyboard Navigation and Screen Readers.

### Reliability & Cost
- **NFR4 (Graceful Failure):** System must queue jobs/notify users (not crash) if OpenAI API is down/rate-limited.
- **NFR5 (Token Economy):** Strict context truncation to maintain positive unit economics.

### Security & Compliance
- **NFR6 (Data Isolation):** Logical isolation (RLS) of user files.
- **NFR7 (Ephemeral Access):** Parser URLs expire after 5 minutes.
- **NFR8 (Privacy):** "Delete Account" must wipe all user data (GDPR).

## 7. Technical Architecture & Constraints

### Stack & Architecture
- **Architecture:** **Modular Monolith** (Nest.js). Modules: `Auth`, `Content`, `AI`.
- **Frontend:** Next.js (React) - Server-Side Rendering (SSR) for SEO on public pages.
- **Backend:** Nest.js + Prisma ORM + Postgres.
- **State:** Fresh-on-load sync (REST/GraphQL). No Web Sockets for MVP.

### Implementation Specifics
- **PDF Parsing:**
    - Primary: `pdf-parse` (Node.js) for cost/speed.
    - Fallback: Investigation task for `pdf.js` / `LlamaParse` if layout issues arise.
- **File Storage:** Private S3 buckets (not public).
- **AI Safety:** System prompts must include safeguards against generating toxic/illegal content from source text.

### Domain Constraints
- **Copyright:** Terms of Service must state user liability for uploaded content.
- **Target Audience:** Strictly 18+ (Higher Ed/Pro) to avoid K-12 COPPA complexity.
