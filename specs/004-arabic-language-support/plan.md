# Implementation Plan: Arabic Language Support

**Branch**: `004-arabic-language-support` | **Date**: 2026-04-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-arabic-language-support/spec.md`

## Summary

Add full Arabic language support to the Hangman Creator web app: UI translation (EN/AR), RTL layout via dual Emotion cache, Arabic-optimized font (Noto Sans Arabic), Arabic on-screen keyboard, Arabic-aware game logic (Unicode normalization, diacritics stripping, Lam-Alef decomposition, Hamza form separation), per-word keyboard switching for mixed-script word lists, and a language-mismatch dialog for shared game links. Uses a lightweight custom Zustand-based i18n approach (no external i18n library) to maintain compatibility with static export.

## Technical Context

**Language/Version**: TypeScript 5 (Strict Mode)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, MUI v7 (Emotion), Zustand 5  
**Storage**: localStorage (via Zustand persist) — locale preference alongside existing theme/game prefs  
**Testing**: Manual testing (no test framework currently in project)  
**Target Platform**: Static web export, modern browsers, desktop and mobile  
**Project Type**: web-application  
**Performance Goals**: Layout switch within 1 second (SC-003), no visual glitches  
**Constraints**: `output: "export"` — no server-side rendering; all i18n must be client-side  
**Scale/Scope**: 2 languages (EN/AR), ~30+ translated strings, ~15 files created/modified

### New Dependencies

| Package                  | Purpose                                |
| ------------------------ | -------------------------------------- |
| `stylis`                 | CSS preprocessor needed for RTL plugin |
| `@mui/stylis-plugin-rtl` | MUI RTL CSS transformation plugin      |

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                               | Status | Notes                                                                                                                 |
| --------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| I. Component & Logic Separation         | PASS   | Arabic normalization and script detection isolated in utility functions; game logic changes in `useHangman` hook only |
| II. State Management & Hydration Safety | PASS   | Locale store uses Zustand `persist` with `hasHydrated` flag, same pattern as existing theme store                     |
| III. Stateless & URL-Safe Sharing       | PASS   | Existing Base64URL encoding verified to work with Arabic; normalization applied on decode                             |
| IV. Strong Typing                       | PASS   | All new interfaces typed; `any` prohibited                                                                            |
| V. Theming & Accessibility              | PASS   | RTL via MUI v7 dual Emotion cache pattern; Noto Sans Arabic loaded via `next/font`                                    |
| Technology Stack Constraints            | PASS   | No new major paradigm tools; only `stylis` + `@mui/stylis-plugin-rtl` (MUI ecosystem packages)                        |

**Gate result**: PASS — no violations.

## Project Structure

### Documentation (this feature)

```text
specs/004-arabic-language-support/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx               # MODIFY: Noto Sans Arabic font, dynamic dir/lang
│   └── globals.css              # NO CHANGE
├── components/
│   ├── Header.tsx               # MODIFY: language toggle button
│   ├── Keyboard.tsx             # MODIFY: Arabic keyboard layout, per-word switching
│   ├── WordDisplay.tsx          # MODIFY: remove uppercase for Arabic, RTL text direction
│   ├── SetupContent.tsx         # MODIFY: extract hardcoded strings to t() calls
│   ├── PlayContent.tsx          # MODIFY: extract strings, physical keyboard Arabic support, language-mismatch dialog
│   ├── GameStatus.tsx           # MODIFY: extract strings
│   ├── GameSummary.tsx          # MODIFY: extract strings
│   ├── GameProgress.tsx         # MODIFY: extract strings
│   ├── ThemeRegistry.tsx        # MODIFY: dual Emotion cache (LTR/RTL), dynamic theme direction
│   ├── ThemeToggle.tsx          # MODIFY: extract tooltip strings
│   ├── Footer.tsx               # MODIFY: extract strings
│   └── LanguageToggle.tsx       # CREATE: language selector component
├── constants/
│   ├── arabicKeyboard.ts        # CREATE: Arabic keyboard layout data
│   ├── gradients.ts             # NO CHANGE
│   └── neumorphism.ts           # NO CHANGE
├── hooks/
│   └── useHangman.ts            # MODIFY: Arabic normalization, script-aware letter matching
├── locales/
│   ├── en.json                  # CREATE: English translations
│   └── ar.json                  # CREATE: Arabic translations
├── store/
│   ├── useLocaleStore.ts        # CREATE: locale state + t() function
│   ├── useGameStore.ts          # NO CHANGE
│   └── useThemeStore.ts         # NO CHANGE
├── theme.ts                     # MODIFY: factory function for 4 theme variants (LTR/RTL x light/dark), Arabic font family
└── utils/
    ├── arabicNormalization.ts   # CREATE: Lam-Alef decomposition, tashkeel stripping, NFC normalization
    ├── scriptDetection.ts       # CREATE: Arabic script detection via Unicode ranges
    └── shareLink.ts             # MODIFY: normalize decoded words
```

**Structure Decision**: Existing project structure preserved. New files follow established patterns — utilities in `src/utils/`, constants in `src/constants/`, store in `src/store/`, translations in new `src/locales/` directory.

## Complexity Tracking

No constitution violations — table not needed.
