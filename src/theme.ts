"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7C4DFF",
      light: "#B388FF",
      dark: "#651FFF",
    },
    secondary: {
      main: "#00E5FF",
      light: "#6EFFFF",
      dark: "#00B8D4",
    },
    success: {
      main: "#69F0AE",
      light: "#B9F6CA",
      dark: "#00C853",
    },
    error: {
      main: "#FF5252",
      light: "#FF8A80",
      dark: "#D50000",
    },
    background: {
      default: "#0A0E1A",
      paper: "rgba(18, 24, 48, 0.85)",
    },
    text: {
      primary: "#E8EAED",
      secondary: "#9AA0A6",
    },
  },
  typography: {
    fontFamily: "var(--font-outfit), sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          textTransform: "none",
          fontSize: "1rem",
          transition: "all 0.2s ease-in-out",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)",
          boxShadow: "0 4px 20px rgba(124, 77, 255, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg, #9E7CFF 0%, #7C4DFF 100%)",
            boxShadow: "0 6px 28px rgba(124, 77, 255, 0.55)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7C4DFF",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          background: "rgba(18, 24, 48, 0.7)",
        },
      },
    },
  },
});

export default theme;
