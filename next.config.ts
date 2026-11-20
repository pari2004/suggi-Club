import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allows production builds on Vercel to complete cleanly without CI lint interruptions
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensures type safety checks during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
