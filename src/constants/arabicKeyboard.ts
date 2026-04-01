export interface KeyboardKey {
  letter: string;
  label?: string;
}

export type KeyboardRow = KeyboardKey[];

const ARABIC_KEYBOARD_ROWS: KeyboardRow[] = [
  [
    { letter: "\u0636" },
    { letter: "\u0635" },
    { letter: "\u062B" },
    { letter: "\u0642" },
    { letter: "\u0641" },
    { letter: "\u063A" },
    { letter: "\u0639" },
    { letter: "\u0647" },
    { letter: "\u062E" },
    { letter: "\u062D" },
    { letter: "\u062C" },
  ],
  [
    { letter: "\u0634" },
    { letter: "\u0633" },
    { letter: "\u064A" },
    { letter: "\u0628" },
    { letter: "\u0644" },
    { letter: "\u0627" },
    { letter: "\u062A" },
    { letter: "\u0646" },
    { letter: "\u0645" },
    { letter: "\u0643" },
    { letter: "\u062F" },
    { letter: "\u0630" },
    { letter: "\u0637" },
  ],
  [
    { letter: "\u0626" },
    { letter: "\u0621" },
    { letter: "\u0624" },
    { letter: "\u0631" },
    { letter: "\uFEFB", label: "\u0644\u0627" },
    { letter: "\u0649" },
    { letter: "\u0629" },
    { letter: "\u0648" },
    { letter: "\u0632" },
    { letter: "\u0638" },
  ],
];

export function getArabicLetters(): string[] {
  const letters: string[] = [];
  for (const row of ARABIC_KEYBOARD_ROWS) {
    for (const key of row) {
      letters.push(key.letter);
    }
  }
  return letters;
}

export default ARABIC_KEYBOARD_ROWS;
