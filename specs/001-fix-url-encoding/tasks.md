# Implementation Tasks: Fix Shareable Links URL Encoding

## Feature Overview

**Branch:** `001-fix-url-encoding`
**Goal:** Implement URL-Safe Base64 logic and migrate from hash fragments to search parameters to resolve link corruption natively.

## Phase 1: Foundational Setup
*Tasks that block all subsequent user stories.*

- [x] T001 Update `encodeGameConfig` in `src/utils/shareLink.ts` to replace `+` with `-` and `/` with `_`, stripping `=` padding.
- [x] T002 Update `decodeGameConfig` in `src/utils/shareLink.ts` to reverse the URL-safe mapping before parsing.
- [x] T003 Create `extractLegacyHashConfig()` helper in `src/utils/shareLink.ts` to gracefully parse out old `#config=` structures natively.

## Phase 2: User Story 1 - Share robust links without corruption (P1)
*Goal: Ensure users can reliably share link configurations indefinitely.*
*Independent test criteria: Generating a link yields `?config=...` and old `#config` links properly redirect to `?config` mode without crashing.*

- [x] T004 [US1] Wrap `PlayContent` export inside `src/app/play/page.tsx` with a `<Suspense>` boundary to fulfill Next.js `useSearchParams` requirements.
- [x] T005 [US1] Transition `PlayContent.tsx` inside `src/components/PlayContent.tsx` to import and utilize `useSearchParams()` from `next/navigation` to decode payloads.
- [x] T006 [US1] Add a `useEffect` inside `src/components/PlayContent.tsx` to detect legacy `#config=` URLs, parse them via the new helper, and trigger `router.replace` mapping to the new `?config=` pattern.

## Phase 3: Polish & Cross-Cutting Concerns

- [ ] T007 Review application execution locally to ensure Next.js routing works seamlessly without hydration mismatches.

---

### Implementation Strategy

- Implement Phase 1 utility fixes immediately to verify payload manipulation works locally.
- Implement Phase 2 routing changes to bridge the visual UX.
- All tasks are strictly sequential as the `<Suspense>` App Router constraints rely heavily on the new utility exports.
