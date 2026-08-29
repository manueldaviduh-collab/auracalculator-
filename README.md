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
  components/     Shared UI: Logo, HaloOrb, AuraFace, ProgressBar, GlowButton, AdSlot...
  data/questions.ts   The 10 quiz questions (bilingual copy + hidden scoring + mascot metadata)
  features/
    home/         Landing screen
    quiz/         Question flow (tap-to-advance, no "Next" button)
    result/       Calculating screen + score reveal + share
  i18n/           EN/ES UI copy and setup
  lib/
    scoring.ts     Hidden scoring engine (pure function, no UI concerns)
    faceShapes.ts  Mascot expression config, shared by the SVG and canvas renderers
    shareCard.ts   Canvas renderer for the shareable PNG card (score + mascot)
    share.ts       Web Share API orchestration with clipboard/download fallback
    storage.ts     LocalStorage persistence, shaped for a future backend swap
  store/useAppStore.ts   Single source of truth: screen, answers, result, language
  types/          Domain types (Question, AuraResult, UserProfile, Expression, ...)
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

The height question (`q2`) is the one deliberate exception: its four options
are pinned to ascending weight (taller = more points), not the rotation the
other nine questions use. Its option text is authored per-language directly
(`cm` in Spanish, `in` in English) rather than converted at runtime, since the
existing bilingual `text: {en, es}` shape on every option already covers it —
no extra logic needed.

## The mascot

`components/AuraFace.tsx` is a small reactive character living inside the
existing `HaloOrb` (same orb everywhere — home, quiz, calculating, result —
now optionally wearing a face, nothing about the visual design changed). Each
answer option carries an `expression` (see `types/index.ts`); tapping an
option immediately pops that face onto the orb during the quiz, purely for
delight — it has no effect on scoring. `lib/faceShapes.ts` holds the actual
eyes/mouth/eyebrow shape config so both the live SVG mascot and the canvas
share-card renderer (`lib/shareCard.ts`) draw the exact same character
instead of two independently-drifting definitions. The final reveal picks one
expression per tier via `TIER_EXPRESSIONS` in `lib/scoring.ts`, escalating
from shy (Dormant) to can't-stop-laughing (Mythic).

## Sharing

`lib/shareCard.ts` draws the shareable card straight to a `<canvas>` (no
DOM-screenshot library, keeps the bundle small and avoids font/CORS quirks).
`lib/share.ts` tries, in order: the native Web Share sheet (`navigator.share`
with a file, best on mobile) → copying the image to the clipboard → a plain
download. The card reserves a quiet footer band for a future sponsor logo —
currently it just shows the app watermark.

## Monetization

`AdSlot` is AdSense-ready but off by default (`FEATURES.ads` in
`src/config.ts`). Once there's an approved AdSense account, paste the
publisher and slot IDs into `ADSENSE` in the same file and flip the flag —
`AdSlot` then lazy-loads the AdSense script and renders one standard
`<ins class="adsbygoogle">` unit (already positioned on the result screen)
with a small "Advertisement" disclosure label above it. No interstitials, no
popups, no layout shift while it's off.

## What's intentionally not built yet

- **Avatars / profiles**: `types/index.ts` already defines `UserProfile`, and
  `lib/storage.ts` persists an anonymous id + result history keyed the same
  way a real profile would be. Wiring up accounts later means adding an auth
  layer and swapping `localStorage` calls for API calls — no data model
  changes needed.
- **Backend**: none. If/when the quiz needs to be shared server-side (e.g. a
  permalink to someone's result), `AuraResult` is already a clean JSON shape
  to POST as-is.
