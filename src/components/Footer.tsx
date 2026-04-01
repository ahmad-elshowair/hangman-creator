"use client";

import { Box, Typography, Link } from "@mui/material";
import { Favorite as HeartIcon } from "@mui/icons-material";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function Footer() {
  const t = useLocaleStore((state) => state.t);
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        {t("footer.createdWith")}
        <HeartIcon
          sx={{
            fontSize: 16,
            color: "error.main",
            animation: "heartbeat 1.5s ease-in-out infinite",
          }}
        />
        {t("footer.by")}{" "}
        <Link
          href="https://www.linkedin.com/in/ahmad-elshowair/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.light",
            textDecoration: "none",
            fontWeight: 600,
            transition: "color 0.2s ease",
            "&:hover": {
              color: "secondary.main",
              textDecoration: "underline",
            },
          }}
        >
          Ahmad Elshowair
        </Link>
      </Typography>

    </Box>
  );
}
