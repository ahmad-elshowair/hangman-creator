"use client";

import { Box, Typography, Link } from "@mui/material";
import { Favorite as HeartIcon } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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
        Created with
        <HeartIcon
          sx={{
            fontSize: 16,
            color: "error.main",
            animation: "heartbeat 1.5s ease-in-out infinite",
          }}
        />
        by{" "}
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

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </Box>
  );
}
