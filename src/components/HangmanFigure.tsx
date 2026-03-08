"use client";

import { Box, useTheme } from "@mui/material";

interface HangmanFigureProps {
  mistakes: number;
  maxMistakes: number;
}

const BODY_PARTS = [
  // 1. Head
  <circle
    key="head"
    cx="150"
    cy="70"
    r="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 2. Body
  <line
    key="body"
    x1="150"
    y1="90"
    x2="150"
    y2="150"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 3. Left arm
  <line
    key="left-arm"
    x1="150"
    y1="110"
    x2="120"
    y2="135"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 4. Right arm
  <line
    key="right-arm"
    x1="150"
    y1="110"
    x2="180"
    y2="135"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 5. Left leg
  <line
    key="left-leg"
    x1="150"
    y1="150"
    x2="125"
    y2="185"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 6. Right leg
  <line
    key="right-leg"
    x1="150"
    y1="150"
    x2="175"
    y2="185"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  />,
  // 7. Left eye
  <line
    key="left-eye-1"
    x1="140"
    y1="65"
    x2="145"
    y2="70"
    stroke="currentColor"
    strokeWidth="2"
  />,
  // 7b. Left eye (X)
  <line
    key="left-eye-2"
    x1="145"
    y1="65"
    x2="140"
    y2="70"
    stroke="currentColor"
    strokeWidth="2"
  />,
  // 8. Right eye
  <line
    key="right-eye-1"
    x1="155"
    y1="65"
    x2="160"
    y2="70"
    stroke="currentColor"
    strokeWidth="2"
  />,
  // 8b. Right eye (X)
  <line
    key="right-eye-2"
    x1="160"
    y1="65"
    x2="155"
    y2="70"
    stroke="currentColor"
    strokeWidth="2"
  />,
];

export default function HangmanFigure({
  mistakes,
  maxMistakes,
}: HangmanFigureProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Map mistakes to body parts based on maxMistakes
  // This distributes the body parts evenly across the allowed mistakes
  const totalParts = BODY_PARTS.length;
  const partsToShow = Math.min(
    totalParts,
    Math.round((mistakes / maxMistakes) * totalParts)
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <svg
        viewBox="0 0 250 220"
        width="100%"
        style={{ maxWidth: 280, color: isDark ? "#E8EAED" : "#1A1A2E" }}
      >
        {/* Gallows */}
        {/* Base */}
        <line
          x1="40"
          y1="200"
          x2="200"
          y2="200"
          stroke="rgba(124, 77, 255, 0.5)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Vertical pole */}
        <line
          x1="80"
          y1="200"
          x2="80"
          y2="20"
          stroke="rgba(124, 77, 255, 0.5)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Horizontal beam */}
        <line
          x1="78"
          y1="20"
          x2="150"
          y2="20"
          stroke="rgba(124, 77, 255, 0.5)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Rope */}
        <line
          x1="150"
          y1="20"
          x2="150"
          y2="50"
          stroke="rgba(0, 229, 255, 0.6)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Body parts with animation */}
        {BODY_PARTS.slice(0, partsToShow).map((part, i) => (
          <g
            key={i}
            style={{
              animation: "fadeIn 0.4s ease-out forwards",
              opacity: 0,
              animationDelay: "0.05s",
            }}
          >
            {part}
          </g>
        ))}

        {/* Global CSS for animation */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </svg>
    </Box>
  );
}
