"use client";

import { IconButton, Tooltip } from "@mui/material";
import {
  DarkMode as DarkIcon,
  LightMode as LightIcon,
} from "@mui/icons-material";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip
      title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton
        id="theme-toggle-btn"
        onClick={toggleMode}
        sx={{
          position: "fixed",
          top: { xs: 12, md: 16 },
          right: { xs: 12, md: 16 },
          zIndex: 1200,
          width: { xs: 40, md: 44 },
          height: { xs: 40, md: 44 },
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
