# Data Model: Neumorphism Shadow Tokens

**Feature**: `003-neumorphism-ui`
**Purpose**: Define the complete set of neumorphic shadow tokens used across the application.

## Token Architecture

All tokens are centralized in `src/constants/neumorphism.ts` and exported as a single typed constant object.

## Light Mode Tokens (Surface: `#F0F4F2`)

| Token | Shadow CSS | Use Case |
|-------|-----------|----------|
| `light.raised` | `6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.9)` | Cards, Paper panels |
| `light.raisedSmall` | `3px 3px 6px rgba(0,0,0,0.08), -3px -3px 6px rgba(255,255,255,0.9)` | Chips, keyboard keys, small buttons |
| `light.inset` | `inset 3px 3px 6px rgba(0,0,0,0.08), inset -3px -3px 6px rgba(255,255,255,0.9)` | Text inputs, active buttons |
| `light.flat` | `2px 2px 4px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.7)` | Hover state (reduced depth) |

## Dark Mode Tokens (Surface: `#0F1A14`)

| Token | Shadow CSS | Use Case |
|-------|-----------|----------|
| `dark.raised` | `6px 6px 12px rgba(0,0,0,0.4), -3px -3px 8px rgba(102,187,106,0.07)` | Cards, Paper panels |
| `dark.raisedSmall` | `3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(102,187,106,0.07)` | Chips, keyboard keys |
| `dark.inset` | `inset 3px 3px 6px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(102,187,106,0.05)` | Text inputs, active buttons |
| `dark.flat` | `2px 2px 4px rgba(0,0,0,0.3), -1px -1px 3px rgba(102,187,106,0.05)` | Hover state |

## Semantic State Tokens (Mode-Independent)

| Token | Shadow CSS | Use Case |
|-------|-----------|----------|
| `correctInset` | `inset 2px 2px 5px rgba(46,125,50,0.3), inset -2px -2px 5px rgba(102,187,106,0.15)` | Correct keyboard guess |
| `wrongInset` | `inset 2px 2px 5px rgba(211,47,47,0.3), inset -2px -2px 5px rgba(255,82,82,0.1)` | Wrong keyboard guess |

## Transition Constant

| Token | Value | Rationale |
|-------|-------|-----------|
| `transition` | `all 200ms ease-in-out` | Balanced — perceptible without feeling sluggish |

## Background Tokens for Neumorphic Surfaces

For raised neumorphic elements to look correct, their background must match or closely derive from the page background. **Neumorphism requires opaque surfaces** — translucent backgrounds cause shadows to bleed through, destroying the 3D illusion.

| Token | Light Mode | Dark Mode |
|-------|-----------|----------|
| `surface` | `#F0F4F2` (matches page background) | `#152A1C` (opaque — replaces previous translucent `rgba(15, 26, 20, 0.85)`) |

> **Note**: The dark mode Paper surface shifts from `rgba(15, 26, 20, 0.85)` (translucent, used for glass effects) to opaque `#152A1C`. This is a deliberate architectural change: the glass-style `backdropFilter + border` approach is replaced entirely by the neumorphic `box-shadow` approach.
