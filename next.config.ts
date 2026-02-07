import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", 
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckpkfjziiouhwlpopiuy.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
