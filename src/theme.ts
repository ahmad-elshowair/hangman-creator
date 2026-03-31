"use client";

import { createTheme, type Theme } from "@mui/material/styles";
import { gradients } from "@/constants/gradients";

const sharedTypography = {
  fontFamily: "var(--font-outfit), sans-serif",
  h1: { fontWeight: 800, letterSpacing: "-0.02em" },
  h2: { fontWeight: 700, letterSpacing: "-0.01em" },
  h3: { fontWeight: 700 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, letterSpacing: "0.02em" },
};

const sharedShape = { borderRadius: 16 };

const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: "10px 24px",
        textTransform: "none" as const,
        fontSize: "1rem",
        transition: "all 0.2s ease-in-out",
      },
      containedPrimary: {
        background: gradients.button,
        boxShadow: "0 4px 20px rgba(46, 125, 50, 0.4)",
        "&:hover": {
          background: gradients.buttonHover,
          boxShadow: "0 6px 28px rgba(46, 125, 50, 0.55)",
          transform: "translateY(-1px)",
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 12,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E7D32",
          },
        },
      },
    },
  },
};

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#66BB6A", light: "#81C784", dark: "#2E7D32" },
    secondary: { main: "#4DB6AC", light: "#80CBC4", dark: "#0097A7" },
    success: { main: "#69F0AE", light: "#B9F6CA", dark: "#00C853" },
    error: { main: "#FF5252", light: "#FF8A80", dark: "#D50000" },
    background: { default: "#0A0E1A", paper: "rgba(18, 24, 48, 0.85)" },
    text: { primary: "#E8EAED", secondary: "#9AA0A6" },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: {
    ...sharedComponents,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
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

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2E7D32", light: "#81C784", dark: "#1B5E20" },
    secondary: { main: "#0097A7", light: "#4DB6AC", dark: "#006064" },
    success: { main: "#2E7D32", light: "#4CAF50", dark: "#1B5E20" },
    error: { main: "#D32F2F", light: "#EF5350", dark: "#B71C1C" },
    background: { default: "#F0F4F2", paper: "#FFFFFF" },
    text: { primary: "#1A1A2E", secondary: "#5A5A7A" },
  },
  typography: sharedTypography,
  shape: sharedShape,
  components: {
    ...sharedComponents,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
});
