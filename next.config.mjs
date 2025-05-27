/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
        port: '',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        port: '',
        pathname: '/football/teams/**',
      },
        {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/football/teams/**',
      },
    ],
  },
};

export default nextConfig;
