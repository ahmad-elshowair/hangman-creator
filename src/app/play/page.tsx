"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import GameSkeleton from "@/components/GameSkeleton";

const PlayContent = dynamic(() => import("@/components/PlayContent"), {
  ssr: false,
  loading: () => <GameSkeleton />,
});

export default function PlayPage() {
  return (
    <Suspense fallback={<GameSkeleton />}>
      <PlayContent />
    </Suspense>
  );
}
