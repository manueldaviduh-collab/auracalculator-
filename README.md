# Aura Calculator

A mobile-first quiz that reads your "aura" from 10 quick questions, reveals a
big flashy score, and lets you share it. Built to answer one question first:
**do people actually enjoy taking the quiz and sharing the result?** Nothing
else (accounts, avatars, ads) ships until that's proven.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion for animation
- Zustand for app state
- i18next / react-i18next for EN/ES

No backend — everything runs client-side and results persist to
`localStorage` only.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run lint     # oxlint
```

## How the app is organized

```
src/
  components/     Shared UI: Logo, HaloOrb, ProgressBar, GlowButton, AdSlot...
  data/questions.ts   The 10 quiz questions (bilingual copy + hidden scoring metadata)
  features/
    home/         Landing screen
    quiz/         Question flow (tap-to-advance, no "Next" button)
    result/       Calculating screen + score reveal + share
  i18n/           EN/ES UI copy and setup
  lib/
    scoring.ts    Hidden scoring engine (pure function, no UI concerns)
    shareCard.ts  Canvas renderer for the shareable PNG card
    share.ts      Web Share API orchestration with clipboard/download fallback
    storage.ts    LocalStorage persistence, shaped for a future backend swap
  store/useAppStore.ts   Single source of truth: screen, answers, result, language
  types/          Domain types (Question, AuraResult, UserProfile, ...)
```

The screen flow is a simple state machine in `useAppStore`
(`home → quiz → calculating → result`), rendered by `App.tsx`. No router is
needed yet; adding one later (e.g. for a `/history` or `/profile` route) is a
localized change.

## The scoring system

Each question has 4 options, each tagged with a `trait` (energy, calm,
mystery, chaos, light) and a `weight` (1–4). Answers are summed into a raw
score, mapped into a big "flashy" display number, and bucketed into a tier
(Dormant → Balanced → Vibrant → Radiant → Legendary → Mythic). The trait with
the most accumulated weight becomes the "dominant aura" and drives the color
of the orb everywhere (loading screen, result screen, share card).

The mapping is deterministic (a hash of the chosen answers, not `Math.random`)
so retaking the quiz with the same answers reproduces the same number — see
`lib/scoring.ts`. None of this is shown to the user until the result screen.

## Sharing

`lib/shareCard.ts` draws the shareable card straight to a `<canvas>` (no
DOM-screenshot library, keeps the bundle small and avoids font/CORS quirks).
`lib/share.ts` tries, in order: the native Web Share sheet (`navigator.share`
with a file, best on mobile) → copying the image to the clipboard → a plain
download. The card reserves a quiet footer band for a future sponsor logo —
currently it just shows the app watermark.

## What's intentionally not built yet

- **Ads**: `AdSlot` renders nothing while `FEATURES.ads` is `false` in
  `src/config.ts`. The result screen already has the slot positioned; flip
  the flag once there's a sponsor.
- **Avatars / profiles**: `types/index.ts` already defines `UserProfile`, and
  `lib/storage.ts` persists an anonymous id + result history keyed the same
  way a real profile would be. Wiring up accounts later means adding an auth
  layer and swapping `localStorage` calls for API calls — no data model
  changes needed.
- **Backend**: none. If/when the quiz needs to be shared server-side (e.g. a
  permalink to someone's result), `AuraResult` is already a clean JSON shape
  to POST as-is.
