import { Box, Typography } from "@mui/material";

interface GameStatusProps {
  isWordFinished: boolean;
  isWordWon: boolean;
  currentWord: string;
  wrongLetters: string[];
}

export default function GameStatus({
  isWordFinished,
  isWordWon,
  currentWord,
  wrongLetters,
}: GameStatusProps) {
  return (
    <>
      {/* STATUS MESSAGE */}
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

      {/* WRONG LETTERS */}
      {wrongLetters.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {wrongLetters.map((letter) => (
            <Typography
              key={letter}
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
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
    </>
  );
}
