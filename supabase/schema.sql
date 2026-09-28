-- ============================================================
-- Winter Arc — Supabase Schema
-- Run this in your Supabase SQL editor before deploying
-- ============================================================

-- 1. Create signups table
CREATE TABLE IF NOT EXISTS signups (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email            TEXT        NOT NULL,
  name             TEXT,
  goal             TEXT        NOT NULL,
  blocker          TEXT        NOT NULL,
  willingness_to_pay TEXT      NOT NULL CHECK (willingness_to_pay IN ('Yes', 'Maybe', 'No')),
  referrer         TEXT,
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  utm_term         TEXT,
  utm_content      TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Prevent duplicate signups from the same email
  CONSTRAINT signups_email_unique UNIQUE (email)
);

-- 2. Indexes for common queries
CREATE INDEX IF NOT EXISTS signups_created_at_idx ON signups (created_at DESC);
CREATE INDEX IF NOT EXISTS signups_goal_idx        ON signups (goal);
CREATE INDEX IF NOT EXISTS signups_willingness_idx ON signups (willingness_to_pay);
CREATE INDEX IF NOT EXISTS signups_utm_source_idx  ON signups (utm_source);

-- 3. Enable Row Level Security
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- 4. Policy: allow inserts only (no reads from anon/client)
--    The API route uses the service role key which bypasses RLS entirely.
--    This policy is a safety net for direct client access (should not happen).
CREATE POLICY "allow_insert" ON signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. No SELECT policy for anon — signups are private data
--    Only the service role (server-side API) can read them.

-- ============================================================
-- Useful queries for founders / admin
-- ============================================================

-- Total signups
-- SELECT COUNT(*) FROM signups;

-- Signups by goal
-- SELECT goal, COUNT(*) FROM signups GROUP BY goal ORDER BY count DESC;

-- Willingness to pay breakdown
-- SELECT willingness_to_pay, COUNT(*) FROM signups GROUP BY willingness_to_pay;

-- UTM attribution
-- SELECT utm_source, COUNT(*) FROM signups WHERE utm_source IS NOT NULL GROUP BY utm_source ORDER BY count DESC;

-- Recent signups
-- SELECT email, name, goal, willingness_to_pay, created_at FROM signups ORDER BY created_at DESC LIMIT 20;
