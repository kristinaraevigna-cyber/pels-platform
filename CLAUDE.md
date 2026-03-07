# CLAUDE.md — PELS Platform Development Guide

This file instructs Claude Code on how to work with the PELS Platform.

## Project Overview

This is a Next.js 14 (App Router) application for the Positively Energizing Leadership Scale (PELS) — a validated psychometric instrument. It collects leader narratives, administers an 18-item PELS scale and a 29-item PERMA+4 Workplace Well-Being Scale, generates personalized intervention recommendations from Burke et al. (2023), and produces downloadable PDF reports.

## Key Files

- `src/lib/pels-data.ts` — PELS scale items, scoring logic, and intervention library
- `src/lib/perma-data.ts` — PERMA+4 scale items (29), 9 subscales, scoring, and interpretation
- `src/app/assessment/page.tsx` — Assessment orchestrator with 6-step flow
- `src/components/steps/` — Step components (Landing, Intake, Stories, WellBeing, **PermaPage**, Assessment, Results)
- `src/components/PELSReport.tsx` — react-pdf document for the downloadable report (includes PERMA+4 page)
- `src/app/api/generate-report/route.ts` — PDF generation API endpoint
- `supabase/migrations/001_initial_schema.sql` — Initial DB schema
- `supabase/migrations/002_add_perma4.sql` — PERMA+4 columns (run in Supabase SQL Editor)

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
3. Run `supabase/migrations/002_add_perma4.sql` to add PERMA+4 columns
4. Copy your project URL and anon key to `.env.local`

### Google OAuth Setup

To enable "Continue with Google" on login/signup pages:

1. Go to your Supabase dashboard → Authentication → Providers → Google
2. Enable the Google provider
3. Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Create an OAuth 2.0 Client ID (Web application)
   - Add your Supabase auth callback URL as an authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - Also add `http://localhost:54321/auth/v1/callback` for local development
4. Copy the Client ID and Client Secret into the Supabase Google provider settings
5. Save the provider configuration

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

## Assessment Flow

1. Intake (demographics + consent)
2. Stories (2 narrative prompts)
3. Well-Being (3 open-ended questions)
4. **PERMA+4** (29-item well-being scale, 1–10 Likert)
5. PELS Assessment (18-item scale, 1–7 Likert)
6. Results (scores, charts, interventions, PDF download)

## Scale Citations

- **PELS**: Developed under IRB Protocol #853470, University of Pennsylvania.
- **Interventions**: Burke et al. (2023). Positive Health. Routledge. DOI: 10.4324/9781003279594
- **PERMA+4**: Donaldson, S. I., & Donaldson, S. I. (2020). Journal of Well-Being Assessment, 4(2), 181–215. DOI: 10.1007/s41543-020-00033-1
