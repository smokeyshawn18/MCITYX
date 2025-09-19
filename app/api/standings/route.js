// app/api/standings/route.js (or /pages/api/standings.js if using pages)
/* eslint-disable import/no-anonymous-default-export */
import { NextResponse } from "next/server";

/**
 * Normalize football-data.org table for easier consumption
 */
function normalizeTable(table = []) {
  return table.map((row) => ({
    position: row.position,
    playedGames: row.playedGames,
    points: row.points,
    won: row.won ?? row.wins ?? 0,
    draw: row.draw ?? row.draws ?? 0,
    lost: row.lost ?? row.losses ?? 0,
    goalsFor: row.goalsFor,
    goalsAgainst: row.goalsAgainst,
    goalDifference: row.goalDifference,
    team: {
      id: row.team?.id ?? null,
      name: row.team?.name ?? row.team?.shortName ?? "",
      crest: row.team?.crest ?? null,
    },
  }));
}

/**
 * Fetch and normalize standings for a given competition code
 */
async function fetchStandingsForCompetition(code) {
  const API_URL = `https://api.football-data.org/v4/competitions/${code}/standings`;
  const resp = await fetch(API_URL, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY },
    next: { revalidate: 300 }, // optional caching
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => null);
    const err = new Error(
      `Failed to fetch ${code} standings: ${resp.status} ${resp.statusText} ${
        text ?? ""
      }`
    );
    err.status = resp.status;
    throw err;
  }

  const data = await resp.json();

  // Pick "TOTAL" table if available
  const tableObj =
    (data.standings && data.standings.find((s) => s.type === "TOTAL")) ||
    (data.standings && data.standings[0]) ||
    null;

  const normalized = tableObj?.table ? normalizeTable(tableObj.table) : [];

  return {
    competition: data.competition?.name ?? code,
    season: data.season ?? null,
    stage: tableObj?.stage ?? null,
    type: tableObj?.type ?? null,
    table: normalized,
    raw: tableObj ?? null,
  };
}

export async function GET() {
  try {
    // Fetch PL and CL in parallel
    const [premierLeague, championsLeague] = await Promise.all([
      fetchStandingsForCompetition("PL"),
      fetchStandingsForCompetition("CL"),
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
