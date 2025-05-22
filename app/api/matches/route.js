import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    if (!apiKey) {
      console.error("FOOTBALL_API_KEY is not set");
      return NextResponse.json(
        { error: "Server misconfiguration: API key missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.football-data.org/v4/teams/65/matches", // or /v4/matches for all
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
      }
    );

   

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      return NextResponse.json(
        { error: `API request failed with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches", details: error.message },
      { status: 500 }
    );
  }
}
