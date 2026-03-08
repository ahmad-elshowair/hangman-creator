"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArrowForward as NextIcon,
  Replay as ReplayIcon,
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { loadGameConfig, type GameConfig } from "@/utils/storage";
import { useHangman } from "@/hooks/useHangman";
import HangmanFigure from "@/components/HangmanFigure";
import Keyboard from "@/components/Keyboard";
import WordDisplay from "@/components/WordDisplay";

export default function PlayContent() {
  const router = useRouter();
  const [config] = useState<GameConfig | null>(() => loadGameConfig());

  useEffect(() => {
    if (!config) {
      router.replace("/");
    }
  }, [config, router]);

  if (!config) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <LinearProgress
          sx={{
            borderRadius: 2,
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
            },
          }}
        />
      </Container>
    );
  }

  return <GameView config={config} />;
}

interface GameViewProps {
  config: GameConfig;
}

function GameView({ config }: GameViewProps) {
  const router = useRouter();
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
    nextWord,
    resetGame,
  } = useHangman(config.words, config.maxMistakes);

  // Handle keyboard input
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

  // End-of-game summary
  if (isGameOver) {
    const allCorrect = losses === 0;
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            textAlign: "center",
            background: isDark ? "rgba(18, 24, 48, 0.7)" : undefined,
          }}
        >
          <TrophyIcon
            sx={{
              fontSize: 64,
              color: allCorrect ? "success.main" : "primary.light",
              mb: 2,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: allCorrect
                ? "linear-gradient(135deg, #69F0AE, #00E5FF)"
                : "linear-gradient(135deg, #B388FF, #7C4DFF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {allCorrect ? "Perfect Score!" : "Game Over!"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You completed all {totalWords} words
          </Typography>

          {/* Stats */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: "success.main" }}
              >
                {wins}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Correct
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: "error.main" }}
              >
                {losses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Missed
              </Typography>
            </Box>
          </Box>

          {/* Results per word */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mb: 4,
            }}
          >
            {config.words.map((word, i) => (
              <Box
                key={i}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background:
                    results[i] === "win"
                      ? "rgba(105, 240, 174, 0.12)"
                      : "rgba(255, 82, 82, 0.12)",
                  border: `1px solid ${results[i] === "win" ? "rgba(105, 240, 174, 0.3)" : "rgba(255, 82, 82, 0.3)"}`,
                  color:
                    results[i] === "win" ? "success.main" : "error.main",
                }}
              >
                {word}
              </Box>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              id="new-game-btn"
              variant="outlined"
              fullWidth
              startIcon={<EditIcon />}
              onClick={() => router.push("/")}
              sx={{
                borderRadius: 3,
                py: 1.5,
                borderColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              New Game
            </Button>
            <Button
              id="play-again-btn"
              variant="contained"
              fullWidth
              startIcon={<ReplayIcon />}
              onClick={resetGame}
              sx={{ borderRadius: 3, py: 1.5 }}
            >
              Play Again
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Progress bar */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Word {currentWordIndex + 1} of {totalWords}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: mistakes > maxMistakes * 0.6 ? "error.main" : "text.secondary",
              fontWeight: mistakes > maxMistakes * 0.6 ? 700 : 400,
              transition: "all 0.3s ease",
            }}
          >
            {mistakes} / {maxMistakes} mistakes
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(currentWordIndex / totalWords) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
            },
          }}
        />
      </Box>

      {/* Hangman Figure */}
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

      {/* Word Display */}
      <WordDisplay
        maskedWord={maskedWord}
        isWordFinished={isWordFinished}
        currentWord={currentWord}
        isWordWon={isWordWon}
      />

      {/* Status message */}
      {isWordFinished && (
        <Box
          sx={{
            textAlign: "center",
            mb: 2,
            animation: "fadeIn 0.4s ease forwards",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: isWordWon ? "success.main" : "error.main",
            }}
          >
            {isWordWon ? "🎉 Correct!" : "😔 The word was:"}
          </Typography>
          {!isWordWon && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "primary.light",
                mt: 0.5,
              }}
            >
              {currentWord}
            </Typography>
          )}
        </Box>
      )}

      {/* Wrong letters */}
      {wrongLetters.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 2,
          }}
        >
          {wrongLetters.map((letter) => (
            <Typography
              key={letter}
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "error.main",
                opacity: 0.6,
                textDecoration: "line-through",
              }}
            >
              {letter}
            </Typography>
          ))}
        </Box>
      )}

      {/* Keyboard or Next button */}
      {isWordFinished ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            id="next-word-btn"
            variant="contained"
            size="large"
            endIcon={<NextIcon />}
            onClick={nextWord}
            sx={{
              borderRadius: 3,
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            Next Word
          </Button>
        </Box>
      ) : (
        <Keyboard
          guessedLetters={guessedLetters}
          correctLetters={correctLetters}
          disabled={isWordFinished}
          onGuess={guessLetter}
        />
      )}

      {/* Inline animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Container>
  );
}
