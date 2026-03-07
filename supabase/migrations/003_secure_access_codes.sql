-- Migration: Secure Access Codes
-- Adds SHA-256 hash storage, expiry, cohort labels, and rate-limiting table

-- 1. Add new columns to access_codes table
ALTER TABLE access_codes
  ADD COLUMN IF NOT EXISTS code_hash TEXT,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cohort_label TEXT,
  ADD COLUMN IF NOT EXISTS attempt_count INTEGER DEFAULT 0;

-- 2. Create index on code_hash for fast lookups
CREATE INDEX IF NOT EXISTS idx_access_codes_code_hash ON access_codes (code_hash);

-- 3. Create rate-limiting / attempt-logging table
CREATE TABLE IF NOT EXISTS access_code_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempted_code_hash TEXT NOT NULL,
  success BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Index for rate-limit queries (IP + time window)
CREATE INDEX IF NOT EXISTS idx_attempts_ip_created
  ON access_code_attempts (ip_address, created_at DESC);

-- 5. Index for monitoring specific user attempts
CREATE INDEX IF NOT EXISTS idx_attempts_user
  ON access_code_attempts (user_id, created_at DESC);
