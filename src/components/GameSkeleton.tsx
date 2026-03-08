import { Box, Container, Skeleton, Paper } from "@mui/material";

export default function GameSkeleton() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      {/* PROGRESS BAR SKELETON */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
        <Skeleton
          variant="rounded"
          width="100%"
          height={6}
          sx={{ borderRadius: 3 }}
        />
      </Box>

      {/* HANGMAN FIGURE SKELETON */}
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, background: "rgba(18, 24, 48, 0.2)" }}
      >
        <Skeleton
          variant="rounded"
          width="100%"
          height={250}
          sx={{ borderRadius: 2 }}
        />
      </Paper>

      {/* WORD DISPLAY SKELETON */}
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 4, mt: 3 }}
      >
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={40}
            height={50}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>

      {/* KEYBOARD SKELETON */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={`row1-${i}`}
              variant="rounded"
              width={36}
              height={48}
              sx={{ borderRadius: 1.5 }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {[...Array(9)].map((_, i) => (
            <Skeleton
              key={`row2-${i}`}
              variant="rounded"
              width={36}
              height={48}
              sx={{ borderRadius: 1.5 }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {[...Array(7)].map((_, i) => (
            <Skeleton
              key={`row3-${i}`}
              variant="rounded"
              width={36}
              height={48}
              sx={{ borderRadius: 1.5 }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
