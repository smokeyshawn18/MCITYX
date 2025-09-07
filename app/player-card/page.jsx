"use client";
import { useState } from "react";
import { players } from "@/data/players";
import PlayerCard from "@/components/PlayerCard";
import Link from "next/link";

// Players on loan or transferred
const byeNames = [
  "İlkay Gündoğan",
  "Manuel Akanji",
  "King Kev (Napoli)",
  "Jack Grealish",
  "James McAtee",
  "C. Echeverri",
  "Ederson Moraes",
];

// Filter out players that are in byeNames list
const activePlayers = players.filter(
  (player) => !byeNames.includes(player.name)
);

const totalValue = activePlayers
  .reduce((sum, player) => sum + player.value, 0)
  .toFixed(1);
const inBillion = (parseFloat(totalValue) / 1000).toFixed(2);

// Helper function to group players
const filterByGroup = (group, playerList) => {
  switch (group) {
    case "Forwards":
      return playerList.filter((p) =>
        ["LW", "RW", "CF", "ST", "SS", "FW"].includes(p.position)
      );
    case "Midfielders":
      return playerList.filter((p) =>
        ["CM", "CDM", "CAM", "LM", "RM", "AM", "DM", "MF"].includes(p.position)
      );
    case "Defenders":
      return playerList.filter((p) =>
        ["CB", "LB", "RB", "LWB", "RWB", "DF"].includes(p.position)
      );
    case "Goalkeepers":
      return playerList.filter((p) => p.position === "GK");
    default:
      return [];
  }
};

const PlayerSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter active players based on search
  const filteredPlayers = activePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groups = ["Forwards", "Midfielders", "Defenders", "Goalkeepers"];

  return (
    <div className="p-4 sm:p-8 bg-sky-100 dark:bg-gray-900">
      <h1 className="text-3xl font-extrabold dark:text-white text-sky-700 mb-6 text-center uppercase tracking-wider">
        Manchester City Player Stats - 25/26 Season
      </h1>

      <h3 className="text-xl font-extrabold dark:text-white text-sky-700 mb-6 text-center uppercase tracking-wider">
        Squad Value:{" "}
        <span className="text-xl font-bold text-sky-700 dark:text-sky-100">
          ${inBillion} Billion
        </span>
      </h3>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {groups.map((group) => {
        const groupPlayers = filterByGroup(group, filteredPlayers);
        if (groupPlayers.length === 0) return null;

        return (
          <div key={group} className="mb-16">
            <h2 className="text-2xl font-bold dark:text-white text-sky-800 mb-6 text-center underline uppercase">
              {group}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupPlayers.map((player, index) => (
                <PlayerCard key={index} player={player} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Note */}
      <p className="font-extrabold dark:text-white text-2xl mt-10 p-5 text-center text-sky-900">
        Note:{" "}
        <span className="text-xl dark:text-white font-semibold text-black">
          This season stats include all club matches and this season's
          international stats.
        </span>
        <br />
        <span className="text-xl dark:text-white font-semibold text-black">
          Stats are according to{" "}
          <Link
            className="font-bold text-blue-700"
            href="https://www.transfermarkt.com/"
          >
            transfermarkt.com
          </Link>
        </span>
      </p>
    </div>
  );
};

export default PlayerSection;
