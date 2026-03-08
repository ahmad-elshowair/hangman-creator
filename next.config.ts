import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hangman-creator",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
