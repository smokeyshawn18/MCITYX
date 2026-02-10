# Cache Clearing Guide

## Why Clear Cache?

When the API returns empty data and that gets cached, you need to clear it to fetch fresh data from the API.

## Method 1: Using the Cache Clear Endpoint (Recommended)

Simply make a POST request to clear all cached data:

```bash
curl -X POST http://localhost:3000/api/cache/clear
```

Expected response:

```json
{
  "success": true,
  "message": "Cache cleared successfully",
  "clearedKeys": ["matches", "matches_live", "standings:current"]
}
```

## Method 2: Browser Console

Open your browser console (F12) and run:

```javascript
// Clear cache
fetch("/api/cache/clear", { method: "POST" })
  .then((r) => r.json())
  .then((d) => console.log("✓ Cache cleared:", d));
```

## Method 3: Using curl in Terminal

```bash
# While your dev server is running (npm run dev)
curl -X POST http://localhost:3000/api/cache/clear
```

## Step-by-Step: Fix "No Matches Found"

1. **Clear the cache:**

   ```bash
   curl -X POST http://localhost:3000/api/cache/clear
   ```

2. **Refresh your browser:**
   - Press `F5` or `Ctrl+R`
   - Or close the tab and reopen it

3. **Check if data appears:**
   - Go to `/schedule` page
   - Should now show matches (either real API data or sample data)

4. **Verify in Network tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Reload page
   - Look for `/api/matches` request
   - Check Response should have matches array

## What Each Cache Key Does

| Key                 | Purpose                      | Duration   |
| ------------------- | ---------------------------- | ---------- |
| `matches`           | All Manchester City fixtures | 30 minutes |
| `matches_live`      | Currently live matches       | 5 minutes  |
| `standings:current` | League standings             | 1 hour     |

## Automatic Fallback

If the Football API returns 0 matches, the system now:

1. Tries multiple seasons (2025, 2024)
2. Tries direct team fixtures
3. Falls back to sample match data
4. **Shows something instead of nothing** ✓

## Debug: Check What's Cached

To see what's currently cached, check the browser DevTools Network tab:

1. Open DevTools (F12)
2. Network tab
3. Request `/api/matches`
4. Response tab shows the cached data
5. If matches array is empty `[]`, data needs refreshing

## For Production

When deploying, the cache will be fresh on server restart. No need to clear manually unless data becomes stale.

---

**Last updated:** 2026-02-09
