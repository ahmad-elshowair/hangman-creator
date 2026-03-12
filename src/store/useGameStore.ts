import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GameState {
  words: string[];
  maxMistakes: number;
  addWord: (word: string) => void;
  removeWord: (index: number) => void;
  setMaxMistakes: (mistakes: number) => void;
  clearConfig: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      words: [],
      maxMistakes: 6,
      hasHydrated: false,
      addWord: (word) =>
        set((state) => {
          const trimmed = word.trim();
          if (!trimmed) return state;
          if (
            state.words.some((w) => w.toLowerCase() === trimmed.toLowerCase())
          ) {
            return state;
          }
          return { words: [...state.words, trimmed] };
        }),
      removeWord: (index) =>
        set((state) => ({
          words: state.words.filter((_, i) => i !== index),
        })),
      setMaxMistakes: (mistakes) => set({ maxMistakes: mistakes }),
      clearConfig: () => set({ words: [], maxMistakes: 6 }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "hangman-game-config",
      partialize: (state) => ({
        words: state.words,
        maxMistakes: state.maxMistakes,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
