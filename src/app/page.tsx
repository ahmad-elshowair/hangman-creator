"use client";

import dynamic from "next/dynamic";
import { Container, LinearProgress } from "@mui/material";
import { gradients } from "@/constants/gradients";

const SetupContent = dynamic(() => import("@/components/SetupContent"), {
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

export default function Page() {
  return <SetupContent />;
}
