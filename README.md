# PELS Platform — Positively Energizing Leadership Scale

A full-stack web application for administering the validated 18-item Positively Energizing Leadership Scale (PELS), collecting narrative leader stories, generating personalized evidence-based intervention recommendations, and producing downloadable PDF reports.

## Stack
- **Frontend**: Next.js 14 (App Router) + React + TailwindCSS
- **Backend / DB**: Supabase (Postgres + Row Level Security + Storage)
- **PDF Generation**: @react-pdf/renderer
- **Deployment**: Vercel (recommended)

## Setup with Claude Code

```bash
# 1. Install Claude Code (if not already installed)
npm install -g @anthropic-ai/claude-code

# 2. Clone / unzip this project
cd pels-platform

# 3. Install dependencies
npm install

# 4. Create a Supabase project at https://supabase.com
#    Then copy your project URL and anon key

# 5. Set environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 6. Run Supabase migrations
npx supabase db push  (or paste SQL from supabase/migrations/ into Supabase SQL editor)

# 7. Start development
npm run dev

# 8. Use Claude Code for further development
claude
```

## Platform Flow

```
Landing Page
    ↓
Intake Form (name, role, org, demographics)
    ↓
Leader Story Prompts (1–2 narrative stories)
    ↓
Open-Ended Well-Being Questions (3 qualitative questions)
    ↓
18-Item PELS Assessment (7-point Likert)
    ↓
Results Dashboard (score, interpretation, profile)
    ↓
Evidence-Based Interventions (from Burke et al., 2023)
    ↓
Downloadable PDF Report
```

## Scale Reference
PELS developed and validated by:
- IRB Protocol #853470, University of Pennsylvania
- 603 participants across two independent samples
- α = .97–.98, ω = .98
- Predicts engagement (β = .56) and well-being (β = .57) beyond other leadership measures
