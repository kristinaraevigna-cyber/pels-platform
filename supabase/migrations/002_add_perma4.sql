-- ============================================================
-- PERMA+4 Workplace Well-Being Scale columns
-- 29 item responses + 9 subscale means + 1 total mean
-- All nullable for backward compatibility
-- ============================================================

-- Individual item responses (1–10 scale)
ALTER TABLE assessments ADD COLUMN perma_1 integer CHECK (perma_1 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_2 integer CHECK (perma_2 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_3 integer CHECK (perma_3 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_4 integer CHECK (perma_4 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_5 integer CHECK (perma_5 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_6 integer CHECK (perma_6 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_7 integer CHECK (perma_7 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_8 integer CHECK (perma_8 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_9 integer CHECK (perma_9 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_10 integer CHECK (perma_10 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_11 integer CHECK (perma_11 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_12 integer CHECK (perma_12 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_13 integer CHECK (perma_13 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_14 integer CHECK (perma_14 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_15 integer CHECK (perma_15 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_16 integer CHECK (perma_16 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_17 integer CHECK (perma_17 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_18 integer CHECK (perma_18 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_19 integer CHECK (perma_19 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_20 integer CHECK (perma_20 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_21 integer CHECK (perma_21 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_22 integer CHECK (perma_22 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_23 integer CHECK (perma_23 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_24 integer CHECK (perma_24 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_25 integer CHECK (perma_25 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_26 integer CHECK (perma_26 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_27 integer CHECK (perma_27 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_28 integer CHECK (perma_28 BETWEEN 1 AND 10);
ALTER TABLE assessments ADD COLUMN perma_29 integer CHECK (perma_29 BETWEEN 1 AND 10);

-- Computed subscale means
ALTER TABLE assessments ADD COLUMN perma_pe_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_en_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_rel_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_mean_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_acc_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_ph_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_mind_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_env_mean numeric;
ALTER TABLE assessments ADD COLUMN perma_es_mean numeric;

-- Total mean across all 29 items
ALTER TABLE assessments ADD COLUMN perma_total_mean numeric;
