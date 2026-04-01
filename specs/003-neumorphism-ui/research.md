# Research: Neumorphism UI Effect

## Decision 1: Shadow Depth Strategy

- **Decision**: Use moderate-depth shadows (6-10px blur radius) for the neumorphic effect.
- **Rationale**: Provides a clear 3D visual distinction without looking exaggerated or "plastic." Balances premium feel with readability. Industry standard for neumorphic UI.
- **Alternatives considered**: 
  - Subtle (2-4px): Too faint, especially on the `#F0F4F2` light background. Users might not perceive it.
  - Pronounced (12-20px): Overly dramatic. Distracts from game content and creates heavy paint operations.

## Decision 2: Button Interaction Model

- **Decision**: Shadow Flip — outer shadow inverts to inset shadow on click/active state.
- **Rationale**: This is the defining interaction pattern of neumorphism. It creates the most satisfying tactile illusion, making buttons feel physically pressable.
- **Alternatives considered**:
  - Scale Shrink: Less dramatic, doesn't fully leverage the neumorphic visual language.
  - Depth Reduction (two-stage): More complex to implement with diminishing user-perception returns.

## Decision 3: Dark Mode Shadow Technique

- **Decision**: Green-Tinted Edge Glow — faint emerald highlight on top-left, deeper forest shadow on bottom-right.
- **Rationale**: Classic neumorphism fails on dark backgrounds because both shadows blend into black. The green-tinted approach maintains the 3D illusion while tying naturally into the Academy Garden identity. The emerald glow `rgba(102, 187, 106, 0.07)` is subtle enough to avoid looking like a neon border.
- **Alternatives considered**:
  - Border Fallback: Reliable but loses the neumorphic 3D feel entirely — defeats the purpose.
  - Elevated Surface: Flat layering approach; clean but not neumorphic.

## Decision 4: Wrong-Guess Key Treatment

- **Decision**: Red-Tinted Inset — wrong keys sink inward with a subtle red-tinted inner shadow.
- **Rationale**: Creates a clear visual semantic system: green inset = correct, red inset = wrong. Both use the same neumorphic language (inset shadows) but with color-coded feedback. This is intuitive for students.
- **Alternatives considered**:
  - Flat Fade: Simpler but loses neumorphic consistency.
  - Keep as-is (transparent): Inconsistent with the new neumorphic design language.

## Decision 5: Transition Timing

- **Decision**: 200ms with `ease-in-out` easing curve for all neumorphic transitions.
- **Rationale**: The sweet spot between responsive and perceptible. `ease-in-out` provides a natural feel where the shadow transition starts and ends smoothly. Faster (150ms) makes shadow flips look jumpy; slower (280ms) feels sluggish during rapid keyboard interactions in the game.
- **Alternatives considered**:
  - Snappy (150ms, ease-out): Too abrupt for shadow depth changes.
  - Cinematic (280ms, cubic-bezier): Too slow for game-pace keyboard input.

## Performance Considerations

- **Box-shadow paint cost**: `box-shadow` triggers GPU paint operations. Limit neumorphic shadows to ~30-40 elements maximum per page (26 keyboard keys + 1 card + 1 paper + chips = within budget).
- **No filter-based shadows**: Avoid `filter: drop-shadow()` as it's more expensive than `box-shadow` and harder to animate.
- **Transition efficiency**: Only transitioning `box-shadow` (not `background`, `border`, or `transform` simultaneously) keeps the paint cost minimal.

## Neumorphism on Colored Backgrounds

- **Light mode** (`#F0F4F2`): The mint-gray is ideal for neumorphism because:
  - It's not pure white (where the light highlight shadow would be invisible).
  - It has enough saturation to make both the dark and light shadow components visible.
- **Dark mode** (`#0F1A14`): The dark forest green works because:
  - It's not pure black (where contrast would be zero).
  - The green undertone allows the emerald edge glow to feel organic rather than artificial.
