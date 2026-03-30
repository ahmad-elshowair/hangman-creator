# Feature Specification: Fix Shareable Links URL Encoding

**Feature Branch**: `001-fix-url-encoding`  
**Created**: 2026-03-30  
**Status**: Draft  
**Input**: User description: "Fix shareable links breaking due to URL encoding"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Share robust links without corruption (Priority: P1)

As a teacher, I want to create a Hangman game and share the link via any messaging platform (WhatsApp, Slack, Email) without the link breaking after a few days so that students can reliably access the game configuration indefinitely.

**Why this priority**: Core functionality currently breaks when messaging apps format URLs containing standard Base64 characters (`+`, `/`, `=`). Resolving this restores trust in the sharing feature.

**Independent Test**: Can be tested by generating a game link, manually replacing spaces or characters to simulate messaging app corruption, and ensuring the game still properly decodes the words.

**Acceptance Scenarios**:

1. **Given** a generated game configuration, **When** the teacher copies the link, **Then** the URL search parameter must use URL-safe Base64 encoding natively (`?config=`).
2. **Given** an old or corrupted link where `+` has been converted to a space `%20` or removed, **When** the student visits the link, **Then** the application must gracefully fallback or normalize the characters to successfully extract the list.
3. **Given** a link generated weeks ago, **When** accessed by a student, **Then** the game must load without any expiration block.

### Edge Cases

- What happens when a user attempts to load a link with completely invalid base64 data? The system should fall back to a "No Configuration Found" state rather than crashing.
- How does system handle deeply encoded characters (e.g. if the URL gets double-encoded by a messaging app)? The system should decode it fully before parsing base64.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST encode the game configuration using URL-Safe Base64 (replacing `+` with `-` and `/` with `_`, stripping `=`).
- **FR-002**: System MUST parse incoming configurations from the URL query parameters (`?config=`) resiliently.
- **FR-003**: System MUST NOT attach or validate any expiration timestamp to the payload. Links must be permanently valid.
- **FR-004**: System MUST maintain backward compatibility so that previously correctly formatted Base64 links still work.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Shared URLs contain strictly alphanumeric characters and hyphens/underscores in the `config=` search parameter.
- **SC-002**: 100% of links shared via standard messaging apps render successfully without returning "no configs" (null).
- **SC-003**: 0% of configurations expire over time.

## Assumptions

- We assume no malicious intent with the game logic; configs do not require cryptographic signatures or encryption, just structural URL safety.
- Expiration logic is explicitly rejected by the product owner (teacher tool simplicity outweighs security obsolescence).
