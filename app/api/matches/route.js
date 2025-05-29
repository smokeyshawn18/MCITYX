// app/api/matches/route.js
import { getRedisClient } from '@/lib/redis';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const redis = await getRedisClient();

    // Try to fetch from Redis first
    const cachedData = await redis.get('matches');

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    const apiKey = process.env.FOOTBALL_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    const response = await fetch("https://api.football-data.org/v4/teams/65/matches", {
      headers: { "X-Auth-Token": apiKey },
    });

    const data = await response.json();

    // Cache for 1 hour
    await redis.set('matches', JSON.stringify(data), {
      EX: 3600,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches", details: error.message },
      { status: 500 }
    );
  }
}
