# Implementation Plan: Fix Shareable Links URL Encoding

**Branch**: `001-fix-url-encoding` | **Date**: 2026-03-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-fix-url-encoding/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement URL-Safe Base64 logic and migrate from hash fragments (`#config=`) to search parameters (`?config=`) to resolve link corruption across messaging platforms natively.

## Technical Context

**Language/Version**: TypeScript 5+
**Primary Dependencies**: Next.js 16 (App Router), React 19
**Storage**: Stateless (Base64 URL encoding)
**Testing**: Manual link payload testing.
**Target Platform**: Browser (Web)
**Project Type**: Next.js Web App
**Performance Goals**: Instant decode routing
**Constraints**: Zero server-side persistence; payload entirely client-based.
**Scale/Scope**: O(N) characters payload execution.

## Constitution Check

_GATE PASS: The architectural direction adheres identically to Constitution v1.0.1 Principle III mandating Stateless Search Parameter encoding._

## Project Structure

### Documentation (this feature)

```text
specs/001-fix-url-encoding/
├── plan.md              # This file
├── research.md          # Generated Phase 0
├── data-model.md        # Generated Phase 1
├── quickstart.md        # Generated Phase 1
└── tasks.md             # Pending execution
```

### Source Code (repository root)

```text
src/
├── app/
│   └── play/
│       └── page.tsx
├── components/
│   └── PlayContent.tsx
└── utils/
    └── shareLink.ts
```

**Structure Decision**: The single-project Next.js layout natively handles this within its `components` and `utils` directory logic.

## Complexity Tracking

N/A. This simplifies complexity by natively hooking into `useSearchParams()`.
