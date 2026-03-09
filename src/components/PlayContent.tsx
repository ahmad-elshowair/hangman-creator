"use client";

import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
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

export default function PlayContent() {
  const router = useRouter();
  const { words, maxMistakes, hasHydrated } = useGameStore();

  if (!hasHydrated) {
    return <GameSkeleton />;
  }

  if (!words || words.length === 0) {
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

  return <GameView config={{ words, maxMistakes }} />;
}

interface GameViewProps {
  config: { words: string[]; maxMistakes: number };
}

function GameView({ config }: GameViewProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
          background: isDark ? "rgba(18, 24, 48, 0.5)" : undefined,
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

      {/* INLINE ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Container>
  );
}
