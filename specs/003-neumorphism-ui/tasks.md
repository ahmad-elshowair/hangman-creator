# Tasks: Neumorphism UI Effect

**Input**: Design documents from `/specs/003-neumorphism-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested. Visual verification via quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Create the foundational shadow token system.

- [x] T001 Create `src/constants/neumorphism.ts` with all shadow tokens (light.raised, light.raisedSmall, light.inset, light.flat, dark variants, correctInset, wrongInset, transition constant) per data-model.md.

---

## Phase 2: Foundational (Theme Overrides)

**Purpose**: Integrate neumorphic tokens into MUI theme configuration. MUST complete before user story work.

**⚠️ CRITICAL**: No component-level work can begin until this phase is complete.

- [x] T002 Update `src/theme.ts` lightTheme — replace MuiPaper border+boxShadow with `neuShadows.light.raised`, set background to `#F0F4F2`, remove border.
- [x] T003 Update `src/theme.ts` lightTheme — replace MuiCard border+boxShadow with `neuShadows.light.raised`, remove border.
- [x] T004 Update `src/theme.ts` lightTheme — update MuiButton.containedPrimary to use 3-state shadow flip: `neuShadows.light.raisedSmall` (default) → `neuShadows.light.flat` (hover) → `neuShadows.light.inset` (active/click).
- [x] T005 Update `src/theme.ts` lightTheme — update MuiTextField to use `neuShadows.light.inset` on the input root, removing the outlined border.
- [x] T006 Update `src/theme.ts` darkTheme — replace MuiPaper border+backdropFilter with `neuShadows.dark.raised`, set **opaque** background to `#152A1C` (shift from translucent `rgba(15, 26, 20, 0.85)` — neumorphism requires opaque surfaces for shadows to render correctly), remove border.
- [x] T007 Update `src/theme.ts` darkTheme — replace MuiCard border+backdropFilter with `neuShadows.dark.raised`, remove border.
- [x] T008 Update `src/theme.ts` darkTheme — update MuiButton.containedPrimary with dark shadow tokens (raised, flat hover, inset active).
- [x] T009 Update `src/theme.ts` darkTheme — update MuiTextField with `neuShadows.dark.inset`.
- [x] T010 Update `src/theme.ts` sharedComponents — set transition to `neuShadows.transition` on MuiButton root.

**Checkpoint**: Theme overrides complete. All Paper, Card, Button, and TextField elements should now render with neumorphic shadows globally.

---

## Phase 3: User Story 1 — Soft Sculpted Setup Page (Priority: P1) 🎯 MVP

**Goal**: The Setup page card, controls, and buttons display neumorphic styling.

**Independent Test**: Load `/` in Light mode. Main card is raised with dual shadows. Input is inset. Chips are raised. Start button flips shadow on click.

### Implementation for User Story 1

- [x] T011 [US1] Audit `src/components/SetupContent.tsx` — remove the hardcoded `background: isDark ? "rgba(15, 26, 20, 0.7)" : undefined` from the main Paper since theme now handles it.
- [x] T012 [P] [US1] Update Word Chips in `src/components/SetupContent.tsx` — apply `neuShadows` raisedSmall (mode-aware) to each chip's `sx` prop. Import `neuShadows` from constants.
- [x] T013 [P] [US1] Update Mistakes Chip in `src/components/SetupContent.tsx` — apply `neuShadows` raisedSmall to the max-mistakes counter chip.
- [x] T014 [US1] Update `src/components/SetupContent.tsx` Slider thumb — apply `neuShadows` raisedSmall to the thumb `sx` override to give it a tactile, raised feel that harmonizes with the neumorphic card. Remove any conflicting drop shadows.
- [x] T015 [US1] Visual check — load Setup page in both Light and Dark modes. Confirm card raised, input inset, chips raised, button shadow flip on click.

**Checkpoint**: Setup page fully neumorphic. Independently verifiable.

---

## Phase 4: User Story 2 — Neumorphic Play Experience (Priority: P2)

**Goal**: Keyboard keys, hangman panel, and game summary use neumorphic styling.

**Independent Test**: Navigate to `/play`. Keys are raised. Correct guesses become green inset. Wrong guesses become red inset. Hangman panel is a raised card.

### Implementation for User Story 2

- [x] T016 [US2] Refactor `src/components/Keyboard.tsx` — replace `glassBase` (backdropFilter + border) system with `neuShadows` tokens. Default key: raisedSmall. Hover: flat. Transition: `neuShadows.transition`.
- [x] T017 [US2] Update `src/components/Keyboard.tsx` correct-guess state — replace green glass background with `neuShadows.correctInset` (green-tinted inset shadow).
- [x] T018 [US2] Update `src/components/Keyboard.tsx` wrong-guess state — replace transparent/flat style with `neuShadows.wrongInset` (red-tinted inset shadow) and reduced opacity.
- [x] T019 [US2] Audit `src/components/PlayContent.tsx` — remove the hardcoded `background: isDark ? "rgba(15, 26, 20, 0.5)" : undefined` from the hangman figure Paper. Theme override now handles it.
- [x] T020 [P] [US2] Audit `src/components/GameSummary.tsx` — remove the hardcoded `background: isDark ? "rgba(15, 26, 20, 0.7)" : undefined` from the summary Paper. Theme override now handles it.
- [x] T021 [P] [US2] Audit `src/components/GameSkeleton.tsx` — verify skeleton Paper inherits neumorphic shadows from theme (no inline overrides needed).
- [x] T022 [US2] Visual check — load Play page in both Light and Dark modes. Confirm keys raised, correct=green inset, wrong=red inset, hangman panel raised. Transitions smooth at ~200ms.

**Checkpoint**: Play page fully neumorphic. Both stories independently verifiable.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across all pages and modes.

- [x] T023 Accessibility check — tab through all interactive elements on Setup and Play pages. Verify focus outlines remain crisp and visible (not obscured by shadows).
- [x] T024 Performance check — rapidly click keyboard keys on Play page. Confirm no frame drops or stutter.
- [x] T025 Run full `quickstart.md` verification checklist on dev server.

> **Batch Pattern Note**: T011, T019, and T020 all perform the same operation — removing a hardcoded `background: isDark ? "rgba(15, 26, 20, ...)" : undefined` from a Paper `sx` prop. They target different files (`SetupContent.tsx`, `PlayContent.tsx`, `GameSummary.tsx`) and can be executed as a coordinated batch during implementation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 (`neuShadows` must exist before theme uses them).
- **User Story 1 (Phase 3)**: Depends on Phase 2 (theme overrides must be in place).
- **User Story 2 (Phase 4)**: Depends on Phase 2 (theme overrides must be in place). Can run in parallel with Phase 3.
- **Polish (Phase 5)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Setup page. Independent of User Story 2.
- **User Story 2 (P2)**: Play page. Independent of User Story 1.

### Parallel Opportunities

- T002–T009 (theme overrides) target different component sections within theme.ts and should be applied sequentially within a single file edit.
- T012 & T013 (chip styling) can run in parallel — different elements in the same file but different line ranges.
- T020 & T021 (GameSummary / GameSkeleton) can run in parallel — different files.
- User Story 1 and User Story 2 can be implemented in parallel after Phase 2.

---

## Parallel Example: User Story 2

```text
# These can run in parallel (different files):
T020: Audit GameSummary.tsx (remove hardcoded bg)
T021: Audit GameSkeleton.tsx (verify theme inheritance)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Create `neumorphism.ts` token file
2. Complete Phase 2: Theme overrides for Paper, Card, Button, TextField
3. Complete Phase 3: Setup page chips and cleanup
4. **STOP and VALIDATE**: Verify Setup page looks correct in both modes
5. Demo to confirm the neumorphic direction before investing in Play page

### Incremental Delivery

1. Setup + Foundational → Shadow system ready
2. User Story 1 (Setup) → Independently verifiable → Commit
3. User Story 2 (Play) → Independently verifiable → Commit
4. Polish → Final validation → Merge

---

## Notes

- [P] tasks = different files or independent elements, no dependencies
- [Story] label maps task to specific user story for traceability
- The theme.ts changes (T002–T009) are all in one file and should be done as a coordinated batch edit
- Commit after each phase checkpoint
- Shadow tokens are `as const` typed — no runtime overhead
