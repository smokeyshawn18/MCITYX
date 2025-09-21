import { NextResponse } from "next/server";

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
  const resp = await fetch(API_URL, {
    headers: {
      "x-apisports-key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY,
    },
    next: { revalidate: 300 },
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => null);

    throw new Error(`Failed to fetch league ${leagueId}`);
  }

  const data = await resp.json();

  const league = data.response[0]?.league ?? null;
  const standings = league?.standings?.[0] ?? [];

  return {
    league: league?.name ?? leagueId,
    country: league?.country ?? null,
    season: league?.season ?? season,
    table: normalizeTable(standings),
    raw: league,
  };
}

export async function GET() {
  try {
    // PL = 39, CL = 2, season = 2024
    const [premierLeague, championsLeague] = await Promise.all([
      fetchStandings(39, 2024), // Premier League
      fetchStandings(2, 2024), // Champions League
    ]);

    return NextResponse.json(
      {
        premierLeague,
        championsLeague,
        fetchedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Standings API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch standings",
        detail: error.message ?? null,
      },
      { status: error?.status || 500 }
    );
  }
}
