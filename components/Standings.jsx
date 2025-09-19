"use client";

import { useState, useEffect } from "react";
import { FaTrophy, FaFutbol, FaUsers } from "react-icons/fa";
import { MdStadium } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Standings = () => {
  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openTables, setOpenTables] = useState({
    premierLeague: true,
    championsLeague: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/standings");
        const data = await res.json();
        setStandingsData(data);
      } catch (err) {
        console.error("Error fetching standings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, isMain = false }) => (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white group hover:scale-105 transition-all duration-300 ${
        isMain
          ? "bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600"
          : "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
      } shadow-xl hover:shadow-2xl`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm opacity-80">{subtitle}</div>
          </div>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
    </div>
  );

  const LeagueStats = ({ league }) => {
    if (!standingsData?.[league]?.table) return null;

    const table = standingsData[league].table;

    // Find Manchester City row
    const city = table.find((row) =>
      row.team?.name?.toLowerCase().includes("manchester city")
    );

    // Fallback values if not found
    const stats = {
      position: city?.position ?? "-",
      points: city?.points ?? "-",
      playedGames: city?.playedGames ?? "-",
      won: city?.won ?? "-",
      goalsFor: city?.goalsFor ?? "-",
      goalsAgainst: city?.goalsAgainst ?? "-",
      goalDifference: city?.goalDifference ?? "-",
    };

    return (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {standingsData[league].competition} Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FaTrophy}
            title="Position"
            value={`#${stats.position}`}
            subtitle={`${stats.points} pts`}
            isMain
          />
          <StatCard
            icon={FaFutbol}
            title="Goals Scored"
            value={stats.goalsFor}
            subtitle={`${stats.goalsAgainst} conceded`}
          />
          <StatCard
            icon={FaUsers}
            title="Games Played"
            value={stats.playedGames}
            subtitle={`${stats.won} wins`}
          />
          <StatCard
            icon={MdStadium}
            title="Goal Diff."
            value={`${stats.goalDifference >= 0 ? "+" : ""}${
              stats.goalDifference
            }`}
            subtitle={standingsData[league].competition}
          />
        </div>
      </div>
    );
  };

  const LeagueTable = ({ title, tableKey }) => {
    const table = standingsData?.[tableKey]?.table || [];
    const isOpen = openTables[tableKey];

    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <button
          onClick={() =>
            setOpenTables((prev) => ({ ...prev, [tableKey]: !prev[tableKey] }))
          }
          className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {title}
          {isOpen ? (
            <IoChevronUp className="w-6 h-6" />
          ) : (
            <IoChevronDown className="w-6 h-6" />
          )}
        </button>
        {isOpen && (
          <div className="overflow-x-auto transition-all duration-500">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Team</th>
                  <th className="px-4 py-2">P</th>
                  <th className="px-4 py-2">W</th>
                  <th className="px-4 py-2">D</th>
                  <th className="px-4 py-2">L</th>
                  <th className="px-4 py-2">GF</th>
                  <th className="px-4 py-2">GA</th>
                  <th className="px-4 py-2">GD</th>
                  <th className="px-4 py-2">Pts</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row) => (
                  <tr
                    key={row.team.id || row.team.name}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      row.team.name === "Manchester City"
                        ? "bg-sky-100 dark:bg-sky-900 font-bold"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-2">{row.position}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {row.team.crest && (
                        <img
                          src={row.team.crest}
                          alt={row.team.name}
                          className="w-6 h-6"
                        />
                      )}
                      {row.team.name}
                    </td>
                    <td className="px-4 py-2">{row.playedGames}</td>
                    <td className="px-4 py-2">{row.won}</td>
                    <td className="px-4 py-2">{row.draw}</td>
                    <td className="px-4 py-2">{row.lost}</td>
                    <td className="px-4 py-2">{row.goalsFor}</td>
                    <td className="px-4 py-2">{row.goalsAgainst}</td>
                    <td className="px-4 py-2">{row.goalDifference}</td>
                    <td className="px-4 py-2 font-bold">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Current{" "}
            <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
              Season Stats
            </span>
          </h2>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
            </div>
          )}
        </div>

        {!loading && standingsData && (
          <>
            <LeagueStats league="premierLeague" />
            <LeagueStats league="championsLeague" />

            <div className="mt-12 space-y-6">
              <LeagueTable
                title="Premier League Table"
                tableKey="premierLeague"
              />
              <LeagueTable
                title="Champions League Table"
                tableKey="championsLeague"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Standings;
