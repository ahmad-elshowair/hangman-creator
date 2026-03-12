"use client";

import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Slider,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  DeleteSweep as ClearIcon,
} from "@mui/icons-material";
import { gradients } from "@/constants/gradients";


export default function SetupContent() {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [mounted, setMounted] = useState(false);
  const {
    words,
    maxMistakes,
    addWord,
    removeWord,
    setMaxMistakes,
    clearConfig,
  } = useGameStore();

  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleAdd = () => {
    addWord(currentWord);
    setCurrentWord("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleStart = () => {
    if (words.length === 0) return;
    router.push("/play");
  };

  const handleClear = () => {
    clearConfig();
    setCurrentWord("");
  };

  if (!mounted) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        {/* SETUP SKELETON */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Skeleton variant="text" width="60%" height={50} sx={{ mx: "auto" }} />
          <Skeleton variant="text" width="80%" height={24} sx={{ mx: "auto", mt: 1 }} />
        </Box>
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, mb: 3 }}>
          <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 4, borderRadius: 2 }} />
          <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" width="100%" height={40} sx={{ borderRadius: 2 }} />
        </Paper>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rounded" width="50%" height={48} sx={{ borderRadius: 3 }} />
          <Skeleton variant="rounded" width="50%" height={48} sx={{ borderRadius: 3 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.2rem", md: "3rem" },
            background: gradients.brand,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1.5,
          }}
        >
          Hangman Creator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Set up your custom Hangman game for students
        </Typography>
      </Box>

      {/* SETTINGS CARD */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          mb: 3,
          background: isDark ? "rgba(18, 24, 48, 0.7)" : undefined,
        }}
      >
        {/* MAX MISTAKES */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Max Mistakes Allowed
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Slider
            id="max-mistakes-slider"
            value={maxMistakes}
            onChange={(_, val) => setMaxMistakes(val as number)}
            min={1}
            max={10}
            step={1}
            marks
            sx={{
              flex: 1,
              "& .MuiSlider-thumb": {
                background: gradients.brandReverse,
                boxShadow: "0 0 12px rgba(124, 77, 255, 0.5)",
              },
              "& .MuiSlider-track": {
                background: gradients.progress,
                border: "none",
              },
            }}
          />
          <Chip
            label={maxMistakes}
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              minWidth: 44,
              background: "rgba(124, 77, 255, 0.2)",
              border: "1px solid rgba(124, 77, 255, 0.3)",
            }}
          />
        </Box>

        {/* WORD INPUT */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Word List
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            id="word-input"
            fullWidth
            placeholder="Type a word and press Enter..."
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            autoComplete="off"
          />
          <Button
            id="add-word-btn"
            variant="contained"
            onClick={handleAdd}
            disabled={!currentWord.trim()}
            sx={{ minWidth: 48, px: 1 }}
          >
            <AddIcon />
          </Button>
        </Box>

        {/* WORD LIST */}
        {words.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontStyle: "italic",
                textAlign: "center",
                fontSize: "0.8rem",
                opacity: 0.8,
              }}
            >
              Words are blurred to hide them from students. Hover over a word to
              reveal it.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                p: 2,
                borderRadius: 3,
                background: isDark
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.06)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              {words.map((word) => (
                <Chip
                  key={word}
                  label={word}
                  onDelete={() => removeWord(words.indexOf(word))}
                  deleteIcon={
                    <IconButton size="small" sx={{ color: "error.main" }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    background: "rgba(124, 77, 255, 0.12)",
                    border: "1px solid rgba(124, 77, 255, 0.2)",
                    transition: "all 0.3s ease",
                    "& .MuiChip-label": {
                      filter: "blur(4px)",
                      transition: "filter 0.3s ease",
                    },
                    "&:hover": {
                      background: "rgba(124, 77, 255, 0.2)",
                      "& .MuiChip-label": {
                        filter: "blur(0)",
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {words.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 3 }}
          >
            No words added yet. Add at least one word to start the game.
          </Typography>
        )}
      </Paper>

      {/* ACTION BUTTONS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button
          id="clear-btn"
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<ClearIcon />}
          onClick={handleClear}
          disabled={words.length === 0}
          sx={{
            borderRadius: 3,
            py: 1.5,
            borderColor: "rgba(255, 82, 82, 0.3)",
            "&:hover": {
              borderColor: "error.main",
              background: "rgba(255, 82, 82, 0.08)",
            },
          }}
        >
          Clear All
        </Button>
        <Button
          id="start-btn"
          variant="contained"
          fullWidth
          startIcon={<PlayIcon />}
          onClick={handleStart}
          disabled={words.length === 0}
          sx={{ borderRadius: 3, py: 1.5 }}
        >
          Start Game ({words.length} word{words.length !== 1 ? "s" : ""})
        </Button>
      </Box>
    </Container>
  );
}
