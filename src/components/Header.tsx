"use client";

import { AppBar, Toolbar, Typography, Tooltip, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { gradients } from "@/constants/gradients";

export default function Header() {
  const router = useRouter();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "transparent",
        color: "text.primary",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Tooltip title="Back to Setup">
          <Box
            component="button"
            onClick={() => router.push("/")}
            aria-label="Navigate to home page"
            sx={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              flexGrow: 1,
              textAlign: "left",
              "&:focus-visible": {
                outline: "2px solid #7C4DFF",
                outlineOffset: 4,
                borderRadius: 1,
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                background: gradients.brand,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "opacity 0.2s ease",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Hangman Creator
            </Typography>
          </Box>
        </Tooltip>

        <ThemeToggle edge="end" />
      </Toolbar>
    </AppBar>
  );
}
