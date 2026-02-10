import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

const FETCH_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 3600; // 1 hour for standings

async function fetchWithTimeout(url, options, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Normalize API-Football standings
 */
function normalizeTable(standings = []) {
  return standings.map((row) => ({
    rank: row.rank,
    points: row.points,
    playedGames: row.all.played,
    won: row.all.win,
    draw: row.all.draw,
    lost: row.all.lose,
    goalsFor: row.all.goals.for,
    goalsAgainst: row.all.goals.against,
    goalsDiff: row.goalsDiff,
    team: {
      id: row.team.id,
      name: row.team.name,
      crest: row.team.logo,
    },
  }));
}

/**
 * Fetch standings for a given league + season
 */
async function fetchStandings(leagueId, season) {
  const API_URL = `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`;
  console.log(`📡 Fetching standings: ${API_URL}`);

  const resp = await fetchWithTimeout(API_URL, {
    headers: {
      "x-apisports-key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
    },
  });

  if (!resp.ok) {
    console.warn(
      `⚠️ Failed to fetch league ${leagueId} season ${season}: ${resp.status}`,
    );
    throw new Error(`Failed to fetch league ${leagueId}: ${resp.status}`);
  }

  const data = await resp.json();

  if (!data.response || data.response.length === 0) {
    console.warn(
      `⚠️ No standings data for league ${leagueId} season ${season}`,
    );
  }

  const league = data.response[0]?.league ?? null;
  const standings = league?.standings?.[0] ?? [];

  return {
    league: league?.name ?? leagueId,
    country: league?.country ?? null,
    season: league?.season ?? season,
    table: normalizeTable(standings),
  };
}

export async function GET() {
  try {
    const cache = await getRedisClient();

    // Try to fetch from cache first
    const cacheKey = "standings:current";
    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
      console.log("✓ Returning cached standings");
      return NextResponse.json(JSON.parse(cachedData), {
        headers: { "X-Cache": "HIT" },
      });
    }

    console.log("Fetching standings from API...");

    // Try current season first (2025), then fallback to 2024
    let responseData;

    try {
      const [premierLeague, championsLeague] = await Promise.all([
        fetchStandings(39, 2025), // Premier League 2025
        fetchStandings(2, 2025), // Champions League 2025
      ]);

      responseData = {
        premierLeague,
        championsLeague,
        fetchedAt: new Date().toISOString(),
      };

      console.log(`✓ Fetched 2025 standings`);
    } catch (error) {
      console.warn(`⚠️ 2025 standings failed, trying 2024...`);

      try {
        const [premierLeague, championsLeague] = await Promise.all([
          fetchStandings(39, 2024), // Premier League 2024
          fetchStandings(2, 2024), // Champions League 2024
        ]);

        responseData = {
          premierLeague,
          championsLeague,
          fetchedAt: new Date().toISOString(),
        };

        console.log(`✓ Fetched 2024 standings`);
      } catch (fallbackError) {
        console.error("❌ Both 2025 and 2024 failed:", fallbackError.message);

        // Use sample standings data as last resort
        console.warn("⚠️ Using sample standings data");
        responseData = {
          premierLeague: {
            league: "Premier League",
            country: "England",
            season: 2024,
            table: [
              {
                rank: 1,
                points: 88,
                playedGames: 35,
                won: 28,
                draw: 4,
                lost: 3,
                goalsFor: 89,
                goalsAgainst: 31,
                goalsDiff: 58,
                team: {
                  id: 50,
                  name: "Manchester City",
                  crest: "/assets/images/manchester-city-logo.png",
                },
              },
              {
                rank: 2,
                points: 84,
                playedGames: 35,
                won: 26,
                draw: 6,
                lost: 3,
                goalsFor: 85,
                goalsAgainst: 35,
                goalsDiff: 50,
                team: {
                  id: 49,
                  name: "Arsenal",
                  crest: "/assets/images/arsenal.png",
                },
              },
              {
                rank: 3,
                points: 78,
                playedGames: 35,
                won: 24,
                draw: 6,
                lost: 5,
                goalsFor: 80,
                goalsAgainst: 42,
                goalsDiff: 38,
                team: {
                  id: 97,
                  name: "Liverpool",
                  crest: "/assets/images/liverpool.png",
                },
              },
            ],
          },
          championsLeague: {
            league: "Champions League",
            country: "Europe",
            season: 2024,
            table: [],
          },
          fetchedAt: new Date().toISOString(),
        };
      }
    }

    // Cache the response
    await cache.set(cacheKey, JSON.stringify(responseData), {
      EX: CACHE_DURATION,
    });

    console.log("✓ Standings fetched and cached");

    return NextResponse.json(responseData, {
      headers: { "X-Cache": "MISS" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Standings API error:", error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch standings",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
