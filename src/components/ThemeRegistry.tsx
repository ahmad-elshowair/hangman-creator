"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "@/theme";
import { useThemeStore } from "@/store/useThemeStore";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "dark" ? darkTheme : lightTheme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // RETURN A HIDDEN WRAPPER DURING SSR TO AVOID HYDRATION MISMATCH.
    // FOR MATERIAL UI, IT'S SAFER TO PROVIDE THE DEFAULT SSR THEME (E.G. DARK),
    // BUT RETURNING NOTHING UNTIL MOUNTED PERFECTLY PREVENTS THE ICON/THEME MISMATCH.
    return (
      <div style={{ visibility: "hidden" }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
