"use client";

import { useState, useCallback, useMemo } from "react";
import { containsArabic } from "@/utils/scriptDetection";
import { normalizeArabicForGameplay } from "@/utils/arabicNormalization";

interface HangmanState {
  currentWordIndex: number;
  guessedLetters: Set<string>;
  results: ("win" | "loss")[];
}

interface UseHangmanReturn {
  // CURRENT WORD STATE
  currentWord: string;
  currentWordIsArabic: boolean;
  currentWordIndex: number;
  totalWords: number;
  maskedWord: string[];
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  wrongLetters: string[];
  mistakes: number;
  maxMistakes: number;

  // STATUS
  isWordWon: boolean;
  isWordLost: boolean;
  isWordFinished: boolean;
  isGameOver: boolean;

  // RESULTS
  results: ("win" | "loss")[];
  wins: number;
  losses: number;

  // ACTIONS
  guessLetter: (letter: string) => void;
  revealWord: () => void;
  nextWord: () => void;
  resetGame: () => void;
}

export function useHangman(
  words: string[],
  maxMistakes: number,
): UseHangmanReturn {
  const [state, setState] = useState<HangmanState>({
    currentWordIndex: 0,
    guessedLetters: new Set(),
    results: [],
  });

  const rawWord = words[state.currentWordIndex] ?? "";
  const currentWord = useMemo(() => {
    // Uppercase applies to Latin, passes Arabic through. 
    // Then normalize decomposes Lam-Alef and strips diacritics.
    return normalizeArabicForGameplay(rawWord.toUpperCase());
  }, [rawWord]);

  const currentWordIsArabic = useMemo(() => containsArabic(currentWord), [currentWord]);
  const totalWords = words.length;

  const correctLetters = useMemo(() => {
    const set = new Set<string>();
    for (const letter of state.guessedLetters) {
      if (currentWord.includes(letter)) {
        set.add(letter);
      }
    }
    return set;
  }, [state.guessedLetters, currentWord]);

  const wrongLetters = useMemo(() => {
    return Array.from(state.guessedLetters).filter(
      (l) => !currentWord.includes(l),
    );
  }, [state.guessedLetters, currentWord]);

  const mistakes = wrongLetters.length;

  const maskedWord = useMemo(() => {
    return currentWord.split("").map((char) => {
      if (char === " ") return " ";
      if (char === "-") return "-";
      return correctLetters.has(char) ? char : "_";
    });
  }, [currentWord, correctLetters]);

  const isWordWon = useMemo(() => {
    if (!currentWord) return false;
    return currentWord.split("").every((char) => {
      if (char === " " || char === "-") return true;
      return correctLetters.has(char);
    });
  }, [currentWord, correctLetters]);

  const isWordLost = mistakes >= maxMistakes;
  const isWordFinished = isWordWon || isWordLost;
  const isGameOver = state.results.length === totalWords && totalWords > 0;

  const wins = state.results.filter((r) => r === "win").length;
  const losses = state.results.filter((r) => r === "loss").length;

  const guessLetter = useCallback(
    (letter: string) => {
      if (isWordFinished) return;
      
      const upper = letter.toUpperCase();

      setState((prev) => {
        if (prev.guessedLetters.has(upper)) return prev;

        const newGuessed = new Set(prev.guessedLetters);
        newGuessed.add(upper);

        return {
          ...prev,
          guessedLetters: newGuessed,
        };
      });
    },
    [isWordFinished],
  );

  const revealWord = useCallback(() => {
    if (isWordFinished) return;

    setState((prev) => {
      const newGuessed = new Set(prev.guessedLetters);
      // ADD ALL CHARACTERS FROM THE CURRENT WORD TO GUESSED LETTERS
      const wordChars = currentWord.split("");
      for (const char of wordChars) {
        if (char !== " " && char !== "-") {
          newGuessed.add(char);
        }
      }
      return {
        ...prev,
        guessedLetters: newGuessed,
      };
    });
  }, [isWordFinished, currentWord]);

  const nextWord = useCallback(() => {
    if (!isWordFinished) return;
    const result: "win" | "loss" = isWordWon ? "win" : "loss";

    setState((prev) => ({
      currentWordIndex: prev.currentWordIndex + 1,
      guessedLetters: new Set(),
      results: [...prev.results, result],
    }));
  }, [isWordFinished, isWordWon]);

  const resetGame = useCallback(() => {
    setState({
      currentWordIndex: 0,
      guessedLetters: new Set(),
      results: [],
    });
  }, []);

  return {
    currentWord,
    currentWordIsArabic,
    currentWordIndex: state.currentWordIndex,
    totalWords,
    maskedWord,
    guessedLetters: state.guessedLetters,
    correctLetters,
    wrongLetters,
    mistakes,
    maxMistakes,
    isWordWon,
    isWordLost,
    isWordFinished,
    isGameOver,
    results: state.results,
    wins,
    losses,
    guessLetter,
    revealWord,
    nextWord,
    resetGame,
  };
}
