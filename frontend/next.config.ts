import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  allowedDevOrigins: ['192.168.100.33'],
  devIndicators: false,
};

export default nextConfig;
