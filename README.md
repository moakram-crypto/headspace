# Calm Path — Mobile App

React Native (Expo + TypeScript) meditation, sleep, focus & AI-coaching app. Runs on iOS, Android, **and web** from one codebase (Expo's web target uses `react-native-web`).

Working brand name is a placeholder — swap `app.json`, `src/config/theme.ts`, and the app icon for your final name/logo.

## Getting started

```bash
npm install
npm run web      # runs in the browser at localhost:8081
npm run ios      # requires Xcode / iOS simulator
npm run android  # requires Android Studio / emulator
```

This was scaffolded and hand-reviewed in a sandboxed environment without reliable access to the npm registry, so `npm install` / a full Metro build could not be executed here — run it in your own environment as the first step.

## What's implemented

- Full navigation: onboarding stack (10 steps from the brief) → 5-tab main app (Today, Explore, AI Coach, Sleep, Profile) → modals (Player, Breathing, Focus, Session Complete).
- Zustand stores for user/onboarding state (persisted via AsyncStorage), the audio player, and settings (theme mode, reduced motion, haptics).
- Light theme + a separate darker "Sleep" theme that activates automatically on the Sleep tab.
- Rule-based AI Coach (`src/services/aiCoach.service.ts`) that detects intent from free-text (stress, sleep, anxiety, anger, focus, meeting nerves) and recommends specific content — including a basic crisis-language safety check. This is an MVP stand-in; swap it for a real LLM call behind your own backend, keeping the same safety restrictions from the product brief enforced server-side.
- Animated breathing circle with Box / Relaxing / 4-7-8 patterns and a reduced-motion toggle.
- Mock content data (`src/data/mockData.ts`) standing in for your real content API — swap for Supabase/REST calls without touching the screens.

## What still needs wiring up for production

- **Auth**: `AccountScreen` only sets local state. Wire Apple/Google/email to Supabase Auth or Firebase Auth.
- **Audio**: uses `expo-av` (works on iOS/Android/web with one API). For lock-screen controls, Bluetooth, and background playback on mobile, swap to `react-native-track-player` per the brief — it needs a custom dev client and doesn't run on web, which is why it isn't the default here.
- **Backend**: `src/api/` isn't included yet — add typed fetch/query-hook wrappers per endpoint once you pick Supabase or the NestJS option from the brief, and swap the mock data imports for React Query hooks.
- **Push notifications**: `notifications.service.ts` schedules local reminders; server-sent pushes need your backend + Expo push tokens.
- **Payments**: RevenueCat isn't wired in; the Subscription screen entries in Profile are placeholders.

## Folder structure

Follows the structure from the product brief (`src/api`, `src/components`, `src/features`, `src/navigation`, `src/store`, etc.) — see the brief document for the full rationale.
