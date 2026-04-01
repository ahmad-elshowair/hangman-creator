# UI Contracts: Arabic Language Support

**Feature**: 004-arabic-language-support  
**Date**: 2026-04-01

## 1. Locale Store Interface

```ts
// src/store/useLocaleStore.ts

interface LocaleStoreState {
  locale: Locale;
  hasHydrated: boolean;
  direction: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

type Locale = "en" | "ar";
```

## 2. Translation Function Contract

```ts
// t() function behavior

// Input: dot-path key string matching locales/*.json structure
// Output: translated string from current locale

// Examples:
t("setup.title")           // → "Hangman Creator" (en) or "صانع لعبة المشنقة" (ar)
t("game.wordOf")           // → "Word {0} of {1}" pattern handled at call site

// Fallback: if key not found, returns the key string itself
t("nonexistent.key")       // → "nonexistent.key"
```

## 3. Theme Registry Contract (Extended)

```ts
// src/components/ThemeRegistry.tsx

// Input props: none (reads from useThemeStore + useLocaleStore)
// Behavior:
//   1. Reads theme mode from useThemeStore
//   2. Reads direction from useLocaleStore
//   3. Creates theme via createAppTheme(mode, direction)
//   4. Wraps children with correct Emotion cache (LTR or RTL)
//   5. Waits for both stores' hasHydrated before rendering
```

## 4. Arabic Keyboard Component Contract

```ts
// src/components/Keyboard.tsx (extended props)

interface KeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  wrongLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled?: boolean;
  script?: "latin" | "arabic";  // NEW: determines which keyboard layout to show
}
```

## 5. Word Normalization Contract

```ts
// src/utils/arabicNormalization.ts

function normalizeArabicForGameplay(text: string): string;

// Guarantees:
// - Lam-Alef ligatures decomposed to ل + ا
// - All tashkeel removed
// - NFC normalized
// - Hamza forms preserved as distinct
// - Pure function, no side effects
```

## 6. Script Detection Contract

```ts
// src/utils/scriptDetection.ts

function containsArabic(text: string): boolean;
function getScriptDirection(text: string): "rtl" | "ltr";

// Guarantees:
// - Checks against Arabic Unicode ranges
// - Returns true if ANY character in text is Arabic script
// - Pure functions, no side effects
```

## 7. Language Mismatch Dialog Contract

```ts
// New component: LanguageMismatchDialog (rendered in PlayContent)

interface LanguageMismatchDialogProps {
  gameLocale: Locale;           // Language embedded in shared link
  userLocale: Locale;           // User's saved preference
  onSwitch: () => void;         // User accepts language switch
  onKeep: () => void;           // User declines, keeps their language
  open: boolean;                // Dialog visibility
}
```

## 8. Shared Link Config Contract (Extended)

```ts
// src/utils/shareLink.ts

interface GameConfig {
  w: string[];        // words
  m: number;          // maxMistakes
  l?: Locale;         // locale (NEW, optional for backward compat)
}

// Encoding: btoa(encodeURIComponent(JSON.stringify(config)))
// Decoding: JSON.parse(decodeURIComponent(atob(encoded)))
// Post-decode: words normalized via normalizeArabicForGameplay()
// Backward compat: if l is undefined, defaults to "en"
```
