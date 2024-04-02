/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/mp4-to-:format', // Matches any URL like /mp4-to-xxx
            destination: '/mp4-to/:format' // Rewrites to /mp4-to/xxx
          }
        ];
      }
};

export default nextConfig;
