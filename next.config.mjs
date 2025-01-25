import { createMDX } from 'fumadocs-mdx/next';
 
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : true,
  images: {
    remotePatterns : [
      {
        protocol: 'https',
        hostname : 'github.com',
        port : '',
        pathname : '/.*'
      },
      {
        protocol : 'https',
        hostname : 'avatars.githubusercontent.com',
        port : '',
        pathname : '/.*'
      },
      {
        protocol : 'https',
        hostname : 'picsum.photos',
        port : '',
        pathname : '/.*'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/:format([a-z0-9]+-to-[a-z0-9]+)',
        destination: '/convert/:format',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Apply only to WASM-related routes
        source: '/(compress-images|convert|remove-bg)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ],
      },
      {
        // Default headers for other routes
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', // Less strict
          }
        ]
      }
    ];
  }
};

export default withMDX(nextConfig);