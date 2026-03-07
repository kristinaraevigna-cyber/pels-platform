-- PELS Platform Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- ASSESSMENTS TABLE
-- Stores each person's full assessment session
-- ============================================
create table assessments (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  completed_at timestamptz,

  -- Intake / Demographics
  respondent_name text,
  respondent_email text,
  respondent_role text,
  respondent_org text,
  respondent_tenure text,         -- e.g. "< 1 year", "1-3 years"
  respondent_gender text,
  respondent_race text,
  respondent_org_level text,      -- Individual Contributor, Manager, Senior Leader

  -- Leader info
  leader_gender text,
  leader_tenure text,             -- How long have you worked with this person

  -- Leader narrative stories
  story_one text,                 -- "Describe a time your leader made you feel energized"
  story_two text,                 -- "Describe a time your leader showed genuine care"

  -- Open-ended well-being questions
  wellbeing_q1 text,              -- "How does your leader show they care about your well-being?"
  wellbeing_q2 text,              -- "What does your leader do that most positively affects your energy at work?"
  wellbeing_q3 text,              -- "If you could change one thing about how your leader supports your well-being, what would it be?"

  -- PELS 18-item responses (1–7 Likert)
  pels_1 integer check (pels_1 between 1 and 7),
  pels_2 integer check (pels_2 between 1 and 7),
  pels_3 integer check (pels_3 between 1 and 7),
  pels_4 integer check (pels_4 between 1 and 7),
  pels_5 integer check (pels_5 between 1 and 7),
  pels_6 integer check (pels_6 between 1 and 7),
  pels_7 integer check (pels_7 between 1 and 7),
  pels_8 integer check (pels_8 between 1 and 7),
  pels_9 integer check (pels_9 between 1 and 7),
  pels_10 integer check (pels_10 between 1 and 7),
  pels_11 integer check (pels_11 between 1 and 7),
  pels_12 integer check (pels_12 between 1 and 7),
  pels_13 integer check (pels_13 between 1 and 7),
  pels_14 integer check (pels_14 between 1 and 7),
  pels_15 integer check (pels_15 between 1 and 7),
  pels_16 integer check (pels_16 between 1 and 7),
  pels_17 integer check (pels_17 between 1 and 7),
  pels_18 integer check (pels_18 between 1 and 7),

  -- Computed scores (stored for analytics)
  pels_total numeric,             -- Sum of all 18 items (18–126)
  pels_mean numeric,              -- Mean of all 18 items (1–7)
  pels_category text,             -- "Flourishing" | "Thriving" | "Developing" | "Emerging"

  -- Consent
  consent_given boolean default false,
  report_requested boolean default false
);

-- RLS: Enable but allow anonymous inserts (anyone can take the assessment)
alter table assessments enable row level security;

create policy "Anyone can insert an assessment"
  on assessments for insert
  with check (true);

create policy "Users can view their own assessment"
  on assessments for select
  using (true);  -- adjust to auth.uid() = user_id if adding auth later

-- ============================================
-- INDEX for analytics
-- ============================================
create index assessments_created_at_idx on assessments(created_at);
create index assessments_pels_category_idx on assessments(pels_category);

-- ============================================
-- AGGREGATE VIEW for research dashboard
-- ============================================
create view assessment_summary as
select
  count(*) as total_responses,
  round(avg(pels_mean), 2) as avg_pels_score,
  round(stddev(pels_mean), 2) as stddev_pels_score,
  count(case when pels_category = 'Flourishing' then 1 end) as flourishing_count,
  count(case when pels_category = 'Thriving' then 1 end) as thriving_count,
  count(case when pels_category = 'Developing' then 1 end) as developing_count,
  count(case when pels_category = 'Emerging' then 1 end) as emerging_count,
  date_trunc('week', created_at) as week
from assessments
where completed_at is not null
group by week
order by week desc;
