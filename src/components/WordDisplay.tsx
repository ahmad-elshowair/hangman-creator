"use client";

import { Box, Typography } from "@mui/material";

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
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: { xs: 1, sm: 1.5 },
        my: 3,
      }}
    >
      {maskedWord.map((char, i) => {
        const isRevealed = char !== "_";
        const isSpace = char === " ";
        const isHyphen = char === "-";

        // On loss, show the missing letters in red
        const showMissed = isWordFinished && !isWordWon && char === "_";
        const displayChar = showMissed ? currentWord[i] : char;

        if (isSpace) {
          return <Box key={i} sx={{ width: { xs: 16, sm: 24 } }} />;
        }

        return (
          <Box
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: { xs: 28, sm: 40 },
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
                fontSize: { xs: "1.5rem", sm: "2.2rem" },
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
              {isHyphen ? "-" : isRevealed || showMissed ? displayChar : "\u00A0"}
            </Typography>

            {/* Underline for letters (not spaces or hyphens) */}
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
                      : "rgba(255, 255, 255, 0.15)",
                  transition: "background 0.3s ease",
                }}
              />
            )}
          </Box>
        );
      })}

      {/* Animations */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInRed {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}
