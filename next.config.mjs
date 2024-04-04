/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/mp4-to-:format', // Matches any URL like /mp4-to-xxx
            destination: '/mp4-to/:format' // Rewrites to /mp4-to/xxx
          },
          {
            source: '/mov-to-:format', // Matches any URL like /mov-to-xxx
            destination: '/mov-to/:format' // Rewrites to /mov-to/xxx
          },
          {
            source: '/webm-to-:format', // Matches any URL like /webm-to-xxx
            destination: '/webm-to/:format' // Rewrites to /webm-to/xxx
          },
          {
            source: '/mkv-to-:format', // Matches any URL like /mkv-to-xxx
            destination: '/mkv-to/:format' // Rewrites to /mkv-to/xxx
          },
          {
            source: '/avi-to-:format', // Matches any URL like /avi-to-xxx
            destination: '/avi-to/:format' // Rewrites to /avi-to/xxx
          },          
          {
            source: '/flv-to-:format', // Matches any URL like /flv-to-xxx
            destination: '/flv-to/:format' // Rewrites to /flv-to/xxx
          },          
        ];
      }
};

export default nextConfig;
