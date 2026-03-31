# Implementation Tasks: Academy Garden Color Refresh

**Feature**: `002-academy-garden-theme`  
**Goal**: Transition from Purple to Emerald/Teal identity for a student-friendly layout.

## Phase 1: Setup & Hygiene
*Baseline preparation for the migration.*

- [x] T001 Initialize feature branch `002-academy-garden-theme`.
- [x] T002 Sync architectural documentation (Plan, Spec, Data-Model).

## Phase 2: Foundational Design Tokens
*Establishing the new Academy Garden palette in the core configuration.*

- [x] T003 [P] Update `src/constants/gradients.ts` with Emerald and Teal gradient tokens per design spec.
- [x] T004 [P] Update `src/theme.ts` palettes (Primary, Secondary, Background) for both Light and Dark modes.
- [x] T005 Update MUI component overrides in `src/theme.ts` for MuiButton shadows and MuiTextField focus states using the new primary emerald shadow.

## Phase 3: User Story 1 - Nature & Growth Identity (P1)
*Applying the theme to active components and UI flows.*

- [ ] T006 [P] [US1] Audit and replace hardcoded purple `rgba(124, 77, 255, ...)` values in `src/components/SetupContent.tsx` (specifically in Slider and Word Chips).
- [ ] T007 [P] [US1] Update `src/components/GameSkeleton.tsx` background colors to match the new Soft Mint background in Light Mode.
- [ ] T008 [P] [US1] Verify Word Chips in `SetupContent` use the new Emerald tint for both blurred and reveal states.
- [ ] T008b [P] [US1] Audit `src/components/PlayContent.tsx`, `src/components/Keyboard.tsx`, and `src/components/WordDisplay.tsx` to ensure all purple active states are removed.
## Phase 4: Polish & Final Verification
*Ensuring a high-quality finish for student eyes.*

- [ ] T009 [US1] Perform a visual high-contrast check on the soft mint background (`#F0F4F2`).
- [ ] T010 [US1] Verify that Emerald active states in Dark Mode meet WCAG AA standards.
- [ ] T011 Final "Daylight" smoke test on dev server to confirm no lingering purple fragments remain and that the `#F0F4F2` Soft Mint background is rendering correctly.
---

## Technical Dependencies

- **T003** & **T004** are blocking for all UI work.
- **T006** - **T008** can be implemented in parallel after foundries are established.

## MVP Implementation Strategy (Phase 3)
1. Foundational palette update (Constants & Theme).
2. Setup page migration (Gradients & Sliders).
3. Play page migration (Keys & Word Display).
