import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurazione per migliorare la sicurezza e prevenire problemi di mixed content
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests"
          }
        ],
      },
    ];
  },
  
  // Configurazione delle immagini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
