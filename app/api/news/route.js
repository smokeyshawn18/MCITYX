// app/api/news/route.js

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const pageSize = url.searchParams.get("pageSize") || "6";

    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "NEWS_API_KEY not set" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=manchester%20city&language=en&pageSize=${pageSize}&page=${page}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `News API error: ${errorText}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch news", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
