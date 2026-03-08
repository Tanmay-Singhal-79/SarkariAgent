# SarkariAgent - India's Voice-First AI Welfare Assistant

A complete production-ready SaaS application matching citizens with government schemes automatically via voice AI profile onboarding and autonomous application. 

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion, React Three Fiber
- **Backend**: Next.js App Router API Routes
- **Database**: PostgreSQL with Prisma ORM

## Included Features
1. **Voice-First Onboarding**: `components/VoiceAssistant.tsx` implements a stunning interactive voice recording agent interface utilizing Framer Motion layout animations.
2. **Glassmorphism 3D UI**: The main dashboard `app/page.tsx` features `Scene3D` running `@react-three/drei` and `@react-three/fiber` to provide a premium startup vibe.
3. **AI Eligibility Engine API**: Setup in `app/api/schemes/match/route.ts` parsing user data.
4. **Autonomous Agent Executor API**: Scaffold in `app/api/agent/apply/route.ts` mapped for Playwright orchestration in production environments.
5. **Scheme Cards Orchestrator**: `components/SchemeCards.tsx` to display matching schemes beautifully.
6. **Gov-Tech Analytics Dashboard**: Created at `/admin` summarizing user operations and active agent logs for real-time monitoring.

## Local Deployment Instructions
1. Clone repository and run `npm install`.
2. Connect Database: Update `.env` with a real `DATABASE_URL` (PostgreSQL) and run `npx prisma db push`.
3. Boot the environment: `npm run dev` running on localhost:3000.
4. Scale: Ready to deploy onto Vercel. Database can utilize Supabase or AWS RDS.
