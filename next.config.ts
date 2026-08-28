import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-6624689e-c46f-46e0-8ca1-1bb5d8385b7b.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
