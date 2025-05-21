import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['a.co'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src 'self' https://a.co",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
