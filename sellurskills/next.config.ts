import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "10.33.100.73",
    "192.168.12.207",
  ],
};

export default nextConfig;