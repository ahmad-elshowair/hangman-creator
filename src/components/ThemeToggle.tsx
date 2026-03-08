"use client";

import { IconButton, Tooltip } from "@mui/material";
import {
  DarkMode as DarkIcon,
  LightMode as LightIcon,
} from "@mui/icons-material";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton
        id="theme-toggle-btn"
        onClick={toggleMode}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1200,
          width: 44,
          height: 44,
          background:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(8px)",
          border:
            mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)",
            transform: "rotate(30deg)",
          },
        }}
      >
        {mode === "dark" ? (
          <LightIcon sx={{ color: "#FFD54F", fontSize: 22 }} />
        ) : (
          <DarkIcon sx={{ color: "#5E35B1", fontSize: 22 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
