"use client";

import { createTheme, type Theme } from "@mui/material/styles";
import { gradients } from "@/constants/gradients";
import { neuShadows } from "@/constants/neumorphism";

// removed sharedTypography from here

const sharedShape = { borderRadius: 16 };

const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: "10px 24px",
        textTransform: "none" as const,
        fontSize: "1rem",
        transition: neuShadows.transition,
        "&.Mui-focusVisible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 3,
          boxShadow: "none",
        },
      },
      containedPrimary: {
        background: gradients.button,
        "&:hover": {
          background: gradients.buttonHover,
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
          "& fieldset": {
            border: "none",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 2px var(--mui-palette-primary-main)",
          },
        },
      },
    },
  },
};

export const createAppTheme = (mode: "light" | "dark", direction: "ltr" | "rtl"): Theme => {
  const isDark = mode === "dark";
  const fontFamily = direction === "rtl" 
    ? "var(--font-arabic), var(--font-outfit), sans-serif" 
    : "var(--font-outfit), var(--font-arabic), sans-serif";

  const sharedTypography = {
    fontFamily,
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, letterSpacing: "0.02em" },
  };

  const palette = {
    mode,
    ...(isDark && {
      primary: { main: "#66BB6A", light: "#81C784", dark: "#2E7D32" },
      secondary: { main: "#4DB6AC", light: "#80CBC4", dark: "#0097A7" },
      success: { main: "#69F0AE", light: "#B9F6CA", dark: "#00C853" },
      error: { main: "#FF5252", light: "#FF8A80", dark: "#D50000" },
      background: { default: "#0F1A14", paper: "#152A1C" },
      text: { primary: "#E8EAED", secondary: "#9AA0A6" },
    }),
    ...(!isDark && {
      primary: { main: "#2E7D32", light: "#81C784", dark: "#1B5E20" },
      secondary: { main: "#0097A7", light: "#4DB6AC", dark: "#006064" },
      success: { main: "#2E7D32", light: "#4CAF50", dark: "#1B5E20" },
      error: { main: "#D32F2F", light: "#EF5350", dark: "#B71C1C" },
      background: { default: "#F0F4F2", paper: "#F0F4F2" },
      text: { primary: "#1A1A2E", secondary: "#5A5A7A" },
    }),
  };

  const shadows = isDark ? neuShadows.dark : neuShadows.light;

  return createTheme({
    direction,
    palette,
    typography: sharedTypography,
    shape: sharedShape,
    components: {
      ...sharedComponents,
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow: shadows.raised,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: shadows.raised,
            background: "inherit",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          ...sharedComponents.MuiButton.styleOverrides,
          containedPrimary: {
            ...sharedComponents.MuiButton.styleOverrides.containedPrimary,
            boxShadow: shadows.raisedSmall,
            "&:hover": {
              ...sharedComponents.MuiButton.styleOverrides.containedPrimary["&:hover"],
              boxShadow: shadows.flat,
            },
            "&:active": {
              boxShadow: shadows.inset,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          ...sharedComponents.MuiTextField.styleOverrides,
          root: {
            ...sharedComponents.MuiTextField.styleOverrides.root,
            "& .MuiOutlinedInput-root": {
              ...sharedComponents.MuiTextField.styleOverrides.root["& .MuiOutlinedInput-root"],
              boxShadow: shadows.inset,
            },
          },
        },
      },
    },
  });
};
