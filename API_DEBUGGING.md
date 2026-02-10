# API Debugging Guide

## Issue: "No Matches Found"

Your API endpoints have been updated with improved debugging and fallback logic. Here's how to diagnose the issue:

## Step 1: Check Browser Console

1. Open your app in the browser
2. Open Developer Tools (F12)
3. Go to **Network** tab
4. Look for requests to:
   - `/api/matches`
   - `/api/standings`
5. Check the **Response** tab to see what data is being returned

## Step 2: Check Server Logs

Run your dev server and watch the terminal:

```bash
npm run dev
```

Look for these logs:

- `🔄 Attempting to fetch from:` - URL being called
- `📡 API Response Status:` - HTTP status code
- `📊 API Response:` - Number of matches returned
- `✓ Fetched and cached` - Successful cache

## Common Issues & Solutions

### Issue 1: "API configuration missing"

**Cause:** Missing environment variables
**Solution:**

```bash
# Check .env.local has these:
NEXT_PUBLIC_API_FOOTBALL_KEY=your_key_here
NEXT_PUBLIC_API_FOOTBALL_HOST=v3.football.api-sports.io
```

### Issue 2: "Football API error: 429"

**Cause:** API rate limit exceeded
**Solution:**

- Wait 5-10 minutes before trying again
- Check your API plan limits
- You might need to upgrade your Football API subscription

### Issue 3: "Football API error: 401"

**Cause:** Invalid or expired API key
**Solution:**

- Go to https://www.api-football.com/
- Check your API key is valid
- Update `.env.local` with the correct key

### Issue 4: "No matches found" (empty array)

**Cause:** Team fixtures not available for that season
**Solution:**

- The API might not have 2025 season data yet
- It will automatically fallback to 2024
- If still no data, check if Manchester City team ID is correct (50)

## Step 3: Manual API Test

Test the API directly from your browser or terminal:

```bash
# Get matches
curl "http://localhost:3000/api/matches"

# Get standings
curl "http://localhost:3000/api/standings"

# Get live matches
curl "http://localhost:3000/api/matches/live"
```

Expected response format:

```json
{
  "matches": [
    {
      "id": 123,
      "status": "NS",
      "homeTeam": { "name": "Manchester City" },
      "awayTeam": { "name": "..." },
      "competition": { "name": "Premier League" }
    }
  ],
  "timestamp": "2026-02-09T..."
}
```

## Step 4: Check API Response Format

The response should have a `matches` array. If the array is empty:

1. The Football API doesn't have data for that team/season
2. The API might be down
3. Your API key might have limited access

## Workaround: Use Manual Matches

If the API continues to have issues, use manual match data in `app/schedule/components/manualMatches.js`:

```javascript
export const manualMatches = [
  {
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    date: "2026-02-15",
    time: "15:00",
    competition: "Premier League",
    // ...
  },
  // Add more matches here
];
```

## Performance Check

The API should cache results after the first request:

- First call: `X-Cache: MISS` (fetches fresh data)
- Subsequent calls: `X-Cache: HIT` (serves from cache)

Check response headers:

1. Open Network tab in DevTools
2. Click on API request
3. Check **Response Headers** section
4. Look for `X-Cache: HIT` or `X-Cache: MISS`

## Full Troubleshooting Flow

```
1. Check .env.local has correct API keys ✓
   ↓
2. Restart dev server (npm run dev) ✓
   ↓
3. Check browser console for errors ✓
   ↓
4. Check server logs for API errors ✓
   ↓
5. Test API directly ✓
   ↓
6. If still failing, use manual matches data ✓
```

## API Endpoints Summary

| Endpoint            | Purpose                      | Cache  | Status Codes  |
| ------------------- | ---------------------------- | ------ | ------------- |
| `/api/matches`      | All Manchester City fixtures | 30 min | NS, FT, etc   |
| `/api/matches/live` | Currently live matches only  | 5 min  | LIVE, 1H, 2H  |
| `/api/standings`    | League standings             | 1 hour | Latest tables |

## If Nothing Works

1. **Verify API key is valid:**
   - Go to api-football.com
   - Check subscription plan limits
   - Ensure key matches the environment variable

2. **Try the API directly:**
   - Use Postman or curl
   - Test with your API key
   - Verify Manchester City (team_id=50) exists

3. **Check Football API status:**
   - Visit https://status.api-football.com/
   - Check if service is down

4. **Use fallback/manual data:**
   - The app will work with manual matches
   - Edit `app/schedule/components/manualMatches.js`
   - Provide data directly instead of from API

---

**Last updated:** 2026-02-09
**For support:** Check api-football.com documentation
