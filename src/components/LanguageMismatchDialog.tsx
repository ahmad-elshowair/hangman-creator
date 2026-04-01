"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useLocaleStore } from "@/store/useLocaleStore";

export interface LanguageMismatchDialogProps {
  gameLocale: "en" | "ar";
  userLocale: "en" | "ar";
  onSwitch: () => void;
  onKeep: () => void;
  open: boolean;
}

export default function LanguageMismatchDialog({
  gameLocale,
  onSwitch,
  onKeep,
  open,
}: LanguageMismatchDialogProps) {
  const { t } = useLocaleStore();

  const languageNames = {
    en: "English",
    ar: "العربية",
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {t("dialog.languageMismatchTitle")}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {t("dialog.languageMismatchMessage", {
            language: languageNames[gameLocale],
          })}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onKeep}>{t("dialog.keepCurrent")}</Button>
        <Button variant="contained" onClick={onSwitch}>
          {t("dialog.switchLanguage")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
