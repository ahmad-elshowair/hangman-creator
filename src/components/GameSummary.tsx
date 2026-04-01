import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Replay as ReplayIcon,
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { gradients } from "@/constants/gradients";
import { neuShadows } from "@/constants/neumorphism";

interface GameSummaryProps {
  totalWords: number;
  words: string[];
  results: ("win" | "loss")[];
  wins: number;
  losses: number;
  resetGame: () => void;
}

export default function GameSummary({
  totalWords,
  words,
  results,
  wins,
  losses,
  resetGame,
}: GameSummaryProps) {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const neu = isDark ? neuShadows.dark : neuShadows.light;
  const allCorrect = losses === 0;

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          textAlign: "center",
        }}
      >
        {/* TROPHY ICON */}
        <TrophyIcon
          sx={{
            fontSize: 64,
            color: allCorrect ? "success.main" : "primary.light",
            mb: 2,
          }}
        />
        {/* COMPLETION TEXT */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: allCorrect
              ? gradients.success
              : gradients.primary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {allCorrect ? "Perfect Score!" : "Game Over!"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You completed all {totalWords} word{totalWords === 1 ? "" : "s"}
        </Typography>

        {/* STATS */}
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

        {/* RESULTS PER WORD */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          {words.map((word, i) => (
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
                    ? "rgba(46, 125, 50, 0.12)"
                    : "rgba(211, 47, 47, 0.1)",
                boxShadow: neu.raisedSmall,
                color: results[i] === "win" ? "success.main" : "error.main",
              }}
            >
              {word}
            </Box>
          ))}
        </Box>

        {/* ACTIONS */}
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
