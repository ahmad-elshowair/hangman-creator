# Quickstart: Neumorphism UI Verification

This guide provides the step-by-step verification flow for the neumorphic UI effect.

## Prerequisites

```bash
pnpm dev
```

## Light Mode Verification

### 1. Setup Page (`/`)

- [ ] **Main Card**: Appears gently raised with visible dual shadows (dark bottom-right, light top-left). No visible border lines.
- [ ] **Text Input**: Appears pressed inward (concave) with inner shadows. No outlined border.
- [ ] **Word Chips**: Each chip appears as a small raised pill with subtle dual shadows.
- [ ] **Mistakes Chip**: The number badge appears raised.
- [ ] **Start Button**: Appears raised. On hover, shadow reduces slightly. On click, shadow flips to inset (pressed illusion).

### 2. Play Page (`/play`)

- [ ] **Hangman Figure Panel**: Appears as a raised neumorphic card.
- [ ] **Keyboard Keys** (default): Each key appears individually raised with subtle shadows.
- [ ] **Keyboard Keys** (correct guess): Key transitions to green-tinted inset (pressed down).
- [ ] **Keyboard Keys** (wrong guess): Key transitions to red-tinted inset (sunk).
- [ ] **Transitions**: All shadow changes complete smoothly in ~200ms.

## Dark Mode Verification

Switch to dark mode via the theme toggle (top-right).

### 3. Setup Page (Dark)

- [ ] **Main Card**: Uses green-tinted edge glow (faint emerald highlight top-left, deep shadow bottom-right). 3D illusion maintained.
- [ ] **Text Input**: Inner shadow visible with green tint. Not muddy or invisible.
- [ ] **Start Button**: Shadow flip works in dark mode.

### 4. Play Page (Dark)

- [ ] **Keyboard Keys**: Green-tinted raised effect visible on dark surface.
- [ ] **Correct Key**: Green inset clearly visible.
- [ ] **Wrong Key**: Red inset clearly visible and distinct from correct.

## Accessibility Check

- [ ] **Focus Outlines**: Tab through interactive elements. Focus rings must remain crisp and visible — not hidden by shadows.
- [ ] **Text Legibility**: All text remains readable. Shadows do not bleed into text areas.

## Performance Check

- [ ] **No Jank**: Rapidly click keyboard keys. No visible frame drops or stutter.
