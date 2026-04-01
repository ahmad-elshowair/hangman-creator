# Feature Specification: Neumorphism UI Effect

**Feature Branch**: `003-neumorphism-ui`  
**Created**: 2026-03-31  
**Status**: Draft  
**Input**: User description: "Add the effect of Neumorphism to my app following best practices"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Soft Sculpted Setup Page (Priority: P1)

As a teacher opening the Hangman Creator setup page, I want the main content card, configuration controls (slider, chips), and action buttons to have a soft, physically sculpted appearance so that the interface feels premium, tactile, and modern for my classroom setting.

**Why this priority**: The Setup page is the first thing teachers see. A polished neumorphic card with sculpted controls establishes an immediate impression of quality and professionalism.

**Independent Test**: Load the Setup page in Light mode. The main content card should appear to "rise" gently from the background surface with soft dual shadows. Buttons should look like pressable soft-touch elements. The slider thumb should feel like a tactile dial.

**Acceptance Scenarios**:
1. **Given** the Setup page in Light mode, **When** I view the main content card, **Then** it must appear gently raised off the background with dual (light + dark) outer shadows and no harsh border lines.
2. **Given** the Setup page, **When** I hover over the "Start" button, **Then** it must transition smoothly from a raised state to a slightly flatter or pressed state.
3. **Given** the Setup page, **When** I view the Word List chips, **Then** each chip must appear as a small soft-extruded pill rising subtly from the card surface.
4. **Given** the Setup page, **When** I view the text input field, **Then** it must appear inset (pressed into the surface) with inner shadows instead of a standard outlined border.

---

### User Story 2 - Neumorphic Play Experience (Priority: P2)

As a student playing the Hangman game, I want the keyboard keys and hangman figure panel to use soft neumorphic styling so the game feels engaging, tactile, and satisfying to interact with.

**Why this priority**: The Play page is the primary interactive surface for students. Neumorphic keyboard keys give a satisfying "pressable" feel that enhances the game experience.

**Independent Test**: Navigate to the Play page. Keyboard keys should appear as individually raised soft buttons. When a correct letter is guessed, the key should appear pressed inward (inset shadow). The hangman figure card should be gently raised.

**Acceptance Scenarios**:
1. **Given** the Play page, **When** I view the keyboard, **Then** each key must appear as a soft raised element with dual shadows.
2. **Given** the Play page, **When** I click a key (correct guess), **Then** the key must visually transition from raised to pressed (inset shadows) to indicate it has been used.
3. **Given** the Play page, **When** I click a key (wrong guess), **Then** the key must sink inward with a subtle red-tinted inset shadow, visually distinct from correct (green) inset keys.
4. **Given** the Play page, **When** I view the hangman figure container, **Then** it must appear as a raised neumorphic panel.

---

### Edge Cases

- **Dark Mode Neumorphism**: Neumorphism traditionally works best on light, colored backgrounds. In dark mode, the effect must be adapted — using subtle highlight edges and deeper shadow tones rather than the classic light/dark shadow pair — to avoid a muddy or invisible appearance.
- **Small Elements**: Neumorphism should NOT be applied to very small UI elements (icons, single characters, thin dividers) where the shadow would be imperceptible or cluttering.
- **Accessibility**: The removal of traditional borders in favor of shadows must not reduce the perceived boundary of interactive elements. Focus outlines must remain crisp and visible for keyboard navigation.
- **Performance**: Box-shadow is a paint-intensive CSS property. The number of elements with neumorphic shadows should be limited to primary containers and interactive controls to avoid rendering jank on low-powered devices.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST apply neumorphic raised-surface styling (dual outer shadows: one light highlight, one dark shadow) to the primary content cards on both the Setup and Play pages.
- **FR-002**: System MUST apply neumorphic inset styling (inner shadows) to the text input field on the Setup page to create a "pressed-in" appearance.
- **FR-003**: System MUST apply neumorphic button states: raised (default), slightly flattened (hover), and pressed/inset (active/click).
- **FR-004**: System MUST apply neumorphic raised styling to keyboard keys on the Play page, transitioning to inset when guessed.
- **FR-005**: System MUST provide a distinct dark-mode neumorphic variant that uses a faint emerald highlight edge on the top-left and a deeper forest shadow on the bottom-right, maintaining a 3D illusion with a nature-inspired glow.
- **FR-006**: System MUST preserve all existing WCAG AA-compliant focus outlines for keyboard navigation. Neumorphism must not replace or obscure focus indicators.
- **FR-007**: System MUST centralize all neumorphic shadow tokens (light shadow, dark shadow, inset shadow) in a shared constants file to prevent magic values from scattering across components.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All primary interactive elements (cards, buttons, inputs, keyboard keys) display a visible soft-shadow depth effect that distinguishes them from the background surface.
- **SC-002**: Button hover and active states produce a perceptible visual transition (raised → flat → pressed) that completes in 200ms using an ease-in-out curve.
- **SC-003**: The neumorphic effect is visually effective in both Light and Dark modes without reducing text legibility or element discoverability.
- **SC-004**: No noticeable rendering lag or frame drops when interacting with neumorphic elements on a standard classroom device.

## Assumptions

- The existing Academy Garden background colors (`#F0F4F2` light, `#0F1A14` dark) are sufficiently saturated and non-white to support visible neumorphic shadows. Pure white or pure black backgrounds would make neumorphism invisible.
- Neumorphism will be applied selectively — only to cards, buttons, inputs, chips, and keyboard keys — not to headers, footers, navigation bars, text elements, or progress bars.
- The existing MUI component override architecture in `theme.ts` and `sharedComponents` is the correct place to centralize neumorphic styles.
- The glass-style backdrop-filter effects on keyboard keys will be replaced by the neumorphic shadow approach.

## Clarifications

### Session 2026-03-31
- Q: What shadow depth intensity for neumorphic elements? → A: **Moderate** — Visible but gentle shadows (6-10px blur). Clear depth without looking exaggerated.
- Q: What button interaction model on click? → A: **Shadow Flip** — On click, the outer shadow inverts to an inset shadow, creating a press-down illusion.
- Q: Dark mode shadow strategy? → A: **Green-Tinted Edge Glow** — Faint emerald highlight edge on top-left, deeper forest shadow on bottom-right. Maintains 3D illusion with nature-inspired glow.
- Q: Wrong-guess keyboard key treatment? → A: **Red-Tinted Inset** — Wrong keys sink inward with a subtle red-tinted inset shadow. Clearly distinct from correct (green inset).
- Q: Transition timing and easing curve? → A: **Balanced** — 200ms with ease-in-out. Smooth and perceptible without feeling sluggish.
