# Tasks: Arabic Language Support

**Input**: Design documents from `/specs/004-arabic-language-support/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/ui-contracts.md

**Tests**: No test framework in project — no test tasks generated.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create shared utility modules

- [x] T001 Install RTL dependencies: `pnpm add stylis @mui/stylis-plugin-rtl`
- [x] T002 [P] Create Arabic Unicode normalization utility in `src/utils/arabicNormalization.ts` — implement `normalizeArabicForGameplay(text)` that decomposes Lam-Alef ligatures (U+FEFB and variants) to ل+ا, strips all Arabic diacritics (U+0610-U+061A, U+064B-U+065F, U+0670, U+06D6-U+06DC, U+06DF-U+06E4, U+06E7-U+06E8, U+06EA-U+06ED), applies NFC normalization, preserves Hamza forms as distinct
- [x] T003 [P] Create Arabic script detection utility in `src/utils/scriptDetection.ts` — implement `containsArabic(text)` and `getScriptDirection(text)` using Unicode ranges U+0600-U+06FF, U+0750-U+077F, U+08A0-U+08FF, U+FB50-U+FDFF, U+FE70-U+FEFF
- [x] T004 [P] Create Arabic keyboard layout constant in `src/constants/arabicKeyboard.ts` — define 3-row layout (Row 1: ضصثقفغعهخحجد, Row 2: شسيبلاتنمكط, Row 3: ئءؤرلاىةوزظ) with `KeyboardKey` interface (letter, codepoint), include Lam-Alef (U+FEFB) as dedicated key

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create locale Zustand store in `src/store/useLocaleStore.ts` — `LocaleStoreState` interface with `locale: "en" | "ar"`, `setLocale`, `t(key)` for dot-path translation lookup, `hasHydrated` boolean, derived `direction: "ltr" | "rtl"`; use `persist` middleware with key `"hangman-locale"`; follow same pattern as `src/store/useThemeStore.ts`; t() fallback returns key path if translation missing
- [x] T006 [P] Create English translation file in `src/locales/en.json` — extract all hardcoded English strings from current components: setup (title, subtitle, maxMistakes, wordList, placeholder, noWords, wordsBlurred, clear, start, share, shareTitle, shareInstructions, copyLink, close, copied), play (noConfig, goBack, nextWord, finishGame, revealWord), game (wordOf, mistakesOf, correct, theWordWas, perfectScore, gameOver, completedWords, correctLabel, missedLabel, newGame, playAgain), header (backToSetup, logoAlt, title), footer (createdWith, by), theme (switchToLight, switchToDark), language (switchToArabic, switchToEnglish), dialog (languageMismatchTitle, languageMismatchMessage, switchLanguage, keepCurrent)
- [x] T007 [P] Create Arabic translation file in `src/locales/ar.json` — identical key structure to en.json with Modern Standard Arabic translations for all ~35 strings
- [x] T008 Refactor theme system in `src/theme.ts` — replace separate `darkTheme`/`lightTheme` with `createAppTheme(mode: "light" | "dark", direction: "ltr" | "rtl")` factory function producing 4 theme variants; add `direction` property; set `fontFamily` to `"var(--font-outfit), var(--font-arabic), sans-serif"` for LTR and `"var(--font-arabic), var(--font-outfit), sans-serif"` for RTL; preserve all existing palette/typography/component overrides
- [x] T009 Update ThemeRegistry in `src/components/ThemeRegistry.tsx` — import `CacheProvider` from `@emotion/react`, create two Emotion caches (LTR with `key: "mui-ltr"` and RTL with `key: "mui-rtl"` using `prefixer` + `rtlPlugin` from `@mui/stylis-plugin-rtl`); read `direction` from `useLocaleStore`; wrap children with correct `CacheProvider` based on direction; use `createAppTheme(mode, direction)` from refactored theme.ts; wait for both `useThemeStore.hasHydrated` and `useLocaleStore.hasHydrated` before rendering
- [x] T010 Update root layout in `src/app/layout.tsx` — import `Noto_Sans_Arabic` from `next/font/google` with `subsets: ["arabic"]`, weights [400,500,600,700,800], `display: "swap"`, variable `"--font-arabic"`; add `notoArabic.className` to body classes; add `useEffect` that sets `document.documentElement.dir` and `document.documentElement.lang` from `useLocaleStore` on mount and locale change; remove hardcoded `lang="en"`

**Checkpoint**: Foundation ready — locale store, translations, RTL theme engine, Arabic font all in place

---

## Phase 3: User Story 1 - Arabic Word Input and Gameplay (Priority: P1) MVP

**Goal**: Full Arabic gameplay — enter Arabic words, play with Arabic keyboard, share Arabic game links

**Independent Test**: Switch to Arabic, enter Arabic words, start game, guess letters via Arabic keyboard, complete full game round

### Implementation for User Story 1

- [x] T011 [US1] Update useHangman hook in `src/hooks/useHangman.ts` — replace `/^[A-Z]$/` regex with Unicode-aware letter validation that accepts both Latin (A-Z) and Arabic (U+0600-U+06FF) characters; replace `.toUpperCase()` with a transform that uppercases Latin letters and passes Arabic letters through unchanged (Arabic has no case); apply `normalizeArabicForGameplay()` to each word on game init/reset; implement Lam-Alef guessing logic: export a helper `getLamAlefMappedLetters(letter: string): string[]` that maps the لا keypress (U+FEFB) to `["\u0644", "\u0627"]` and all other letters to `[letter]`; use this in the letter-matching logic so guessing لا reveals both ل and ا positions in the decomposed word; export derived `currentWordIsArabic` boolean using `containsArabic(currentWord)` from scriptDetection.ts
- [x] T012 [US1] Update Keyboard component in `src/components/Keyboard.tsx` — add `script?: "latin" | "arabic"` prop; when `script === "arabic"`, render 3-row Arabic keyboard layout from `src/constants/arabicKeyboard.ts` instead of QWERTY; maintain identical key styling (neumorphic raised/inset, green/red states) for Arabic keys; handle Lam-Alef key (لا) by calling `onGuess("\uFEFB")` — the useHangman hook (T011) handles the mapping to ل+ا reveal logic
- [x] T013 [US1] Update WordDisplay component in `src/components/WordDisplay.tsx` — remove `textTransform: "uppercase"` for Arabic words (apply conditionally based on script detection); set `direction: "rtl"` on the word container when current word contains Arabic; ensure masked placeholders render correctly for Arabic letters (use underscore or Arabic-appropriate placeholder)
- [x] T014 [US1] Update PlayContent component in `src/components/PlayContent.tsx` — pass `script` prop to Keyboard based on `currentWordIsArabic` from useHangman (per-word script detection, not global language); update physical keyboard `keydown` handler to accept both Arabic and Latin letters regardless of current keyboard layout (FR-016); call `normalizeArabicForGameplay()` on words loaded from URL config; apply `containsArabic()` to each word for per-word keyboard switching (FR-015)
- [x] T015 [US1] Update share link utility in `src/utils/shareLink.ts` — extend `GameConfig` interface to include optional `l?: "en" | "ar"` field; in `encodeGameConfig`, read locale from `useLocaleStore` and include in config; in `decodeGameConfig`, extract locale field (default to `"en"` if missing for backward compat); apply `normalizeArabicForGameplay()` to each decoded word; export locale from config for use by PlayContent
- [x] T016 [US1] Update SetupContent component in `src/components/SetupContent.tsx` — pass `locale` from `useLocaleStore` to `encodeGameConfig` call when generating share link; ensure word input `TextField` accepts Arabic characters (remove any input restrictions that filter non-Latin)

**Checkpoint**: Arabic gameplay fully functional — can enter Arabic words, play with Arabic keyboard, share links with Arabic words

---

## Phase 4: User Story 2 - Language Switching (Priority: P2)

**Goal**: Toggle between English and Arabic with instant UI update and persisted preference

**Independent Test**: Toggle language selector, verify all text/layout/keyboard switches immediately, persists across sessions

### Implementation for User Story 2

- [x] T017 [US2] Create LanguageToggle component in `src/components/LanguageToggle.tsx` — MUI IconButton with language icon (e.g., Translate or Globe icon from @mui/icons-material); tooltip shows `t("language.switchToArabic")` or `t("language.switchToEnglish")` based on current locale; calls `setLocale()` from `useLocaleStore`; follows same pattern as `src/components/ThemeToggle.tsx`
- [x] T018 [US2] Update Header component in `src/components/Header.tsx` — add LanguageToggle next to ThemeToggle in the AppBar; extract hardcoded "Hangman" title string to use `t("header.title")`; extract "Back to Setup" tooltip to use `t("header.backToSetup")`; ensure logo/title alignment works in both LTR and RTL

**Checkpoint**: Language switching works — toggle between EN/AR, all UI text updates, preference persists

---

## Phase 5: User Story 3 - Right-to-Left Layout (Priority: P3)

**Goal**: Full RTL mirroring when Arabic is selected — header, word display, keyboard, progress, summary

**Independent Test**: Switch to Arabic, verify all components mirror for RTL: header alignment, word order, keyboard rows, progress bar, summary layout

### Implementation for User Story 3

- [x] T019 [P] [US3] Extract strings from SetupContent in `src/components/SetupContent.tsx` — replace all hardcoded English strings with `t()` calls: title, subtitle, maxMistakes label, wordList label, placeholder, noWords, wordsBlurred, clear, start, share, shareTitle, shareInstructions, copyLink, close, copied toast
- [x] T020 [P] [US3] Extract strings from PlayContent in `src/components/PlayContent.tsx` — replace hardcoded strings with `t()` calls: noConfig message, goBack, nextWord, finishGame, revealWord
- [x] T021 [P] [US3] Extract strings from GameStatus in `src/components/GameStatus.tsx` — replace "Correct!" and "The word was:" with `t("game.correct")` and `t("game.theWordWas")`
- [x] T022 [P] [US3] Extract strings from GameSummary in `src/components/GameSummary.tsx` — replace all hardcoded strings with `t()` calls: perfectScore, gameOver, completedWords, correctLabel, missedLabel, newGame, playAgain
- [x] T023 [P] [US3] Extract strings from GameProgress in `src/components/GameProgress.tsx` — replace "Word X of Y" and "X / Y mistakes" with `t("game.wordOf")` and `t("game.mistakesOf")` with parameter interpolation
- [x] T024 [P] [US3] Extract strings from Footer in `src/components/Footer.tsx` — replace "Created with" and "by" with `t("footer.createdWith")` and `t("footer.by")`
- [x] T025 [P] [US3] Extract strings from ThemeToggle in `src/components/ThemeToggle.tsx` — replace tooltip strings with `t("theme.switchToLight")` and `t("theme.switchToDark")`
- [x] T026 [US3] Verify RTL layout rendering and game state preservation across all components — switch to Arabic and validate: header logo/controls align right-to-left, word display letters render RTL, Arabic keyboard rows display correctly in RTL, progress bar direction flips, game summary layout mirrors, no overlapping elements or visual glitches; also verify FR-012: start a game, switch language mid-game, confirm guessed letters, mistakes count, and word progress are preserved without reset

**Checkpoint**: Full RTL experience — switching to Arabic mirrors the entire layout, no English text remains

---

## Phase 6: User Story 4 - Arabic Font Rendering (Priority: P4)

**Goal**: Arabic text renders with Noto Sans Arabic font for clear legibility at all sizes

**Independent Test**: Switch to Arabic, verify all Arabic text uses Noto Sans Arabic consistently; English mode unchanged

### Implementation for User Story 4

- [ ] T027 [US4] Verify Arabic font rendering in `src/app/layout.tsx` and `src/theme.ts` — confirm Noto Sans Arabic loads with `--font-arabic` CSS variable; confirm `createAppTheme` sets Arabic font as primary in RTL mode; test at all sizes: word display (large), keyboard keys (medium), labels/buttons (small), tooltips (small)

**Checkpoint**: Arabic text legible at all sizes, English experience visually unchanged

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Shared link language mismatch dialog, edge cases, validation

- [ ] T028 Create LanguageMismatchDialog component in `src/components/PlayContent.tsx` (or separate file `src/components/LanguageMismatchDialog.tsx`) — MUI Dialog with `LanguageMismatchDialogProps` interface (gameLocale, userLocale, onSwitch, onKeep, open); title uses `t("dialog.languageMismatchTitle")`; message uses `t("dialog.languageMismatchMessage")`; two buttons: switch language (`t("dialog.switchLanguage")`) and keep current (`t("dialog.keepCurrent")`)
- [ ] T029 Integrate language mismatch dialog in `src/components/PlayContent.tsx` — when loading config from shared URL, compare `config.locale` (from decoded share link) with `useLocaleStore.locale`; if mismatch and both are defined, show LanguageMismatchDialog before game starts; on switch: call `setLocale(config.locale)` then start game; on keep: start game with current locale (keyboard adapts per-word via FR-015 logic from T014)
- [ ] T030 Run `pnpm run lint` and fix any linting errors introduced by the feature
- [ ] T031 Run `pnpm run build` and verify static export succeeds with no errors; also verify SC-005: switch back to English and confirm the entire app looks and functions identically to the pre-feature version (no visual regressions, no missing text, layout unchanged)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — MVP
- **US2 (Phase 4)**: Depends on Phase 2 (T005 locale store)
- **US3 (Phase 5)**: Depends on Phase 2 (T005, T006, T007 translations) and Phase 4 (T017 LanguageToggle)
- **US4 (Phase 6)**: Depends on Phase 2 (T010 font loading)
- **Polish (Phase 7)**: Depends on Phase 3 (US1) and Phase 4 (US2)

### User Story Dependencies

- **US1 (P1)**: After Foundational — core gameplay, no dependency on other stories
- **US2 (P2)**: After Foundational — language toggle, independently testable
- **US3 (P3)**: After US2 — string extraction requires LanguageToggle to test switching
- **US4 (P4)**: After Foundational — font rendering, independently verifiable

### Within Each User Story

- T011 (useHangman) before T012 (Keyboard) before T014 (PlayContent) — game logic before UI
- T015 (shareLink) can run parallel to T011-T014
- T016 (SetupContent Arabic input) before T019 (SetupContent string extraction) — T019 builds on T016's changes, do not revert input acceptance logic
- T014 (PlayContent gameplay) before T020 (PlayContent strings) before T029 (PlayContent dialog) — same file modified across 3 phases
- T019-T025 (string extraction) all parallel — different files
- T028 before T029 (dialog before integration)

### Parallel Opportunities

- T002, T003, T004 (all utility files) — parallel
- T006, T007 (en.json, ar.json) — parallel
- T019, T020, T021, T022, T023, T024, T025 (all string extraction) — parallel

---

## Parallel Example: Phase 1 Setup

```
T001 (install deps)
  → then parallel:
    T002 (arabicNormalization.ts)
    T003 (scriptDetection.ts)
    T004 (arabicKeyboard.ts)
```

## Parallel Example: Phase 5 (US3 String Extraction)

```
All parallel (different files):
  T019 (SetupContent strings)
  T020 (PlayContent strings)
  T021 (GameStatus strings)
  T022 (GameSummary strings)
  T023 (GameProgress strings)
  T024 (Footer strings)
  T025 (ThemeToggle strings)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T010)
3. Complete Phase 3: User Story 1 (T011-T016)
4. **STOP and VALIDATE**: Enter Arabic words, play full game, share Arabic link
5. Demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready (locale store, translations, RTL theme engine)
2. Add US1 → Arabic gameplay works → Demo (MVP!)
3. Add US2 → Language toggle in header → Demo
4. Add US3 → Full string extraction + RTL polish → Demo
5. Add US4 → Font rendering verification → Demo
6. Add Polish → Language mismatch dialog, lint, build → Final

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Arabic translations in T007 should be reviewed by a native Arabic speaker for natural phrasing
- No `any` types — all new code must use explicit TypeScript interfaces per constitution
