"use client";

import dynamic from "next/dynamic";
import { Container, LinearProgress } from "@mui/material";

const PlayContent = dynamic(() => import("@/components/PlayContent"), {
  ssr: false,
  loading: () => (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <LinearProgress
        sx={{
          borderRadius: 2,
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
          },
        }}
      />
    </Container>
  ),
});

export default function PlayPage() {
  return <PlayContent />;
}
