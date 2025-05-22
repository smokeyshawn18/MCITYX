import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { params } = context;
  const { id } = await params;

  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "FOOTBALL_API_KEY is not set" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.football-data.org/v4/matches/${id}`,
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Football API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch match details", details: error.message },
      { status: 500 }
    );
  }
}
