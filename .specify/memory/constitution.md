<!--
[Sync Impact Report]
Version change: 0.0.0 -> 1.0.0 (Initial Ratification)
Modified principles: N/A - Initial Creation
Added sections:
- Core Principles (Component & Logic Separation, State Management & Hydration Safety, Stateless & URL-Safe Sharing, Strong Typing, Theming & Accessibility)
- Technology Stack Constraints
- Development Workflow
Removed sections: N/A
Templates requiring updates: 
- ✅ speckit templates align natively.
Follow-up TODOs: 
- Proceed with /speckit.specify for the shareable link correction.
-->
# Hangman Creator Constitution

## Core Principles

### I. Component & Logic Separation
UI components must strictly focus on presentation and user interaction. All complex game rules, scorekeeping, and data handling must be isolated in discrete, testable custom hooks (e.g., `useHangman`).

### II. State Management & Hydration Safety
Global, persistent state is managed via `Zustand`. To prevent Next.js SSR hydration mismatches, any component consuming persistent local storage state must explicitly wait for a `hasHydrated` flag before rendering dependent UI elements.

### III. Stateless & URL-Safe Sharing
Game configurations shared via links must remain fully stateless and embedded entirely in the URL search parameters (`?config=`). Data encoding MUST use Base64URL formatting (replacing `+` with `-`, `/` with `_`, and omitting `=`) to prevent corruption in third-party messaging apps. Configured share links do strictly **not expire**.

### IV. Strong Typing
TypeScript is absolutely mandatory. All component props, Zustand state slices, hooks, and utility payloads must have explicitly defined interfaces. `any` types are strictly prohibited.

### V. Theming & Accessibility
All UI architecture must be constructed utilizing Material-UI (MUI v7). The project must fully support responsive screen layouts and enforce a unified Light/Dark mode, with the user's preference gracefully persisting across sessions.

## Technology Stack Constraints

The following core technologies are the established foundations of this project:
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 + MUI v7 (with Emotion)
- **State Management**: Zustand
- **Language**: TypeScript (Strict Mode)

Introducing new major paradigm tools (e.g., Redux, Tailwind CSS, heavy GraphQL clients) is prohibited without explicit amendment of this constitution.

## Development Workflow

Feature development must utilize a Spec-Driven Development approach via the `Speckit` agent skills (`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`). 
Before any heavy implementation begins, feature intent, success criteria, and technical architecture must be drafted and approved.

## Governance

This Constitution supersedes all ad-hoc architectural decisions and personal preferences. Any fundamental shift in state management, data persistence, or framework boundaries requires formally amending this document first. All feature implementation plans must explicitly verify alignment with the Principles outlined above.

**Version**: 1.0.1 | **Ratified**: 2026-03-30 | **Last Amended**: 2026-03-30
