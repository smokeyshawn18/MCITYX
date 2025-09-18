import { getServerSideSitemap } from "next-sitemap";
import { NextResponse } from "next/server";

export async function GET(request) {
  const siteUrl = "https://mcityx.vercel.app";

  // Get dynamic data for sitemap
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
    "ederson",
    "ake",
    "ruben-dias",
    "phil-foden",
    "kevin-de-bruyne",
  ];

  const competitions = [
    "premier-league",
    "champions-league",
    "fa-cup",
    "carabao-cup",
    "community-shield",
    "uefa-super-cup",
    "fifa-club-world-cup",
  ];

  const newsCategories = [
    "transfers",
    "match-reports",
    "player-news",
    "club-news",
    "premier-league",
    "champions-league",
    "youth-team",
  ];

  // Generate sitemap entries
  const fields = [];

  // Static pages with proper canonicalization
  const staticPages = [
    { url: "/", priority: 1.0 },
    { url: "/news", priority: 0.9 },
    { url: "/schedule", priority: 0.9 },
    { url: "/results", priority: 0.8 },
    { url: "/player-card", priority: 0.8 },
    { url: "/trophy-cabinet", priority: 0.7 },
    { url: "/history", priority: 0.6 },
    { url: "/profile", priority: 0.5 },
    { url: "/settings", priority: 0.5 },
    { url: "/lineup/create", priority: 0.6 },
  ];

  staticPages.forEach(({ url, priority }) => {
    fields.push({
      loc: `${siteUrl}${url}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority,
    });
  });

  // Player pages
  players.forEach((player) => {
    fields.push({
      loc: `${siteUrl}/player/${player}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.6,
    });
  });

  // Competition pages
  competitions.forEach((comp) => {
    fields.push({
      loc: `https://mcityx.vercel.app/competition/${comp}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    });
  });

  // News category pages
  newsCategories.forEach((category) => {
    fields.push({
      loc: `https://mcityx.vercel.app/news/${category}`,
      lastmod: new Date().toISOString(),
      changefreq: "hourly",
      priority: 0.7,
    });
  });

  // Match result pages (last 30 days)
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    fields.push({
      loc: `https://mcityx.vercel.app/results/${dateStr}`,
      lastmod: date.toISOString(),
      changefreq: "daily",
      priority: 0.5,
    });
  }

  return getServerSideSitemap(fields);
}
