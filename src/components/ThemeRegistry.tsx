"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createAppTheme } from "@/theme";
import { useThemeStore } from "@/store/useThemeStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "mui-ltr",
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state) => state.mode);
  const direction = useLocaleStore((state) => state.direction);
  
  const hasThemeHydrated = useThemeStore((state) => state.hasHydrated);
  const hasLocaleHydrated = useLocaleStore((state) => state.hasHydrated);

  const theme = React.useMemo(() => createAppTheme(mode, direction), [mode, direction]);
  const cache = direction === "rtl" ? cacheRtl : cacheLtr;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasThemeHydrated || !hasLocaleHydrated) {
    // RETURN A HIDDEN WRAPPER DURING SSR TO AVOID HYDRATION MISMATCH.
    // FOR MATERIAL UI, IT'S SAFER TO PROVIDE THE DEFAULT SSR THEME (E.G. DARK),
    // BUT RETURNING NOTHING UNTIL MOUNTED PERFECTLY PREVENTS THE ICON/THEME MISMATCH.
    return (
      <div style={{ visibility: "hidden" }}>
        <CacheProvider value={cacheLtr}>
          <ThemeProvider theme={createAppTheme("dark", "ltr")}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </div>
    );
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
