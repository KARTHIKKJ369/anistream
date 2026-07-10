import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@anistream/types"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.anistream.local",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
