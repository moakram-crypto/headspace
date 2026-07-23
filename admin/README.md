# Calm Path — Admin Panel

Web admin dashboard (Next.js 14 App Router + TypeScript + Tailwind) for managing the Calm Path app's content, courses, categories, users and subscriptions. Same brand palette as the mobile app (`tailwind.config.ts` mirrors `calm-path-app/src/config/theme.ts`).

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

As with the mobile app, `npm install` could not be verified in this sandbox due to unreliable registry access — run it locally first.

## Pages

- `/` — dashboard with key product metrics (DAU, onboarding completion, first-session completion, trial→paid conversion).
- `/content` and `/content/new` — content library table + an add-content form (audio/cover upload inputs are present but not wired to storage yet).
- `/courses` — course management cards.
- `/categories` — category management with per-category item counts.
- `/users` — user list with plan and streak.
- `/subscriptions` — subscription status synced from RevenueCat (mocked here).

## What still needs wiring up

- All data currently comes from `lib/mockData.ts`. Replace with real API calls (Supabase client or REST calls to your NestJS backend) — the page components are already shaped around that data, so this is mostly a drop-in swap.
- Auth / role-based access control (Super Admin, Content Manager, Audio Manager, Support Agent, Analyst per the brief) isn't implemented — add a middleware + session check before these routes go live.
- File uploads on `/content/new` are plain `<input type="file">` placeholders; connect them to Supabase Storage or S3/R2.
