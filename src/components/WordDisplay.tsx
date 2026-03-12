"use client";

import { Box, Typography, useTheme } from "@mui/material";

interface WordDisplayProps {
  maskedWord: string[];
  isWordFinished: boolean;
  currentWord: string;
  isWordWon: boolean;
}

export default function WordDisplay({
  maskedWord,
  isWordFinished,
  currentWord,
  isWordWon,
}: WordDisplayProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
        width: "100%",
        gap: { xs: 0.5, sm: 1 },
        my: 3,
      }}
    >
      {maskedWord.map((char, i) => {
        const isRevealed = char !== "_";
        const isSpace = char === " ";
        const isHyphen = char === "-";

        // ON LOSS, SHOW THE MISSING LETTERS IN RED
        const showMissed = isWordFinished && !isWordWon && char === "_";
        const displayChar = showMissed ? currentWord[i] : char;

        if (isSpace) {
          return (
            <Box key={i} sx={{ width: { xs: 12, sm: 20 }, flexShrink: 0 }} />
          );
        }

        return (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: "1 1 0",
              minWidth: 0,
              maxWidth: { xs: 32, sm: 48 },
              animation: isRevealed
                ? "popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                : showMissed
                  ? "fadeInRed 0.5s ease forwards"
                  : "none",
            }}
          >
            <Typography
              variant="h4"
              component="span"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "clamp(1rem, 5vw, 1.5rem)",
                  sm: "clamp(1.2rem, 4vw, 2.2rem)",
                },
                letterSpacing: "0.05em",
                color: showMissed
                  ? "error.main"
                  : isRevealed && !isHyphen
                    ? "primary.light"
                    : "text.secondary",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
            >
              {isHyphen
                ? "-"
                : isRevealed || showMissed
                  ? displayChar
                  : "\u00A0"}
            </Typography>

            {/* UNDERLINE FOR LETTERS (NOT SPACES OR HYPHENS) */}
            {!isHyphen && (
              <Box
                sx={{
                  width: "100%",
                  height: 3,
                  borderRadius: 2,
                  mt: 0.5,
                  background: showMissed
                    ? "linear-gradient(90deg, #FF5252, #FF8A80)"
                    : isRevealed
                      ? "linear-gradient(90deg, #7C4DFF, #B388FF)"
                      : isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0.25)",
                  transition: "background 0.3s ease",
                }}
              />
            )}
          </Box>
        );
      })}

    </Box>
  );
}
