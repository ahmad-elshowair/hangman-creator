/**
 * SHAREABLE GAME LINK UTILITIES
 * ENCODES/DECODES GAME CONFIG INTO URL HASH FRAGMENTS FOR SHARING.
 */

import { normalizeArabicForGameplay } from "@/utils/arabicNormalization";

interface CompactConfig {
  w: string[];
  m: number;
  l?: "en" | "ar";
}

/**
 * ENCODES A GAME CONFIGURATION INTO A SHAREABLE URL.
 * USES SHORT JSON KEYS AND BASE64 ENCODING FOR COMPACT URLS.
 */
export function encodeGameConfig(
  words: string[],
  maxMistakes: number,
  locale: "en" | "ar",
  basePath: string = "/hangman-creator",
): string {
  const compact: CompactConfig = { w: words, m: maxMistakes, l: locale };
  const json = JSON.stringify(compact);
  const base64 = typeof window !== "undefined" ? btoa(encodeURIComponent(json)) : Buffer.from(encodeURIComponent(json)).toString('base64');
  const urlSafeBase64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${basePath}/play?config=${urlSafeBase64}`;
}

/**
 * DECODES A GAME CONFIGURATION FROM A BASE64URL PAYLOAD.
 * RETURNS NULL IF THE PAYLOAD IS MISSING, INVALID, OR CORRUPTED.
 */
export function decodeGameConfig(
  payload: string,
): { words: string[]; maxMistakes: number; locale: "en" | "ar" } | null {
  try {
    if (!payload) return null;

    // Remove any accidental 'config=' prefixes just in case it wasn't stripped
    const rawData = payload.includes("config=") ? payload.split("config=")[1] : payload;
    if (!rawData) return null;

    // Convert URL-safe Base64URL back to standard Base64
    // Also replace spaces with '+' to catch links corrupted by messaging wrappers
    const base64 = rawData.replace(/-/g, "+").replace(/_/g, "/").replace(/ /g, "+");

    const decodedStr = typeof window !== "undefined" ? atob(base64) : Buffer.from(base64, 'base64').toString();
    const json = decodeURIComponent(decodedStr);
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

    const normalizedWords = parsed.w.map((w) => normalizeArabicForGameplay(w));

    return { words: normalizedWords, maxMistakes: parsed.m, locale: parsed.l || "en" };
  } catch {
    return null;
  }
}

/**
 * DETECTS AND EXTRACTS A LEGACY URL HASH `#config=` FOR BACKWARD COMPATIBILITY MIGRATION.
 */
export function extractLegacyHashConfig(hash: string): string | null {
  if (!hash || !hash.includes("#config=")) return null;
  return hash.split("#config=")[1] || null;
}
