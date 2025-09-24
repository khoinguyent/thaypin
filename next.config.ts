import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-2c329f0e1a104718865ba6bcce019dec.r2.dev",
      },
    ],
  },
};

export default nextConfig;
