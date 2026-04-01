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

  // Use a minimum divisor for scaling so short words don't become excessively huge
  // but long phrases shrink smoothly on small screens.
  const charCount = Math.max(10, maskedWord.length);

  const isLongPhrase = maskedWord.length > 18;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap", // Strictly one line
        width: "100%",
        gap: {
          xs: isLongPhrase ? 0.15 : 0.25,
          sm: isLongPhrase ? 0.25 : 0.5,
        },
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
            <Box
              key={i}
              sx={{
                width: `calc(40vw / ${charCount})`,
                maxWidth: 24,
                flexShrink: 1,
              }}
            />
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
                // Scale font dynamically to never overflow the box width
                fontSize: {
                  xs: `clamp(0.4rem, calc(80vw / ${charCount}), 1.5rem)`,
                  sm: `clamp(0.6rem, calc(80vw / ${charCount}), 2.2rem)`,
                },
                lineHeight: 1,
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

            {/* UNDERLINE FOR LETTERS */}
            {!isHyphen && (
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  mt: { xs: 0.25, sm: 0.5 },
                  background: showMissed
                    ? "linear-gradient(90deg, #FF5252, #FF8A80)"
                    : isRevealed
                      ? "linear-gradient(90deg, #2E7D32, #81C784)"
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
