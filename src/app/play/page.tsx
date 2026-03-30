"use client";

import { Suspense } from "react";

import dynamic from "next/dynamic";
import { Container, LinearProgress } from "@mui/material";
import { gradients } from "@/constants/gradients";

const PlayContent = dynamic(() => import("@/components/PlayContent"), {
  ssr: false,
  loading: () => (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <LinearProgress
        sx={{
          borderRadius: 2,
          "& .MuiLinearProgress-bar": {
            background: gradients.progress,
          },
        }}
      />
    </Container>
  ),
});

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <PlayContent />
    </Suspense>
  );
}
