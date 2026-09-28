# WINTER ARC — Landing Page Architecture

> 90 Days. One Transformation.
> A 90-day personal transformation and accountability system.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Page Architecture](#4-page-architecture)
5. [Component Reference](#5-component-reference)
6. [Design System](#6-design-system)
7. [SEO Infrastructure](#7-seo-infrastructure)
8. [Signup Form](#8-signup-form)
9. [Interactivity](#9-interactivity)
10. [Backend Integration](#10-backend-integration)
11. [Deployment](#11-deployment)

---

## 1. Product Overview

**Winter Arc** is a 90-day personal transformation and accountability system.

| Property | Value |
|---|---|
| Campaign | Winter Arc 2026 |
| Core promise | 90 days. One transformation. Stop starting over. |
| Target audience | Young working professionals who repeatedly restart goals |
| Goal categories | Fitness, Health, Career, Learning, Business, Personal |
| Pricing | $12 / 90 days (founding cohort) |
| Stage | Demand validation — collecting early-access signups |

**The page answers 11 questions a first-time visitor needs answered:**

1. What is Winter Arc?
2. What problem does it solve?
3. Why is it not just another habit tracker?
4. What happens after I join?
5. What does the actual product look like?
6. What happens when I miss a day?
7. How does it adapt?
8. Who is it for?
9. How long is it?
10. How much does it cost?
11. What do I do next?

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.x (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS via `globals.css` |
| Font | Inter (Google Fonts — 400/600/700/800/900) |
| Rendering | Server Components + Client Components (`"use client"`) |
| Bundler | Turbopack (Next.js dev) |
| Deployment | Vercel (recommended) |

---

## 3. Project Structure

```
winterarc/
│
├── app/
│   ├── layout.tsx                  ← Root layout, metadata, JSON-LD
│   ├── page.tsx                    ← Main page — composes all sections
│   ├── globals.css                 ← Design system tokens, animations, utilities
│   ├── sitemap.ts                  ← /sitemap.xml route (Next.js Metadata API)
│   ├── robots.ts                   ← /robots.txt route (Next.js Metadata API)
│   │
│   └── components/
│       ├── Navbar.tsx              ← Sticky nav, scroll-aware, mobile hamburger
│       ├── HeroSection.tsx         ← Headline + interactive product dashboard
│       ├── ProblemSection.tsx      ← The consistency loop visualization
│       ├── ComparisonSection.tsx   ← Habit tracker vs Winter Arc
│       ├── ArcJourneySection.tsx   ← Day 1 → Day 90 timeline
│       ├── HowItWorksSection.tsx   ← 6-step system (GOAL→PLAN→EXECUTE→...)
│       ├── ArcTrackerSection.tsx   ← 90-day interactive dot grid
│       ├── RecoverySection.tsx     ← Recovery Mode product UI
│       ├── WeeklyReviewSection.tsx ← Weekly intelligence + adaptive plan
│       ├── LeagueSection.tsx       ← Accountability cohort UI
│       ├── GoalTypesSection.tsx    ← 6 goal categories
│       ├── WhoSection.tsx          ← This is for you / Not for you
│       ├── FoundingSection.tsx     ← $12 / 90 days pricing CTA
│       ├── FAQSection.tsx          ← 10-question accordion
│       ├── FinalCTA.tsx            ← "Your next 90 days start here"
│       ├── Footer.tsx              ← Minimal footer
│       └── SignupModal.tsx         ← Early-access signup form (modal)
│
├── public/
│   └── robots.txt                  ← Static robots fallback
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Page Architecture

The page is composed in `app/page.tsx` as a linear sequence of 17 sections.
Each section is a standalone Client Component with its own scroll-triggered animation.

```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
│  Sticky · Scroll-aware · Mobile menu    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  01  HERO                               │
│  Headline + Product Dashboard Visual    │
│  CTA: START YOUR ARC →                 │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  02  THE PROBLEM                        │
│  "You don't have a knowledge problem."  │
│  START → MISS → QUIT → RESTART loop    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  03  THE COMPARISON                     │
│  Habit tracker  |  Winter Arc           │
│  "Streak broken" | "Plan adjusts"       │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  04  SEE YOUR 90 DAYS                   │
│  Day 01 → Day 14 → Day 30 → Day 90     │
│  Emotional milestone timeline           │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  05  HOW IT WORKS                       │
│  GOAL → PLAN → EXECUTE                 │
│  → TRACK → ADAPT → CONTINUE            │
│  6-step grid with examples              │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  06  90-DAY ARC TRACKER                 │
│  Interactive dot grid (90 days)         │
│  States: Done · Missed · Recovery ·    │
│          Today · Upcoming               │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  07  RECOVERY MODE                      │
│  "You will miss days."                  │
│  Interactive recovery UI card           │
│  ACCEPT RECOVERY PLAN button            │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  08  WEEKLY INTELLIGENCE                │
│  Week 04 review card                    │
│  Pattern detected: Morning 91%          │
│  APPLY TO MY PLAN button                │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  09  ACCOUNTABILITY                     │
│  Cohort UI with consistency ranking     │
│  Adherence-based, not competitive       │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  10  GOAL TYPES                         │
│  Fitness · Health · Career              │
│  Learning · Business · Personal         │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  11  WHO IT'S FOR                       │
│  This is for you | Not for you          │
│  Two-column honest targeting            │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  12  FOUNDING COHORT                    │
│  $12 / 90 DAYS                          │
│  Limited to 50 members                  │
│  JOIN THE FOUNDING COHORT →            │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  13  FAQ                                │
│  10 questions · Accordion               │
│  Globally relevant, honest answers      │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  14  FINAL CTA                          │
│  "YOUR NEXT 90 DAYS START HERE."        │
│  START YOUR ARC →                      │
│  Founding cohort · $12 / 90 days        │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  FOOTER                                 │
│  Nav links · Social · Privacy · Contact │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  SIGNUP MODAL (overlaid, on demand)     │
│  Triggered by any CTA button            │
│  3 required fields + willingness check  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  MOBILE STICKY CTA (bottom bar)         │
│  Visible only on < 768px                │
└─────────────────────────────────────────┘
```

---

## 5. Component Reference

### `Navbar.tsx`
- **Type:** Client Component
- **Behavior:** Transparent on load → dark + blur on scroll (threshold: 40px)
- **Links:** How It Works · Your Arc · Pricing · FAQ (all smooth-scroll)
- **CTA:** `START YOUR ARC` → opens `SignupModal`
- **Mobile:** Hamburger menu with animated bars; full-screen dropdown

---

### `HeroSection.tsx`
- **Type:** Client Component
- **Left column:** Display headline, supporting copy, dual CTAs
- **Right column:** Interactive product dashboard card
  - Shows: Goal · Day counter · Progress bar · TODAY'S ACTIONS (checkboxes) · Stats row · Focus line
  - Checkboxes are **clickable** — toggling them updates state
- **Grid:** 2-column on desktop, stacked on mobile (< 900px)

---

### `ProblemSection.tsx`
- **Type:** Client Component
- **Headline:** "You don't have a knowledge problem. You have a consistency problem."
- **Visual:** 5-step horizontal cycle — START → MISS → MOMENTUM GONE → QUIT → RESTART
- **Callout:** Winter Arc response block (amber border)

---

### `ComparisonSection.tsx`
- **Type:** Client Component
- **Left:** Normal habit tracker — 4 checkboxes, "Streak broken" state in red
- **Right:** Winter Arc — GOAL → PLAN → ACTION → ADAPT flow, "Plan adjusts" state in green
- **Quote:** "You don't need a better Monday. You need a system that survives Tuesday."

---

### `ArcJourneySection.tsx`
- **Type:** Client Component
- **Visual:** Vertical timeline, 9 milestones from Day 01 to Day 90
- **Each milestone:** Day label · Tag · Emotional quote · System detail
- **Color coding:** neutral (Day 1) → warning (missed) → positive (recovery) → great (Day 90)
- **Disclaimer:** "Conceptual visualization — not a guarantee"

---

### `HowItWorksSection.tsx`
- **Type:** Client Component
- **Layout:** 3×2 grid of step cards
- **Steps:** Choose Goal · Build Plan · Show Up Daily · Track Arc · Recover · Adapt
- **Each card:** Step number · Icon · Headline · Description · Example box (amber)
- **Hover:** Subtle background lift

---

### `ArcTrackerSection.tsx`
- **Type:** Client Component (interactive)
- **State:** 90-day dot grid — pre-seeded with realistic data
  - Days 1–21: done (amber)
  - Day 9: missed (red)
  - Day 10: recovery (blue)
  - Day 22: missed (red)
  - Day 23: recovery (blue)
  - Day 24: today (white)
  - Days 25–90: upcoming (dark)
- **Interaction:** Hover any dot → tooltip shows "Day N — Status"
- **Summary:** 3-stat bar (Completed / Missed / Recovered)
- **Left column:** Explanation copy + legend + Recovery Mode callout

---

### `RecoverySection.tsx`
- **Type:** Client Component (interactive)
- **Left:** 4-step flow (Missed → Recovery Mode → Adjusted Plan → Continue) with colored row borders
- **Right:** Product UI card showing:
  - Yesterday: Missed workout (red)
  - Winter Arc Response: adjusted plan text
  - Today's Recovery Plan: 3 tasks with checkboxes
  - "ACCEPT RECOVERY PLAN" button — clicking it turns green, shows confirmation

---

### `WeeklyReviewSection.tsx`
- **Type:** Client Component (interactive)
- **Left:** Weekly review card
  - Consistency bar (87%)
  - Stats: Workouts · Active Days · Progress
  - Pattern detected: Morning 91% vs Evening 54%
  - Recommendation: Move to 7 AM
  - "APPLY TO MY PLAN" button — clicking confirms
- **Right:** Copy explaining behavioral intelligence vs motivational spam

---

### `LeagueSection.tsx`
- **Type:** Client Component
- **Left:** Copy explaining accountability philosophy
- **Right:** Cohort UI card
  - Header: cohort name + day counter
  - Summary: YOUR CONSISTENCY 87% · STILL ACTIVE 82%
  - Ranking: 4 members, adherence bars, YOU highlighted in amber
  - Footer: "Adherence = how consistently you follow your own plan"
- **Disclaimer:** "Accountability cohorts — planned for the first cohort"

---

### `GoalTypesSection.tsx`
- **Type:** Client Component
- **Layout:** 3×2 grid
- **Categories:** FITNESS · HEALTH · CAREER · LEARNING · BUSINESS · PERSONAL
- **Each card:** Icon · Category label · Example goal (italic amber) · Description
- **Hover:** Subtle amber background

---

### `WhoSection.tsx`
- **Type:** Client Component
- **Layout:** 2-column
- **Left (green):** 6 "This is for you if" statements
- **Right (red):** 5 "Not for you if" statements
- **Tone:** Honest, direct — no puffery

---

### `FoundingSection.tsx`
- **Type:** Client Component
- **Headline:** "YOUR NEXT 90 DAYS START HERE." + "ONE GOAL. ONE SYSTEM. ONE ARC." (amber)
- **Pricing card:** FOUNDING COHORT PRICING · $12 / 90 days · Limited 50 members
- **CTA:** JOIN THE FOUNDING COHORT →
- **Info grid:** Cohort Size: 50 · Duration: 90 Days · Payment: On Launch

---

### `FAQSection.tsx`
- **Type:** Client Component
- **Questions:** 10 globally relevant questions
- **Interaction:** Click to expand/collapse (max-height transition)
- **Topics:** What is it · Fitness app? · Other goals · Missed days · Adaptation · AI · Accountability · Duration · Cost · Launch

---

### `FinalCTA.tsx`
- **Type:** Client Component
- **Headline:** "YOUR NEXT 90 DAYS START HERE." (display size)
- **Supporting:** "One goal. One system. One Arc. 90 days is long enough to change something real."
- **CTA:** `START YOUR ARC →`
- **Sub-text:** "Founding cohort · $12 / 90 days"

---

### `SignupModal.tsx`
- **Type:** Client Component
- **Trigger:** Any CTA button on the page
- **Close:** ✕ button · Escape key · Click backdrop
- **Form fields:**

| Field | Type | Required |
|---|---|---|
| Email | `input[type=email]` | Yes |
| Your 90-Day Goal | `select` (6 categories) | Yes |
| Biggest Current Blocker | `select` (6 options) | Yes |
| Would you pay $12? | YES / MAYBE / NO buttons | Yes |
| First Name | `input[type=text]` | Optional |

- **Validation:** Client-side, inline red error messages + red border states
- **Submit:** Async handler → placeholder `console.log` (swap for real endpoint)
- **Success state:** Confirmation screen with amber diamond icon

---

### `Footer.tsx`
- **Type:** Client Component
- **Left:** WINTER ARC wordmark + tagline
- **Right:** Scroll-to links + external links (X, Instagram, Privacy, Contact)
- **Bottom bar:** Copyright · "Early access. Product in development."

---

## 6. Design System

Defined in `app/globals.css`.

### Color Tokens

```css
--black:       #080808   /* Page background */
--off-black:   #0f0f0f   /* Alternate background */
--surface:     #141414   /* Cards */
--surface-2:   #1a1a1a   /* Nested surfaces */
--border:      #252525   /* Primary borders */
--border-2:    #2f2f2f   /* Secondary borders */
--muted:       #555      /* Muted text */
--dim:         #999      /* Body text */
--light:       #ccc      /* Lighter text */
--white:       #fff      /* Primary text */
--accent:      #e8a830   /* Amber — primary accent */
--green:       #22c55e   /* Success / completed */
--red:         #ef4444   /* Error / missed */
--blue:        #3b82f6   /* Recovery mode */
```

### Typography Scale

| Class | Size | Weight | Use |
|---|---|---|---|
| `.display` | clamp(3.2rem → 8rem) | 900 | Hero headline |
| `.headline` | clamp(1.8rem → 3.8rem) | 800 | Section headings |
| `.title` | clamp(1.3rem → 2rem) | 700 | Sub-headings |
| `.eyebrow` | 0.62rem | 700 | Section labels (uppercase) |
| `.body-large` | clamp(0.95rem → 1.1rem) | 400 | Body copy |
| `.ui-label` | 0.58rem | 700 | Product UI labels |

### Buttons

```
.btn-primary   White bg → Amber on hover, uppercase, 800 weight
.btn-ghost     Transparent → Amber border/text on hover
```

### Animations

```
.fade-up       opacity 0 + translateY(28px) → visible on scroll
.fade-in       opacity 0 → visible on scroll
.delay-1–6     Staggered delays (80ms steps)
```

**Triggered by:** `IntersectionObserver` in each component (threshold: 0.08–0.12).

---

## 7. SEO Infrastructure

### Metadata (`app/layout.tsx`)

```typescript
title:       "Winter Arc — 90 Days. One Transformation."
description: "Winter Arc is a 90-day personal transformation and
              accountability system..."
keywords:    ["90 day challenge", "90 day goal", "goal accountability", ...]
canonical:   https://winterarc.com
```

### Open Graph / Twitter Card

```typescript
og:title       "Winter Arc — 90 Days. One Transformation."
og:description "Turn one meaningful goal into a system you can actually stick to."
og:image       https://winterarc.com/og-image.png  (1200×630)
twitter:card   summary_large_image
```

### JSON-LD Structured Data (Schema.org)

| Schema type | Purpose |
|---|---|
| `Organization` | Brand identity for search engines |
| `WebSite` | Site-level metadata |
| `SoftwareApplication` | Product listing with $12 offer |
| `FAQPage` | Rich result eligibility for FAQ section |

### Crawlability (`app/robots.ts`)

```
User-agent: *            → Allow: /
User-agent: OAI-SearchBot → Allow: /   (ChatGPT Search)
User-agent: GPTBot        → Allow: /   (OpenAI training)
User-agent: anthropic-ai  → Allow: /   (Claude)

Sitemap: https://winterarc.com/sitemap.xml
```

### Sitemap (`app/sitemap.ts`)

Auto-generated at `/sitemap.xml` via Next.js Metadata API.

---

## 8. Signup Form

### Fields collected

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Email | email input | ✅ | Validated format |
| 2 | 90-Day Goal | select | ✅ | 7 options incl. "Other" |
| 3 | Biggest Blocker | select | ✅ | 7 options incl. "Other" |
| 4 | Willingness to pay $12 | YES/MAYBE/NO | ✅ | Price validation |
| 5 | First Name | text | ❌ | Optional |

### Goal options
- Fitness — run, strength, endurance
- Health — sleep, nutrition, energy
- Career — get a job, get promoted, upskill
- Learning — programming, language, skill
- Business — launch, grow, ship
- Personal — morning routine, habits, focus
- Other

### Validation
- Client-side only (no server round-trip)
- Inline error messages below each field
- Red border on invalid fields
- Submit disabled during loading

### Submit handler location
`app/components/SignupModal.tsx` → `submit()` function

### Connecting a backend

Replace the placeholder in `submit()`:

```typescript
// Formspree (simplest)
const res = await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
  body: JSON.stringify(data),
});

// Supabase
const { error } = await supabase.from("signups").insert([data]);

// Airtable
await fetch(`https://api.airtable.com/v0/YOUR_BASE/Signups`, {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({ fields: data }),
});
```

---

## 9. Interactivity

Every interactive element is a Client Component.
No external state library (no Redux, Zustand, etc.) — all `useState` local.

| Element | Interaction | State |
|---|---|---|
| Hero dashboard checkboxes | Click to toggle | `tasksDone[]` array |
| Arc Tracker dots | Hover → tooltip | `active` (day number) |
| Recovery Mode button | Click to accept | `accepted` boolean |
| Weekly Review button | Click to apply | `applied` boolean |
| FAQ accordion | Click to expand | `open` (question index) |
| Signup form | Fill + submit | `data`, `errors`, `loading`, `success` |
| Signup modal | Open/close | `modalOpen` boolean in `page.tsx` |
| Navbar hamburger | Toggle mobile menu | `mobileOpen` boolean |

---

## 10. Backend Integration

The landing page is purely static/client-side.
No backend is needed to run the page.

When you're ready to collect signups for real:

### Option A — Formspree (zero infra)
1. Create form at formspree.io
2. Add `NEXT_PUBLIC_FORMSPREE_ID` to Vercel env vars
3. Replace `submit()` in `SignupModal.tsx`

### Option B — Supabase (recommended for growth)
1. Create `signups` table: `id, email, goal, blocker, willingness, name, created_at`
2. Add `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
3. `npm install @supabase/supabase-js`
4. Replace `submit()` with `supabase.from('signups').insert()`

### Option C — Airtable (best for non-technical founders)
1. Create a base with the 5 form fields as columns
2. Add `AIRTABLE_TOKEN` + `AIRTABLE_BASE_ID` to Vercel env vars
3. POST to Airtable REST API from a Next.js Route Handler

---

## 11. Deployment

### Recommended: Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Winter Arc launch"
git remote add origin https://github.com/YOUR_USERNAME/winterarc.git
git push -u origin main

# 2. Go to vercel.com → Import repo → Deploy
# No config needed — Vercel auto-detects Next.js

# 3. Every future deploy
git add . && git commit -m "update" && git push
```

### Environment variables on Vercel
Set in: **Vercel Dashboard → Project → Settings → Environment Variables**

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Form submissions via Formspree |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase auth |
| `AIRTABLE_TOKEN` | Airtable integration |

### Local development

```bash
npm run dev       # → http://localhost:3000
npm run build     # Production build check
npm run lint      # TypeScript + ESLint
```

---

## Key Copywriting Principles

These lines are used throughout the page and define the product voice:

```
"Stop restarting every Monday."
"You don't have a knowledge problem. You have a consistency problem."
"You don't need a better Monday. You need a system that survives Tuesday."
"One bad day shouldn't erase 20 good ones."
"Your life will interrupt your plan. Your plan should know how to respond."
"Motivation gets you started. Systems get you through Day 47."
"Don't restart. Recover."
"90 days is long enough to change something. Short enough to commit to."
```

---

*Built with Next.js 16 · Deployed on Vercel · winterarc.com*
