---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ['c:/Users/yorran/Desktop/Projetos/test/_bmad-output/brainstorming/brainstorming-session-2026-01-30.md']
date: 2026-01-30
author: Yorran
---

# Product Brief: test

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

**test** is an AI-powered study companion that transforms static documents into dynamic **Learning Paths**. Solving the problem of low retention and decision fatigue, the platform intelligently parses materials into a structured curriculum, offering a "One-Click Start" to study the most relevant topics immediately. By integrating active recall with a **Spaced Repetition Engine**, it tracks weak spots and adapts the flow, ensuring deep, long-term mastery rather than just temporary memorization.

---

## Core Vision

### Problem Statement

Learners struggle to retain information from large documents because passive reading is ineffective, and manual active recall methods are disjointed and time-consuming. Furthermore, the sheer volume of content creates decision fatigue ("Where do I start?"), leading to procrastination and "Illusion of Competence."

### Problem Impact

-   **Low Retention:** Without spaced repetition, knowledge decays rapidly.
-   **Decision Fatigue:** Large file sizes overwhelm users, preventing them from starting.
-   **Ineffective Study:** Users often re-read safe topics instead of challenging their weak spots.

### Why Existing Solutions Fall Short

-   **Manual & Disconnected:** Tools like Anki require manual card creation, breaking flow.
-   **Static Lists:** Competitors often just list "topics" without guiding the user on *what* to study next.
-   **Lack of Adaptation:** Most PDF AIs don't track what you've learned or forgotten over time.

### Proposed Solution

A seamless, adaptive study platform that:
1.  **Generates Curriculums:** Instantly parses huge docs into a structured **Learning Path**, not just a list.
2.  **Automates Flow:** Features a **"One-Click Start"** that intelligently serves up the next best topic or review session.
3.  **Guarantees Retention:** Uses a **Spaced Repetition Engine** to track "Weak Topics" and resurface them automatically.

### Key Differentiators

-   **From "Reader" to "Tutor":** We don't just display content; we structure it into a pedagogy-driven path.
-   **Adaptive Retention:** The system knows what you don't know and adapts the study flow accordingly.
-   **Zero-Friction Entry:** We eliminate the "what do I study?" panic with intelligent defaults.

### Strategic Sandbox (Future Backlog)
-   **Visual Gamification:** "Netflix-style" study interface with visual streaks and immediate "Play" buttons (Moved to Post-MVP).

## Target Users

### Primary Users (The Core)

**1. Maya (The Academic - "Urgent Need")**
*   **Profile:** Medical/Law student or Researcher facing high-stakes exams.
*   **Frustration:** "The Illusion of Competence." Spends hours re-reading without retaining. Overwhelmed by 500+ page PDFs.
*   **Success:** Passes exams with confidence. Uses the "30-page limit" to break procrastination.
*   **Role:** The **Growth Driver**. She needs the product *now* and will tell her cohort.

**2. Thomas (The Lifelong Learner - "Long-Term Value")**
*   **Profile:** Self-motivated reader of non-fiction, philosophy, or history.
*   **Frustration:** "Wasted Time." Reads valuable books but forgets the insights months later.
*   **Success:** "Library of Mind." Receives spaced-repetition questions from past reads, keeping knowledge fresh forever.
*   **Role:** The **Retention Driver**. He stays for years to build his personal knowledge base.

### Secondary Users

**3. David (The Busy Professional)**
*   **Profile:** Engineer/Manager needing to digest docs/specs quickly.
*   **Needs:** Low-friction, mobile-friendly, potential audio support.
*   **Strategy:** We serve him with the core features, but we optimize for Maya and Thomas first.

### User Journey (Unified)

1.  **Discovery:** Finds tool via "Study Faster" search.
2.  **Onboarding:** Uploads large PDF -> System chunks it -> "Start Chapter 1".
3.  **Active Study:** Reads topic -> Instant Quiz -> Feedback.
4.  **Retention:** "Weak Topics" are flagged and resurfaced in future sessions (The "Wisdom Nugget" daily review).

## Success Metrics

### User Success (The "Aha!" Moment)
*   **Mastery Rate:** Increasing % of correct answers over time (proving the "Tutor" works).
*   **Habit Formation:** Daily login streak > 3 days (proving "Anti-Procrastination").

### Business Objectives
*   **NORTH STAR: Deep Retention.** We measure success by *habit*, not just hype.
*   **Secondary:** Sustainable Growth (high activation) and Demand Validation (paywall hits).

### Key Performance Indicators (KPIs)
1.  **Activation Rate (Leading):** % of users who complete their *first* study session within 24 hours.
2.  **Session Completion Rate:** % of started quizzes that are finished (Quality Control).
3.  **Day-30 Retention (Lagging):** % of users who return 30 days after signup.
4.  **Paywall Hits:** % of users attempting to unlock "Unlimited Spaced Repetition" (Demand Validation).

## MVP Scope

### Core Features (The "Anti-Procrastination" Engine)

1.  **Hybrid Smart Upload:**
    *   **Auto-Scan:** AI scans the first 30 pages for a Table of Contents (TOC).
    *   **Success Path:** If TOC found, generates a "Learning Path" of topics.
    *   **Fallback Path:** If no TOC (or unstructured doc), prompts user for "Manual Page Range" (e.g., "Pages 20-50").
    *   **Constraint:** "30-Page Rule" enforced to prevent overwhelm.

2.  **Adaptive Dashboard:**
    *   **"One-Click Start":** Primary action button that instantly launches the most urgent study session.
    *   **Weak Topic Queue:** Visible list of "Topics to Review" so users trust the algorithm is tracking them.

3.  **Active Study Mode:**
    *   **Text-Based Quiz:** Multiple choice and "Self-Check" (Think -> Reveal -> Grade Self).
    *   **Instant Feedback:** Immediate grading to reinforce learning.

4.  **Spaced Repetition Backend:**
    *   **Algorithm:** Tracks "Weak Topics" and inserts review questions into future sessions automatically.

### Out of Scope for MVP
*   **Marketplace:** No selling/sharing of decks.
*   **Audio Support:** No Text-to-Speech or Audio Quizzes (Phase 2).
*   **Gamification:** No complex avatars or "Netflix" UI animations.
*   **Payments:** "Join Waitlist" button for Premium features (Demand tracking only).

### MVP Success Criteria
*   **Validation:** Achieved if **Activation Rate > 20%** (Users completing 1st session).
*   **Go/No-Go:** If Retention < 5% after 30 days, we pivot the core loop before adding new features.

### Future Vision
*   **The "Netflix" of Study:** A highly visual, binge-able interface for Phase 2.
*   **Audio Mode:** For the "Busy Professional" commuter use case.
*   **Smart Curriculum:** Advanced "Learning Path" generation for any document type.
