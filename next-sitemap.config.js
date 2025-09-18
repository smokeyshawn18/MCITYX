/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mcityx.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  sitemapPath: "/sitemap.xml",

  // Robot.txt settings
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
    ],
    additionalSitemaps: ["https://mcityx.vercel.app/server-sitemap.xml"],
  },

  // Exclude problematic paths
  exclude: [
    "/api/*",
    "/auth/*",
    "/admin/*",
    "/_next/*",
    "/404",
    "/500",
    "/manifest.json",
    "/robots.txt",
    "/sw.js",
    "/offline.html",
  ],

  // Transform function to ensure consistent URLs
  transform: async (config, path) => {
    // Skip if path should be excluded
    if (
      config.exclude &&
      config.exclude.some((pattern) =>
        new RegExp(pattern.replace("*", ".*")).test(path)
      )
    ) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];

    // Add dynamic player pages
    const players = [
      "haaland",
      "de-bruyne",
      "foden",
      "stones",
      "walker",
      "rodri",
      "bernardo-silva",
      "gundogan",
      "cancelo",
      "dias",
    ];

    players.forEach((player) => {
      result.push({
        loc: `/player/${player}`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });

    // Add competition pages
    const competitions = [
      "premier-league",
      "champions-league",
      "fa-cup",
      "carabao-cup",
    ];
    competitions.forEach((comp) => {
      result.push({
        loc: `/competition/${comp}`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },

  // Exclude certain paths
  exclude: ["/api/*", "/auth/*", "/admin/*", "/_next/*", "/404", "/500"],

  // Transform function for custom metadata
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    const pathPriority = {
      "/": 1.0,
      "/schedule": 0.9,
      "/news": 0.8,
      "/player-card": 0.8,
      "/results": 0.8,
      "/lineup": 0.7,
      "/trophy-cabinet": 0.6,
    };

    const pathChangefreq = {
      "/": "daily",
      "/schedule": "hourly",
      "/news": "hourly",
      "/results": "daily",
      "/player-card": "weekly",
    };

    return {
      loc: path,
      changefreq: pathChangefreq[path] || config.changefreq,
      priority: pathPriority[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/auth/"],
      },
    ],
    additionalSitemaps: [
      "https://mcityx.vercel.app/sitemap-0.xml",
      "https://mcityx.vercel.app/server-sitemap.xml",
    ],
  },
};
