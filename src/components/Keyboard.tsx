"use client";

import { Box, Button, useTheme } from "@mui/material";
import { neuShadows } from "@/constants/neumorphism";
import ARABIC_KEYBOARD_ROWS from "@/constants/arabicKeyboard";

interface KeyboardProps {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  disabled: boolean;
  script?: "latin" | "arabic";
  onGuess: (letter: string) => void;
}

const LATIN_KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((l) => ({
    letter: l,
    label: undefined as string | undefined,
  })),
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((l) => ({
    letter: l,
    label: undefined as string | undefined,
  })),
  ["Z", "X", "C", "V", "B", "N", "M"].map((l) => ({
    letter: l,
    label: undefined as string | undefined,
  })),
];

export default function Keyboard({
  guessedLetters,
  correctLetters,
  disabled,
  script = "latin",
  onGuess,
}: KeyboardProps) {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
  const neu = isDark ? neuShadows.dark : neuShadows.light;

  const rows = script === "arabic" ? ARABIC_KEYBOARD_ROWS : LATIN_KEYBOARD_ROWS;
  const isArabic = script === "arabic";

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
          boxShadow: neu.inset,
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
      opacity: 0.7,
      transform: "scale(0.96)",
      "&.Mui-disabled": {
        color: errorText,
        opacity: 0.7,
        border: "none",
        boxShadow: neu.inset,
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
        direction: "ltr",
      }}
    >
      {rows.map((row, rowIdx) => (
        <Box
          key={rowIdx}
          sx={{
            display: "flex",
            gap: 0.5,
            justifyContent: "center",
            width: "100%",
            flexDirection: isArabic ? "row-reverse" : "row",
          }}
        >
          {row.map(({ letter, label }) => {
            const displayChar = label || letter;
            const guessed = guessedLetters.has(letter);

            return (
              <Button
                key={letter}
                id={`key-${letter}`}
                variant="outlined"
                size="small"
                disabled={disabled || guessed}
                onClick={() => onGuess(letter)}
                aria-label={`Guess letter ${displayChar}`}
                sx={{
                  minWidth: { xs: 34, sm: 60 },
                  height: { xs: 44, sm: 62 },
                  fontSize: { xs: "0.95rem", sm: "1.5rem" },
                  fontWeight: 700,
                  fontFamily: isArabic
                    ? "var(--font-arabic), sans-serif"
                    : "var(--font-outfit), sans-serif",
                  borderRadius: 2.5,
                  p: 0,
                  transition: neuShadows.transition,
                  ...getKeyStyles(letter),
                }}
              >
                {displayChar}
              </Button>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
