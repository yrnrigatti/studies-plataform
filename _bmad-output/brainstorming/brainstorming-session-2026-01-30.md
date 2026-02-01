---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Study platform with AI question generation from uploaded files'
session_goals: 'Generate ideas and insights for features, user experience, and handling the 30-page limit constraint'
selected_approach: 'ai-recommended'
techniques_used: ['Role Playing', 'Reversal Inversion', 'SCAMPER Method']
ideas_generated: []
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Yorran
**Date:** 2026-01-30

## Session Overview

**Topic:** Study platform with AI question generation from uploaded files
**Goals:** Generate ideas and insights for features, user experience, and handling the 30-page limit constraint

### Session Setup

We are brainstorming for a study platform where users upload documents to generate practice questions.
Key constraints/features:
- User uploads a file.
- System generates a selected amount of questions at a selected difficulty.
- **Constraint:** If file > 30 pages, user must select a contiguous 30-page range (e.g., 20-50).

We will explore ideas to make this flow seamless, handle the constraint creatively, and enhance the overall study experience.

## Technique Selection

**Approach:** AI-Recommended Techniques
**Analysis Context:** Study platform with AI question generation with focus on features, UX, and constraint handling.

**Recommended Techniques:**

- **Role Playing:** We will adopt perspectives (e.g., "Anxious Student", "Helpful Tutor") to uncover UX friction points and necessary features.
- **Reversal Inversion:** Specifically targeting the 30-page limit constraint. We will flip this "limitation" to ask how it could be the platform's *strongest* feature.
- **SCAMPER Method:** We will systematically modify the core "Upload -> Generate" flow to discover innovative feature additions and improvements.

**AI Rationale:** "Role Playing" ensures the UX is user-centric. "Reversal Inversion" is the most powerful way to turn a hard technical constraint into a product advantage. "SCAMPER" provides a structured checklist to ensure no feature opportunity is missed.

## Technique Execution Results

**Role Playing:**

- **Interactive Focus:** Explored the "Panic Monster" and "Exam Crammer" personas facing page limits and costs.
- **Key Breakthroughs:**
    - **Idea:** "Smart Chapter Scanner" - Scan TOC (first 10-30 pages) to let users select by Chapter/Topic Name.
    - **Idea:** "Visual Slider" - Manual selection tool for cost efficiency.
    - **Idea:** "Intelligent Chunking" - If a selected chapter > 30 pages, the system parses sub-headers (e.g., 3.1, 3.2) to offer smaller, affordable chunks.
    - **UX:** Unified flow where small docs (<30 pages) auto-select 100%, making the manual selection for large docs feel like a "power tool" rather than a limitation.
- **User Creative Strengths:** Strong focus on cost-efficiency and practical usability.

**Reversal Inversion:**

- **Interactive Focus:** Reframing the 30-page limit from a "restriction" to a "feature".
- **Key Breakthroughs:**
    - **Idea:** "Focus Mode" (Entry Plan) vs "Library Mode" (Pro Plan).
    - **Marketing Angle:** "The limit appears as an Anti-Procrastination feature."
    - **Concept:** "Don't upload the whole book. Upload what you need for tomorrow."
    - **Benefit:** Turns a technical/cost constraint into a pedagogical benefit (bite-sized learning).



    - **Idea:** "Treasure Hunt Mode" (Premium Feature).
    - **Concept:** AI generates questions *first*, user hunts for answers in the text.
    - **Mechanic:** Requires text rendering and AI validation of user selection/input.
    - **Differentiation:** Transforms the app from "Passive/Quizzing" to "Active/Targeted Reading".

**SCAMPER Method:**

- **S - Substitute:**
    - **Idea:** "Video Input" (Paste YouTube URL). **Status:** Deferred to Post-MVP.
- **C - Combine:**
    - **Ideas:** Flashcards, Scheduling, Peer Challenges.
    - **Decision:** **REJECTED for MVP**. Keeping focus strictly on "Questions Only" to ensure high-quality core experience.
- **M - Modify:**
    - **Idea:** "Socrates Mode" (AI asks "Why?" to deepen reasoning).
    - **Decision:** **Library Plan (Premium)**. High AI cost to evaluate reasoning.
    - **Idea:** "Focus/Micro Sessions". **MVP Candidate**.
- **P - Put to other uses:**
    - **Idea:** Export to PDF/Anki. **Status:** Backlog / Future.
- **E - Eliminate:**
    - **Idea:** Eliminate AI Grading for standard users to save cost.
    - **Decision:** Standard Feature = Self-Check (User types -> Reveals Answer -> Self-Reviews).
    - **Decision:** AI Grading = Exclusive to Socrates Mode (Premium).
- **Refinement:**
    - **Focus Mode:** Slider control (3 to 12 questions).
    - **Question Types:** User toggles between Multi-Choice or Type/Review.




## Idea Organization and Prioritization

**Release Strategy:**

**Theme 1: The Core MVP (The "Anti-Procrastination" Tool)**
_Focus: Fast, focused, low-cost study._
*   **Smart Upload:** Auto-checks file size. Small docs (<30p) auto-process.
*   **Smart Selection:** Large docs use "Smart TOC Scan" or "Visual Slider" to pick 30 pages.
*   **Focus Mode:** "Anti-Procrastination" branding. User selects 3-12 questions via slider.
*   **Grading:** User choices output type before generation:
    *   **Multi-Select:** AI generates options (Standard Quiz).
    *   **Self-Check:** User types answer, reveals Key, then self-reviews (Cost Saver).
*   **Chunking:** Breakdown large chapters into sub-topics.

**Theme 2: The Library Plan (Premium Power)**
_Focus: Advanced mastery and active reading._
*   **Treasure Hunt Mode:** Active reading where AI hides answers and user hunts in text.
*   **Socrates Mode:** AI asks "Why?" and grades the user's reasoning (High AI cost).
*   **Library Access:** Full book processing access.

**Theme 3: Future Backlog**
*   **Export:** PDF/Anki exports.
*   **Video:** YouTube URL input.

**Prioritization Results:**
*   **Top Priority:** Core MVP with Focus Mode and Self-Check Grading.
*   **Quick Win:** "Visual Slider" for low-cost page selection.
*   **Marketing Breakthrough:** "30-Page Limit = Anti-Procrastination Feature".

## Session Summary and Insights

**Key Achievements:**
- Generated 12+ features from 3 techniques.
- Successfully reframed the primary technical constraint (30 pages) as a marketing feature.
- Defined a clear cost-control strategy (Self-Check Grading & Manual Selection).

**Session Reflections:**
The session evolved from "coping with a limit" to "designing around a limit". The use of *Role Playing* identified the "Panic Monster" persona which drove the "Smart Selection" features. *Reversal Inversion* successfully flipped the negative constraint into a positive "Focus" benefit. *SCAMPER* helped refine the exact feature set for the MVP vs Premium.
