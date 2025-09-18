/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO and Performance Optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Bundle optimization
  // swcMinify: true, // Removed - Next.js 15 uses SWC by default

  // Image optimization for SEO
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/football/teams/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/football/teams/**",
      },
      {
        protocol: "https",
        hostname: "mcityx.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Headers for SEO and Security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Fix redirect chains
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/fixtures",
        destination: "/schedule",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/players",
        destination: "/player-card",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/stats",
        destination: "/player-card",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/matches",
        destination: "/schedule",
        permanent: true,
        statusCode: 301,
      },
      // Fix common URL variations
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
        statusCode: 301,
      },
      // Handle trailing slashes consistently
      {
        source: "/news/",
        destination: "/news",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/schedule/",
        destination: "/schedule",
        permanent: true,
        statusCode: 301,
      },
    ];
  },

  // Rewrites for dynamic content
  async rewrites() {
    return [
      {
        source: "/api/search",
        destination: "/api/search",
      },
    ];
  },

  // Experimental features for better SEO
  experimental: {
    scrollRestoration: true,
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
          enforce: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
          priority: 20,
          enforce: true,
        },
        clerk: {
          test: /[\\/]node_modules[\\/]@clerk[\\/]/,
          name: "clerk",
          chunks: "all",
          priority: 15,
        },
        ui: {
          test: /[\\/]node_modules[\\/](@radix-ui|@headlessui|framer-motion)[\\/]/,
          name: "ui",
          chunks: "all",
          priority: 12,
        },
        utils: {
          test: /[\\/]node_modules[\\/](date-fns|clsx|tailwind-merge|zod)[\\/]/,
          name: "utils",
          chunks: "all",
          priority: 11,
        },
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        concatenateModules: true,
        flagIncludedChunks: true,
        sideEffects: true,
        providedExports: true,
        usedExports: true,
      };
    }

    return config;
  },
};

export default nextConfig;
