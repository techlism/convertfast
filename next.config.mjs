/** @type {import('next').NextConfig} */
const nextConfig = {
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
          {
            source: '/png-to-:format', // Matches any URL like /png-to-xxx
            destination: '/png-to/:format' // Rewrites to /png-to/xxx
          },
          {
            source: '/jpg-to-:format', // Matches any URL like /jpg-to-xxx
            destination: '/jpg-to/:format' // Rewrites to /jpg-to/xxx            
          },
          {
            source: '/jpeg-to-:format', // Matches any URL like /jpeg-to-xxx
            destination: '/jpeg-to/:format' // Rewrites to /jpeg-to/xxx
          },
          // {
          // Dropping SVG support because of inkscape requirement issue
          //   source: '/svg-to-:format', // Matches any URL like /svg-to-xxx
          //   destination: '/svg-to/:format' // Rewrites to /svg-to/xxx            
          // },
          {
            source : '/webp-to-:format',
            destination : '/webp-to/:format'
          },
          {
            source : '/bmp-to-:format',
            destination : '/bmp-to/:format'
          },
          {
            source : '/mp3-to-:format',
            destination : '/mp3-to/:format'
          },
          {
            source : '/wav-to-:format',
            destination : '/wav-to/:format'
          },
          {
            source : '/m4a-to-:format',
            destination : '/m4a-to/:format'
          },
          {
            source : '/aac-to-:format',
            destination : '/aac-to/:format'
          }
        ];
      },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            }
          ],
        },        
      ]
    }
};

export default nextConfig;
