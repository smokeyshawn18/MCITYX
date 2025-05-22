// app/api/man-city-standings/route.js



export async function GET(request) {
    const FOOTBALL_DATA_API_TOKEN = process.env.FOOTBALL_API_KEY;
const MAN_CITY_TEAM_ID = 65;
  if (!FOOTBALL_DATA_API_TOKEN) {
    return new Response(
      JSON.stringify({ error: "API token not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Fetch competitions
    const competitionsRes = await fetch("https://api.football-data.org/v4/competitions", {
      headers: { "X-Auth-Token":  FOOTBALL_DATA_API_TOKEN},
    });
    if (!competitionsRes.ok) {
      throw new Error("Failed to fetch competitions");
    }
    const competitionsData = await competitionsRes.json();
    const competitions = competitionsData.competitions || [];

    // Fetch standings for each league competition and find Man City's standing
    const standingsPromises = competitions.map(async (comp) => {
      if (comp.type !== "LEAGUE") return null;

      const standingsRes = await fetch(
        `https://api.football-data.org/v4/competitions/${comp.code}/standings`,
        { headers: { "X-Auth-Token": FOOTBALL_DATA_API_TOKEN } }
      );
      if (!standingsRes.ok) return null;

      const standingsData = await standingsRes.json();
      const totalTable = standingsData.standings.find((s) => s.type === "TOTAL");
      if (!totalTable) return null;

      const manCityStanding = totalTable.table.find((team) => team.team.id === MAN_CITY_TEAM_ID);
      if (!manCityStanding) return null;

      return {
        competition: comp.name,
        competitionCode: comp.code,
        position: manCityStanding.position,
        playedGames: manCityStanding.playedGames,
        points: manCityStanding.points,
        wins: manCityStanding.won,
        draws: manCityStanding.draw,
        losses: manCityStanding.lost,
        goalsFor: manCityStanding.goalsFor,
        goalsAgainst: manCityStanding.goalsAgainst,
        goalDifference: manCityStanding.goalDifference,
      };
    });

    const standings = (await Promise.all(standingsPromises)).filter(Boolean);

    return new Response(JSON.stringify({ standings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
