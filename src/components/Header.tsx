"use client";

import { AppBar, Toolbar, Typography, Tooltip, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import logoPic from "../../public/logo.png";
import { gradients } from "@/constants/gradients";

export default function Header() {
  const router = useRouter();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "transparent",
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
              p: 0,
              cursor: "pointer",
              textAlign: "left",
              "&:focus-visible": {
                outline: "2px solid #2E7D32",
                outlineOffset: 4,
                borderRadius: 1,
              },
            }}
          >
            <Image
              src={logoPic}
              alt="Hangman Creator Logo"
              width={36}
              height={36}
              priority
              style={{
                borderRadius: "8px",
                objectFit: "contain",
                marginRight: "12px",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            />
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
              Hangman
            </Typography>
          </Box>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle edge="end" />
      </Toolbar>
    </AppBar>
  );
}
