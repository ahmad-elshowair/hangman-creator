# Research: Fix URL Encoding

## Decision 1: Base64 Encoding Mechanism
- **Decision**: Use standard string replacement on native `btoa`/`atob` functions to implement Base64URL encoding (`+` -> `-`, `/` -> `_`, trim `=`).
- **Rationale**: Keeps the utility completely dependency-free without requiring external Node.js buffers or heavyweight NPM packages for a simple string replacement.
- **Alternatives considered**: Importing `Buffer` or installing universal base64url libraries, which is overkill for a 2-line utility.

## Decision 2: Next.js Routing
- **Decision**: Use `useSearchParams()` to retrieve the `?config=` payload and wrap `PlayContent` in a `<Suspense>` boundary.
- **Rationale**: Ties natively into App Router state. 
- **Alternatives considered**: Continuing to use `window.location.hash`, which poses hydration mismatch risks and routing bugs.
