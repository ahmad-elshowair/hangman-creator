"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
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
import {
  saveGameConfig,
  loadGameConfig,
  clearGameConfig,
} from "@/utils/storage";

export default function SetupPage() {
  const router = useRouter();
  const [maxMistakes, setMaxMistakes] = useState(() => {
    const config = loadGameConfig();
    return config?.maxMistakes ?? 6;
  });
  const [words, setWords] = useState<string[]>(() => {
    const config = loadGameConfig();
    return config?.words ?? [];
  });
  const [currentWord, setCurrentWord] = useState("");

  const addWord = useCallback(() => {
    const trimmed = currentWord.trim();
    if (!trimmed) return;
    if (words.some((w) => w.toLowerCase() === trimmed.toLowerCase())) return;
    setWords((prev) => [...prev, trimmed]);
    setCurrentWord("");
  }, [currentWord, words]);

  const removeWord = (index: number) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addWord();
    }
  };

  const handleStart = () => {
    if (words.length === 0) return;
    saveGameConfig({ words, maxMistakes });
    router.push("/play");
  };

  const handleClear = () => {
    clearGameConfig();
    setWords([]);
    setMaxMistakes(6);
    setCurrentWord("");
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #B388FF 0%, #7C4DFF 50%, #00E5FF 100%)",
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

      {/* Settings Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 3,
          background: "rgba(18, 24, 48, 0.7)",
        }}
      >
        {/* Max Mistakes */}
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
                background: "linear-gradient(135deg, #7C4DFF, #B388FF)",
                boxShadow: "0 0 12px rgba(124, 77, 255, 0.5)",
              },
              "& .MuiSlider-track": {
                background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
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

        {/* Word Input */}
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
            onClick={addWord}
            disabled={!currentWord.trim()}
            sx={{ minWidth: 48, px: 1 }}
          >
            <AddIcon />
          </Button>
        </Box>

        {/* Word List */}
        {words.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              p: 2,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {words.map((word, i) => (
              <Chip
                key={i}
                label={word}
                onDelete={() => removeWord(i)}
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
                  "&:hover": {
                    background: "rgba(124, 77, 255, 0.2)",
                  },
                }}
              />
            ))}
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

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
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
