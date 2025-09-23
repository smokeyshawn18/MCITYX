/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mcityx.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  sitemapPath: "/sitemap.xml",
  changefreq: "daily",
  priority: 0.7,
  autoLastmod: true,

  // Exclude internal and non-public paths
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
    "/server-sitemap.xml", // Exclude the server sitemap from the main sitemap
  ],

  // Add dynamic paths to the sitemap
  additionalPaths: async (config) => {
    const result = [];
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

  // Customize priority and change frequency for specific pages
  transform: async (config, path) => {
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

    // Use default values if not found in custom maps
    const priority = pathPriority[path] || config.priority;
    const changefreq = pathChangefreq[path] || config.changefreq;

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Configure the robots.txt file
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
      "https://mcityx.vercel.app/sitemap.xml",
      "https://mcityx.vercel.app/server-sitemap.xml",
    ],
  },
};
