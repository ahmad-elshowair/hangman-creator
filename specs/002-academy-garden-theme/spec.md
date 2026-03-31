# Feature Specification: Academy Garden Color Refresh

**Feature Branch**: `002-academy-garden-theme`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User choice: "Option 2 Academy Garden (Emerald & Teal)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nature & Growth Identity (Priority: P1)

As a teacher, I want the Hangman Creator to use a restful and focused green-teal color palette so that it feels focused, natural, and scholarly for my students.

**Why this priority**: Emerald/Teal is globally associated with growth, learning, and calmness. It is easier on the eyes during long classroom sessions.

**Independent Test**: Visually inspect the landing page in both Light and Dark modes. All primary action buttons and headers should be Emerald-themed.

**Acceptance Scenarios**:
1. **Given** the Setup page, **When** I view the "Hangman Creator" title, **Then** it must use an Emerald-to-Teal gradient.
2. **Given** the Play page, **When** I guess letters, **Then** the primary action buttons (Next, Start) must be Emerald-green.
3. **Given** a high-mistake game state, **When** I look at the mistake slider, **Then** the indicator must be Teal, not purple.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace all primary purple color variables (`#7C4DFF`, `#5E35B1`, `#B388FF`, `#651FFF`) with **Academy Garden** equivalents (Emerald: `#2E7D32`, Teal: `#0097A7`).
- **FR-002**: System MUST update all shared gradients in `gradients.ts` to reflect the new Emerald-to-Teal transition.
- **FR-003**: System MUST update `theme.ts` to ensure consistent component shadows and hover effects (glows) match the new theme.
- **FR-004**: System MUST audit and replace any hardcoded `rgba(124, 77, 255, ...)` values in component styles or inline SX props.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% removal of purple hex codes in primary visual elements.
- **SC-002**: Contrast ratio for all text on Emerald/Teal backgrounds exceeds WCAG AA (4.5:1).
- **SC-003**: Subjective user satisfaction: The interface feels "focused" and "restful" in light mode.

## Edge Cases

- **Dark Mode Balance**: Ensure the Emerald green remains vibrant and distinguishable against the dark navy background (`#0A0E1A`).
- **Nature Glow**: Ensure the button glows feel "leafy" or "natural" (light green) instead of digital purple.
- **Accessibility**: Verify that the Soft Teal secondary color has enough contrast on the new light-mode background (`#F0F4F2`).

## Clarifications

### Session 2026-03-31
- Q: Choice of light mode background tint? → A: Option B - **Soft Mint (`#F0F4F2`)**. Provides a restful, nature-inspired feel.
- Q: Choice of dark mode primary emerald shade? → A: Option A - **Vibrant Emerald (`#66BB6A`)**. Ensures readability against dark navy.
- Q: Choice of dark mode secondary teal shade? → A: Option B - **Aqua Teal (`#4DB6AC`)**. Provides a cooling contrast.
- Q: Choice of action highlight glow? → A: Option A - **Emerald Shadow (`rgba(46, 125, 50, 0.4)`)**. Ties primary actions into the theme.
