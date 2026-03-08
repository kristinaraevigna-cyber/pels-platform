-- Add demographic fields: age, nationality, native language, education
ALTER TABLE assessments
  ADD COLUMN IF NOT EXISTS respondent_age integer,
  ADD COLUMN IF NOT EXISTS respondent_nationality text,
  ADD COLUMN IF NOT EXISTS respondent_native_language text,
  ADD COLUMN IF NOT EXISTS respondent_education text;
