"use client";

import { useState, useCallback, useMemo } from "react";

interface HangmanState {
  currentWordIndex: number;
  guessedLetters: Set<string>;
  results: ("win" | "loss")[];
}

interface UseHangmanReturn {
  // Current word state
  currentWord: string;
  currentWordIndex: number;
  totalWords: number;
  maskedWord: string[];
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  wrongLetters: string[];
  mistakes: number;
  maxMistakes: number;

  // Status
  isWordWon: boolean;
  isWordLost: boolean;
  isWordFinished: boolean;
  isGameOver: boolean;

  // Results
  results: ("win" | "loss")[];
  wins: number;
  losses: number;

  // Actions
  guessLetter: (letter: string) => void;
  nextWord: () => void;
  resetGame: () => void;
}

export function useHangman(
  words: string[],
  maxMistakes: number
): UseHangmanReturn {
  const [state, setState] = useState<HangmanState>({
    currentWordIndex: 0,
    guessedLetters: new Set(),
    results: [],
  });

  const currentWord = words[state.currentWordIndex]?.toUpperCase() ?? "";
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
      (l) => !currentWord.includes(l)
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
  const isGameOver =
    state.results.length === totalWords && totalWords > 0;

  const wins = state.results.filter((r) => r === "win").length;
  const losses = state.results.filter((r) => r === "loss").length;

  const guessLetter = useCallback(
    (letter: string) => {
      const upper = letter.toUpperCase();
      if (isWordFinished) return;
      if (state.guessedLetters.has(upper)) return;

      setState((prev) => ({
        ...prev,
        guessedLetters: new Set(prev.guessedLetters).add(upper),
      }));
    },
    [isWordFinished, state.guessedLetters]
  );

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
    nextWord,
    resetGame,
  };
}
