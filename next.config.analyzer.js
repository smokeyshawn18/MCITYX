const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config here...
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,

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

  webpack: (config, { dev, isServer }) => {
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

    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        minimize: true,
        concatenateModules: true,
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        providedExports: true,
        usedExports: true,
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
