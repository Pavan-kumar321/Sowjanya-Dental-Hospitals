import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // @ts-ignore - allowedDevOrigins is a valid option in Next.js 15+ for HMR
  allowedDevOrigins: ['192.168.31.155'],
};

export default nextConfig;
