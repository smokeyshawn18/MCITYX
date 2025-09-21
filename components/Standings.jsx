"use client";
import { useEffect, useState } from "react";

export default function Standings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/standings");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load standings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading standings...</p>;
  if (!data) return <p>Failed to load standings</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Standings</h1>

      {/* Premier League */}
      <section>
        <h2 className="text-lg font-semibold">Premier League</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Team</th>
              <th className="border p-2">P</th>
              <th className="border p-2">W</th>
              <th className="border p-2">D</th>
              <th className="border p-2">L</th>
              <th className="border p-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {data.premierLeague.table.map((row) => (
              <tr key={row.team.id}>
                <td className="border p-2">{row.rank}</td>
                <td className="border p-2 flex items-center gap-2">
                  <img
                    src={row.team.crest}
                    alt={row.team.name}
                    className="h-5"
                  />
                  {row.team.name}
                </td>
                <td className="border p-2">{row.playedGames}</td>
                <td className="border p-2">{row.won}</td>
                <td className="border p-2">{row.draw}</td>
                <td className="border p-2">{row.lost}</td>
                <td className="border p-2 font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Champions League */}
      <section>
        <h2 className="text-lg font-semibold">Champions League</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Team</th>
              <th className="border p-2">P</th>
              <th className="border p-2">W</th>
              <th className="border p-2">D</th>
              <th className="border p-2">L</th>
              <th className="border p-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {data.championsLeague.table.map((row) => (
              <tr key={row.team.id}>
                <td className="border p-2">{row.rank}</td>
                <td className="border p-2 flex items-center gap-2">
                  <img
                    src={row.team.crest}
                    alt={row.team.name}
                    className="h-5"
                  />
                  {row.team.name}
                </td>
                <td className="border p-2">{row.playedGames}</td>
                <td className="border p-2">{row.won}</td>
                <td className="border p-2">{row.draw}</td>
                <td className="border p-2">{row.lost}</td>
                <td className="border p-2 font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
