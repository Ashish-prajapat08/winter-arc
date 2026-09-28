# WINTER ARC — Pre-Launch Setup Guide

Complete step-by-step setup for all integrations before going live.

---

## Quick Checklist

- [ ] 1. Supabase — create project + run schema
- [ ] 2. Resend — create account + verify domain
- [ ] 3. Set environment variables (local + Vercel)
- [ ] 4. Push to GitHub
- [ ] 5. Deploy to Vercel
- [ ] 6. Add production domain
- [ ] 7. Test full signup flow end-to-end

---

## 1. Supabase (Database)

**Goal:** Store every signup with email, goal, blocker, UTM params, referrer.

### Create project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `winterarc` | Region: pick closest to your users
3. Save the database password somewhere safe

### Run the schema
1. Supabase Dashboard → **SQL Editor** → New Query
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. Click **Run**

### Get your API keys
Supabase Dashboard → **Settings → API**

| Key | Where to copy |
|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` public key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` secret key | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ Never expose `service_role` in client-side code. It's only used in `app/api/signup/route.ts` (server-side).

---

## 2. Resend (Email confirmation)

**Goal:** Send a branded confirmation email after every successful signup.

### Create account
1. Go to [resend.com](https://resend.com) → Sign up (free: 3,000 emails/month)
2. **Domains → Add Domain** → enter `winterarc.com`
3. Add the DNS records shown (SPF, DKIM) to your domain registrar
4. Wait for verification (5–30 min)
5. **API Keys → Create API Key** → copy it

| Key | Value |
|---|---|
| `RESEND_API_KEY` | Your API key from Resend |
| `RESEND_FROM_EMAIL` | `noreply@winterarc.com` (must match verified domain) |

> If you don't have a domain yet, use Resend's shared domain for testing: set `RESEND_FROM_EMAIL=onboarding@resend.dev`

---

## 3. Environment Variables

### Local development
Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=noreply@winterarc.com

NEXT_PUBLIC_SITE_URL=https://winterarc.com
```

### Vercel (production)
Vercel Dashboard → Project → **Settings → Environment Variables**

Add all 6 variables above. Set scope to **Production + Preview**.

---

## 4. GitHub + Vercel Deploy

```bash
# First time
git init
git add .
git commit -m "Winter Arc — pre-launch"
git remote add origin https://github.com/YOUR_USERNAME/winterarc.git
git branch -M main
git push -u origin main

# Every update after that
git add .
git commit -m "describe change"
git push
```

Vercel auto-deploys on every push to `main`.

---

## 5. Vercel Analytics

Vercel Analytics is already integrated (`<Analytics />` in `layout.tsx`).

Enable it: Vercel Dashboard → Project → **Analytics tab → Enable**.

**Events tracked automatically:**
| Event | Triggered when |
|---|---|
| `cta_clicked` | Any CTA button clicked (source: navbar/hero/founding/final/mobile) |
| `modal_opened` | Signup modal opens |
| `form_submitted` | Submit button clicked with valid data |
| `form_validation_failed` | Submit clicked with missing/invalid fields |
| `signup_success` | Supabase insert confirmed |
| `form_error` | API returned an error |
| `form_network_error` | Network timeout or connection failure |

---

## 6. Verify SEO Before Launch

```bash
# Check robots.txt
curl https://winterarc.com/robots.txt

# Check sitemap
curl https://winterarc.com/sitemap.xml

# Check OG image
# Open in browser: https://winterarc.com/og-image.jpg
# Test social preview: https://www.opengraph.xyz/url/https://winterarc.com
```

OAI-SearchBot (ChatGPT Search crawler) is explicitly allowed in `app/robots.ts`.

---

## 7. Test the full signup flow

Before launching, run through this manually:

1. Open `http://localhost:3000` (or your Vercel preview URL)
2. Click **START YOUR ARC** in the hero
3. Verify modal opens with correct fields
4. Try submitting empty → confirm red validation errors appear
5. Fill in real email + goal + blocker + willingness → submit
6. Confirm: success screen appears with your email shown
7. Check Supabase: Dashboard → Table Editor → `signups` → confirm row inserted
8. Check email inbox: confirm branded confirmation email arrived
9. Try submitting the same email again → confirm "already on the list" message appears
10. Test on iPhone (Safari) + Android (Chrome) — confirm modal is scrollable and CTA visible

---

## 8. Supabase — View Your Signups

Useful queries to run in Supabase SQL Editor:

```sql
-- Total signups
SELECT COUNT(*) FROM signups;

-- Breakdown by goal
SELECT goal, COUNT(*) FROM signups GROUP BY goal ORDER BY COUNT(*) DESC;

-- Willingness to pay
SELECT willingness_to_pay, COUNT(*) FROM signups GROUP BY willingness_to_pay;

-- UTM attribution
SELECT utm_source, COUNT(*) FROM signups
WHERE utm_source IS NOT NULL
GROUP BY utm_source ORDER BY COUNT(*) DESC;

-- Recent 20 signups
SELECT email, name, goal, willingness_to_pay, created_at
FROM signups ORDER BY created_at DESC LIMIT 20;
```

---

## File Reference

| File | Purpose |
|---|---|
| `app/api/signup/route.ts` | API endpoint — validates, stores, emails |
| `app/components/SignupModal.tsx` | Form UI with analytics + UTM capture |
| `lib/supabase.ts` | Supabase client (anon key, client-side) |
| `supabase/schema.sql` | Run once in Supabase SQL Editor |
| `.env.example` | Template — copy to `.env.local` |
| `public/og-image.jpg` | OG social preview image (1200x630) |
| `app/robots.ts` | Allows OAI-SearchBot, GPTBot, anthropic-ai |
| `app/sitemap.ts` | Auto-generates /sitemap.xml |
