# Quick Debugging Steps for "No Matches Found"

## Step 1: Check Server Console

When you see "No matches scheduled" on the schedule page:

1. Look at your terminal where `npm run dev` is running
2. Look for these logs:

   ```
   🔄 Attempting to fetch from: https://v3.football.api-sports.io/fixtures...
   📡 API Response Status: 200
   🔄 Transformed matches: { count: X, competitions: [...], statuses: [...] }
   ```

3. **If count is 0:** API returned no data, using sample data (normal)
4. **If count > 0:** Data was transformed successfully

## Step 2: Check Browser Console

Open DevTools (F12) and look for these logs:

```
📥 API Response received: { totalMatches: X, upcomingMatches: Y }
✅ X matches for prem
```

- **If totalMatches is 0:** No data from API
- **If upcomingMatches is 0:** All data filtered out (status check failed)
- **If X matches for prem is 0:** Competition name filtering failed

## Step 3: Clear Cache and Refresh

If you're seeing "No matches scheduled":

```bash
# In terminal:
curl -X POST http://localhost:3000/api/cache/clear

# Then refresh browser (F5)
```

## Step 4: Check What's Actually in Response

In browser console (F12):

```javascript
// Fetch the API directly
fetch("/api/matches")
  .then((r) => r.json())
  .then((d) => console.log("Full response:", d));
```

Look for:

- `matches` array exists
- Matches have `status`, `competition.name`, `homeTeam`, `awayTeam`
- Competition name contains "Premier League" or "Champions League"

## Most Likely Causes

| Issue              | Log Evidence             | Solution                              |
| ------------------ | ------------------------ | ------------------------------------- |
| API empty          | `responseCount: 0`       | Normal, fallback data used            |
| Status mismatch    | `upcomingMatches: 0`     | Check status values (should be "NS")  |
| Competition filter | `Filtered out: ...` logs | Check competition names               |
| Cache stale        | `X-Cache: HIT` but empty | Run cache clear endpoint              |
| API down           | HTTP error in logs       | Wait or check api-football.com status |

## Data Flow

```
API Endpoint (/api/matches)
    ↓ (Returns data with status="NS", competition="Premier League")
    ↓ Transform response
Schedule Page (/schedule)
    ↓ Fetch from API
    ↓ Filter by status "NS"
    ↓ Filter by competition name includes "premier"
Display Matches or Empty State
```

## If Still Showing "No Matches Found"

1. **Check server logs** for errors
2. **Check browser console** for filtering issues
3. **Clear cache** and refresh
4. **Verify sample data** is in the API response

The system should:

- ✓ Use real API data if available
- ✓ Fall back to sample data if API empty
- ✓ Always show **something** instead of "no matches found"

---

Next steps after checking these logs: Let me know what you see in the browser console!
