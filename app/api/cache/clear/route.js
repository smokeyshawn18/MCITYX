// app/api/cache/clear/route.js
import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cache = await getRedisClient();

    // Clear specific cache keys
    await cache.del("matches");
    await cache.del("matches_live");
    await cache.del("standings:current");

    console.log("✓ Cache cleared");

    return NextResponse.json(
      {
        success: true,
        message: "Cache cleared successfully",
        clearedKeys: ["matches", "matches_live", "standings:current"],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Failed to clear cache:", error.message);
    return NextResponse.json(
      {
        error: "Failed to clear cache",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
