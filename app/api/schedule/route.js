import { NextResponse } from 'next/server';

const SEASON_ID = 24680; // Your season ID
const TEAM_ID = 9; // Manchester City

export async function GET() {
  const apiToken = process.env.SPORTMONKS_API_KEY;
  if (!apiToken) {
    return NextResponse.json({ error: 'API token missing' }, { status: 500 });
  }

  const url = `https://api.sportmonks.com/v3/football/schedules/seasons/${SEASON_ID}/teams/${TEAM_ID}?api_token=${apiToken}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || 'Failed to fetch schedule' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
