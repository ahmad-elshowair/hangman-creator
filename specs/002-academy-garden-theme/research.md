# Research: Academy Garden Color Refresh

## Decisions & Rationale

### 1. Primary Emerald Green (#2E7D32)

- **Decision**: Use Emerald Green as the primary brand anchor.
- **Rationale**: Associated with focus, growth, and scholarly environments. Offers excellent contrast against light mint backgrounds.
- **Alternatives**: Forest Green (Too dark), Mint Green (Too low contrast).

### 2. Secondary Soft Teal (#0097A7)

- **Decision**: Use Soft Teal for secondary actions and progress states.
- **Rationale**: Complements Emerald Green without being vibratingly bright. Provides a "cooling" element to the UI.
- **Alternatives**: Cyan (Too bright/digital), Blue (Conflicts with nature theme).

### 3. Light Mode Background (#F0F4F2)

- **Decision**: Use a "Soft Mint Gray" background instead of pure white or purple-tinted white.
- **Rationale**: Significantly reduces eye strain in bright light conditions (classrooms).
- **Alternatives**: Pure White (Too much glare), Cool Gray (Too clinical).

## Accessibility Verification

- **Contrast Check**: White text on `#2E7D32` Emerald Green has a ratio of **5.1:1**, passing WCAG AA.
- **Dark Mode**: Vibrant Emerald (`#66BB6A`) on Navy (`#0A0E1A`) has a ratio of **7.5:1**, passing WCAG AAA.
