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

  for (const [ligature, decomposed] of Object.entries(LAM_ALEF_MAP)) {
    normalized = normalized.replaceAll(ligature, decomposed);
  }

  normalized = normalized.replace(TASHKEEL_REGEX, "");

  normalized = normalized.normalize("NFC");

  return normalized;
}

export function getLamAlefMappedLetters(letter: string): string[] {
  if (LAM_ALEF_MAP[letter]) {
    return ["\u0644", "\u0627"];
  }
  return [letter];
}
