import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_HOST ?? "localhost",
        port: process.env.NEXT_PUBLIC_PORT ?? "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
