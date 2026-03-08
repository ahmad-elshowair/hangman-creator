export interface GameConfig {
  words: string[];
  maxMistakes: number;
}

const STORAGE_KEY = "hangman-game-config";

export function saveGameConfig(config: GameConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadGameConfig(): GameConfig | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as GameConfig;
    if (
      Array.isArray(parsed.words) &&
      parsed.words.length > 0 &&
      typeof parsed.maxMistakes === "number"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearGameConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
