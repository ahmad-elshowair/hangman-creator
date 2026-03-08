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
    // Return a hidden wrapper during SSR to avoid hydration mismatch
    // or just the children if you don't mind a flash of unstyled content.
    // For Material UI, it's safer to provide the default SSR theme (e.g. dark),
    // but returning nothing until mounted perfectly prevents the icon/theme mismatch.
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
