# CLAUDE.md — PELS Platform Development Guide

This file instructs Claude Code on how to work with the PELS Platform.

## Project Overview

This is a Next.js 14 (App Router) application for the Positively Energizing Leadership Scale (PELS) — a validated psychometric instrument. It collects leader narratives, administers an 18-item scale, generates personalized intervention recommendations from Burke et al. (2023), and produces downloadable PDF reports.

## Key Files

- `src/lib/pels-data.ts` — All scale items, scoring logic, and intervention library (single source of truth)
- `src/app/page.tsx` — Main assessment orchestrator with step state management
- `src/components/steps/` — Each step as a component (Landing, Intake, Stories, WellBeing, Assessment, Results)
- `src/components/PELSReport.tsx` — react-pdf document for the downloadable report
- `src/app/api/generate-report/route.ts` — PDF generation API endpoint
- `supabase/migrations/001_initial_schema.sql` — Full DB schema

## Development Commands

```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
```

## Environment Setup

```bash
cp .env.example .env.local
# Add your Supabase project URL and keys from https://supabase.com/dashboard
```

## Supabase Setup

1. Create a new project at supabase.com
2. Go to SQL Editor and paste the content of `supabase/migrations/001_initial_schema.sql`
3. Copy your project URL and anon key to `.env.local`

## Common Development Tasks

### Adding a new PELS item
Edit `src/lib/pels-data.ts` → `PELS_ITEMS` array. Also add the corresponding column to `supabase/migrations/`.

### Adding an intervention
Edit `src/lib/pels-data.ts` → `INTERVENTIONS` array. Include proper `forScoreRange` values.

### Changing the color theme
The main brand colors are in `tailwind.config.js` under `clay`. Primary: `#8B6F5E`, Accent: `#C4956A`.

### Deploying to Vercel

```bash
npm install -g vercel
vercel --prod
# Add environment variables in Vercel dashboard
```

## Scoring Reference

- Mean 5.5–7.0 → **Flourishing** (Top 25%)
- Mean 4.0–5.4 → **Thriving** (Top 50%)
- Mean 2.5–3.9 → **Developing** (Bottom 50%)
- Mean 1.0–2.4 → **Emerging** (Bottom 25%)

## Scale Citation

The PELS was developed under IRB Protocol #853470, University of Pennsylvania.
Intervention content from: Burke et al. (2023). Positive Health. Routledge. DOI: 10.4324/9781003279594
