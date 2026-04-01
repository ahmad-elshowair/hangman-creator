# Quickstart: Arabic Language Support

**Feature**: 004-arabic-language-support  
**Branch**: `004-arabic-language-support`

## Prerequisites

- Node.js (version matching project `.nvmrc` if present)
- pnpm (project uses pnpm workspaces)

## Setup

```bash
git checkout 004-arabic-language-support
pnpm install
pnpm add stylis @mui/stylis-plugin-rtl
```

## Development

```bash
pnpm dev
```

Open `http://localhost:3000/hangman-creator`

## Key Files to Reference

| File | Purpose |
|------|---------|
| `src/store/useLocaleStore.ts` | Locale state + `t()` translation function |
| `src/locales/en.json` | English translation strings |
| `src/locales/ar.json` | Arabic translation strings |
| `src/constants/arabicKeyboard.ts` | Arabic keyboard layout data |
| `src/utils/arabicNormalization.ts` | Word normalization (Lam-Alef, tashkeel, NFC) |
| `src/utils/scriptDetection.ts` | Arabic script detection |
| `src/components/LanguageToggle.tsx` | Language selector button |
| `src/components/ThemeRegistry.tsx` | Dual Emotion cache + RTL theme |

## Testing the Feature

### Manual Test Scenarios

1. **Language switching**: Click language toggle in header → verify all text switches, layout flips RTL/LTR
2. **Arabic word entry**: Switch to Arabic → type Arabic words in the word list → start game
3. **Arabic gameplay**: Guess letters via on-screen Arabic keyboard → verify correct reveal/wrong count
4. **Physical keyboard**: With Arabic IME active → type Arabic letters → verify they register as guesses
5. **Mixed word list**: Add both Arabic and English words → play → verify keyboard switches per word
6. **Shared link**: Create game with Arabic words → share → open in new session → verify language mismatch dialog
7. **Diacritics**: Enter word with tashkeel (e.g., كِتَاب) → verify diacritics stripped during gameplay
8. **Lam-Alef**: Enter word containing لا → verify it decomposes to ل+ا → guessing لا reveals both
9. **Hamza forms**: Enter word with أ and إ → verify they are distinct guessable letters
10. **Persistence**: Set Arabic → close browser → reopen → verify app loads in Arabic

## Architecture Overview

```
User clicks LanguageToggle
  → useLocaleStore.setLocale("ar")
  → ThemeRegistry detects direction="rtl"
  → Switches to rtlCache (Emotion)
  → Applies RTL theme
  → <html dir="rtl" lang="ar">
  → All components call t() with new locale
  → Keyboard shows Arabic layout
```
