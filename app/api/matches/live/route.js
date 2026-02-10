// app/api/matches/live/route.js
import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

const FETCH_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 300; // 5 minutes for live matches

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

export async function GET() {
  try {
    const cache = await getRedisClient();

    // Try to fetch from cache first (shorter TTL for live matches)
    const cachedData = await cache.get("matches_live");
    if (cachedData) {
      console.log("✓ Returning cached live matches");
      return NextResponse.json(JSON.parse(cachedData), {
        headers: { "X-Cache": "HIT" },
      });
    }

    const apiKey = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
    const apiHost = process.env.NEXT_PUBLIC_API_FOOTBALL_HOST;

    if (!apiKey || !apiHost) {
      console.error("❌ API key or host missing");
      return NextResponse.json(
        { error: "API configuration missing" },
        { status: 500 },
      );
    }

    // Fetch live matches - try multiple endpoints
    let response;
    let data;

    // Try with season first
    let url = `https://${apiHost}/fixtures?team=50&live=all&season=2025`;
    console.log("🔄 Fetching live matches from:", url);

    response = await fetchWithTimeout(url, {
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    // If no results, try without season
    if (response.ok) {
      data = await response.json();
      if (!data.response || data.response.length === 0) {
        console.log("⚠️ No live matches in 2025, trying direct live fetch...");
        url = `https://${apiHost}/fixtures?team=50&live=all`;
        response = await fetchWithTimeout(url, {
          headers: {
            "x-apisports-key": apiKey,
          },
        });
      }
    } else {
      // Fallback to no season parameter
      url = `https://${apiHost}/fixtures?team=50&live=all`;
      console.log("🔄 Trying fallback:", url);
      response = await fetchWithTimeout(url, {
        headers: {
          "x-apisports-key": apiKey,
        },
      });
    }

    if (!response.ok) {
      throw new Error(`Football API error: ${response.status}`);
    }

    data = await response.json();

    if (!data.response || !Array.isArray(data.response)) {
      console.error("❌ Invalid response format:", data);
      throw new Error("Invalid API response format");
    }

    // Filter for live/in-play matches only
    const liveMatches = data.response.filter(
      (match) =>
        match.fixture.status.short === "LIVE" ||
        match.fixture.status.short === "1H" ||
        match.fixture.status.short === "2H" ||
        match.fixture.status.short === "ET" ||
        match.fixture.status.short === "P",
    );

    // Transform the response
    const transformedData = {
      matches: liveMatches.map((match) => ({
        id: match.fixture.id,
        utcDate: match.fixture.date,
        status: match.fixture.status.short,
        status_long: match.fixture.status.long,
        elapsed: match.fixture.status.elapsed || null,
        competition: {
          id: match.league.id,
          name: match.league.name,
          code: match.league.code,
        },
        homeTeam: {
          id: match.teams.home.id,
          name: match.teams.home.name,
          crest: match.teams.home.logo,
        },
        awayTeam: {
          id: match.teams.away.id,
          name: match.teams.away.name,
          crest: match.teams.away.logo,
        },
        score: {
          fullTime: {
            home: match.goals.home ?? null,
            away: match.goals.away ?? null,
          },
          halfTime: {
            home: match.score.halftime?.home ?? null,
            away: match.score.halftime?.away ?? null,
          },
        },
        venue: match.fixture.venue?.name || "TBA",
        referee: match.fixture.referee || null,
      })),
      timestamp: new Date().toISOString(),
    };

    // Cache for 5 minutes
    await cache.set("matches_live", JSON.stringify(transformedData), {
      EX: CACHE_DURATION,
    });

    console.log(
      `✓ Fetched and cached ${transformedData.matches.length} live matches`,
    );
    return NextResponse.json(transformedData, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("❌ Failed to fetch live matches:", error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch live matches",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
