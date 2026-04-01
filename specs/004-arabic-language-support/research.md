# Research: Arabic Language Support

**Feature**: 004-arabic-language-support  
**Date**: 2026-04-01

## 1. i18n Approach

**Decision**: Lightweight custom Zustand store with JSON translation files

**Rationale**: `output: "export"` eliminates `next-intl` (requires server-side `getRequestConfig`). `react-i18next` adds ~50KB for 2 languages. A Zustand store with flat JSON files adds ~0KB overhead, follows existing store patterns (`useThemeStore`), and is fully client-side compatible.

**Alternatives considered**:

| Option | Bundle | Static Export | Verdict |
|--------|--------|---------------|---------|
| Custom Zustand store | ~0 KB | Works | **Chosen** |
| `use-intl` (core of next-intl) | ~13 KB | Works | Overkill for 2 langs |
| `react-i18next` + `i18next` | ~50 KB | Works | Massive overhead |
| `next-intl` full | N/A | Broken | Requires server APIs |

## 2. MUI v7 RTL Support

**Decision**: Dual Emotion Cache (LTR/RTL) + dynamic `dir` on `<html>` + theme direction flag

**Rationale**: MUI v7 RTL requires three coordinated changes: `dir="rtl"` on `<html>`, `direction: "rtl"` in `createTheme()`, and `CacheProvider` with `stylisPlugins: [prefixer, rtlPlugin]`. Since direction changes at runtime, two separate Emotion caches are needed to prevent stale CSS.

**Alternatives considered**:

| Option | Issue |
|--------|-------|
| Single cache, toggle direction | Stale CSS from Emotion |
| CSS `direction` property only | MUI sx/styled won't transform |
| Per-component RTL prop | Manual, error-prone |

**Theme architecture**: Factory function `createAppTheme(mode, direction)` producing 4 variants: LTR dark, RTL dark, LTR light, RTL light.

**New dependencies**: `stylis`, `@mui/stylis-plugin-rtl`

## 3. Arabic Font

**Decision**: Noto Sans Arabic (Google Fonts, variable font)

**Rationale**: Widest glyph coverage (13 weights), excellent readability at all sizes, pairs well with existing Outfit font, available as variable font via `next/font/google`.

**Alternatives considered**:

| Font | Weights | Pairing with Outfit | Verdict |
|------|---------|---------------------|---------|
| Noto Sans Arabic | 13 | Neutral complement | **Chosen** |
| Cairo | 9 | Rounded, may clash | Good alternative |
| Tajawal | 7 | Too similar to Outfit | Rejected |
| IBM Plex Sans Arabic | 5 | Corporate feel | Rejected |

## 4. Arabic Keyboard Layout

**Decision**: Standard 102-key Arabic PC layout (Windows Arabic 101 / macOS Arabic PC / iOS / Android)

**Layout** (3 letter rows, 28 base letters + Lam-Alef ligature key):

**Row 1**: ض ص ث ق ف غ ع ه خ ح ج د  
**Row 2**: ش س ي ب ل ا ت ن م ك ط  
**Row 3**: ئ ء ؤ ر لا ى ة و ز ظ

**Physical keyboard**: `event.key` returns Arabic character when Arabic IME is active. On-screen keyboard displays Arabic letters in standard layout positions.

**Hamza forms on keyboard**: أ (shift+~), إ (shift+Q in some layouts), ئ (Z key), ؤ (C key), ء (X key) — each as separate keys per spec clarification.

**Lam-Alef**: Dedicated key (B physical position), U+FEFB. Words decomposed at entry time to ل+ا.

## 5. Arabic Unicode Normalization

**Decision**: NFC normalization + Lam-Alef decomposition + tashkeel stripping (Hamza forms NOT decomposed)

**Process**:
1. Decompose Lam-Alef ligatures (U+FEFB and variants) to ل (U+0644) + ا (U+0627)
2. Strip all Arabic diacritics (U+0610-U+061A, U+064B-U+065F, U+0670, U+06D6-U+06DC, U+06DF-U+06E4, U+06E7-U+06E8, U+06EA-U+06ED)
3. Apply NFC normalization for canonical consistency

**Hamza handling**: Hamza forms (أ، إ، ئ، ؤ، ء) remain distinct — NOT decomposed. This is critical because they are separate guessable keys per spec. NFD would decompose them, breaking gameplay. NFC preserves them.

**Positional forms**: Arabic joining forms (initial, medial, final, isolated) are rendering concerns only — same Unicode codepoint. NFC handles this automatically.

**Why NFC not NFD**: NFD decomposes precomposed Hamza letters (e.g., أ → ا + hamza above), which breaks gameplay since Hamza forms must remain distinct.

## 6. Arabic Script Detection

**Decision**: Regex-based detection using Unicode ranges

**Ranges**: U+0600-U+06FF (Arabic block), U+0750-U+077F (Arabic Supplement), U+08A0-U+08FF (Arabic Extended-A), U+FB50-U+FDFF (Presentation Forms-A), U+FE70-U+FEFF (Presentation Forms-B)

**Alternatives considered**:

| Option | Pros | Cons |
|--------|------|------|
| Unicode regex | Zero deps, fast, accurate | None |
| `Intl.Segmenter` | Modern API | Not universal browser support |
| `langdetect` lib | Multi-language | Large bundle, async, inaccurate for short words |

## 7. Base64URL Encoding for Arabic

**Decision**: Existing `btoa(encodeURIComponent(...))` approach works correctly — no changes needed

**Verification**: `encodeURIComponent` converts Arabic codepoints to `%uXXXX` percent-encoding (pure ASCII), then `btoa()` works on pure ASCII. Round-trip verified for: standard Arabic words, Lam-Alef ligatures, words with tashkeel, mixed Latin+Arabic word lists.

**Edge case — URL length**: Arabic characters encode to 6 bytes each in `%uXXXX` form. For practical teacher use (< 20 words of reasonable length), URLs stay under the ~2000 char browser limit.

**Recommendation**: Apply `normalizeArabicForGameplay()` when decoding shared links to handle edge cases with precomposed forms.
