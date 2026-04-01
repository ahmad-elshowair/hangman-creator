# Data Model: Arabic Language Support

**Feature**: 004-arabic-language-support  
**Date**: 2026-04-01

## Entities

### 1. Locale Store (`useLocaleStore`)

**File**: `src/store/useLocaleStore.ts`

| Field | Type | Description |
|-------|------|-------------|
| `locale` | `"en" \| "ar"` | Currently active language |
| `setLocale` | `(locale: Locale) => void` | Update language |
| `t` | `(key: string) => string` | Translation lookup by dot-path (e.g., `"setup.title"`) |
| `hasHydrated` | `boolean` | Whether persisted state has loaded from localStorage |
| `direction` | `"ltr" \| "rtl"` (derived) | Computed from `locale`: `"ar"` → `"rtl"`, `"en"` → `"ltr"` |

**Persistence**: localStorage key `"hangman-locale"`

**Relationships**: Consumed by ThemeRegistry (for direction/cache switching), layout.tsx (for `dir`/`lang` attributes), all components (via `t()` for translated strings)

### 2. Translation Messages

**Files**: `src/locales/en.json`, `src/locales/ar.json`

**Structure**: Flat nested JSON object with dot-path keys:

```text
{
  "setup": {
    "title": "...",
    "subtitle": "...",
    "maxMistakes": "...",
    "wordList": "...",
    "placeholder": "...",
    "noWords": "...",
    "wordsBlurred": "...",
    "clear": "...",
    "start": "...",
    "share": "...",
    "shareTitle": "...",
    "shareInstructions": "...",
    "copyLink": "...",
    "close": "...",
    "copied": "..."
  },
  "play": {
    "noConfig": "...",
    "goBack": "...",
    "nextWord": "...",
    "finishGame": "...",
    "revealWord": "..."
  },
  "game": {
    "wordOf": "...",
    "mistakesOf": "...",
    "correct": "...",
    "theWordWas": "...",
    "perfectScore": "...",
    "gameOver": "...",
    "completedWords": "...",
    "correctLabel": "...",
    "missedLabel": "...",
    "newGame": "...",
    "playAgain": "..."
  },
  "header": {
    "backToSetup": "...",
    "logoAlt": "...",
    "title": "..."
  },
  "footer": {
    "createdWith": "...",
    "by": "..."
  },
  "theme": {
    "switchToLight": "...",
    "switchToDark": "..."
  },
  "language": {
    "switchToArabic": "...",
    "switchToEnglish": "..."
  },
  "dialog": {
    "languageMismatchTitle": "...",
    "languageMismatchMessage": "...",
    "switchLanguage": "...",
    "keepCurrent": "..."
  }
}
```

**Validation rules**: Both files must have identical key structure. Missing keys fall back to the key path itself.

### 3. Arabic Keyboard Layout

**File**: `src/constants/arabicKeyboard.ts`

**Structure**: Array of rows, each row is an array of key objects:

```text
interface KeyboardKey {
  letter: string;       // Display character (e.g., "ض")
  codepoint: string;    // Unicode string for matching (e.g., "\u0636")
  label?: string;       // Optional override for display
}

type KeyboardRow = KeyboardKey[];
type ArabicKeyboardLayout = KeyboardRow[];
```

**Validation rules**:
- 3 rows: Row 1 (11 keys), Row 2 (11 keys), Row 3 (9 keys)
- Total 28 base letters + 1 Lam-Alef ligature key = 29 key slots
- No duplicate codepoints within a single layout

**Relationships**: Consumed by `Keyboard.tsx` to render Arabic keyboard; `useHangman.ts` uses codepoints for letter matching

### 4. Game Configuration (Extended)

**Existing entity**: `useGameStore` — no structural changes to the store itself

**Extension**: Shared link encoding now includes `locale` field:

```text
{
  w: string[];    // words (may contain Arabic)
  m: number;      // maxMistakes
  l: "en" | "ar"; // locale (new field)
}
```

**Validation rules**:
- `l` field is optional for backward compatibility — defaults to `"en"` if missing
- Words are normalized via `normalizeArabicForGameplay()` on decode

### 5. Word Normalization State

**Not a persistent entity** — a pure function applied at word entry and link decode time.

**File**: `src/utils/arabicNormalization.ts`

**Function**: `normalizeArabicForGameplay(text: string): string`

**Transformation pipeline**:
1. Decompose Lam-Alef ligatures → individual ل + ا
2. Strip all Arabic diacritics (tashkeel)
3. Apply NFC normalization

**What is preserved**:
- Hamza forms remain distinct (أ ≠ إ ≠ ئ ≠ ؤ ≠ ء)
- Ta Marbuta (ة) and Alef Maqsura (ى) are distinct letters
- Base letter identity is preserved

## State Transitions

### Language Switch (at any time)

```text
User selects language
  → setLocale(newLocale)
  → Locale store updates
  → ThemeRegistry detects direction change
  → Switches Emotion cache (LTR ↔ RTL)
  → Applies theme with new direction
  → layout.tsx updates <html dir="..." lang="...">
  → All components re-render with t(newLocale) strings
  → Keyboard.tsx shows matching layout
  → Game state (guessed letters, mistakes) preserved
```

### Shared Link Open with Language Mismatch

```text
User opens shared link
  → Decode config from URL
  → Normalize words
  → Compare config.locale with user's saved locale
  → IF mismatch:
      → Show dialog: "This game is in {config.locale}. Switch language?"
      → IF user accepts: setLocale(config.locale), start game
      → IF user declines: keep current locale, start game (keyboard adapts per-word)
  → IF match or no locale in link:
      → Start game normally
```
