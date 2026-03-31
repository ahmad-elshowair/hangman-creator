"use client";

import { Box, Button, useTheme } from "@mui/material";
import { neuShadows } from "@/constants/neumorphism";

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
  const neu = isDark ? neuShadows.dark : neuShadows.light;

  const getKeyStyles = (letter: string) => {
    const guessed = guessedLetters.has(letter);
    const correct = correctLetters.has(letter);

    if (!guessed) {
      return {
        background: "inherit",
        border: "none",
        color: theme.palette.text.primary,
        boxShadow: neu.raisedSmall,
        "&:hover": {
          boxShadow: neu.flat,
          transform: "translateY(-1px)",
        },
        "&:active": {
          boxShadow: neu.inset,
        },
        "&.Mui-disabled": {
          opacity: 0.5,
          color: theme.palette.text.primary,
        },
      };
    }

    if (correct) {
      const successColor = isDark
        ? theme.palette.success.main
        : theme.palette.success.dark;
      return {
        background: isDark
          ? "rgba(46, 125, 50, 0.15)"
          : "rgba(46, 125, 50, 0.1)",
        border: "none",
        color: successColor,
        boxShadow: neuShadows.correctInset,
        transform: "scale(0.96)",
        "&.Mui-disabled": {
          color: successColor,
        },
      };
    }

    const errorColor = theme.palette.error.main;
    const errorText = isDark ? "#ffb4ab" : errorColor;

    return {
      background: "transparent",
      border: "none",
      color: errorText,
      boxShadow: neuShadows.wrongInset,
      opacity: 0.7,
      transform: "scale(0.96)",
      "&.Mui-disabled": {
        color: errorText,
        opacity: 0.7,
      },
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
              aria-label={`Guess letter ${letter}`}
              sx={{
                minWidth: { xs: 36, sm: 48 },
                height: { xs: 44, sm: 52 },
                fontSize: { xs: "0.95rem", sm: "1.15rem" },
                fontWeight: 700,
                borderRadius: 2.5,
                p: 0,
                transition: neuShadows.transition,
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
