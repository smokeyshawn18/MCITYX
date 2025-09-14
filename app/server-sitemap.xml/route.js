import { getServerSideSitemap } from "next-sitemap";
import { NextResponse } from "next/server";

export async function GET(request) {
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

  // Player pages
  players.forEach((player) => {
    fields.push({
      loc: `https://mcityx.vercel.app/player/${player}`,
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
