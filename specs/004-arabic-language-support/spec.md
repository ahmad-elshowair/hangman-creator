# Feature Specification: Arabic Language Support

**Feature Branch**: `004-arabic-language-support`  
**Created**: 2026-04-01  
**Status**: Draft  
**Input**: User description: "Add Arabic language support for word input and gameplay"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Arabic Word Input and Gameplay (Priority: P1)

A teacher who speaks Arabic wants to create a Hangman game using Arabic words for their students. They switch the app to Arabic, type Arabic words into the word list, configure the game, and share it. Their students open the shared link, see the entire game interface in Arabic with right-to-left layout, and play using an on-screen Arabic keyboard.

**Why this priority**: This is the core value proposition — without Arabic word input and gameplay, the feature has no purpose. This alone delivers a fully functional Arabic Hangman experience.

**Independent Test**: Can be fully tested by switching to Arabic mode, entering Arabic words, starting a game, guessing letters via the Arabic keyboard, and completing a full game round. Delivers a complete Arabic Hangman experience.

**Acceptance Scenarios**:

1. **Given** the app is set to Arabic, **When** a teacher types Arabic words and starts a game, **Then** the word display shows Arabic letters masked with placeholders and reveals correctly guessed Arabic letters
2. **Given** a game is in progress with an Arabic word, **When** a student taps an Arabic letter on the on-screen keyboard, **Then** the letter is processed — revealed if correct or counted as a mistake if wrong
3. **Given** a student is playing in Arabic, **When** they type on a physical Arabic keyboard, **Then** the Arabic letter is registered as a guess
4. **Given** a teacher has created an Arabic game, **When** they share the link, **Then** the recipient opens the link and the game loads with all Arabic words intact and the interface displayed in Arabic
5. **Given** the game is set to Arabic, **When** the student wins or loses, **Then** the status messages ("Correct!", "The word was:") are displayed in Arabic

---

### User Story 2 - Language Switching (Priority: P2)

A teacher or student wants to switch the entire app interface between English and Arabic. They locate a language toggle, select their preferred language, and the entire interface — including layout direction, labels, buttons, messages, and keyboard — updates immediately. Their preference is remembered for future visits.

**Why this priority**: Language switching is the gateway to the Arabic experience. Without an easy way to switch, users cannot access the Arabic mode. However, once implemented, it enables P1 and all subsequent stories.

**Independent Test**: Can be tested by toggling the language selector between English and Arabic and verifying that all UI text, layout direction, and keyboard layout change immediately. Delivers a bilingual app shell.

**Acceptance Scenarios**:

1. **Given** the app is displayed in English, **When** the user selects Arabic from the language toggle, **Then** all UI labels, messages, and buttons switch to Arabic and the layout becomes right-to-left
2. **Given** the app is displayed in Arabic, **When** the user selects English from the language toggle, **Then** all UI text switches back to English and the layout becomes left-to-right
3. **Given** a user has set their language to Arabic, **When** they close and reopen the app, **Then** the app loads in Arabic with RTL layout
4. **Given** the user switches language mid-game, **When** the switch completes, **Then** the current game state (guessed letters, mistakes, word progress) is preserved

---

### User Story 3 - Right-to-Left Layout (Priority: P3)

When the app is set to Arabic, the entire layout mirrors its English counterpart. The header, word display, keyboard, progress indicators, and game summary all adapt to a right-to-left reading direction while maintaining visual consistency and usability.

**Why this priority**: RTL layout is essential for a natural Arabic user experience. Without it, the Arabic text would appear in an unnatural reading order. It supports P1 but is separated because layout adaptation is a distinct concern from text translation.

**Independent Test**: Can be tested by switching to Arabic and verifying that all components — header alignment, word display letter order, keyboard row arrangement, progress bar direction, and summary layout — are mirrored for RTL.

**Acceptance Scenarios**:

1. **Given** the app is in Arabic mode, **When** the word display renders a masked word, **Then** Arabic letters appear in right-to-left order
2. **Given** the app is in Arabic mode, **When** the header is displayed, **Then** the logo, title, and controls are aligned for RTL reading
3. **Given** the app is in Arabic mode, **When** the game summary shows results, **Then** word results and statistics are laid out right-to-left

---

### User Story 4 - Arabic Font Rendering (Priority: P4)

Arabic text throughout the app renders clearly and beautifully using a font designed for Arabic script, ensuring legibility at all sizes — from small labels to the large word display letters.

**Why this priority**: Proper font rendering is important for readability but secondary to functional language support. Arabic text would still render with system fallback fonts; a dedicated font polishes the experience.

**Independent Test**: Can be tested by switching to Arabic and verifying that all Arabic text uses a consistent Arabic-optimized font with clear legibility at various sizes.

**Acceptance Scenarios**:

1. **Given** the app is in Arabic mode, **When** any Arabic text is displayed, **Then** it renders using an Arabic-optimized font with consistent styling
2. **Given** the app is in English mode, **When** text is displayed, **Then** the existing Latin font is used without visual changes to the current experience

---

### Edge Cases

- When a teacher mixes Arabic and English words in the same word list, the system dynamically detects the script of each word and switches the on-screen keyboard accordingly during gameplay
- When a shared link contains Arabic words and the recipient opens it while the app is set to English, a dialog prompts them to switch to the game's language; if they decline, the UI stays in English and only the keyboard adapts per word script
- Arabic letter forms (initial, medial, final, isolated) are treated as equivalent for letter matching, except Hamza forms which are separate keys (covered by FR-013)
- Arabic diacritics are stripped from words at entry time (when added to the word list or decoded from shared links) and are not guessable (covered by FR-014)
- What happens if the user's browser or device does not support Arabic fonts? The browser will fall back to its default system font for Arabic script, which all modern operating systems include. The Arabic-optimized font (Noto Sans Arabic) is loaded as an enhancement; the game remains functional without it.
- What happens when the game URL with Arabic words is shared via platforms that may not handle Unicode correctly? The existing Base64URL encoding ensures the URL payload is pure ASCII. If a platform corrupts the URL string itself (truncation, encoding issues), the game will fail to decode the config and show the "no configuration found" error screen with a link back to setup.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST display all user-facing text (labels, buttons, messages, tooltips, page titles) in Arabic when Arabic language is selected
- **FR-002**: The system MUST provide a language selector accessible from the header that allows switching between English and Arabic at any time
- **FR-003**: The system MUST persist the user's language preference so it is retained across sessions
- **FR-004**: The system MUST switch the entire page layout direction to right-to-left when Arabic is selected, and left-to-right when English is selected
- **FR-005**: The system MUST accept Arabic letters as valid input in the word entry field
- **FR-006**: The system MUST accept Arabic letters as valid guesses during gameplay via both on-screen and physical keyboards
- **FR-007**: The system MUST display an Arabic letter keyboard layout when the current word contains Arabic script (replacing the English QWERTY layout); when a word list contains mixed scripts, the keyboard switches per word (see FR-015)
- **FR-008**: The system MUST correctly mask and reveal Arabic letters in the word display during gameplay
- **FR-009**: The system MUST correctly encode and decode Arabic words in shared game links so they are preserved when opened by another user
- **FR-010**: The system MUST render Arabic text using an Arabic-optimized font for clear legibility
- **FR-011**: The system MUST retain the existing English experience unchanged when English is selected
- **FR-012**: The system MUST preserve game state (guessed letters, mistakes, word progress) when the user switches language mid-game
- **FR-013**: The system MUST treat Arabic letter forms as equivalent regardless of position (initial, medial, final, isolated) — a guess for a letter matches all positional forms of that letter in the word, except for Hamza forms (أ، إ، ئ، ؤ، ء) which are each treated as separate guessable keys matching the physical Arabic keyboard layout
- **FR-014**: The system MUST handle Arabic diacritics by stripping them from words at the point of word entry (when a teacher adds a word to the list or when words are decoded from a shared link); diacritics are never stored as part of the playable word and are not guessable letters
- **FR-015**: The system MUST dynamically switch the on-screen keyboard layout per word when the word list contains mixed scripts, detecting each word's script and showing the matching keyboard (Arabic or English QWERTY)
- **FR-016**: When a mixed-script word list is played, the system MUST accept both Arabic and Latin letter guesses via physical keyboard regardless of which script keyboard is currently displayed
- **FR-017**: When a shared game link's language differs from the recipient's saved language preference, the system MUST show a dialog before gameplay asking whether to switch to the game's language; if the recipient declines, the UI remains in their saved language and only the per-word keyboard adapts
- **FR-018**: The Arabic keyboard MUST include the Lam-Alef ligature (لا) as a single guessable key matching the standard Arabic keyboard layout, alongside individual ل and ا keys; the system MUST decompose all Lam-Alef ligatures to individual ل+ا at word entry time, and guessing the لا key MUST reveal both ل and ا in the word

### Key Entities

- **Language Preference**: The user's selected language (English or Arabic), persisted across sessions. Controls all UI text, layout direction, keyboard layout, and font rendering.
- **Localized String**: A key-value pair mapping a UI string identifier to its translated text in a given language. Covers all user-facing text in the app.
- **Keyboard Layout**: The set of letters and their arrangement for a given language. English has 26 letters in QWERTY arrangement; Arabic has 28 letters in a distinct arrangement.
- **Game Configuration (extended)**: The existing word list and settings, now potentially containing Arabic words. Shared links must encode the language alongside words to ensure the recipient sees the correct interface.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: All 30+ user-facing text strings are translated to Arabic with correct grammar and natural phrasing
- **SC-002**: Users can complete a full Arabic game cycle (enter words, play, see summary) with no English text remaining visible
- **SC-003**: Layout direction switches within 1 second of toggling language, with no visual glitches or overlapping elements
- **SC-004**: Arabic game links round-trip successfully — shared Arabic words load identically for the recipient
- **SC-005**: The English experience remains visually and functionally identical to the current production version
- **SC-006**: Arabic text is legible at all sizes used in the app (labels, word display, keyboard keys, messages)

## Assumptions

- The app targets Modern Standard Arabic (فصحى) rather than regional dialects, as it is educational software for schools
- Only two languages are supported initially: English (existing) and Arabic. Additional languages are out of scope
- Arabic diacritics (tashkeel) will be stripped from words during gameplay to simplify letter matching, as is common in Arabic word games
- The language selector will be placed in the existing header alongside the theme toggle, following the current UI pattern
- Shared game links will include the language setting so the recipient automatically sees the correct language
- The app continues to be a static export with no server-side rendering; all internationalization must work client-side
- Teachers may enter words in any language regardless of the current UI language; the system detects each word's script and adapts the keyboard layout accordingly during gameplay
- The on-screen Arabic keyboard will follow the standard Arabic keyboard layout commonly used on mobile and desktop devices

## Clarifications

### Session 2026-04-01

- Q: When a word list contains both Arabic and English words, what should happen during gameplay? → A: Dynamically switch the on-screen keyboard per word based on detected script of the current word
- Q: What happens when a shared link contains Arabic words and the recipient has their app set to English? → A: Show a dialog prompting the recipient to switch to the game's language before playing; if they decline, the UI stays in their saved language and only the keyboard adapts per-word
- Q: How should Hamza forms (أ، إ، ئ، ؤ، ء) be handled as guessable letters? → A: Treat each Hamza form as a separate guessable key, matching the physical Arabic keyboard layout
- Q: How should the Lam-Alef ligature (لا) be handled — as one key or decomposed? → A: Include لا as a single guessable key on the keyboard, matching the standard Arabic keyboard layout, alongside individual ل and ا keys
- Q: How should Lam-Alef ligatures be matched against individual ل and ا letters in words? → A: Decompose all Lam-Alef ligatures to individual ل+ا at word entry time; the لا key is a convenience for guessing and reveals both ل and ا in the word
