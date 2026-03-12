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

    const glassBase = {
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    };

    if (!guessed) {
      return {
        ...glassBase,
        background: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.6)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.8)",
        color: theme.palette.text.primary,
        boxShadow: isDark
          ? "0 4px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 4px 6px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
        "&:hover": {
          background: isDark
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(255, 255, 255, 0.9)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.3)"
            : "1px solid rgba(255, 255, 255, 1)",
          transform: "translateY(-2px)",
          boxShadow: isDark
            ? "0 6px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 6px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
        },
        "&.Mui-disabled": {
          // FOR WHEN THE WHOLE KEYBOARD IS DISABLED ACROSS WORDS
          opacity: 0.5,
          color: theme.palette.text.primary,
        },
      };
    }

    if (correct) {
      const successColor = isDark
        ? theme.palette.success.main
        : theme.palette.success.dark;
      const successBorder = `1px solid ${theme.palette.success.main}`;
      return {
        ...glassBase,
        background: isDark
          ? "rgba(105, 240, 174, 0.15)"
          : "rgba(105, 240, 174, 0.4)",
        border: successBorder,
        color: successColor,
        boxShadow: `0 0 15px ${theme.palette.success.main}40`,
        transform: "scale(0.95)", // subtly shrink correct guessed letters
        "&.Mui-disabled": {
          background: isDark
            ? "rgba(105, 240, 174, 0.15)"
            : "rgba(105, 240, 174, 0.4)",
          color: successColor,
          border: successBorder,
        },
      };
    }

    const errorColor = theme.palette.error.main;
    const errorBorder = "none";
    const errorBg = "transparent";
    const errorText = isDark ? "#ffb4ab" : errorColor;

    return {
      ...glassBase,
      background: errorBg,
      border: errorBorder,
      color: errorText,
      opacity: 0.9,
      transform: "scale(0.95)",
      "&.Mui-disabled": {
        background: errorBg,
        color: errorText,
        border: errorBorder,
        opacity: 0.9,
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
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
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
