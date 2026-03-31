"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import {
  ArrowForward as NextIcon,
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
  Visibility as RevealIcon,
} from "@mui/icons-material";
import { useHangman } from "@/hooks/useHangman";
import { useGameStore } from "@/store/useGameStore";
import HangmanFigure from "@/components/HangmanFigure";
import Keyboard from "@/components/Keyboard";
import WordDisplay from "@/components/WordDisplay";
import GameSkeleton from "@/components/GameSkeleton";
import GameSummary from "@/components/GameSummary";
import GameProgress from "@/components/GameProgress";
import GameStatus from "@/components/GameStatus";
import { decodeGameConfig, extractLegacyHashConfig } from "@/utils/shareLink";

export default function PlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { words, maxMistakes, hasHydrated } = useGameStore();

  // BACKWARD COMPATIBILITY & URL STATE INITIALIZATION
  const [hashChecked, setHashChecked] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const legacyPayload = extractLegacyHashConfig(hash);
      
      if (legacyPayload) {
        // Auto-Redirect out of legacy hash logic into clean params
        router.replace(`?config=${legacyPayload}`);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHashChecked(true);
  }, [router]);

  // PARSE THE CURRENT SEARCH PARAMETERS
  const sharedConfig = useMemo(() => {
    const configParam = searchParams.get("config");
    if (!configParam) return null;
    return decodeGameConfig(configParam);
  }, [searchParams]);

  // DETERMINE THE FINAL CONFIG: URL HASH TAKES PRIORITY OVER ZUSTAND STORE
  const hasSharedConfig = sharedConfig !== null;
  const finalWords = hasSharedConfig ? sharedConfig.words : words;
  const finalMaxMistakes = hasSharedConfig
    ? sharedConfig.maxMistakes
    : maxMistakes;

  // WAIT FOR HYDRATION (STORE) OR HASH CHECK
  if (!hasSharedConfig && !hasHydrated) {
    return <GameSkeleton />;
  }

  if (!hashChecked && !hasSharedConfig) {
    return <GameSkeleton />;
  }

  if (!finalWords || finalWords.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          No Game Configuration Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please go to setup and add some words to play.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          startIcon={<EditIcon />}
        >
          Go back to Setup
        </Button>
      </Container>
    );
  }

  return <GameView config={{ words: finalWords, maxMistakes: finalMaxMistakes }} />;
}

interface GameViewProps {
  config: { words: string[]; maxMistakes: number };
}

function GameView({ config }: GameViewProps) {
  const {
    currentWord,
    currentWordIndex,
    totalWords,
    maskedWord,
    guessedLetters,
    correctLetters,
    wrongLetters,
    mistakes,
    maxMistakes,
    isWordWon,
    isWordFinished,
    isGameOver,
    results,
    wins,
    losses,
    guessLetter,
    revealWord,
    nextWord,
    resetGame,
  } = useHangman(config.words, config.maxMistakes);

  // HANDLE KEYBOARD INPUT
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        guessLetter(letter);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [guessLetter]);

  // END-OF-GAME SUMMARY
  if (isGameOver) {
    return (
      <GameSummary
        totalWords={totalWords}
        words={config.words}
        results={results}
        wins={wins}
        losses={losses}
        resetGame={resetGame}
      />
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      {/* PROGRESS BAR SECTION */}
      <GameProgress
        currentWordIndex={currentWordIndex}
        totalWords={totalWords}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
      />

      {/* HANGMAN FIGURE */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <HangmanFigure mistakes={mistakes} maxMistakes={maxMistakes} />
      </Paper>

      {/* WORD DISPLAY */}
      <WordDisplay
        maskedWord={maskedWord}
        isWordFinished={isWordFinished}
        currentWord={currentWord}
        isWordWon={isWordWon}
      />

      {/* STATUS AND WRONG LETTERS */}
      <GameStatus
        isWordFinished={isWordFinished}
        isWordWon={isWordWon}
        currentWord={currentWord}
        wrongLetters={wrongLetters}
      />

      {/* KEYBOARD OR NEXT BUTTON */}
      {isWordFinished ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            id="next-word-btn"
            variant="contained"
            size="large"
            endIcon={
              currentWordIndex === totalWords - 1 ? (
                <TrophyIcon />
              ) : (
                <NextIcon />
              )
            }
            onClick={nextWord}
            sx={{
              borderRadius: 3,
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            {currentWordIndex === totalWords - 1 ? "Finish Game" : "Next Word"}
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Keyboard
            guessedLetters={guessedLetters}
            correctLetters={correctLetters}
            disabled={isWordFinished}
            onGuess={guessLetter}
          />
          <Button
            variant="text"
            color="secondary"
            onClick={revealWord}
            startIcon={<RevealIcon />}
            sx={{
              mt: 3,
              opacity: 0.7,
              "&:hover": { opacity: 1 },
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            Reveal Word
          </Button>
        </Box>
      )}

    </Container>
  );
}
