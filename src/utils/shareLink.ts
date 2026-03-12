/**
 * SHAREABLE GAME LINK UTILITIES
 * ENCODES/DECODES GAME CONFIG INTO URL HASH FRAGMENTS FOR SHARING.
 */

interface CompactConfig {
  w: string[];
  m: number;
}

/**
 * ENCODES A GAME CONFIGURATION INTO A SHAREABLE URL.
 * USES SHORT JSON KEYS AND BASE64 ENCODING FOR COMPACT URLS.
 */
export function encodeGameConfig(
  words: string[],
  maxMistakes: number,
  basePath: string = "/hangman-creator",
): string {
  const compact: CompactConfig = { w: words, m: maxMistakes };
  const json = JSON.stringify(compact);
  const base64 = btoa(encodeURIComponent(json));
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${basePath}/play#config=${base64}`;
}

/**
 * DECODES A GAME CONFIGURATION FROM A URL HASH FRAGMENT.
 * RETURNS NULL IF THE HASH IS MISSING, INVALID, OR CORRUPTED.
 */
export function decodeGameConfig(
  hash: string,
): { words: string[]; maxMistakes: number } | null {
  try {
    if (!hash || !hash.includes("config=")) return null;

    const base64 = hash.split("config=")[1];
    if (!base64) return null;

    const json = decodeURIComponent(atob(base64));
    const parsed: CompactConfig = JSON.parse(json);

    // VALIDATE THE STRUCTURE
    if (
      !Array.isArray(parsed.w) ||
      parsed.w.length === 0 ||
      typeof parsed.m !== "number" ||
      parsed.m < 1
    ) {
      return null;
    }

    // VALIDATE THAT ALL WORDS ARE NON-EMPTY STRINGS
    if (!parsed.w.every((word) => typeof word === "string" && word.trim())) {
      return null;
    }

    return { words: parsed.w, maxMistakes: parsed.m };
  } catch {
    return null;
  }
}
