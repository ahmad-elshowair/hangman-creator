"use client";

import { Box, Button, useTheme } from "@mui/material";

interface KeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  disabled: boolean;
  onGuess: (letter: string) => void;
}

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function Keyboard({
  guessedLetters,
  correctLetters,
  disabled,
  onGuess,
}: KeyboardProps) {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const getKeyStyles = (letter: string) => {
    const guessed = guessedLetters.has(letter);
    const correct = correctLetters.has(letter);

    if (!guessed) {
      return {
        background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.12)",
        color: theme.palette.text.primary,
        "&:hover": {
          background: "rgba(124, 77, 255, 0.2)",
          border: "1px solid rgba(124, 77, 255, 0.4)",
          transform: "translateY(-2px)",
        },
      };
    }

    if (correct) {
      return {
        background: "rgba(105, 240, 174, 0.15)",
        border: `1px solid ${theme.palette.success.main}`,
        color: theme.palette.success.main,
      };
    }

    return {
      background: "rgba(255, 82, 82, 0.1)",
      border: `1px solid rgba(255, 82, 82, 0.3)`,
      color: theme.palette.error.main,
      opacity: 0.5,
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mt: 3,
      }}
    >
      {ROWS.map((row, rowIdx) => (
        <Box
          key={rowIdx}
          sx={{
            display: "flex",
            gap: 0.5,
            justifyContent: "center",
          }}
        >
          {row.map((letter) => (
            <Button
              key={letter}
              id={`key-${letter}`}
              variant="outlined"
              size="small"
              disabled={disabled || guessedLetters.has(letter)}
              onClick={() => onGuess(letter)}
              sx={{
                minWidth: { xs: 28, sm: 40 },
                height: { xs: 36, sm: 44 },
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontWeight: 700,
                borderRadius: 2,
                p: 0,
                transition: "all 0.15s ease-in-out",
                ...getKeyStyles(letter),
              }}
            >
              {letter}
            </Button>
          ))}
        </Box>
      ))}
    </Box>
  );
}
