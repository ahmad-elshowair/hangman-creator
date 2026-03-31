# Implementation Plan: Academy Garden Color Refresh

**Branch**: `002-academy-garden-theme` | **Date**: 2026-03-31 | **Spec**: [spec.md](file:///Users/elshowair/code/mine/hangman-creator/specs/002-academy-garden-theme/spec.md)
**Input**: Feature specification from `/specs/002-academy-garden-theme/spec.md`

## Summary
The "Academy Garden" theme transitions the Hangman Creator from a purple identity to a restful, nature-inspired palette of Emerald and Teal. This plan maps out the specific hexadecimal changes in the global theme and shared gradient constants to ensure a unified and professional educational interface.

## Technical Context

**Language/Version**: TypeScript 5+ (Strict Mode)
**Primary Dependencies**: MUI v7, React 19, Next.js 16 (App Router)
**Storage**: N/A (State in Zustand)
**Testing**: Manual Visual Inspection + WCAG Contrast verification
**Target Platform**: Web (Responsive)
**Project Type**: Web Application
**Performance Goals**: Zero impact on hydration or rendering performance.
**Constraints**: Must eliminate all instances of `#7C4DFF` and related purple tones.
**Scale/Scope**: 2 Main Pages (Setup, Play) + Global Theme.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle V: Theming & Accessibility**: ✅ PASS. Updates use higher-contrast student-friendly tones (`#2E7D32`) and adhere to WCAG AA.
- **Principle IV: Strong Typing**: ✅ PASS. All gradients and theme parameters remain strictly typed in TypeScript.

## Project Structure

### Documentation (this feature)

```text
specs/002-academy-garden-theme/
├── plan.md              # This file
├── research.md          # Documented in clarify session
├── data-model.md        # Theme palette and Gradient mapping
├── quickstart.md        # Visual verification guide
└── tasks.md             # Implementation tasks
```

### Source Code Mapping

```text
src/
├── constants/
│   └── gradients.ts     # Update all gradient tokens
├── theme.ts             # Update primary/secondary palettes & component overrides
└── components/
    └── SetupContent.tsx  # Audit for hardcoded purple RGBA values
    └── Keyboard.tsx      # Verify button colors
```

## Hex Mapping & Design Tokens

### Primary Palette (Academy Garden)

| Mode | Token | Current (Purple) | New (Emerald/Teal) |
| :--- | :--- | :--- | :--- |
| **Light** | Primary.Main | `#5E35B1` | `#2E7D32` (Emerald Green) |
| **Light** | Secondary.Main | `#0097A7` | `#0097A7` (Soft Teal) |
| **Light** | Background | `#F5F3FF` | `#F0F4F2` (Soft Mint Gray) |
| **Dark** | Primary.Main | `#7C4DFF` | `#66BB6A` (Vibrant Emerald) |
| **Dark** | Secondary.Main | `#00E5FF` | `#4DB6AC` (Aqua Teal) |

### Gradient Tokens (`gradients.ts`)

- `brand`: `linear-gradient(135deg, #81C784 0%, #2E7D32 50%, #0097A7 100%)`
- `brandReverse`: `linear-gradient(135deg, #2E7D32, #81C784)`
- `progress`: `linear-gradient(90deg, #2E7D32, #4DB6AC)`
- `primary`: `linear-gradient(135deg, #81C784, #2E7D32)`
- `button`: `linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)`
- `buttonHover`: `linear-gradient(135deg, #43A047 0%, #2E7D32 100%)`

### Component Logic Fixes
- `MuiButton.containedPrimary` Box Shadow: Shift to `0 4px 20px rgba(46, 125, 50, 0.4)`.
- `SetupContent` Chip: Shift `rgba(124, 77, 255, 0.12)` to `rgba(46, 125, 50, 0.12)`.
