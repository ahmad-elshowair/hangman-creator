"use client";

import { IconButton, Tooltip, IconButtonProps } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export default function LanguageToggle(props: IconButtonProps) {
  const { sx, ...rest } = props;
  const { locale, setLocale, t, hasHydrated } = useLocaleStore();
  const mode = useThemeStore((state) => state.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !hasHydrated) {
    return null;
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <Tooltip
      title={locale === "en" ? t("language.switchToArabic") : t("language.switchToEnglish")}
    >
      <IconButton
        id="language-toggle-btn"
        onClick={toggleLanguage}
        aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
        {...rest}
        sx={{
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
          ...sx,
        }}
      >
        <TranslateIcon sx={{ color: mode === "dark" ? "#81C784" : "#2E7D32", fontSize: 22 }} />
      </IconButton>
    </Tooltip>
  );
}
