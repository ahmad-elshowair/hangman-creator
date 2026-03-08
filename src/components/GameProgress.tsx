import { Box, LinearProgress, Typography, useTheme } from "@mui/material";

interface GameProgressProps {
  currentWordIndex: number;
  totalWords: number;
  mistakes: number;
  maxMistakes: number;
}

export default function GameProgress({
  currentWordIndex,
  totalWords,
  mistakes,
  maxMistakes,
}: GameProgressProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ mb: 3 }}>
      {/* PROGRESS TRACKER TEXT */}
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
            color:
              mistakes > maxMistakes * 0.6 ? "error.main" : "text.secondary",
            fontWeight: mistakes > maxMistakes * 0.6 ? 700 : 400,
            transition: "all 0.3s ease",
          }}
        >
          {mistakes} / {maxMistakes} mistakes
        </Typography>
      </Box>

      {/* LINEAR PROGRESS BAR */}
      <LinearProgress
        variant="determinate"
        value={(currentWordIndex / totalWords) * 100}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(0, 0, 0, 0.08)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 3,
            background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
          },
        }}
      />
    </Box>
  );
}
