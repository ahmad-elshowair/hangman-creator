const LAM_ALEF_MAP: Record<string, string> = {
  "\uFEFB": "\u0644\u0627",
  "\uFEF7": "\u0644\u0627",
  "\uFEF9": "\u0644\u0627",
  "\uFEF5": "\u0644\u0627",
};

const TASHKEEL_REGEX =
  /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g;

export function normalizeArabicForGameplay(text: string): string {
  let normalized = text;

  // 1. Consistently decompose all ligatures to plain Lam + Alef
  for (const [ligature, decomposed] of Object.entries(LAM_ALEF_MAP)) {
    normalized = normalized.replaceAll(ligature, decomposed);
  }

  // 2. Strip diacritics
  normalized = normalized.replace(TASHKEEL_REGEX, "");

  // 3. Normalize forms
  normalized = normalized.normalize("NFC");

  // 4. Normalize all Alef variants to plain Alef (\u0627)
  // This matches the simplified keyboard which only has one Alef key.
  normalized = normalized.replace(/[\u0622\u0623\u0625]/g, "\u0627");

  // 5. COMPOSE: Merge every plain Lam + Alef back into the single ligature character \uFEFB
  // This makes it a single logical character for the hangman game logic.
  normalized = normalized.replaceAll("\u0644\u0627", "\uFEFB");

  return normalized;
}
