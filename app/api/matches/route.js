// app/api/matches/route.js
import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

// Increased timeout for API calls
const FETCH_TIMEOUT = 10000; // 10 seconds
const CACHE_DURATION = 1800; // 30 minutes

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

    // Try to fetch from cache first
    const cachedData = await cache.get("matches");
    if (cachedData) {
      console.log("✓ Returning cached matches");
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

    // Try multiple seasons - 2025 first, then 2024
    let response = null;
    let data = null;
    let season = 2025;

    // Try season 2025 first
    let url = `https://${apiHost}/fixtures?team=50&season=2025`;
    console.log("🔄 Attempting to fetch from:", url);

    response = await fetchWithTimeout(url, {
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    console.log("📡 API Response Status:", response.status);

    if (!response.ok) {
      console.warn(
        `⚠️ Season 2025 failed (${response.status}), trying 2024...`,
      );
      // Fallback to season 2024
      season = 2024;
      url = `https://${apiHost}/fixtures?team=50&season=2024`;
      console.log("🔄 Attempting fallback:", url);

      response = await fetchWithTimeout(url, {
        headers: {
          "x-apisports-key": apiKey,
        },
      });

      console.log("📡 Fallback API Response Status:", response.status);
    }

    if (!response.ok) {
      throw new Error(`Football API error on both seasons: ${response.status}`);
    }

    data = await response.json();

    console.log("📊 API Response:", {
      status: response.status,
      season,
      responseCount: data.response?.length || 0,
      hasResponse: !!data.response,
      isArray: Array.isArray(data.response),
    });

    if (!data.response || !Array.isArray(data.response)) {
      console.error("❌ Invalid response format:", data);
      throw new Error("Invalid API response format");
    }

    // If still no matches, try direct team fetch with no season filter
    if (data.response.length === 0) {
      console.log("⚠️ No matches found, trying direct team fixtures...");
      const directUrl = `https://${apiHost}/fixtures?team=50`;
      const directResponse = await fetchWithTimeout(directUrl, {
        headers: {
          "x-apisports-key": apiKey,
        },
      });

      if (directResponse.ok) {
        const directData = await directResponse.json();
        data = directData;
        console.log(
          `✓ Got ${directData.response?.length || 0} matches from direct fetch`,
        );
      }
    }

    // If STILL no matches, use fallback sample data
    if (!data.response || data.response.length === 0) {
      console.warn("⚠️ No API data available, using sample matches");
      data = {
        response: [
          {
            fixture: {
              id: 1,
              date: "2026-02-15T15:00:00+00:00",
              venue: { name: "Etihad Stadium" },
              status: { short: "NS", long: "Not Started" },
              referee: null,
            },
            league: {
              id: 39,
              name: "Premier League",
              code: "PL",
              logo: "/assets/images/Champ.png",
            },
            teams: {
              home: {
                id: 50,
                name: "Manchester City",
                logo: "../../../assets/images/mcitylogo.png",
              },
              away: {
                id: 1,
                name: "Liverpool",
                logo: "/assets/images/liverpool.png",
              },
            },
            goals: { home: null, away: null },
            score: { halftime: { home: null, away: null } },
          },
          {
            fixture: {
              id: 2,
              date: "2026-02-22T20:00:00+00:00",
              venue: { name: "Etihad Stadium" },
              status: { short: "NS", long: "Not Started" },
              referee: null,
            },
            league: {
              id: 39,
              name: "Premier League",
              code: "PL",
              logo: "/assets/images/Champ.png",
            },
            teams: {
              home: {
                id: 50,
                name: "Manchester City",
                logo: "../../../assets/images/mcitylogo.png",
              },
              away: {
                id: 49,
                name: "Arsenal",
                logo: "/assets/images/arsenal.png",
              },
            },
            goals: { home: null, away: null },
            score: { halftime: { home: null, away: null } },
          },
        ],
      };
    }

    // Transform and optimize response
    const transformedData = {
      matches: (data.response || []).map((match) => ({
        id: match.fixture.id,
        utcDate: match.fixture.date,
        status: match.fixture.status.short,
        status_long: match.fixture.status.long,
        competition: {
          id: match.league.id,
          name: match.league.name,
          code: match.league.code,
          emblem: match.league.logo || "/assets/images/carabao.png",
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

    console.log("🔄 Transformed matches:", {
      count: transformedData.matches.length,
      competitions: transformedData.matches.map((m) => m.competition.name),
      statuses: transformedData.matches.map((m) => m.status),
    });

    // Cache the response
    await cache.set("matches", JSON.stringify(transformedData), {
      EX: CACHE_DURATION,
    });

    console.log(
      `✓ Fetched and cached ${transformedData.matches.length} matches`,
    );

    return NextResponse.json(transformedData, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("❌ Failed to fetch matches:", error.message);

    return NextResponse.json(
      {
        error: "Failed to fetch matches",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
